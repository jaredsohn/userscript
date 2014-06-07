// ==UserScript==
// @name        RTM Hide by Default
// @namespace     none
// @description   Hide by Default RTM Panel
// @include	http://mail.google.com/mail/*
// @include	https://mail.google.com/mail/*
// @include	http://mail.gmail.com/mail/*
// @include	https://mail.gmail.com/mail/*
// @include	http://mail.gmail.com/*
// @include	https://mail.gmail.com/*
// ==/UserScript==

function getRTM(){
var rtmh = document.getElementById('rtm-tasks-column');
rtmh.style = "width: 200px; display: none;";
}

getRTM();