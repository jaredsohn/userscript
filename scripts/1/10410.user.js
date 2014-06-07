// ==UserScript==
// @name           Google Code direct download
// @namespace      http://pile0nades.wordpress.com/
// @description    Rewrites all Google Code file links to point directly to the file
// @include        *
// ==/UserScript==



var links = document.getElementsByTagName("a");
for(var i = 0; i < links.length; i++) {
  var match = links[i].href.match(/http:\/\/code\.google\.com\/p\/(.*)\/downloads\/detail\?name=(.*)/);
  if(match) links[i].href = "http://" + match[1] + ".googlecode.com/files/" + match[2];
}

