// ==UserScript==
// @name           Amazon Smile Redirect
// @namespace      com.scorcheduniverse
// @description    Always redirects links the smile.amazon.com domain
// @include        http://amazon.com/*
// @include        http://www.amazon.com/*
// ==/UserScript==

window.location.host = "smile.amazon.com"