// ==UserScript==
// @author        Zxw
// @email 	  zxwwww@googlemail.com
// @name          Hype Machine Download
// @description	  Add download links to all Hype Machine.
// @include       http://hypem.com/*
// ==/UserScript==


if (location.href.match(/http:\/\/hypem\.com\/.*/)) {
//var t = ""; for (i in window) {t += i + "\n"} alert(t);
 function zxwHypeMachineAddDownload() {
  if (document.getElementsByClassName("zxwdownload").length != 0) {
   return;
  }

  var id;
  var url;
  var html;
  var insertBeforePlace;
  var newli;

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");

  style.innerHTML = "\
    .zxwdownload {\
     position: relative;\
     top: 1px;\
     paadding:left: 4px;\
     left: 5px;\
     background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAPCAYAAAD6Ud/mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANZJREFUeNpi/P//PwMMrFmzBsFBAyEhIYzYxBlT7uLU83+OMlwPEwOdwPCziHH16tUowYpPLYwRusMAWRiPnv9wPSwEDCfCEf+J0gMKOlUg/kKkZV+g6knWA7LoDhDXE6mpBqqeZD2wxDARiI8T0HAEiKcg8UnSA7PoLxCnAPEvHBq+A3EiVB0DOXqQk/c1IG4iEGTogGg96PmoG4gvoIkdhwYTLkCUHnSLfkG9+wuN/xePRUTpwVYyXIC6Eub9m0SkLIJ6WHBoBIW7NBD3kVDK4NUDEGAATetJuCtPm5YAAAAASUVORK5CYII=\");\
     float:right;\
    }\
    \
    .zxwdownload:hover {\
     background-position: 13px 0px;\
    }\
\
    .zxwdownload a:hover {\
     background-color: transparent;\
    }\
    \
    .zxwdownload a {\
     width: 13px;\
     height: 15px;\
     display: block;\
    }\
\
    .track_name {\
     padding-right: 97px;\
    }";
  head.appendChild(style);

 var sections = document.getElementsByClassName("section-track");

 for (i in sections) {
  var script = sections[i].getElementsByTagName("script");
  if (script.length > 0) {
   var id = script[0].innerHTML.match(/[0-9]{7}/);
   var token = script[0].innerHTML.match(/[a-z0-9]{32}/);
   var url = "/serve/play/" + id  + "/" + token;
   html = "<a href=\"" + url + "\"></a>";
   var t = "play_ctrl_" + id;
   var insertBeforePlace = document.getElementById("play_ctrl_" + id).parentNode.parentNode;
   newli = document.createElement('li');
   newli.setAttribute('class', 'zxwdownload');
   newli.innerHTML = html;
   insertBeforePlace.insertBefore(newli, insertBeforePlace.childNodes[1]);
   }
  }

 }

 document.addEventListener( "DOMContentLoaded", zxwHypeMachineAddDownload, false );
 window.addEventListener( "load", zxwHypeMachineAddDownload, false );
}
