class ClientSerializer < ActiveModel::Serializer
  attributes :id, :company_name

  has_many :projects, dependent: :destroy
  has_many :users, through: :projects

end
