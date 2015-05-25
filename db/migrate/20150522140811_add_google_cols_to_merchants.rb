class AddGoogleColsToMerchants < ActiveRecord::Migration
  def change

    add_column :merchants, :description, :string
    add_column :merchants, :address1, :string
    add_column :merchants, :address2, :string
    add_column :merchants, :city, :string
    add_column :merchants, :postcode, :string
    add_column :merchants, :country, :string
    add_column :merchants, :website, :string
    add_column :merchants, :phone_number, :string
  	add_column :merchants, :google_url, :string
  	add_column :merchants, :google_place_id, :string
  	add_column :merchants, :google_rating, :string
  	add_column :merchants, :google_num_reviews, :string
  	add_column :merchants, :google_price_level, :string
  	add_column :merchants, :lat, :decimal, {:precision=>10, :scale=>6}
  	add_column :merchants, :lng, :decimal, {:precision=>10, :scale=>6}

  end
end
