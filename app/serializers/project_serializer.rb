class ProjectSerializer < ActiveModel::Serializer
  attributes :created_at, :id, :name, :description, :target_completion_date, :completion_date
  has_many :comments
  belongs_to :user
  belongs_to :client
end
