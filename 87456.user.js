// ==UserScript==
// @name           ChangeOrangeredColor
// @description    Change Reddit.com orangered envelope color to be easier to see for color blind people
// @namespace      http://reddit.com
// @include        http://*reddit.com/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

$("#mail.havemail > img").attr("src", "http://i.imgur.com/5jumU.png");
