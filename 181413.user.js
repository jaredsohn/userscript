// nerdcrafteria.com forums alerts in title
// version 0.5
// 2013-11-03
// Copyright (c) 2013, Joseph Becher
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Nerdcrafteria.com Title Alerts", and click Uninstall.
//
// Based off of http://forums.bukkit.org/threads/chrome-bukkitalert-get-notified-of-new-alerts-in-bukkit-anywhere.86294/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Nerdcrafteria.com Title Alerts
// @namespace     http://jwebnet.net/
// @description   Unofficial script to update title with number of alerts
// @include       http://nerdcrafteria.com/*
// @grant         none
// ==/UserScript==

// #AlertsMenu_Counter > span:nth-child(1)

// id('ConversationsMenu_Counter')
// id('AlertsMenu_Counter')

//alert('Foo!');

var fetchFreq = 60000;

var xhr;
var chatsUnread = 0;
var alertsUnread = 0;
var oldTitle = document.title;


getAlerts();

function getAlerts() {
    xhr = new XMLHttpRequest();
    xhr.open( 'GET', 'http://nerdcrafteria.com/recent-activity/.json', true );
    xhr.onload = function () {
        chatsUnread = window.JSON.parse( xhr.responseText )._visitor_conversationsUnread;
        alertsUnread = window.JSON.parse( xhr.responseText )._visitor_alertsUnread;
    };
    xhr.onerror = function () {
        document.title = 
          '(Error) '
          + oldTitle;
    };
    xhr.send();

    if (chatsUnread > 0 || alertsUnread > 0){
        document.title = 
          '(' 
          + chatsUnread 
          + ',' 
          + alertsUnread
          + ') '
          + oldTitle;

    }
    setTimeout(getAlerts,fetchFreq);
}
