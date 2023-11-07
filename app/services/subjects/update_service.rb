class Subjects::UpdateService
  pattr_initialize [:new_subject_title!, :old_subject_title!, :account_id!]

  def perform
    tagged_conversations.find_in_batches do |conversation_batch|
      conversation_batch.each do |conversation|
        conversation.subject_list.remove(old_subject_title)
        conversation.subject_list.add(new_subject_title)
        conversation.save!
      end
    end

    tagged_contacts.find_in_batches do |contact_batch|
      contact_batch.each do |contact|
        contact.subject_list.remove(old_subject_title)
        contact.subject_list.add(new_subject_title)
        contact.save!
      end
    end
  end

  private

  def tagged_conversations
    account.conversations.tagged_with(old_subject_title)
  end

  def tagged_contacts
    account.contacts.tagged_with(old_subject_title)
  end

  def account
    @account ||= Account.find(account_id)
  end
end
