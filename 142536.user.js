// ==UserScript==
// @name           Grepolis Alarm (Chrome compatible)
// @namespace      http://userscripts.org/users/483059
// @description    Alarme pour Grepolis
// @version        1.0.2
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @match          http://*.grepolis.*/game*
// ==/UserScript==

var el12 = document.createElement('iframe');
el12.setAttribute('id', 'ifrm');
el12.setAttribute('width', '165');
el12.setAttribute('min-height', '400px');
el12.setAttribute('height', '400px');
el12.setAttribute('scrolling', 'auto');
el12.style.border = '0px';
el12.style.padding = '25px 0 0 0';
el12.setAttribute('src', 'http://dl.dropbox.com/u/55616583/grepolis/alarm/alarm/index.html');
document.getElementById('server_time_wrapper').appendChild(el12);