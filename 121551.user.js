// ==UserScript==
// @name           Disable - remove onbeforeunload
// @namespace      
// @description    Disable - remove the annoying onbeforeunload event
// @include        *
// @author         netvisiteurs.com
// ==/UserScript==

var x = document.createElement('script');
x.type = 'text/javascript';
x.innerHTML = 'onbeforeunload = function() {};';
document.body.appendChild(x);