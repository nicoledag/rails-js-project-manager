class ClientSerializer < ActiveModel::Serializer
  attributes :id, :company_name

  has_many :projects
end
