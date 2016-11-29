$(window).scroll(function () {
    if ($(window).scrollTop() >= '80' && !$('.navbar').hasClass('navbar-fixed-top')) {
        $('.navbar').addClass('navbar-fixed-top');
    } else if ($(window).scrollTop() < '80' && $('.navbar').hasClass('navbar-fixed-top')) {
        $('.navbar').removeClass('navbar-fixed-top');
    }
});

//Ajax contact form
$(function() {
    var close = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
	// Get the form.
	var form = $('#contact-form');
	// Get the messages div.
	var formMessages = $('#contact-form-output');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();
        $("#form-submit").text("Enviando...");

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('alert alert-danger');
			$(formMessages).addClass('alert alert-success');

			// Set the message text.
			$(formMessages).html(close+response);

			// Clear the form.
			$('#name').val('');
            $('#phone').val('');
			$('#email').val('');
			$('#mssg').val('');
            $("#form-submit").text("Enviar");
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('alert alert-success');
			$(formMessages).addClass('alert alert-danger');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).html(close+data.responseText);
                $("#form-submit").text("Enviar");
			} else {
				$(formMessages).html(close+'Oops! Ocurrió un error, intentelo nuevamente.');
                $("#form-submit").text("Enviar");
			}
		});
	});
});