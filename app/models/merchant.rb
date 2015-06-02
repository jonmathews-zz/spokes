class Merchant < ActiveRecord::Base
	serialize :offer_schedule, JSON
	belongs_to :user
	has_many :photos
end
