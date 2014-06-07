// ==UserScript==
// @name           Rediffmail direct Inbox
// @author         Shajul
// @namespace      http://www.shajul.net/
// @description    This will skip the mailcontest and go directly to inbox
// @include        http://f4plus.rediff.com/utilities/mailcontest/index.php*
// ==/UserScript==

var links = document.evaluate("//a", document, null, XPathResult.ANY_TYPE,null);
var thisHeading = links.iterateNext();
var thisHeading = links.iterateNext();
window.location = thisHeading;
