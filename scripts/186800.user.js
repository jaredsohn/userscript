// ==UserScript==
// @name Remove chatango IP
// @namespace http://ttsda.cc
// @include http://*.chatango.com/*
// @version     1.0
// ==/UserScript==

GM_addStyle(".msg-ip {visibility: hidden} .msg-ip:after {visibility: visible; content: 'CENSORED'}")