class Subjects::UpdateJob < ApplicationJob
  queue_as :default

  def perform(new_subject_title, old_subject_title, account_id)
    Subjects::UpdateService.new(
      new_subject_title: new_subject_title,
      old_subject_title: old_subject_title,
      account_id: account_id
    ).perform
  end
end
