// ==UserScript==
// @name           Recaptcha in GreaseMonkey
// @description    Example user script using a recaptcha in GreaseMonkey
// @namespace      http://www.monperrus.net/martin/
// @author         Martin Monperrus
// @include        http://www.monperrus.net/martin/using+recaptcha+in+greasemonkey
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

/** Redirecting the log to firebug */
if(unsafeWindow.console){
   console = unsafeWindow.console;
   console.log('log enabled');
}

/** Creates a recaptcha in the dom element IDed 'recaptcha' */
function createCaptcha() {
  // this is my own Recaptcha API public key, replace by yours in your script
  // on your server-side service, you use the private one
  recaptchaPublicKey = "6LerC70SAAAAAEwc4QsuoWncVQvKsB2RndBI7CY4";
  Recaptcha.create(recaptchaPublicKey,
    'recaptcha',// id of the target DOM element
    {
      theme: "red",
      callback: 
      function() {
        var submit = $('<button>Submit Recaptcha (Button added in Greasemonkey)</button>');
        submit.click(function() { alert(' Recaptcha Challenge: '+Recaptcha.get_challenge()+'\n\n Recaptcha Response: '+Recaptcha.get_response()); } );
        submit.appendTo($('#demo'));
      }
    }
  );
}

/** Main script */
function main() {
  var script = document.createElement('script');script.setAttribute('src', 'http://www.google.com/recaptcha/api/js/recaptcha_ajax.js');
  document.getElementsByTagName('html')[0].appendChild(script);
  setTimeout(function(){Recaptcha = unsafeWindow.Recaptcha;},500);


  var button = $('<button>Create Recaptcha (Button added in Greasemonkey)</button>');
  button.click(createCaptcha);
  button.appendTo($('#demo'));
  
  // the recaptcha container
  $('<div id="recaptcha"/>').appendTo($('#demo'));
}


main();