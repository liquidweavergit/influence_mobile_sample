class MembersController < ApplicationController
  before_action :authenticate_user!

  def show
    user = get_user_from_token

    render json: {
      message: "If you see this, you're in!",
      user: user
    }
  end

  private

  def get_user_from_token
    jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1],
                             ENV['JWT_SECRET_KEY'])
    user_id = jwt_payload['sub'].to_i
    User.find(user_id)
  end
end