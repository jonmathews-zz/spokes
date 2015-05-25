class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :merchant, :dependent => :destroy

  before_create :build_default_merchant

	private
	  def build_default_merchant
	  	build_merchant
	  	true
	  end
end
