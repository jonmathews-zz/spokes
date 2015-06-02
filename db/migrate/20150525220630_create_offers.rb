class CreateOffers < ActiveRecord::Migration
  def change
    create_table :offers do |t|
      t.string :name
      t.string :comment
      t.date :start_date
      t.time :start_time
      t.integer :duration
      t.date :terminates_on_date
      t.boolean :sunday
      t.boolean :monday
      t.boolean :tuesday
      t.boolean :wednesday
      t.boolean :thursday
      t.boolean :friday
      t.boolean :saturday
      t.boolean :active

      t.timestamps null: false
    end
  end
end
