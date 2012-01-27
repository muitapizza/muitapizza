class HomeController < ApplicationController
  def index
    @newsletter = Newsletter.new
    
    
  end

end
