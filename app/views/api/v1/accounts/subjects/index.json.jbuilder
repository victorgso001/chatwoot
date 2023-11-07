json.payload do
  json.array! @subjects do |subject|
    json.id subject.id
    json.title subject.title
    json.description subject.description
    json.color subject.color
    json.show_on_sidebar subject.show_on_sidebar
  end
end