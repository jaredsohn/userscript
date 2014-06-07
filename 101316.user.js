// ==UserScript==
// @name           phpMyAdmin session keepalive
// @namespace      http://stiell.org/
// @description    Stay logged in to phpMyAdmin by keeping the session active.
// @license        http://creativecommons.org/publicdomain/zero/1.0/
// @version        0.1
// @include        */navigation.php?*&token=*
// @include        */navigation.php?token=*
// ==/UserScript==

// 1 minute = 60000 ms.
const MIN = 60000;
// Keepalive interval.
const INTERVAL = 20 * MIN;
// Regex to detect that the user has been logged out.
const LOGIN_PATTERN = /<body class="loginform">/;

// Check that this really is a phpMyAdmin navigation frame.
var b = document.body;
if (b.id == 'body_leftFrame' && b.children[0].id == 'pmalogo' &&
    b.children[1].id == 'leftframelinks') {
  // Find the link to the query window.
  var q = document.evaluate('a[starts-with(@href, "querywindow.php")]',
    b.children[1], null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).
    singleNodeValue;
  // If found, start keepalive.
  if (q != null) {
    // Keeps session alive.
    var keepalive = function() {
      var r = new XMLHttpRequest();
      r.open("get", q.href, true);
      r.onreadystatechange = function() {
        // Only do the following when the response is complete.
        if (r.readyState != 4) return;
        // If logged out, end keepalive.
        if (r.status == 200 && r.responseText.match(LOGIN_PATTERN))
          clearInterval(iid);
      };
      r.send(null);
    }
    // Start the keepalive.
    var iid = setInterval(keepalive, INTERVAL);
  }
}