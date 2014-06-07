// ==UserScript==
// @name           Autoshopgrabber-Pharmacy13
// @description    Grabs Items Quickly
// @author         Fexxel
// @include        http://www.neopets.com/objects.phtml?type=shop&obj_type=13
// @include        http://www.neopets.com/objects.phtml?obj_type=13&type=shop
// ==/UserScript==
var x = 7000 //set the refresh rate here.

if(document.body.innerHTML.indexOf('Tasty Pie') > -1) {
var item= document.evaluate('//b[. = "Tasty Pie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Sporkle Syrup') > -1) {
var item= document.evaluate('//b[. = "Sporkle Syrup"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Magic Goop') > -1) {
var item= document.evaluate('//b[. = "Magic Goop"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Neck Brace') > -1) {
var item= document.evaluate('//b[. = "Neck Brace"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Grumble Be Gone Tablets') > -1) {
var item= document.evaluate('//b[. = "Grumble Be Gone Tablets"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Medicinal Soap') > -1) {
var item= document.evaluate('//b[. = "Medicinal Soap"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Mushroom Ointment') > -1) {
var item= document.evaluate('//b[. = "Mushroom Ointment"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Spyder Juice Elixir') > -1) {
var item= document.evaluate('//b[. = "Spyder Juice Elixir"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else { window.setTimeout(function(){window.location.reload() ;},x) ;}return;