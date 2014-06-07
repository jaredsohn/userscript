// ==UserScript==
// @name           Facebook video download
// @namespace      rashid8928
// @include        http://lite.facebook.com/*/video/*
// @include        http://www.facebook.com/*/video.php*
// ==/UserScript==
var count = 0;
while (h3 = document.getElementsByTagName('script')[count]){
  var a=unescape(unescape(h3.textContent.replace(/\s+|\s+/g,unescape(' ')).replace(/mp4.+/,'mp4').replace(/.+http/,'http').replace(/\\/g,'')));
if(a.match(/^http.+mp4$/)){
      location.href=(a);
    }
  count++;
}
void(0)