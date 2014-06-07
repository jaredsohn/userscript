// ==UserScript==
// @name           SpiceWorks - Deep Clean
// @namespace      None
// @include        http://nash-srv-2/tickets*
// ==/UserScript==

(function() {
  document.getElementById('content_wrapper').style.paddingRight = 0;
  document.getElementById('community-content').style.display = 'none';
  document.getElementById('community-content').style.position = 'absolute';
  document.getElementById('community-content').style.top = '-1000px';
})();