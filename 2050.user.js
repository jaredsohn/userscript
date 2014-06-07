// ==UserScript==
// @name            Hide Gmail Right Side Ads
// @namespace       none
// @description     Hide Gmail Right Side Ads
// @include         http://mail.google.com/mail*
// @include         https://mail.google.com/mail*
// ==/UserScript==

(function() { var style = document.createElement('style'); style.setAttribute('id', 'rc'); document.getElementsByTagName('head')[0].appendChild(style); document.getElementById('rc').sheet.insertRule('#rc {display:none}', 0);})();

