class AddOfferScheduleToMerchants < ActiveRecord::Migration
  def change
    add_column :merchants, :offer_schedule, :text
  end
end
