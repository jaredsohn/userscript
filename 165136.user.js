// ==UserScript==
// @name Greyersting
// @namespace	Greyersting
// @include	*twitch.tv*
// ==/UserScript==

var start_pos = document.body.innerHTML.indexOf('<li class="chat_from_moobot line" data-sender="moobot">');
var end_pos = document.body.innerHTML.indexOf('</li>',start_pos);
var rem = document.body.innerHTML.substring(start_pos,end_pos);
var remfix = rem + '</li>';

document.body.innerHTML = document.body.innerHTML.replace(remfix,'');