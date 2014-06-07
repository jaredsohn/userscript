// ==UserScript==// @name           Zoom stylesheet selector// @namespace      http://dunck.us/code/greasemonkey/// @description    Use the zoom stylesheet when available.// @include        *// ==/UserScript==//
//altered from Jeremy Keith's zoom bookmarklet
//http://adactio.com/journal/display.php/20050628091929.xml
//..do nothing if no zoom
//..disable all but (first) zoom SS if one is found.
//quick hack, could be cleaner.
var l=document.getElementsByTagName('link');
var hasZoomSS = false;
for(i=0;i<l.length;i++){
  if(l[i].getAttribute('type')=='text/css'){
    if(l[i].getAttribute('rev')=='zoom'){
      hasZoomSS = true;
    }
  }
}

if (hasZoomSS) {
  for(i=0;i<l.length;i++){
    if(l[i].getAttribute('type')=='text/css'){
      if(l[i].getAttribute('rev')=='zoom'){
        l[i].setAttribute('rel','stylesheet');
        l[i].disabled=false;
      }else{
        l[i].setAttribute('rel','alternate stylesheet');
        l[i].disabled=true;
      }
    }
  }
}
