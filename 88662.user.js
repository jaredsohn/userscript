// ==UserScript==
// @name           Google Instant Off
// @description    Turn Google Instant Off
// @include        http://*.google.com/search*
// ==/UserScript==

if (/[?#](.*&)?q=/i.test(location.href)) {
   var queryString = location.href.substring(location.href.indexOf('?'));
     if (!/[?&]as_qdr=/.test(queryString)) {
      queryString += '&as_qdr=all';
   }}
