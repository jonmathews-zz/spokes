class CreateOfferRules < ActiveRecord::Migration
  def change
    create_table :offer_rules do |t|
      t.string :name
      t.string :comment
      t.date :first_date
      t.date :last_date
      t.time :time_start
      t.integer :duration
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
