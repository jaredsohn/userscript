// ==UserScript==
// @name        WoEChatClopHack
// @namespace   WoEChat
// @include     http://worldofequestria.pl/*
// @version     2
// @author Chiredan
// ==/UserScript==


// Add woeDiceScript
window.onload = function() {
   var a = document.getElementById("uiButtons")
   var link = document.createElement('a'); 
   link.setAttribute('href', '#');
   link.setAttribute('data-id', '/public/clop');
   link.setAttribute('name', 'Clop Room');
   link.setAttribute('onclick',"WoE.Chat.changeChannel($(this).attr('data-id')); return false;");
   var linkText = document.createTextNode("Clop Room");
   link.appendChild(linkText);
   a.appendChild(link)

};
