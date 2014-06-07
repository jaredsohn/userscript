// ==UserScript==
// @name           Remove iframes(ads) on bux sites
// @namespace      http://userscripts.org/users/26666
// @include        *bux*/view.php*
// ==/UserScript==

var i, v = document.getElementsByTagName('iframe');
  for(i= v.length-1;i >= 1; i-- ) {
    v[i].parentNode.removeChild( v[i] );
}