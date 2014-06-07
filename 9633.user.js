// ==UserScript==
// @name            Facebook Remove Event
// @namespace       
// @description     Automatically confirms removing an event
// @include         http://*.facebook.com/events.php?remove*
// ==/UserScript==

if( (document.forms[1].method=="post") && (document.forms[1].action.search("events.php") != -1) ) {

x=document.getElementById("remove");
x.click();

}