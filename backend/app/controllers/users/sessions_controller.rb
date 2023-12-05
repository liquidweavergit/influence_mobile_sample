class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(_resource, _opts = {})
    puts "#{'>' * 20} resource.persisted?: #{_resource.persisted?} #{'<' * 20}"

    if _resource.persisted?
      render json: {
        message: 'Login successful',
        user: current_user
      }, status: :ok
    else
      render json: {
        message: 'Login unsuccessful'
      }, status: :unauthorized
    end
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