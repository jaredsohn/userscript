// ==UserScript==
// @name          	Facebook SideBar Remover
// @namespace         
// @description   	Remove the new sidebar added by facebook.
// @author              www.doo1987.com
// @license             GPL3+ (http://www.gnu.org/copyleft/gpl.html)
// @version             1.0
// @include       	http://*.facebook.com/*
// @include       	https://*.facebook.com/*
// ==/UserScript==

var d1=document.getElementById("pagelet_ticker").parentNode;
var d2=document.getElementById("pagelet_ticker");
d2.setAttribute("style","display:none;");
d1=document.getElementById("uiScrollableArea ticker_container fade contentAfter").parentNode;
d2=document.getElementById("uiScrollableArea ticker_container fade contentAfter");
d2.setAttribute("style","display:none;");

d1=document.getElementById("pagelet_rhc_ticker").parentNode;
d2=document.getElementById("pagelet_rhc_ticker");
d2.setAttribute("style","display:none;");
d1=document.getElementById("fbChatSidebarBody").parentNode;
d2=document.getElementById("fbChatSidebarBody");
d2.removeAttribute("style");
d2.setAttribute("style","height:100%;");
