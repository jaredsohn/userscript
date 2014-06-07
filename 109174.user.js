// ==UserScript==
// @name           Fuck Bitches Get Money buttons for Formspring
// @description    Changes the "Home" button on formspring.me to "Fuck Bitches Get Money."
//                 Why? Because someone wanted to be ballin' every day.
// @author         Anonymous
// @include        http://*formspring.me/*
// @version        1.15
// ==/UserScript==

var homieButton = document.getElementById("main").getElementsByTagName("li")[0].firstChild.firstChild;
var InboxButton = document.getElementById("main").getElementsByTagName("li")[1].firstChild.firstChild;

if (homieButton.nodeValue == 'Home') {
    homieButton.nodeValue = 'Fuck Bitches';
}

if (InboxButton.nodeValue == 'Inbox ') {
    InboxButton.nodeValue = 'Get Money ';
}
