class AddMerchantToPhotos < ActiveRecord::Migration
  def change
    add_reference :photos, :merchant, index: true
    add_foreign_key :photos, :merchants
  end
end
