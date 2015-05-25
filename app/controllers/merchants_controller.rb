class MerchantsController < ApplicationController
	def edit
	  	if current_user.merchant.nil?
	  		@merchant = Merchant.new
		else
	  		@merchant = current_user.merchant
		end
  	end

	def update
		@merchant = current_user.merchant

		if @merchant.update_attributes(merchant_params)
			flash[:success] = "Profile updated"
		else
			flash[:error] = "Profile not updated"
		end
		redirect_to authenticated_root_path
	end

	private

	def merchant_params
	  params.require(:merchant).permit!
	end
end
