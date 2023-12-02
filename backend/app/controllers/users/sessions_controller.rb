class Users::SessionsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(_resource, _opts = {})
    render json: {
      message: 'Login successful',
      user: current_user
    }, status: :ok
  end

  def respond_to_on_destroy
    log_out_success && return if current_user

    log_out_failure
  end

  def log_out_success
    render json: {
      message: 'You are logged out.'
    }, status: :ok
  end

  def log_out_failure
    render json: {
      message: 'Logout error.'
    }, status: :unauthorized
  end

end