class Api::V1::Accounts::Contacts::SubjectsController < Api::V1::Accounts::Contacts::BaseController
  include SubjectConcern

  private

  def model
    @model ||= @contact
  end

  def permitted_params
    params.permit(subjects: [])
  end
end
