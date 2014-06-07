// ==UserScript==
// @name          Facebook Font Fixer by Jojo
// @namespace     http://userscripts.org/scripts/new?form=true
// @description	  Facebook themes
// @author        Jordan Amar
// @homepage      http://userscripts.org/users/245183
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// ==/UserScript==
(function() {var d=document;var S=d.createElement('style');S.type = 'text/css';S.appendChild(d.createTextNode('#profile_minifeed h6{font-size:13px} .actorName{display:inline} #home_stream h6{font-size:13px}'));d.body.appendChild(S);})();