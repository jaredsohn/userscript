// ==UserScript==
// @name       AttackNotification
// @author      BIRDIE
// @description  Byter ut bakgrundsbilden på impulse.nu för att enkelt visa när du är attackerad
// @version    1
// @namespace  http://www.impulse.nu/?sida=stats/stats&id=119550
// @match      http://*.impulse.nu/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

//**********USER SETTINGS/INFO**************//
//
//Byter ut bakgrundsbilden på impulse för att enkelt visa när du är attackerad
//
//**********USER SETTINGS/INFO END**************//
var impulse = function(){

function battleAlert() {
if($(".rubrik:contains('Strid')").length > 0)
	$("#page_bg").css("background-image", "url(http://i.imgur.com/GRQMP8t.jpg)");
}

battleAlert();
};
impulse();