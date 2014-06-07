// ==UserScript==
// @name           Gmail Forward & Reply Buttons
// @namespace      http://www.istop.com/~scrook/greaseMonkeyScripts
// @description    Add a "Reply" and "Forward" button to Gmail's interface. (Applies to lastest email thread only)
// @include        http*://mail.google.com/*
// ==/UserScript==
//
// Version 1.0.0: Conception. 
//
// --------------------------------------------------------------------
// Originally written by Shawn Crook
// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.
// When distributing this original script or any script based on this
// code on the web, a link to the homepage (URL in namespace above) is
// required.
// --------------------------------------------------------------------
//

function findPosX(obj) {
 var curleft = 0;
 if(obj.offsetParent) {
  while(true) {
   curleft += obj.offsetLeft;
   if(!obj.offsetParent) {
    break;
   }
   obj = obj.offsetParent;
  } 
 } else if(obj.x) {
  curleft += obj.x;
 }
 return curleft;
}

function findPosY(obj) {
 var curtop = 0;
 if(obj.offsetParent) {
  while(true) {
   curtop += obj.offsetTop;
   if(!obj.offsetParent) {
    break;
   }
   obj = obj.offsetParent;
  }
 } else if(obj.y) {
  curtop += obj.y;
 }
 return curtop;
}

function getLastElement(type, id) {
 var lastElement = document.getElementById(id);
 var elements = document.getElementsByTagName(type);
 for (i=0; i < elements.length; i++) {
  if (elements[i].id.indexOf(id) == 0) {
   if (findPosY(elements[i]) > findPosY(lastElement)) {
    lastElement = elements[i];
   }
  }
 }
 return lastElement;
}

function fire(targetType,targetId) {
  fireOnThis = getLastElement(targetType,targetId);
  if (fireOnThis != null) {
    var newX = findPosX(fireOnThis);
    var newY = findPosY(fireOnThis);
    var evObj = document.createEvent('MouseEvents');
    evObj.initMouseEvent("mousedown",true,true,document.defaultView,Event.CLICK, newX, newY, 0, 0, false, false, false, false, 0, null);
    fireOnThis.dispatchEvent(evObj);
  }
}

function reply(recursive) {
 if (recursive) {
  forward(false);
 }
 fire("td","sm_2");
}

function forward(recursive) {
 if (recursive) {
  reply(false);
 }
 fire("td","sm_4");
}

function createBut(label, func) {
 var butt = document.createElement('BUTTON');
 butt.className = "ab";
 butt.addEventListener('click',func,false)
 var buttext = document.createTextNode(label);
 butt.appendChild(buttext);
 return butt;
}

var span = document.getElementById("bk");
if (span != null) {
var divs = document.getElementsByTagName("div");
for (i=0; i < divs.length; i++) {
 if (divs[i].className.indexOf("tbcb") == 0) {
  divs[i].appendChild(createBut("Reply",reply));
  divs[i].appendChild(createBut("Forward",forward));
 }
}
}
