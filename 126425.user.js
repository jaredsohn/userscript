// ==UserScript==
// @name           addGallery
// @namespace      chrysalides
// @description    Adds Gallery Link on top
// @include        http://www.geocaching.com/my/*
// ==/UserScript==

var elem, newelem;
var userid;

// Get the user guid from Trackables (Yours)

elem = document.getElementById("ctl00_hlSubNavTrackablesYours");
if (!elem) return;
userid = elem.href;
userid = userid.substr(userid.indexOf("uid=") + 4);
if (userid.length != 36) return;

// Find "Your Account Details" anchor

elem = document.getElementById("ctl00_ContentBody_MyAccountTabControl1_hlYourAccountDetails");
if (!elem) return;

// Append "Your Gallery" to the end

elem.parentNode.appendChild(document.createTextNode(" | "));
newelem = document.createElement("A");
newelem.title = "Your Gallery";
newelem.href = "http://www.geocaching.com/profile/gallery.aspx?guid=" + userid;
newelem.appendChild(document.createTextNode("Your Gallery"));
elem.parentNode.appendChild(newelem);