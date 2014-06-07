// ==UserScript==
// @name           Biblia SidePanel Tweaks
// @description    Allows hiding the biblia sidebar
// @namespace      http://*biblia.com/*
// @include        http://*biblia.com/*
// ==/UserScript==

var toggler = document.createElement("div");
toggler.setAttribute("style", "width: 7px; border-radius: 5px 0 0 5px; height: auto; top: 8px; bottom: 8px; position: absolute; left: -5px; background: #514F50;");
toggler.setAttribute("id", "toggler");
var mainEl    = document.getElementById("main");
var sideBarEl = document.getElementById("sidebar");
mainEl.insertBefore(toggler, sideBarEl);

var sideBarOEl = document.getElementById("sidebar-offset");
sideBarOEl.setAttribute("style", "-moz-border-radius-topleft: 5px; -webkit-border-top-left-radius: 5px; border-top-left-radius: 5px;");

toggler.addEventListener("click", function() {
  var sideBarEl = document.getElementById("sidebar");
  var contentEl = document.getElementById("content-container");
  var logoEl = document.getElementById("logo");
    
  if (sideBarEl.style.width == "0px") { 
    localStorage['bibliasidepanelstatus'] = 'visible';
    sideBarEl.style.width="230px";
    sideBarEl.style.visibility="visible";
    contentEl.style.left="230px";
    logoEl.style.margin="4px 8px 0pt";
  } else {
    localStorage['bibliasidepanelstatus'] = 'hidden';
    sideBarEl.style.width="0px";
    sideBarEl.style.visibility="hidden";
    contentEl.style.left="2px";
    logoEl.style.margin="2px 8px 0pt";
  }

// Toggle the event
  var evt = document.createEvent("Event");
  evt.initEvent('TOGGLE_RESIZE', true, true);  
  var toggler = document.getElementById("toggler");
  toggler.dispatchEvent(evt); 
  
}, true);

if (localStorage['bibliasidepanelstatus'] == "hidden") {
  var sevt = document.createEvent("MouseEvents");
  sevt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  toggler.dispatchEvent(sevt);
}
