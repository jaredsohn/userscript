// ==UserScript==
// @name           Kongregate Auto Login
// @namespace      Kongregate
// @description    Automatically Logs into Kongregate if credentials are saved.
// @include        http://*.kongregate.com/*
// @include        http://kongregate.com/*
// ==/UserScript==

if( document.getElementById("welcome_box_sign_in_button") )
  document.getElementById( "welcome_box_sign_in_button" ).click();