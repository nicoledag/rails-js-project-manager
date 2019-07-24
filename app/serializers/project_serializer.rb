class ProjectSerializer < ActiveModel::Serializer
  attributes :created_at, :id, :name, :description, :target_completion_date, :completion_date
  belongs_to :user
  belongs_to :client
  has_many :comments, dependent: :destroy
end
