// ==UserScript==
// @name           myspace bulletin fix
// @namespace      myspace bulletin fix
// @include        http://home.myspace.com/index.cfm?fuseaction=user*
// ==/UserScript==

var style = document.createElement("div");
style.innerHTML = '<style type="text/css">div#home_bulletins{overflow:auto !important;}</style>';
document.body.insertBefore(style, document.body.firstChild);