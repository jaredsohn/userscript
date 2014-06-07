// ==UserScript==
// @name           HTTPS Adder
// @namespace      http://userscripts.org/users/129663
// @description    Add whatever sites you want in Greasemonkey preferences. Changes urls for any included pages to https (secure connection) enabling private connections over unencrypted networks
// @include        Add any url followed by *. Remove the <remove this> below for an example:
// @include        <remove this>http://www.facebook.com/*
// @include        <remove this>http://www.nytimes.com/*
// ==/UserScript==

loc = window.location + "";
loc = loc.replace(/http/,"https");
window.location = loc;