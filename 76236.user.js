// ==UserScript==
// @name           Facebook app zapper
// @namespace      http://userscripts.org/users/127643
// @description    Remove annoying posts from facebook apps.
// @include        http://www.facebook.com/*
// @author         John Green
// @version        1.0
// ==/UserScript==


// blacklist is just a list of the ids of the apps you want to block. You can
// easily add your own to the list.
blacklist = [2389801228,   //Texas HoldEm Poker 
             138045074609, //Jewel Quest Challenge
             10979261223,  //Mafia Wars
             101198368965, //PlacePop
             102452128776, //Farmville
             64571521476]; //Farkle
for (i=0; i<blacklist.length; i++) {
    GM_addStyle(".aid_" + blacklist[i] + "{display: none}");
}

