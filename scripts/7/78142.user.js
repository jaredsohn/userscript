// ==UserScript==
// @author        Zxw
// @email 	  zxwwww@googlemail.com
// @name          SoundCloud Download
// @description	  Add download links to all SoundClound songs.
// @include       http://soundcloud.com/*
// ==/UserScript==

if (location.href.match(/http:\/\/soundcloud\.com\/.*/)) {
 function zxwSoundcloudAddDownload() {
  if (document.getElementsByClassName("disabled download pl-button").length != 0) {
   var download = document.getElementsByClassName("disabled download pl-button")[0];
   download.parentNode.removeChild(download);
  }

  if (document.getElementsByClassName("download").length == 0) {
   var head = document.getElementsByTagName("head")[0];
   var style = document.createElement("style");
   style.innerHTML = "\
    .zxwdownload {\
     padding-top: 5px;\
     padding-right: 8px;\
     padding-bottom: 5px;\
     padding-left: 20px;\
     white-space: nowrap;\
     font-size: 10px;\
     line-height: 21px;\
     color: #333333;\
     border-right-color: #cccccc;\
     border-right-width: 1px;\
     border-right-style: solid;\
     background-image: url(\"http://a1.soundcloud.com/images/icons_mini.png?taylor14\");\
     background-repeat: no-repeat;\
     background-position: -76px -236px;\
    }\
    \
    .zxwdownload:hover {\
     color: #0066cc;\
    }";

    head.appendChild(style);

    var id = "\"" + document.getElementsByClassName("player mode large haudio")[0].getAttribute("data-sc-track") + "\"";
    var url = document.getElementsByTagName('html')[0].innerHTML
    url = url.match(/http:\/\/media\.soundcloud\.com\/stream\/([a-z0-9])*\?stream_token=([a-z0-9])*/i)[0];
    var appendPlace = document.getElementsByClassName("primary")[0];
    var newa = document.createElement("a");
    newa.setAttribute("class", "download zxwdownload");
    newa.setAttribute("href", url);
    newa.innerHTML = "Download";
    appendPlace.appendChild(newa);
   }
 }

 document.addEventListener( "DOMContentLoaded", zxwSoundcloudAddDownload, false );
 window.addEventListener( "load", zxwSoundcloudAddDownload, false );

}
