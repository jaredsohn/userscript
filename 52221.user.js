// ==UserScript==
// @name           Autoshopgrabber-WinterPetpet61
// @description    Grabs Items Quickly
// @author         Fexxel
// @include        http://www.neopets.com/objects.phtml?type=shop&obj_type=61
// @include        http://www.neopets.com/objects.phtml?obj_type=61&type=shop
// ==/UserScript==
var x = 7000 //set the refresh rate here.

if(document.body.innerHTML.indexOf('Snowickle') > -1) {
var item= document.evaluate('//b[. = "Snowickle"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Candychan') > -1) {
var item= document.evaluate('//b[. = "Candychan"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Raindorf') > -1) {
var item= document.evaluate('//b[. = "Raindorf"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Ona') > -1) {
var item= document.evaluate('//b[. = "Ona"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Gwalla') > -1) {
var item= document.evaluate('//b[. = "Gwalla"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else { window.setTimeout(function(){window.location.reload() ;},x) ;}return;