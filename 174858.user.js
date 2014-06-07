// ==UserScript==
// @name          feedly Plus
// @namespace      JuestChaOS
// @description    Change your feedly Reader interface easier to use.
// @version        1.0.2
// @history (1.0.2)fix UI: let the "jump to Next" button visible
// @history (1.0.1)fix UI: On list mode keep the "jump to Previous" button size same as others
// @history (1.0.0)New function:Add "jump to Previous" button for go back bewteen different feeds
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @include        htt*://cloud.feedly.com/*
// @run-at document-end
// ==/UserScript==

$(function(){
setTimeout(function() {
var postion1 = document.getElementById('pageActionRefresh');
var logo = document.createElement("img");
logo.setAttribute("title","Jump to Previous");
logo.setAttribute("style","-webkit-transform: rotate(180deg);");
logo.setAttribute("class","pageAction requiresLogin");
logo.setAttribute("data-app-action","jumpToPrevious");
logo.setAttribute("src","http://s3.feedly.com/production/16.0/images/icon-action-next.png");
logo.setAttribute("width","24");
logo.setAttribute("height","24");
logo.setAttribute("border","0");
postion1.nextSibling.setAttribute("style","dispaly:inherit");
postion1.parentNode.insertBefore(logo,postion1.nextSibling);
   
var postion2 = document.getElementById('floatingPageActionRefresh');
var logo2 = document.createElement("img");
logo2.setAttribute("title","Jump to Previous");
logo2.setAttribute("style","-webkit-transform: rotate(180deg);");
logo2.setAttribute("class","pageAction requiresLogin");
logo2.setAttribute("data-app-action","jumpToPrevious");
logo2.setAttribute("src","http://s3.feedly.com/production/16.0/images/icon-action-next.png");
logo2.setAttribute("width","18");
logo2.setAttribute("height","18");
logo2.setAttribute("border","0");
postion2.nextSibling.setAttribute("style","dispaly:inherit");
postion2.parentNode.insertBefore(logo2,postion2.nextSibling);
     }, 3000);
});