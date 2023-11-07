class Api::V1::Accounts::SubjectsController < Api::V1::Accounts::BaseController
  before_action :current_account
  before_action :fetch_subject, except: [:index, :create]
  before_action :check_authorization

  def index
    @subjects = policy_scope(Current.account.subjects)
  end

  def show; end

  def create
    @subject = Current.account.subjects.create!(permitted_params)
  end

  def update
    @subject.update!(permitted_params)
  end

  def destroy
    @subject.destroy!
    head :ok
  end

  private

  def fetch_subject
    @subject = Current.account.subjects.find(params[:id])
  end

  def permitted_params
    params.require(:subject).permit(:title, :description, :color, :show_on_sidebar)
  end
end
