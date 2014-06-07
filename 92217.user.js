// ==UserScript==
// @name         Yule Log-on
// @namespace    yulelogon
// @include      *
// @author       Ian Silber
// @description  Bring the Christmas spirit to your browser every time you login to a website!
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  passwords = $('input[type=password]').size();
  if (passwords > 0) {
    $('*').css('background', 'none');
    $('*').css('color', '#FFF');
    $('body').css('background-image','url(http://imgur.com/T3dEK.jpg)');
    $('body').css('background-size','100%');
    $('body').css('-moz-background-size','100%');
    $('body').css('background-repeat: no-repeat');
    $('body').css('background-position: fixed');
  }
  
}

// load jQuery and execute the main function
addJQuery(main);