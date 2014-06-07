// ==UserScript==
// @name          t.co Bypasser
// @namespace     http://www.technoticraccoon.com
// @description      Bypasses the t.co shortner on twitter
// @include       http://twitter..com/*
// @include       https://twitter..com/*
// ==/UserScript==


void(function(){document.addEventListener("mousedown", tcoToLinkTitleURL, true); function tcoToLinkTitleURL(ev) { var target = ev.target; if(/^http:\/\/t.co\//.test(target.href)) target.href=target.title; } }());