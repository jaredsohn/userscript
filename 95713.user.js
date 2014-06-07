// ==UserScript==
// @name           Toogle Private vs. Public on Outlook Web App
// @namespace      http://userscripts.org/scripts/show/95713
// @description    Toggle the private vs. public computer radiobox on the Outlook Web App login

// @include        http://*/CookieAuth.dll?GetLogon?*
// @include        https://*/CookieAuth.dll?GetLogon?*
// @include        http://*/exchweb/bin/auth/owalogon.asp*
// @include        https://*/exchweb/bin/auth/owalogon.asp*
// @include        http://*/owa/auth/logon.aspx*
// @include        https://*/owa/auth/logon.aspx*

// @version       1.0

// ==/UserScript==

var cbs =  document.evaluate("//input[@type='radio']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0 ; i<cbs.snapshotLength; i++) {
    var nodeToToggle = cbs.snapshotItem(i);
    nodeToToggle.checked = !nodeToToggle.checked;
}