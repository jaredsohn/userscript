// ==UserScript==
// @name           Reload on error message
// @namespace      http://userscripts.org/users/23652
// @description    Reload the page on an error message you set yourself
// @include        *
// @exclude        about:*
// @exclude        chrome:*
// @exclude        http://userscripts.org/*
// @copyright      JoeSimmons
// ==/UserScript==

// Add your errors here to the pattern ///////////////
var errors = []; // Edit the lines below this one
errors[0] = /Too Many Connections/i;
//////////////////////////////////////////////////////

function check() {
for(var i=0; i<errors.length; i++) {
if(errors[i].test(document.body.textContent)) {window.location.reload();}
}
}

setTimeout(check, 500);