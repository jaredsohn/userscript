// ==UserScript==
// @name Resurrect Google Cache & Related links.
// @version 1.1
// @author Mikha (based mostly Jefferson Scher GSM code)
// @namespace
// @description Restore Google Cache & "Related" links and Hide Instant Preview
// @include http://*.google.*
// @include https://*.google.*
// @include https://www.ggssl.com/search*
// @include https://www.ggssl.com/webhp*
// ==/UserScript==

var c=document.createElement("style"); 
c.setAttribute("type", "text/css"); 
c.appendChild(document.createTextNode(".action-menu .clickable-dropdown-arrow {display:none !important;} .action-menu-panel, .action-menu-panel ul, .action-menu-item {display:inline !important; visibility: visible !important; border:none !important; box-shadow:none !important; background-color:transparent !important; margin:0  !important; padding:0 !important; top:0 !important; height:auto !important; line-height:auto !important;} .action-menu-item a.fl {padding:0 6px !important; display:inline !important;} .action-menu-panel {position:static;} .action-menu-item a.fl:hover {text-decoration:underline !important;}")); 
document.body.appendChild(c);



