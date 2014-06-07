switch(window.location.pathname){
case "/messages.php":            //
case "/sendmessage.php":         // Kmail Areas
case "/makeoffer.php":           //
case "/account_contactlist.php": //
case "/searchplayer.php": 	//
var menu = document.createElement("div");
menu.innerHTML = '<table align="center" width="95%" cellpadding="0" cellspacing="0"><tbody>' +
'<tr><td style="color: white;" align="center" bgcolor="blue">' +
'<b><a href="messages.php" style="text-decoration: none; color: white;">Kmail Areas</a></b></td></tr><tr>' + 
'<td style="border: 1px solid blue; padding: 5px;">' + 
'<table align="center" width="99%"><tbody>' +
'<tr><td style="font-size: 0.8em"><center>' +
'<a href="messages.php?box=Inbox">Inbox</a> / ' +
'<a href="messages.php?box=Outbox">Outbox</a> / ' +
'<a href="messages.php?box=Saved">Saved</a> | ' +
'<a href="sendmessage.php">Send Message</a> / ' +
'<a href="makeoffer.php">Check Trades</a><br>' +
'<a href="account_contactlist.php">Edit Contacts</a>, ' +
'<a href="searchplayer.php">Search Players</a>' +
'</center></td></tr></tbody></table>' +
'</td></tr><tr><td height=4></td></tr></table>';
document.body.insertBefore(menu, document.body.firstChild);
break;
}

// ==UserScript==
// @name          AmandaKerik's Menus for Kmail Areas (KOL)
// @namespace     http://userscripts.org/users/26909
// @description   Puts a master menu above all areas that relate to Kmail
// @version	  1.3

// @include       http://*kingdomofloathing.com/*

// @exclude       http://forums.kingdomofloathing.com/*
// ==/UserScript==

