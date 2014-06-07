// ==UserScript==
// @name           WDR5 Unterhaltung am Wochenende-Podcast downloader
// @description    duh
// @include        http*://*.wdr5.*
// ==/UserScript==

      function rewritewdrfuenf(){
if(( location.hostname.indexOf('wdr5') != -1 ) && ( location.href.indexOf('unterhaltung-am-w') != -1 )) {


var bag = document.getElementsByTagName('param')[4].value;

var phonenumber=new RegExp(".*dslSrc=", "gi")

dlmp3 = bag.replace(phonenumber,"");

mycontainer = document.getElementsByClassName("wdr_flashplayer_container")[0].innerHTML;


document.getElementsByClassName("wdr_flashplayer_container")[0].innerHTML = '<div align="center"><a href="'+dlmp3+'">download</a><br /><br /></div>' + mycontainer;

/*
var r=confirm("dl?");
 if (r==true)
   {
   location.href = dlmp3;
   }

*/

// javascript:alert(document.getElementsByClassName("wdr_flashplayer_container")[0].innerHTML);

	}
  
            }

window.addEventListener('DOMContentLoaded', rewritewdrfuenf, false);