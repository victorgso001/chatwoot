class Api::V1::Accounts::Conversations::SubjectsController < Api::V1::Accounts::Conversations::BaseController
  include SubjectConcern

  private

  def model
    @model ||= @conversation
  end

  def permitted_params
    params.permit(:conversation_id, subjects: [])
  end
end
