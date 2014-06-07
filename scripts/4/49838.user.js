// ==UserScript==
// @name AFK-color
// @include http://www.kongregate.com/games/*
// @description Changes color of AFK-users
// ==/UserScript==

x=document.styleSheets[1];
if(x){
	x.insertRule('#kong_game_ui .user_row.away .username { color:#838B8B;font-style: italic;}',x.cssRules.length);
}
