// ==UserScript==
// @name        Plug.dj Background
// @namespace   plug.dj
// @description Adds a custom background to the plug.dj rooms
// @include     http://www.plug.dj/*
// @include     http://plug.dj/*
// @include     http://www.pepper.plug.dj/*
// @include     http://pepper.plug.dj/*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle("html { background: #000 url(http://i.imgur.com/Z3cGh.png) no-repeat scroll center top; } #room-wheel { display: none !important; }");