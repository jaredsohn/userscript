// ==UserScript==
// @name         mob wars repeat attack or punch
// @description  constantly attacks one targeted prick
// @include 	 http://apps.new.facebook.com/mobwars/*
// @include 	 http://apps.facebook.com/mobwars*
// ==/UserScript==

////////////////////////////////////////////////////////////////////
//Directions///////////////////////////////////////////////////////
///1 Copy URL of the attack or punch link for targeted mob////////
///2 Paste URL between single quotes/////////////////////////////
///3 Feel free to use mine in the example! ;)///////////////////
///4 Last number is refresh rate in milliseconds///////////////
///5 If attacking, refresh = 5000 or more (generally)/////////
///6 If punching, refresh = 3600000, page must remain static/
///7 ENJOY! ////////////////////////////////////////////////
///////////////////////////////////////////////////////////

window.setInterval(function() { window.location ='http://apps.facebook.com/mobwars/fight/do.php?action=punch&target_id=502431035&from=/profile/?user_id=502431035'}, 5000);