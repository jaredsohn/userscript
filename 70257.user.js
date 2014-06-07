// ==UserScript==
// @name           ImageHost.org - Remove Ad Popup
// @description    Removes an Annoying Full Page Ad Popup
// @include        http://*.imagehost.org/view/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @author         Christopher Haines
// @namespace      http://chrishaines.net
// @version        1.0
// ==/UserScript==
(function(){	//START jQuery CODE

  $("#dhtmlwindowholder").remove();

}());			//END jQuery CODE