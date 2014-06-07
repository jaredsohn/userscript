// ==UserScript==
// @name           Blip easyPermalinks
// @namespace      easyPermalinks
// @description    v. 0.1
// @include        http://www.blip.pl/*
// @include        http://blip.pl/*
// ==/UserScript==

window.addEventListener("click", function(event){if(event.target.parentNode.getAttribute('class')=='permalink'){event.preventDefault();document.getElementById('status-entry').value+='( '+event.target.parentNode.getAttribute('href')+' )';}},false);