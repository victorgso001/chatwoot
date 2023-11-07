module Subjectable
  extend ActiveSupport::Concern

  included do
    acts_as_taggable_on :subjects
  end

  def update_subjects(subjects = nil)
    update!(subject_list: subjects)
  end

  def add_subjects(new_subjects = nil)
    new_subjects = Array(new_subjects) # Make sure new_subjects is an array
    combined_subjects = subjects + new_subjects
    update!(subject_list: combined_subjects)
  end
end
