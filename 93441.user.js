// ==UserScript==
// @name           TitanTVRemoteControl
// @namespace      http://sillysot.com/dtv
// @description    TitanTV Remote Control
// @include        http://www.titantv.com/*
// ==/UserScript==

// This script only works on network connected DirecTV tuners.

// INSTRUCTIONS *** Replace the instance of 192.16.10.132 with the 
//              *** IP address of your DVR.
//
//              *** This changes links to the channel number in a TitanTV.com list
//              *** so that they change the channel on your DVR.

addClicks = function () {
  var spans = document.body.getElementsByTagName("span");
  for (var s = 0; s < spans.length; s++) {
    if (spans[s].className == "gridChannelText") {
      var thisa = spans[s];
      thisa.setAttribute("onclick", 'xr = new XMLHttpRequest();xr.open("GET", "http://192.168.10.132:8080/tv/tune?major=' + thisa.firstChild.data.replace(/\./, "&minor=") + '", true);xr.send();return false');
      thisa.setAttribute("style", "cursor:pointer;color:blue;border:1px solid blue;padding:0px 3px 0px 3px");
    }
  }
}.toString();

setTimeout('eval(' + addClicks + "())", 1000);
