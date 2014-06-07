// ==UserScript==
// @name           New message alert
// @namespace      www.bungie.net
// @include        http://*bungie.net*
// @version   	   1
// ==/UserScript==
// ApocalypeX I'm cooler than you
var message_link = document.getElementsByClassName('list-db-messages').item(0);if(message_link.innerHTML.search("New Messages") >-1){message_link.setAttribute("style","text-decoration:blink;color:#FF6F00;");}