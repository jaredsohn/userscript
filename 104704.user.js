// ==UserScript==
// @name           YouTube
// @namespace      YouTube
// @description    Play HD videos
// @include        http://www.youtube.com/watch*
// ==/UserScript==

function gup(name)
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

var hd = gup('hd');
var url = window.location.href;

if(hd != '1') {
window.location.href = url+'&hd=1';
}