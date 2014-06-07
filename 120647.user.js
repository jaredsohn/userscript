// ==UserScript==
// @name           Google Reader W Top Bars Hider.
// @namespace      MRACHINI
// @description    Press "W" to show or hide the top bars in google reader.
// @include        http*://www.google.*/reader/*
// @version        201201251550
// ==/UserScript==

GM_addStyle("#top-bar {display: none;}");
GM_addStyle("#gb {display: none;}");
GM_addStyle("#title-and-status-holder {display: none;}");
//GM_addStyle("#viewer-header{display: none;}");
GM_addStyle("#lhn-add-subscription-section{display: none;}");

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
 
var is_visible;
function toggle_visibility (){
	if(is_visible == "block"){
		is_visible = "none";
	}else if(is_visible != "block"){
		is_visible = "block";
	}
	document.getElementById('top-bar').style.display = is_visible;
	//document.getElementById('viewer-header').style.display = is_visible;
	document.getElementById('lhn-add-subscription-section').style.display = is_visible;
	document.getElementById('gb').style.display = is_visible;
	document.getElementById('title-and-status-holder').style.display = is_visible;
}
document.addEventListener("keydown", KeyDownEvent, false);