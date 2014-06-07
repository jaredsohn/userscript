// ==UserScript==
// @name           Facebook auto-login
// @namespace      facebook.com
// @version        1.1 Support for secure login
// @version        1.0 Should work on all login pages
// @description    Automatically logs in to facebook - if password is remembered by firefox
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

if (document.getElementById("pass")) if (document.getElementById("pass").value) if (typeof(document.getElementById("pass").parentNode.parentNode.submit) == "function") document.getElementById("pass").parentNode.parentNode.submit(); else document.getElementById("pass").parentNode.parentNode.parentNode.submit();