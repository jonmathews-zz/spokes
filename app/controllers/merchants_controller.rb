class MerchantsController < ApplicationController
	before_filter :authenticate_user!

	def edit
	  	if current_user.merchant.nil?
	  		@merchant = Merchant.new
		else
	  		@merchant = current_user.merchant
		end
  	end

	def update
		@merchant = current_user.merchant

		if @merchant.update_attributes(merchant_params[:merchant])
			flash[:success] = "Profile updated"
		else
			flash[:error] = "Profile not updated"
		end
		redirect_to authenticated_root_path
	end

	def post_offer_schedule
		@merchant = current_user.merchant
		puts merchant_params
		if @merchant.update_attribute(:offer_schedule, merchant_params[:_json])
			render text: "Success"
		else
			render text: "Unsuccessful"
		end			
	end

	def get_offer_schedule
		@merchant = current_user.merchant
		respond_to do |format|
      		format.json { render json: @merchant.offer_schedule}
      	end
	end

	private

	def merchant_params
	  params.permit!
	end
end
