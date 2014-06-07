// ==UserScript==
// @id             WideScreenBiblia
// @name           Biblia Wide Screen Support
// @version        1.2
// @namespace      http://*biblia.com/*
// @author         Nicholas van Oudtshoorn
// @description    Remove the wasted horizontal space in biblia
// @include        http://*biblia.com/*
// @run-at         document-end
// ==/UserScript==
var widescreenli = document.createElement('li');
widescreenli.innerHTML = "<span id='widescreentoggle' style='cursor:pointer; margin-top: -4px !important; padding: 0 4px;'>Toggle Width</span>";
var ns = document.createElement('li');
ns.setAttribute("class", "separator");
ns.innerHTML = "•";

var firstseparator = document.getElementsByClassName('separator')[0];
var rightlinks = firstseparator.parentNode;
rightlinks.insertBefore(widescreenli, firstseparator);
rightlinks.insertBefore(ns, widescreenli);


var widescreenstyle = document.createElement('style');
widescreenstyle.id = "widescreenbiblia";
widescreenstyle.innerHTML = "";
var headID = document.getElementsByTagName("head")[0];
headID.appendChild(widescreenstyle);

widescreenli.addEventListener('click', function() {    
  var styleEl = document.getElementById('widescreenbiblia');
  if (styleEl.innerHTML == "") {
    localStorage['bibliawidescreenstatus'] = 'active';
    styleEl.innerHTML = "#account-header {padding:2px 12px 0 !important;} #logo {display: none !important;} #main {top: 22px !important;} #wrapper { max-width:none !important;}";
  } else {
    localStorage['bibliawidescreenstatus'] = 'default';
    styleEl.innerHTML = "";
  }
// Toggle the event
  var evt = document.createEvent("Event");
  evt.initEvent('TOGGLE_RESIZE', true, true);  
  var widescreentoggle = document.getElementById("widescreentoggle");
  widescreentoggle.dispatchEvent(evt); 
  
}, false);

if (localStorage['bibliawidescreenstatus'] == "active") {
  var sevt = document.createEvent("MouseEvents");
  sevt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  widescreenli.dispatchEvent(sevt);
}