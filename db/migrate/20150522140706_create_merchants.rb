class CreateMerchants < ActiveRecord::Migration
  def change
    create_table :merchants do |t|
      t.string :name

      t.timestamps null: false
	  t.belongs_to :user, index: true
    end
  end
end
