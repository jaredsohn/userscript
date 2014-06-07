// ==UserScript==
// @name           PTP Bottom Breadcrumb Trail
// @namespace      http://userscripts.org/scripts/show/120993
// @description    Adds a breadcrumb trail at the bottom of threads
// @include        http*://*passthepopcorn.me/forums.php?*action=viewthread*
// ==/UserScript==

var breadcrumb = document.body.getElementsByClassName('thin')[0].getElementsByTagName("h2")[0];
var linkbox = document.body.getElementsByClassName('linkbox')[1];

if(breadcrumb && linkbox)
{

   var botbreadcrumb = document.createElement("div");

   botbreadcrumb.setAttribute("align","right");

   botbreadcrumb.setAttribute("style","font-weight:700;font-size:1.1em;margin-top:15px;");

   botbreadcrumb.innerHTML = breadcrumb.innerHTML;

   linkbox.appendChild(botbreadcrumb);

}