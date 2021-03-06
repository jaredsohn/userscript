// ==UserScript==
// @name           Google Calendar Views
// @namespace      userscripts.org
// @description    Have several calendars? Stop clicking and create views in Google's calendar application
// @include        http*://www.google.tld/calendar/*
// ==/UserScript==

///////////////////////////////////////////////////////////////
// Original script by no0n : http://userscripts.org/users/31489
// Modified by JHellings : http://userscripts.org/users/291091
///////////////////////////////////////////////////////////////

// Declare all of your checkboxes here
var work = "label-bnVueWV6QGdtYWlsLmNvbQ",
	appointments = "label-N2hhaHRiZGpnN2hxMXU2cmkzMDZpOXZ1c2dAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
	utilities = "label-bTY4ZmhwZGJkMm04amEzYTF2b2VuOTVvdGdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ";

var views = new Array();

// Make a new views[num] for each view you want
views[0] = {
	name: 'Work',
	items: [work, appointments]
};

views[1] = {
	name: 'Bills',
	items: [utilities]
};


// ====================================================================================
// Ignore the code below
// ====================================================================================
GM_addStyle("div.gm-gc-views-container {margin:8px 6px 0 0; padding:2px; background:#C3D9FF; -moz-border-radius:5px;}");
GM_addStyle("div.gm-gc-views-container h1 {font-size:13px; text-align:center;}");
GM_addStyle("div.gm-gc-views-inner {margin:0 1px; background:#fff; padding:4px;}");
GM_addStyle("div.gm-gc-views-link {padding:1px; margin:2px 0; -moz-border-radius:4px;}");
GM_addStyle("div.gm-gc-views-link:hover {background:#E8EEF7;}");
GM_addStyle("div.gm-gc-views-link span {text-decoration:underline; color:#112ABB; cursor:pointer;}");

createEl(
  {
    n: 'div',
    a: {'@class': 'gm-gc-views-container'},
    c: [
      {n: 'h1', a: {textContent: 'Views'}},
      {n: 'div', a: {'@id': 'gm-gc-views-inner', '@class': 'gm-gc-views-inner'}},
    ]
  },
  $('nav')
);

for (var i=0; i<views.length; i++) {	
	createEl(
    {
      n: 'div',
      a: {'@class': 'gm-gc-views-link'},
      c: [{
        n: 'span',
        a: {
          textContent: views[i].name
        },
        evl: {
          type: 'click',
          f: (function(n) {return function() {$v(views[n].items);}})(i),
          bubble: false
        } 
      },
      $('gm-gc-views-inner')]
    },
    $('gm-gc-views-inner'));
}

function createEl(elObj, parent) {
  var el;
  if (typeof elObj == 'string') {
     el = document.createTextNode(elObj);
  }
  else {
     el = document.createElement(elObj.n);
     if (elObj.a) {
        attributes = elObj.a;
        for (var key in attributes) if (attributes.hasOwnProperty(key)) {
           if (key.charAt(0) == '@')
              el.setAttribute(key.substring(1), attributes[key]);
           else 
              el[key] = attributes[key];
        }
     }
     if (elObj.evl) {
        el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);
     }
     if (elObj.c) {
        elObj.c.forEach(function (v, i, a) { createEl(v, el); });
     }
  }
  if (parent)
     parent.appendChild(el);
  return el;
}

function $v(ids) {

	var selectedCalendars = $x("//div[@class='calListLabel-sel']/parent::div/parent::div");

  var selCalIds = [];
	for (var i=0; i<selectedCalendars.length; i++) {
		selCalIds.push( selectedCalendars[i].id );
	}
	
	for (var i=0; i<selCalIds.length; i++) {
		simulateClick( $(selCalIds[i]) );
	}
	
	for (var i=0; i<ids.length; i++) { // ITERATE OUR VIEW
		simulateClick( $(ids[i]) );
	}
}

function simulateClick( el ) {

  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("mousedown", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
  var result = el.dispatchEvent(evt);
}

function $(id) {
	return document.getElementById(id);
}

function $x(p, context) {
  if (!context) context = document;
  var i,
      arr = [],
      xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
