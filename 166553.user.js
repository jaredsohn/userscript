// ==UserScript==
// @name        Google Maps - Add Event
// @namespace   gmapscalevent
// @description Allows for addition of calendar events from locations in google maps
// @include     https://*.google.com/maps/*
// @include     http://*.google.com/maps/*
// @include     http://maps.google.com/*
// @include     https://maps.google.com/*
// @grant       none
// @version     1
// ==/UserScript==

(function () {
  "use strict";

  function r(f,q,c) {
    if (c === 0) return;
    var elem = document.querySelector(q);
    if (elem) f(elem); else setTimeout(r,9,f,q,c?c-1:1e3);
  }

  r(function (iWTemplate) {
    var inject = document.createElement('span');

    iWTemplate.insertBefore(inject, iWTemplate.firstChild);

    inject.innerHTML = "<span jsvars=\"$event_title:i.title.replace(/(<([^>]+)>)/ig,'').replace(/[()]/g,'')\"></span>" +
    "<span jsvars=\"$event_addr:i.addressLines.join(', ') + ' (' + $event_title + ')'\"></span>" +
    "<span jsvars=\"$event_url:'https://www.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent($event_title)+'&location='+encodeURIComponent($event_addr)\"></span>" +
    "<a jsdisplay=\"i.addressLines && i.title\" href=\"#\" jsattrs=\"href:$event_url\" target=\"_blank\">Create Event From Location</a>";
  }, "#box_infowindow\\.html\\#BoxInfowindow div.iw td.basicinfo div.addr > span");
})();