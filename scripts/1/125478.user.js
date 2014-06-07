// BitMeTV Search for TVRage Calendar
// Created by mikembm
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           BitMeTVRage
// @namespace      http://calendar.tvrage.com/
// @author         mikembm
// @include        http://calendar.tvrage.com/*
// ==/UserScript==

var elem = document.getElementsByTagName("div");
var rep = [[/(<([^>]+)>)/g, ""], [/\((\d{2})x(\d{2})\)/g, "s$1e$2"], [/\(|\)/g, ""], [/\-/g, " "]];
for (var i = 0; i < elem.length; i++) {
  if (elem[i].getAttribute("align") == "showtext") {
    var ep = elem[i].innerHTML;    
    for(var j in rep)
      ep = ep.replace(rep[j][0], rep[j][1]);    
    var url = "http://www.bitmetv.org/browse.php?search="+escape(ep);
    elem[i].innerHTML += "&nbsp;<a href='"+url+"' target='_top'>&gt;</a>";
  }
}
