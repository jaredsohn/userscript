// Mp3Tunes Fast script, Copyright 2006, tk, under GPL license.
//
// ==UserScript== 
// @name         Mp3Tunes Fast script 
// @namespace    http://tkhere.blogspot.com
// @description  Faster than the plugin provided by Mp3Tunes.
// @include      *
// @exclude      http://sideload.com
// ==/UserScript== 
 
(function() {
  var page_links = document.links;
  for (var i = 0; i < page_links.length; i++){ 
    if ((page_links[i].href.match(/^http:/) || page_links[i].href.match(/^https:/)) &&
        (page_links[i].href.match(/\.mp3$/i) || page_links[i].href.match(/\.mp4$/i) ||
         page_links[i].href.match(/\.m4a$/i) || page_links[i].href.match(/\.aac$/i) ||
         page_links[i].href.match(/\.wma$/i) || page_links[i].href.match(/\.ogg$/i) ||
         page_links[i].href.match(/\.midi$/i) )) { 
      var span = document.createElement("span"); 
      var url = "http://www.mp3tunes.com/locker/cb/sideload/?partner=5001282001&url="+escape(page_links[i].href);
      span.innerHTML = "<a href=\"" + url + "\" onclick=\"window.open('" + url + "','sideload','width=300,height=300,status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=0,scrollbars=0'); return false;\"><img src=\"data:image/gif;base64,R0lGODlhDAAMALMAAENLWJWpM5aaof///4OUPEtUVV1pTKzEKU9WYnB/RFReUGd0SHmJQIqcOZ60LwAAACH5BAAHAP8ALAAAAAAMAAwAAAQ3cAgEqkVC2m0n5xTQOA1QEFwSKIShOJxxEAXwfkpzMPfGLACDo2cpHI6u4xEQ+lQwzo6keclEAAA7\" title=\"Click to sideload file into your MP3tunes locker.\" style=\"border:0px solid;font:8pt sans-serif;overflow:hidden;width:12px;height:12px;padding:0px;margin-left:4px;margin-right:4px;\"></a>";
      page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling);
      i++;
    }
  } 
})();
