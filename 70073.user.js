// ==UserScript==
// @name           Youtube fmt 18 hack
// @namespace      userscripts.org
// @description    Changes the video to the higher resolution version
// @version        0.3
// @include        http://youtube.com/watch?*
// @include        http://www.youtube.com/watch?*
// @include        http://*.youtube.com/watch?*
// @include        http://www.youtube.com/watch#*
// @include        http://*.youtube.com/watch#*
// ==/UserScript==

if (!/.*fmt=18.*/.test(document.URL))
  window.location.replace(document.URL + '&fmt=18');

//Update by doggybags on March 4 2010
//Recently Utube started using an "!" which fucked up the script, solution:
if (/.*#!.*/.test(document.URL))
  window.location.replace(document.URL.replace('#!','?') +'&fmt=18');

//Update by doggybags on Feb 27 2010:
//This will force fmt18 even when YT has "#" instead of "?" by changing it. It makes the page reload once more.
else if (/.*#.*/.test(document.URL))
  window.location.replace(document.URL.replace('#','?') +'&fmt=18');

// Update by Pazzo on Aug 16, 2008:
// Remunge all the links on the page to high-quality as well.
var links = document.getElementsByTagName("a");

for (var i = 0; i < links.length; ++i) {
  if (/\/watch\?.*/i.test(links[i].href) && !(/.*fmt=18.*/i.test(links[i].href)))
    links[i].href = links[i].href + '&fmt=18';
}
