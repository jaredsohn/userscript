// ==UserScript==
// @name           Refresh TwoTickets
// @description    Refreshes twotickets.de every 30 seconds.
// @author         Noel Bush
// @include        http://*twotickets.de*
// ==/UserScript==

var refreshPeriod = 30000;  // milliseconds

var ajaxRequest = new XMLHttpRequest;

window.setInterval(function () {
  ajax.open("GET", location.href, false);
  ajax.send(null);
  if (ajax.responseText != document.body.innerHTML) {
    document.body.innerHTML = ajax.responseText;
  }
}, refreshPeriod);
