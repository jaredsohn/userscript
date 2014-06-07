// ==UserScript==
// @name           Bungie Timestamp
// @author         PKF 647
// @namespace      http://www.bungie.net/
// @version        1.0.0
// @description    Automatically Adds Timestamps to Forum Posts And Private Messages
// @include        http://*.bungie.net/Forums/*
// @include        http://*.bungie.net/account/*
// @include        http://*.bungie.net/fanclub/*
// ==/UserScript==
now = new Date();
localtime = now.toString();
utctime = now.toGMTString();
var zTextFields = document.getElementsByTagName("textarea");
for (var i=0; i<zTextFields.length; i++) {
  thefield=zTextFields[i].name;
  if (!thefield) thefield=zTextFields[i].id;
  // Set up your auto-fill values here
  if (thefield == "ctl00$mainContent$postForm$skin$body") zTextFields[i].value="[b]Posted on: " + localtime + "[/b]";
  if (thefield == "ctl00$mainContent$messageForm$skin$body") zTextFields[i].value="[b]PM Sent: " + localtime + "[/b]";
}
