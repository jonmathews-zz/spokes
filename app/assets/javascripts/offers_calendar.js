var current_event_id
var current_event

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

$('.home.offers').ready(function() {

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    /* initialize the external events
     -----------------------------------------------------------------*/


    $('#external-events div.external-event').each(function () {

        // store data so the calendar knows to render an event upon drop
        $(this).data('event', {
            title: $.trim($(this).text()), // use the element's text as the event title
            stick: true, // maintain when user navigates (see docs on the renderEvent method)
            backgroundColor: this.style.backgroundColor
        });

        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 1111999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
        });

    });


    /* initialize the calendar
     -----------------------------------------------------------------*/
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();


    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'agendaWeek,agendaDay'
        },
        defaultView: 'agendaWeek',
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar
        allDaySlot: false,
        // forceEventDuration: true,
        columnFormat: 'ddd D/M',
        events: '/merchants/offer_schedule.json',
        aspectRatio: 1.75,

        eventClick: function(calEvent, jsEvent, view) {

            $('#discountInput').val(calEvent.discountLevel);
            $('#numCoversInput').val(calEvent.numCovers);
            window.current_event_id = calEvent._id;
            window.current_event = calEvent;
            $('#edit-offer-box').show();

        },
        eventReceive: function(event) {
            var start_time = event.start;
            var background_color = event.backgroundColor;
            var discountLevel = event.title;

            $('#edit-offer-box').hide();
            $('#calendar').fullCalendar('removeEvents', event._id);
            $('#calendar').fullCalendar( 'renderEvent', {
                title:"My repeating event",
                start: start_time.format('H:mm'), // a start time (10am in this example)
                end: start_time.add(2,'hours').format('H:mm'), // an end time (6pm in this example)
                dow: [ start_time.day() ],
                backgroundColor: background_color,
                title: discountLevel + ' * 10',
                discountLevel: discountLevel,
                numCovers: 10,
                created_timestamp: moment()
                }
            , true )
        }
    });
});

var check_delete = function() {

}

$(document).ready(function() {
    $('#btn-save').click(function(){
        var events_array = $('#calendar').fullCalendar('clientEvents');
        for (var i = 0; i < events_array.length; i++) {
            delete events_array[i].source
        }
        $.ajax({
            url: "/merchants/offer_schedule",
            type: "POST",
            data: JSON.stringify(events_array),
            dataType:"text",
            contentType: "application/json; charset=utf-8",
                
            success: function(data) {
                return false;
            },
            error: function(data) {
                return false;
            }
        });
        $('#calendar').fullCalendar( 'removeEvents' );
        $('#calendar').fullCalendar( 'refetchEvents' );
        $('#edit-offer-box').hide();
    })

    $('#btn-delete').click(function(){
        $('#calendar').fullCalendar('removeEvents',window.current_event_id);
        $('#btn-save').trigger('click');
        $('#edit-offer-box').hide();
        window.current_event_id = nil;
    })

    $('#btn-save-offer').click(function(){
        var x = parseFloat($('#discountInput').val());
        if (isNaN(x) || x < 0 || x > 100) {
            alert('Please enter a valid percentage.');
            return;
        }
        if ( !isInt( $('#numCoversInput').val() ) ) {
            alert('Please enter a valid number of covers.');
            return;
        }

        window.current_event.numCovers = $('#numCoversInput').val();
        window.current_event.discountLevel = $('#discountInput').val();
        window.current_event.title = $('#discountInput').val() + ' * ' + $('#numCoversInput').val();
        $('#calendar').fullCalendar('updateEvent',window.current_event);
        $('#btn-save').trigger('click');
        // window.current_event_id = nil;
    })

});