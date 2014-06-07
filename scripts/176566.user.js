// ==UserScript==
// @name            just4test
// @description     just4test
// @include         https://*.brusselsairport.be/*
// @include         http://*.brusselsairport.be/*
// ==/UserScript==

//alert("Script has been loaded...");
var s=document.createElement('script');
s.setAttribute('src', 'http://po-x04968.brussels.airport/rebranding.js');
document.getElementsByTagName('body')[0].appendChild(s);
