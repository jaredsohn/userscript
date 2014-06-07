// ==UserScript==
// @name          Twitter Auto Follower
// @namespace     http://userscripts.org/users/394460
// @description   Automatically follow twitter user
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @include       http://www.twitter.com/*
// @include       https://www.twitter.com/*
// ==/UserScript==


var macro;
macro =  "CODE:";
macro +=  "VERSION BUILD=8300326 RECORDER=FX" + "\n"; 
macro +=  "TAB T=1" + "\n"; 
macro +=  "TAG POS=2 TYPE=BUTTON ATTR=TXT:Follow<SP>Following<SP>Unfollow<SP>Blocked<SP>Unblock<SP>Pen*" + "\n"; 
iimPlay(macro)