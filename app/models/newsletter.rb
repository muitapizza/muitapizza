# encoding: utf-8
class Newsletter < ActiveRecord::Base
  validates :email, 
            :presence => {:message => "Digite o e-mail que deseja cadastrar."},
            :uniqueness => {:message => "Você já havia se cadastrado. Obrigado novamente!"},
            :format => {
              :with => /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i,
              :message => "Desculpe, o e-mail digitado parece ser inválido."
            } 

end
