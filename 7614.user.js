// modified platypus script
// Modified by Lisa Cho
// 2007-02-19
// Released to the public domain.
//
// ==UserScript==
// @name          Reality Check
// @description   Makes specified pages invisible except for specific period at the start of each hour.
// @include       http://*.friendster.com/
// @include       http://mail.google.com/*
// @include       http://*.hotmail.com/*
// @include       http://*.yahoo.com/*
// @include       http://*.bebo.com/*
// @include       http://www.blogger.com/*
// @include       http://*.facebook.com/*
// @include       http://*.blogspot.com/
// @include       http://*.myspace.com/*
// @include       http://*.livejournal.com/*

// ==/UserScript==
//
// ==RevisionHistory==
// Version 0.1:
// Released: 2007-02-19.
// (Reality Check) Initial release.



function do_script() {
               alert("Do you know who you are?");
}; // Ends do_script
window.addEventListener("load", function() { do_script() }, false);
