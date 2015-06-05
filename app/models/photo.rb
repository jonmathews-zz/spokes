class Photo < ActiveRecord::Base
	belongs_to :merchant
	mount_uploader :image, ImageUploader
end
