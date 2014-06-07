// ==UserScript==

// @id             DeviantartOutgoingRedirect
// @name           Goodbye Fella: DeviantART redirect to outgoing link

// @description    Simple script which redirects you to outgoing link from deviantART directly. The page between dA and target URL is omitted from history. (Example: http://www.deviantart.com/users/outgoing?http://jezisheck.cz/ will not show the fella telling you that you are leaving dA, but shows http://jezisheck.cz/ right away.) If there are any comments email them in English at jezisheck@jezisheck.cz please.

// @author         Ježísheck <jezisheck@jezisheck.cz> http://jezisheck.cz/
// @version        1.0.1
// @homepage       http://jezisheck.cz/

// @icon           http://w.jezisheck.cz/stable/da-outgoing-script/icon.png
// @icon64         http://w.jezisheck.cz/stable/da-outgoing-script/icon64.png

// @domain         www.deviantart.com
// @include        http://www.deviantart.com/users/outgoing?*

// @run-at         document-start

// ==/UserScript==

var currentUrl = window.location.href;
var redirectUrl = currentUrl.replace("http://www.deviantart.com/users/outgoing?", "");

window.location.replace(redirectUrl)
