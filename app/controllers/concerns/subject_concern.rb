module SubjectConcern
  def create
    model.update_subjects(permitted_params[:subjects])
    @subjects = model.subject_list
  end

  def index
    @subjects = model.subject_list
  end
end
