// ==UserScript==
// @name        okcupid_relationship_status_warning
// @namespace   gleske.net
// @include     http://www.okcupid.com/profile/*
// @version     1.0
// ==/UserScript==

if ($("ajax_status").innerHTML=="Seeing someone"){
  $("ajax_status").style.backgroundColor="#ff9b9b";//light red
}