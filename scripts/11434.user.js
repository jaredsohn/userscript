// ==UserScript==
// @name          Yahoo Autocomplete On
// @namespace     YahooAutoByShajul
// @author        Shajul
// @version       1.2
// @description   Turns Yahoo login form autocomplete "On", so that now your browser remembers you! Also works with password manager in firefox, so no need to type your login again! Additionally unchecks the "Keep me signed in" button so that you can check multiple yahoo accounts easily.
// @include       http://mail.yahoo.com/*
// @include       *login.yahoo.co*
// ==/UserScript==

// get the login form
var sForms = document.getElementsByTagName("form");
for (var i=0;i<sForms.length;i++) {
  tvar = sForms[i].name.toLowerCase();
  if (tvar.match('login')) sForm = sForms[i];
}

// turn on autocomplete
var sAttr = sForm.attributes;
for (var i=0;i<sAttr.length;i++) {
  var n=sAttr[i].name.toLowerCase();
  if(n.match("autocomplete")) sAttr[i].value="on"; 
}

// removes the persistent cookie, generic way (works with google too)
var obj = sForm.getElementsByTagName("INPUT");
for(var i=0;i<obj.length;i++) {
	if(obj[i].type=="checkbox") {
		var n=obj[i].name.toLowerCase();
		if(n.match("persist")) obj[i].checked=false;
  }
}

var sPwd = sForm.elements.namedItem('passwd');
sPwd.focus();
if(document.getElementById) {
  document.getElementById('passwd').focus();
  document.getElementById('username').focus();
  }

/* Another way
var sPersist = sForm.elements.namedItem('persistent');
sPersist.checked=false;
*/
