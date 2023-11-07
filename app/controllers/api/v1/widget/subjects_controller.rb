class Api::V1::Widget::SubjectsController < Api::V1::Widget::BaseController
  def create
    if conversation.present? && subject_defined_in_account?
      conversation.subject_list.add(permitted_params[:subject])
      conversation.save!
    end

    head :no_content
  end

  def destroy
    if conversation.present?
      conversation.subject_list.remove(permitted_params[:id])
      conversation.save!
    end

    head :no_content
  end

  private

  def subject_defined_in_account?
    subject = @current_account.subjects&.find_by(title: permitted_params[:subject])
    subject.present?
  end

  def permitted_params
    params.permit(:id, :subject, :website_token)
  end
end
