class NewslettersController < ApplicationController
  respond_to :json
  
  def create
    @newsletter = Newsletter.new(params[:newsletter])

      if @newsletter.save
        render :json => @newsletter
      else
        render :json => @newsletter.errors, :status => 406
      end
  end
end
