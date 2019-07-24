class UserSerializer < ActiveModel::Serializer
  attributes :id, :username
  has_many :projects
  has_many :clients, through: :projects
end
