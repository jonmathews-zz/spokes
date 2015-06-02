class Photo < ActiveRecord::Base
	belongs_to :merchant
	mount_uploader :photo, PhotoUploader
end
