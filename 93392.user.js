// ==UserScript==
// @name           DirecTVGuideTuner
// @namespace      http://sillysot.com/dtv/
// @description    DirecTV Guide Tuner
// @grant          none
// @include        http://www.directv.com/*guide
// ==/UserScript==

// INSTRUCTIONS *** Replace the TWO instances of 192.168.10.32 with the
//              *** IP address of your DVR.
//
//              *** This changes links to the NUMBER and CALLSIGN of channels to links
//              *** to change the DVR's channel.


 addClicks = function() {
	    var mystyle = "cursor:pointer;color:white;border:1px solid #0CC;padding:0px 3px 0px 3px";
        var spans=document.body.getElementsByTagName("span");
        for (var s=0;s<spans.length;s++) {
           if (spans[s].className=="chNum js_rollover") {
              if (spans[s].getElementsByTagName("a")) {
                var a = spans[s].getElementsByTagName("a");
                for (var ac=0 ; ac < a.length ; ac++ ) {
                   var thisa=a[ac];
                   if (thisa.href) {
                      lastCH=thisa.firstChild.data;
                      if (null==thisa.getAttribute('onclick'))
                      thisa.setAttribute("onclick",'xr = new XMLHttpRequest();xr.open("GET", "http://192.168.10.32:8080/tv/tune?major='+thisa.firstChild.data+'", true);xr.send();return false');
                      thisa.setAttribute("style", mystyle+";border-bottom-width:0px");
                   }
                }
              }
           }
           if (spans[s].className=="chCall js_rollover") {
              if (spans[s].getElementsByTagName("a")) {
                var a = spans[s].getElementsByTagName("a");
                for (var ac=0 ; ac < a.length ; ac++ ) {
                   var thisa=a[ac];
                   if (thisa.href) {
                      if (null==thisa.getAttribute('onclick'))
                      thisa.setAttribute("onclick",'xr = new XMLHttpRequest();xr.open("GET", "http://192.168.10.32:8080/tv/tune?major='+lastCH+'", true);xr.send();return false');
                      thisa.setAttribute("style", mystyle);
                   }
                }
              }
           }
        }
}.toString();

setInterval('eval('+addClicks+"())",1000);
