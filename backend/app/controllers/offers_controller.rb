class OffersController < ApplicationController
  before_action :authenticate_user!

  respond_to :json

  # offers
  # GET    /offers(.:format)
  # offers#index
  def index
    user_age = current_user.age
    gender = current_user.gender_before_type_cast || 0
    @offers = Offer.where("min_age <= ?", user_age)
                   .where("max_age >= ?", user_age)
                   .where("gender = ? or gender = 0", gender)
                   .where("expiration_date > ?", Date.today)
                   .where("status = 1")
  end

  # offer
  # GET    /offers/:id(.:format)
  # offers#show
  def show
    @offer = Offer.find_by(id: params[:id].to_i)
  end

  private

  def offer_params
    params.require(:offer).permit(:title, :description, :min_age, :max_age, :gender, :status, :expiration_date)
  end

end