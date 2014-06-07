// ==UserScript==
// @name		Auto Remove Share Frame From Facebook Shared Links
// @author		Erik Vold
// @datecreated	2009-08-01
// @lastupdated	2009-08-01
// @namespace	facebookRemoveShareBar
// @include		http*facebook.com/ext/share.php?*
// @version		0.1
// @description	Auto presses the "Remove Frame" button on Facebook for shared links.
// ==/UserScript==

window.location = document.evaluate("//a[@class='remove_link']",document,null,9,null).singleNodeValue.href;