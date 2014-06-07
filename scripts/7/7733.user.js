// ==UserScript==
// @name           Facebook Birthdays Emphasizer
// @namespace      http://goodevilgenius.blogspot.com/2006/11/facebook-script.html
// @description    Moves Birthdays on Facebook home page to top and enlarges text
// @include        http://*facebook.com/home*
// ==/UserScript==

function getNodeByClass(className){var tags=document.getElementsByTagName("*");for(var i=0;i<tags.length;i++){child=tags[i];if(child.className.indexOf(className)!=-1){return child;}}}function moveEnlarge(node){var home=document.getElementById("home_main");node.parentNode.removeChild(node);home.insertBefore(node,home.firstChild);node.style.width=document.defaultView.getComputedStyle(home,"").width;node.style.fontSize="2em";}var events=getNodeByClass('events');if(events){moveEnlarge(events);}var birthdays=getNodeByClass('birthdays');if(birthdays){moveEnlarge(birthdays);}