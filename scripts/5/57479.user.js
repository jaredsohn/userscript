// ==UserScript==
// @name          Better Facebook Birthdays v1
// @namespace     http://www.bablhost.com/greasemonkey/fb-birthdays/fb-birthdays.user.js
// @description	  Moves facebook events (and birthdays) to where you'll actually see them
// @author        Brady Law
// @homepage      http://www.bablhost.com/greasemonkey/fb-birthdays/
// @include       http://www.facebook.com/*
// ==/UserScript==

var GM_FB=new Object;GM_FB.sidebarJQ="home_sidebar";GM_FB.eventsSpot="4";GM_FB.insertBefore="2";GM_moveEvents();function GM_moveEvents(){var a=document.getElementById(GM_FB.sidebarJQ);if(a){var b=a.children;a.insertBefore(a.children[GM_FB.eventsSpot],a.children[GM_FB.insertBefore])}}
