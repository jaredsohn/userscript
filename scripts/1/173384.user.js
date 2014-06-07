// ==UserScript==
// @name        Fix security warning for Microsoft Live login
// @namespace   http://login.live.com
// @description Microsoft's account login site (login.live.com) submits form data from a HTTPS site to a HTTP site, which triggers a warning in FireFox.  This script forces login.live.com to submit the form securely, which will prevent this warning.
// @include     https://login.live.com/*
// @grant       none
// @version     1.0
// ==/UserScript== 

var link;

link = document.body.getElementsByTagName("form")

for (var i = 0; i < link.length; i++) {
    link[i].action = link[i].action.replace('http://','https://')
}