// ==UserScript==
// @name           GLB GM admin
// @namespace      www.goallineblitz.com
// @description    Shows the gm administration link otherwise invisible or unnaccessible
// @include        http://goallineblitz.com/*
// ==/UserScript==

window.setTimeout( function() 
{

var timeTag = document.createElement('a');
timeTag.setAttribute('href', 'http://goallineblitz.com/game/user_gm.pl');
timeTag.className = 'toolbar_item';
timeTag.innerHTML += 'GM Admin';

document.getElementById('toolbar').appendChild(timeTag);

});