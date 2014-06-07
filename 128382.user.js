// ==UserScript==
// @name           Google Reader Compact For Small Screen WO Style Changes
// @namespace      http://userscripts.org
// @description    Reduces margins on the new Google Reader layout, Changes link colors to something legible, add visible box around post, hide top header and navigation bar, hide feed title (Push 'W' to show header and navigation bar )
// @include        http*://www.google.*/reader/*
// @version        1.2.4
// ==/UserScript==

GM_addStyle("#top-bar {display: none;}");
GM_addStyle("#gb {display: none;}");
GM_addStyle("#title-and-status-holder {display: none;}");



 function KeyDownEvent(event) {
   element = event.target;
   elementName = element.nodeName.toLowerCase();
   if (elementName == "input") {
     userIsTyping = (element.type == "text" || element.type == "password");
   } else {
     userIsTyping = (elementName == "textarea");
   }
   if (userIsTyping) return true;
   if (String.fromCharCode(event.which) == "W" && !event.ctrlKey && !event.altKey && !event.metaKey) {
     toggle_visibility();
     try {
       event.preventDefault();
     } catch (e) {
     }
     return false;
   }
   return true;
 }

function toggle_visibility ()
{
   var is_visible = document.getElementById("top-bar").style.display != "none";

   document.getElementById('top-bar').style.display = is_visible?"none":"block";
   document.getElementById('gb').style.display = is_visible?"none":"block";
   document.getElementById('title-and-status-holder').style.display = is_visible?"none":"block";
}

 document.addEventListener("keydown", KeyDownEvent, false);
 toggle_visibility();