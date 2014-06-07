// ==UserScript==
// @name           FBPTSTHider
// @namespace      Milad
// @description    Hides the people to subscribe to Section of facebook
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @require        http://code.jquery.com/jquery-latest.js
// @version 0.1
// ==/UserScript==
$("div.ego_section:contains('People To Subscribe To')").css("display", "none");	