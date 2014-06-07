// ==UserScript==
// @name           NetEZ boards
// @namespace      http://www.dlugosz.com
// @description    Widen to screen size
// @include        http://netez.com/bbs/viewtopic.php*
// @include        http://netez.com/bbs/posting.php*
// ==/UserScript==

GM_log ("I'm here! 1");

var xpath= "TABLE[@align='center' and not(contains(@width,'%'))]";
var n= document.evaluate (xpath, document.body, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
if (!n) {
   GM_log ("did not find " + xpath);
   return;
   }
GM_log ("I'm here! 2");

n.setAttribute ("modified", "true");
n.removeAttribute ("width");
n.style.marginLeft= "1em";
n.style.marginRight= "1em";

// any input fields?
xpath= "//TEXTAREA[@name='message']";
n= document.evaluate (xpath, document.body, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
if (n) {
   n.setAttribute ("modified", "true");
   n.style.width= "";
   n.setAttribute ("cols", "80");
   while (n.tagName != "TABLE")  n=n.parentNode;
   n.setAttribute ("modified", "true");
   n.removeAttribute ("width");
   }