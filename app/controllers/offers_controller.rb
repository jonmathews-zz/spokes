class OffersController < ApplicationController

  respond_to :html, :js
  
  def index
    @offers = Offer.all
  end

  def show
    @offer = Offer.find(params[:id])
  end

  def new
    @offer = Offer.new
  end

  def create
    @offers = Offer.all
    @offer = Offer.create(offer_params)
  end

  def edit
    @offer = Offer.find(params[:id])
  end

  def update
    @offers = Offer.all
    @offer = Offer.find(params[:id])
    
    @offer.update_attributes(offer_params)
  end

  def delete
    @offer = Offer.find(params[:offer_id])
  end

  def destroy
    @offers = Offer.all
    @offer = Offer.find(params[:id])
    @offer.destroy
  end

private
  def product_params
    params.require(:offer).permit!
  end

end
