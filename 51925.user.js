// ==UserScript==
// @name           Remove iframes(ads) on jokerbux sites
// @namespace      http://userscripts.org/users/95765
// @include        *jokerbux*/view.php*
// ==/UserScript==

var i, v = document.getElementsByTagName('iframe');
  for(i= v.length-1;i >= 1; i-- ) {
    v[i].parentNode.removeChild( v[i] );
}