Muitapizza::Application.routes.draw do
  resources :newsletters

  get "home/index"
  
  root :to => "home#index"
end
