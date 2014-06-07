// ==UserScript==
// @name           Autoshopgrabber-Kauvara
// @description    Grabs Items Quickly
// @namespace      http://userscripts.org/users/83296
// @include        http://www.neopets.com/objects.phtml?type=shop&obj_type=2
// @include        http://www.neopets.com/objects.phtml?obj_type=2&type=shop
// ==/UserScript==
var x = 1000 //set the refresh rate here.

if(document.body.innerHTML.indexOf('http://www.neopets.com/objects.phtml?type=shop&obj_type=2') > -1) {
var item= document.evaluate('//b[. = "http://www.neopets.com/objects.phtml?type=shop&obj_type=2"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else { window.setTimeout(function(){window.location.reload() ;},x) ;}return;