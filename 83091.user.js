// ==UserScript==
// @name           DisableWhoToFollow
// @namespace      http://www.nextword.net/gm/
// @description    Disable "Who to follow" of Twitter
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// @author         http://twitter.com/brecht
// ==/UserScript==

var theElm = document.getElementById("recommended_users");
var ParentNode = theElm.parentNode;
ParentNode.removeChild(theElm);