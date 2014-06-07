// ==UserScript==
// @name           Show @hotmail.com
// @description    Show @hotmail.com by default everytime you visit Microsoft Live site.
// @include        http://login.live.com/*
// ==/UserScript==

window.addEventListener('load',function() {
  var available_inputs = document.getElementsByTagName('input');
  if (available_inputs.length) {
    for (var i=0; i< available_inputs.length; i++) { 
	  if (available_inputs[i].name == 'login') {
	    available_inputs[i].defaultValue = '@hotmail.com';
	  }
    }
  }
}, true);