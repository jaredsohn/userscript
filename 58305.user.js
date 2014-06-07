// ==UserScript==
// @name		Autoshopgrabber-Kaylas
// @description    	Grabs items quickly
// @namespace      	http://userscripts.org/users/103487
// @include       	http://www.neopets.com/objects.phtml?type=shop&obj_type=73
// @include       	http://www.neopets.com/objects.phtml?obj_type=73&type=shop
// ==/UserScript==
var x = 6000 //set the refresh rate here.

if(document.body.innerHTML.indexOf('Potato Potion') != -1){
var item= document.evaluate('//b[. = "Potato Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Kaylas Golden Potion') != -1){
var item= document.evaluate('//b[. = "Kaylas Golden Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Strength Serum') != -1){
var item= document.evaluate('//b[. = "Strength Serum"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Kaylas Super Special Potion') != -1){
var item= document.evaluate('//b[. = "Kaylas Super Special Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Therapeutic Swamp Water') != -1){
var item= document.evaluate('//b[. = "Therapeutic Swamp Water"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Essence of Mortog') != -1){
var item= document.evaluate('//b[. = "Essence of Mortog"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Bubbling Fungus') != -1){
var item= document.evaluate('//b[. = "Bubbling Fungus"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Meridellian Potion of Defence') != -1){
var item= document.evaluate('//b[. = "Meridellian Potion of Defence"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Twisted Potion of Strength') != -1){
var item= document.evaluate('//b[. = "Twisted Potion of Strength"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Energising Elixir') != -1){
var item= document.evaluate('//b[. = "Energising Elixir"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Essence of Drackonack') != -1){
var item= document.evaluate('//b[. = "Essence of Drackonack"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Bomberry Elixir') != -1){
var item= document.evaluate('//b[. = "Bomberry Elixir"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Bullseye Potion') != -1){
var item= document.evaluate('//b[. = "Bullseye Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Turnip Tonic') != -1){
var item= document.evaluate('//b[. = "Turnip Tonic"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Cooling Balm of the Warrior') != -1){
var item= document.evaluate('//b[. = "Cooling Balm of the Warrior"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotlength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else { window.setTimeout(function(){window.location.reload() ;},x) ;}return;