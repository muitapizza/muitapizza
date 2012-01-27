// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require_tree .


$(window).ready(function() {
	
	var $messages = $('#form-messages');
	var $email = $('#newsletter_email');
	var $submit = $('#newsletter_submit');
	var regex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
	var timeout = 0;

	function message(msg, color) {

		if(timeout) {
			clearTimeout(timeout);
			timeout = null;
		}

		$email.removeClass('message-red message-green message-orange message-blue');

		$messages.stop()
		.fadeTo(0, 0)
		.removeClass('message-red message-green message-orange message-blue')
		.addClass('message-' + color)
		.html(msg)
		.animate({
			left : -($messages.width() + 60),
			opacity : 0.9
		});

		$email.addClass('message-' + color);
		timeout = setTimeout(function() {
			$messages.animate({
				left : 5,
				opacity : 0
			});
			$email.removeClass('message-red message-green message-orange message-blue');
			timeout = null;
		}, 5000);
	}


	$email.one('focus', function() {
		message('Muito obrigado pelo interesse!', 'orange');
	});

	$submit.click(function() {
		if(!regex.test($email.val())) {
			message('Você poderia conferir seu e-mail?', 'red');
			return false;
		}
	});
	
	$('#new_newsletter')
    .bind('ajaxSend', function(evt, xhr, settings) {
    	//message("Um monento, estamos quase acabando...", 'blue');
    	$email.attr('disabled', true);
    	$submit.attr('disabled', true).fadeTo(1000, 0.5);
   	}).bind('ajaxSuccess', function(evt, xhr, settings) {
    	var responseObject = $.parseJSON(xhr.responseText);
    	message("Cadastro realizado com sucesso!", 'green');
    	$email.val('');
    }).bind('ajaxError',  function(evt, xhr, settings, exception){
    	var responseObject = $.parseJSON(xhr.responseText);
    	message(responseObject.email[0], 'red');
	}).bind('ajaxComplete', function(evt, xhr, settings){
    	$email.attr('disabled', false);
    	$submit.attr('disabled', false).fadeTo(1000, 1);
    	$email.focus();
	});
});

