// ==UserScript==
// @name           Google-Anon Un-Anon
// @namespace      tag:domnit.org,2006-04:gmscripts
// @description    Add an "Un-Anon" link to the top right corner of google-anon.com results
// @include        http://www.google-anon.com/*
// ==/UserScript==

/*
(C) 2010 Leonid Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html
*/

function htmlEscape(s) {
  return s.replace(/</g, '&lt;').replace(/&/g, '&amp;')
    .replace(/\"/g, '&quot;');
}

var loc = location.href.replace('-anon', '');

if(document.title == '404 Not Found') {
  // Hidden feature: in about:config, create new boolean
  // greasemonkey.scriptvals.tag:domnit.org,2006-04:gmscripts/Google-Anon Un-Anon.automaticallyUnAnonNotFound
  // set to true
  if(GM_getValue('automaticallyUnAnonNotFound') ||
     confirm('Redirecting to google.com (un-anon)')) {
    location.replace(loc);
  }
} else {
  var linkHTML = '<a href="' + htmlEscape(loc) + '">Un-Anon</a>';
  var el = document.getElementById('gbtc');  // gbtc for new design
  if(!el) {
    el = document.getElementById('guser');  // guser for old design
  }
  el.innerHTML = linkHTML;
}
