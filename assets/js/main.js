// MailChimp
/** http://stackoverflow.com/a/15120409/477958 **/
$(function () {
  var $form = $('#mc-embedded-subscribe-form');

  $('#mc-embedded-subscribe').on('click', function(event) {
    if(event) event.preventDefault();
    register($form);
  });
});

function register($form) {
  $.ajax({
    type: $form.attr('method'),
    url: $form.attr('action'),
    data: $form.serialize(),
    cache       : false,
    dataType    : 'json',
    contentType: "application/json; charset=utf-8",
    error       : function(err) { $('#notification_container').html('<span class="alert">Could not connect to server. Please try again later.</span>'); },
    success     : function(data) {
     
      if (data.result != "success") {
        var message = data.msg.substring(4);
        $('#notification_container').html('<span class="alert">'+message+'</span>');
      } 

      else {
        var message = data.msg;
        $('#notification_container').html('<span class="success">'+'Subscribed! Look for the confirmation email'+'</span>');
        $('#mc_embed_signup').hide();
        $('#shareTwitter').show();

        var email = document.getElementById("mce-EMAIL").value;
        var emailTemplate = '<div style="background:#55acef; color:#fff; font-family:Arial; text-align:center; text-decoration:none;"><a href="http://ticketwarrior.me" style="color:#fff; font-weight:700; text-decoration:none; text-shadow:2px 2px 1px rgba(0, 0, 0, 1);"><div style="font-size:75px; padding:20px 20px 0 20px;">Ticket Warrior</div><div style="font-size:24px; padding:0 20px;">Saving the world one parking ticket at a time</div></a><div style="font-size:18px; font-weight:400; margin:auto; max-width:600px; padding:30px 30px 0 30px; text-align:left">We here at the Ticket Warrior office are super excited to be launching our application to help you fight your parking tickets.<br><br>Until then, share us on Twitter to gain priority access! If you <a href="http://ctt.ec/04Gpi" style="color:#91FBB1; font-weight:700;">click here to tweet us</a>, we will guarantee your access and as a bonus give you <span style="color:#91FBB1; font-weight:700;">10% off</span> the first time you use our service!<br><br>Sincerely,<br><br><div style="font-weight:700;">Your Warriors</div></div><br><br><br><div style="background-color:#333333; border-top:1px solid black; font-size:16px; font-weight:400; padding:20px; text-align:center;"><a href="http://twitter.com/ticketwarriorme" target="_blank" style="color:#fff; font-weight:400; text-align:center;"><img src="http://ticketwarrior.me/assets/img/twitter.png" style="padding-bottom:10px; width:50px;"></a><br><span style="color:#fff">&copy; 2015 Ticket Warrior</span><br></div></div>';

        $.ajax({
          type: 'POST',
          url: 'https://mandrillapp.com/api/1.0/messages/send.json',
          data: {
            'key': 'oqa-pat7REJaqL3bSUS7AA',
            'message': {
              'from_email': 'hello@ticketwarrior.me',
              'from_name': 'Ticket Warrior',
              'to': [
                  {
                    'email': email,
                    'type': 'to'
                  }
                ],
              'autotext': 'true',
              'subject': 'We fight your tickets so you don\'t have to',
              'html': emailTemplate
            }
          }
        }).done(function(response) {
          console.log(response); // if you're into that sorta thing
        });
      }
    }
  });
}