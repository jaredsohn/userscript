// ==UserScript==
// @name          Show Password on Focus
// @namespace     http://nv.github.com/show-password-onfocus
// @include       *
// @description   Show password when focus on password field
// @version       1.0
// @icon          http://nv.github.com/show-password-on-focus.js/icon_48.png
// ==/UserScript==

(function() {

  var KEY_ENTER = 13;

  var inputs = document.querySelectorAll('input[type=password]');
  for(var i = 0; i < inputs.length; i++) (function(i){
    function hidePassword(){
      inputs[i].type = 'password';
    }
    function showPassword(){
      inputs[i].type = 'text';
    }
    inputs[i].addEventListener('focus', showPassword, false);
    inputs[i].addEventListener('blur', hidePassword, false);
    inputs[i].addEventListener('keydown', function onBeforeSubmit(e){
      if (e.keyCode === KEY_ENTER) hidePassword();
    }, false);
  })(i);
  
})();