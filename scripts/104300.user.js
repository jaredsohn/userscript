// ==UserScript==
// @name           Simutronics Quick Redirect
// @namespace      http://www.play.net/bounce/*
// @description    Skips the 15 seconds and goes straight to the link
// @include        http://www.play.net/bounce/*
// ==/UserScript==

window.location.href = window.location.href.replace(/^http:\/\/www\.play\.net\/bounce\/redirect\.asp\?URL=/, "");