// ==UserScript==
// @name GOG.com - Green Username
// @namespace http://userscripts.org/users/tarangwydion
// @description Change the username color into green
// @include http://www.gog.com/en/forum/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==

$('<style>').attr('type', 'text/css').text("\
.b_u_name, .b_u_name a {\
color: #00a000 !important;\
}").appendTo('head')