class CommentSerializer < ActiveModel::Serializer
  attributes :content
  belongs_to :project
end
