// Greasemonkey user script - Multiline Tooltip Enabler
//
// Version 1.0
// Created by Magnus Brading, 2006
//
// This script enables support for multiline tooltips in Firefox,
// (i.e. making it display title-attributes of links and span tags just
// like in Internet Explorer). This is for some stupid anally-standard-
// conforming reason not working in Firefox, which messes up the usability
// for lots of pages.
//
//
// This script builds on the work of Michael Tandy and his "Plastic Tooltip"
// Greasemonkey script, which did in turn build on the work of Gareth Simpson's
// 'Nice Titles in Greasemonkey' script, which did in TURN build on Stuart
// Langridge's 'Nice Titles' script. Neither of these works or are updated anymore.
//
// The main changes are:
//  * Modified to work with Firefox 1.5
//  * Added support for titles in span tags too (i.e. now supports span, a and ins tags)
//  * Style of tooltips was changed to resemble standard tooltips
//  * Scope was changed to all sites
//  * Cleaned up the code
//
// ==UserScript==
// @name            Multiline Tooltip Enabler
// @namespace       http://www.magnusbrading.com
// @description     Enables support for multiline tooltips in Firefox (works in Firefox 1.5+)
// @include         *
// ==/UserScript==
(function () {

	makeNiceTitles();

})();

//var XHTMLNS = "http://www.w3.org/1999/xhtml";
var CURRENT_NICE_TITLE;
var evt;
var tmr;
var tempTags;

function makeNiceTitles()
{
   if(!document.createElement || !document.getElementsByTagName)
      return;

   //Fixing titles in a-tags
   tempTags = document.getElementsByTagName("a");
   for (var ti=0; ti<tempTags.length; ti++)
   {
      var lnk = tempTags[ti];
      if (lnk.title)
      {
         lnk.setAttribute("nicetitle", lnk.title);
         lnk.removeAttribute("title");
         addEvent(lnk, "mouseover", showNiceTitle);
         addEvent(lnk, "mouseout", hideNiceTitle);
         addEvent(lnk, "focus", showNiceTitle);
         addEvent(lnk, "blur", hideNiceTitle);
      }
   }

   //Fixing titles in span-tags
   tempTags = document.getElementsByTagName("span");
   for (var ti=0; ti<tempTags.length; ti++)
   {
      var spn = tempTags[ti];
      if (spn.title)
      {
         spn.setAttribute("nicetitle", spn.title);
         spn.removeAttribute("title");
         addEvent(spn, "mouseover", showNiceTitle);
         addEvent(spn, "mouseout", hideNiceTitle);
         addEvent(spn, "focus", showNiceTitle);
         addEvent(spn, "blur", hideNiceTitle);
      }
   }

   //Fixing titles for ins-tags
   var instags = document.getElementsByTagName("ins");
   if (instags)
   {
      for (var ti=0; ti<instags.length; ti++)
      {
         var instag = instags[ti];
         if (instag.dateTime)
         {
            var strDate = instag.dateTime;
            var dtIns = new Date(strDate.substring(0,4), parseInt(strDate.substring(4,6)-1), strDate.substring(6,8), strDate.substring(9,11), strDate.substring(11,13), strDate.substring(13,15));
            instag.setAttribute("nicetitle", "Added on " + dtIns.toString());
            addEvent(instag, "mouseover", showNiceTitle);
            addEvent(instag, "mouseout", hideNiceTitle);
            addEvent(instag, "focus", showNiceTitle);
            addEvent(instag, "blur", hideNiceTitle);
         }
      }
   }  
}

function findPosition(oLink)
{
   if(oLink.offsetParent)
   {
      for(var posX = 0, posY = 0; oLink.offsetParent; oLink = oLink.offsetParent)
      {
         posX += oLink.offsetLeft;
         posY += oLink.offsetTop;
      }
      return [posX, posY];
   }
   else
   {
      return [oLink.x, oLink.y];
   }
}

function clearTimer()
{
   if(tmr != null)
   {
      clearTimeout(tmr);
      tmr = null;
   }
}

function showNiceTitle(ex)
{
   evt = ex;
   clearTimer();
   tmr = window.setTimeout(showNiceTitle2, 300);
}

window.showNiceTitle2 = function ()
{
   if(CURRENT_NICE_TITLE)
      hideNiceTitle(CURRENT_NICE_TITLE);
   if(!document.getElementsByTagName)
      return;
   if(window.event && window.event.srcElement)
   {
      lnk = window.event.srcElement;
   }
   else
   {
      if(evt && evt.target)
      {
         lnk = evt.target;
      }
   }
   if(!lnk)
      return;
   if(lnk.nodeType == 3)
   {
      // lnk is a textnode -- ascend parents until we hit a link
      lnk = getParent(lnk, "A", "SPAN");
   }
   if (!lnk)
      return;
   nicetitle = lnk.getAttribute("nicetitle");  // Gets the link title
    
//   var baseStyle = "background-color:#aaa;position: absolute;z-index:999;padding: 7px;top: 0px;left: 0px;color: white;font-size: 13px;font-family: Verdana, Helvetica, Arial, sans-serif;width: 25em;font-weight: bold;-moz-border-radius: 10px;opacity:.9;"
//   var baseStyle = "background-color:#EEEEEE;position: absolute;z-index:999;padding: 7px;top: 0px;left: 0px;color: black;font-size: 13px;font-family: Geneva,Arial,Helvetica,sans-serif;opacity:.9;border-style: solid;border-color: #E0E0E0;border-width: 1px"
   var baseStyle = "background-color:#FFFFCC;position: absolute;z-index:999;padding: 4px;top: 0px;left: 0px;color: black;font-size: 11px;font-family: Geneva,Arial,Helvetica,sans-serif;opacity:1;border-style: solid;border-color: #000000;border-width: 1px";

   var pStyle = "margin: 0;";
   // var destStyle = "font-size:9px;text-align: left;padding:0;";
    
   var d = document.createElement("div");  // Create a <div>
   //d.className = "nicetitle";			
   d.setAttribute("style", baseStyle);  // Set it's style to baseStyle
   tnt = document.createTextNode(nicetitle);  // Create a node of text containing title
   pat = document.createElement("p");  // Create a <p></p> block
   pat.setAttribute("style",pStyle);  // Style the <p></p> block with pStyle (it also inherits baseStyle)
   pat.className = "titletext";  // give the <p></p> a class
   pat.appendChild(tnt);  // Put the title text into the <p></p> block
   d.appendChild(pat);  // put the <p></p> block into the <div>

   //if (lnk.href) {
   //    tnd = document.createTextNode(lnk.href);
   //    pad = document.createElement("p");	// This code would be inserting the URL
   //    //pad.className = "destination";		// but it's commented out.
   //		    pad.setAttribute("style",destStyle);
   //    pad.appendChild(tnd);
   //    d.appendChild(pad);
   //}
    
   STD_WIDTH = 275;  // This code is setting the box width...
   w = STD_WIDTH;

   //if (lnk.href) {
   //    h = lnk.href.length;
   //} else { h = nicetitle.length; }  // If you uncomment this code, the box
   //if (nicetitle.length) {  // will dynamically resize with it's contents
   //  t = nicetitle.length;
   //}
   //h_pixels = h*6; t_pixels = t*10;
   //
   //if (h_pixels > STD_WIDTH) {
   //    w = h_pixels;
   //} else if ((STD_WIDTH>t_pixels) && (t_pixels>h_pixels)) {
   //    w = t_pixels;
   //} else if ((STD_WIDTH>t_pixels) && (h_pixels>t_pixels)) {
   //    w = h_pixels;
   //} else {
   //    w = STD_WIDTH;
   //}

   d.style.width = w + 'px';    

   /*
   mx = lnk.offsetLeft;
   my = lnk.offsetTop;
   */
   mpos = findPosition(lnk);
   mx = mpos[0];
   my = mpos[1];
   //xy = getMousePosition(e);
   //mx = xy[0]; my = xy[1];
   
   d.style.left = (mx-15) + 'px';  // Sets left offset
   d.style.top = (my+20) + 'px';  // Sets top offset
   if (window.innerWidth && ((mx+w) > window.innerWidth))
   {
      d.style.left = (window.innerWidth - w - 25) + "px";
   }
   if (document.body.scrollWidth && ((mx+w) > document.body.scrollWidth))
   {
      d.style.left = (document.body.scrollWidth - w - 25) + "px";
   }
    
   document.getElementsByTagName("body")[0].appendChild(d);
    
   CURRENT_NICE_TITLE = d;
}

function hideNiceTitle(e)
{
   clearTimer();
   if (!document.getElementsByTagName)
      return;
   if (CURRENT_NICE_TITLE)
   {
      document.getElementsByTagName("body")[0].removeChild(CURRENT_NICE_TITLE);
      CURRENT_NICE_TITLE = null;
   }
}

// Add an eventListener to browsers that can do it somehow.
// Originally by the amazing Scott Andrew.
function addEvent(obj, evType, fn)
{
   if(obj.addEventListener)
   {
      obj.addEventListener(evType, fn, true);
      return true;
   }
   else
   {
      if (obj.attachEvent)
      {
         var r = obj.attachEvent("on"+evType, fn);
         return r;
      }
      else
      {
         return false;
      }
   }
}

function getParent(el, pTagName1, pTagName2)
{
   if (el == null)
      return null;
   else
      if(el.nodeType == 1 && (el.tagName.toLowerCase() == pTagName1.toLowerCase() || el.tagName.toLowerCase() == pTagName2.toLowerCase()))  // Gecko bug, supposed to be uppercase
         return el;
      else
         return getParent(el.parentNode, pTagName1, pTagName2);
}

function getMousePosition(event)
{
   x = event.clientX + window.scrollX;
   y = event.clientY + window.scrollY;
   return [x,y];
}
