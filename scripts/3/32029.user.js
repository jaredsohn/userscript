// Version 0.1
// Monday, August 18, 2008.
// Inbox.com AutoLogin
// Adam Knutson
// crrimson[AT]gmail[DOT]com
//
// ==UserScript==
// @name         Inbox.com AutoLogin
// @description  Automatically logs in at inbox.com.
// @include http://www.inbox.com/*
// ==/UserScript== 

var loggedIn = document.getElementsByClassName('logged').length;
// if variable is a zero, we are not logged in.

if (loggedIn > 0) {
    var collection = document.getElementsByClassName('email');
    var link = collection.item(0);

    // open the inbox
    window.location.href = link;
}
else {
    // otherwise we're not logged in.  autologinJ should do that for us.
}
