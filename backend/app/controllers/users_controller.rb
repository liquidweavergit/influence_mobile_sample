class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :get_user

  respond_to :json

  # user
  # GET    /users/:id(.:format)
  # users#show
  def show

  end

  # user
  # PATCH  /users/:id(.:format)
  # PUT    /users/:id(.:format)
  # users#update
  def update
    @user.update(user_params)
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :username, :birthdate, :gender, :admin, :email)
  end

  def get_user
    @user = User.find_by(id: params[:id])
  end

end