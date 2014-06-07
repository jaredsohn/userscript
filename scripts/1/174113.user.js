// ==UserScript==
// @id             aal-rw
// @name           Android AppLinks Rewriter
// @version        1.3
// @namespace      http://projects.izzysoft.de/
// @author         IzzySoft
// @description    Re-writes Android App Links to point to "a better place"
// @updateURL      https://userscripts.org/scripts/source/174113.meta.js
// @downloadURL    https://userscripts.org/scripts/source/174113.user.js
// @include        *
// @exclude        http://*.appbrain.com/*
// @exclude        http://play.google.com/*
// @run-at         document-end
// ==/UserScript==

var playstore = 'https://play.google.com/store/apps/details?id=';
var appbrain  = 'http://www.appbrain.com/app/';

for(var i = 0; i < document.links.length; i++) {
  var elem = document.links[i];
  // Links on AndroidPIT
  if (elem.href.match(/\/de\/android\/market\/apps\/app\/([^\/]+)\/([^\/]+)/i)) {
    //elem.href=playstore+RegExp.$1;
    elem.href=appbrain+RegExp.$2+'/'+RegExp.$1;
  }

  // Links to Google Play
  if (elem.href.match(/play.google.com\/store\/apps\/details\?id=([^&#]+)/i)) {
    elem.href=appbrain+RegExp.$1;
  }
  if (elem.href.match(/market.android.com\/details\?id=([^&#]+)/i)) {
    elem.href=appbrain+RegExp.$1;
  }
}