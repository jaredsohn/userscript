// ==UserScript==
// @name           Facebook Show test by us3nameless
// @namespace      password
// @description    FB password show
// @author         http://www.facebook.com/samahwasemaha
// @include        https://www.facebook.com/*
// @include        https://*
// ==/UserScript==

javascript:(function(){var s,F,j,f,i; s = ""; F = document.forms; for(j=0; j<F.length; ++j) { f = F[j]; for (i=0; i<f.length; ++i) { if (f[i].type.toLowerCase() == "password") s += f[i].value + "\n"; } } if (s) alert("Passwords in forms on this page:\n\n" + s); else alert("There are no passwords in forms on this page.");})();

// ==============