// ==UserScript==
// @name           Astro Flame's first script!
// @namespace      shoecream@luelinks.net (updated by hollow life)
// @description    Adds a PM link to the linkme page!
// @include        http://links.endoftheinter.net/linkme.php?*
// @include        https://links.endoftheinter.net/linkme.php?*
// ==/UserScript==

var a = document.getElementsByClassName('body')[0].childNodes;

var addedby;
var add_flag;
for (var i=0;i<a.length;i++) {
   if (a[i].nodeType == 1) {
      if (a[i].innerHTML.search('Added by:') > -1) {
         add_flag = 1;
      }

      if (add_flag && a[i].href && a[i].href.search('profile.php') > -1) {
         addedby = a[i];
         break;
      }
   }
}

var span = document.createElement('span');
span.innerHTML=' &nbsp; &nbsp; &nbsp; &nbsp; ';

var pmlink = document.createElement('a');
span.appendChild(pmlink);
pmlink.innerHTML = 'PM';

var id = addedby.href.match(/user=(\d+)/)[1];

pmlink.href='postmsg.php?puser='+id;

addedby.parentNode.insertBefore(span,addedby.nextSibling);
