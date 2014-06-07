// ==UserScript==
// @name        Plug.dj Moky Background
// @namespace   http://plug.dj/moky
// @description Adds a custom background to the plug.dj rooms
// @include     http://www.plug.dj/moky/
// @include     http://plug.dj/moky/
// @include     http://www.pepper.plug.dj/moky/
// @include     http://pepper.plug.dj/moky/
// @version    1.0.0
// @description  Works only in Moky's Room.
// @grant       GM_addStyle
// ==/UserScript==

//
GM_addStyle('html { background: #000 url(http://dl.dropbox.com/u/79625725/moky_room_backround.jpg) no-repeat scroll center top; } ');
GM_addStyle('#room-wheel { display: none !important; }')
//