class Users::RegistrationsController < Devise::RegistrationsController

  respond_to :json

  private

  def respond_with(resource, _opts = {})
    puts "#{'>' * 20} respond_with #{'<' * 20}"
    register_success && return if resource.persisted?

    register_failed
  end

  def register_success
    puts "#{'>' * 20} current_user #{'<' * 20}"
    pp current_user

    render json: {
      message: 'Registration successful',
      user: current_user
    }, status: :ok
  end

  def register_failed
    render json: {
      message: 'Error creating user'
    }, status: :unprocessable_entity
  end
end