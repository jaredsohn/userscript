// ==UserScript==
// @name          All Invite
// @description	  invite all on a facebook event.
// @namespace     http://userscripts.org/users/310709
// @include       http://www.facebook.com/*

//Developed by Mayank Singhal
// ==/UserScript==



javascript:var numfriends=document.getElementById('friends').getElementsByTagName('li').length;fs.click(document.getElementById('friends').getElementsByTagName('a')[1].parentNode);for(var i=0; i < numfriends; i++){fs.click(document.getElementById('friends').getElementsByTagName('a')[i].parentNode);} 