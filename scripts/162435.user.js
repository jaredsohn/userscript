// ==UserScript==
// @name           Autoshopgrabber - Merifoods
// @description	   Grabs Items Quickly
// @namespace      http://userscripts.org/users/86406
// @include        http://www.neopets.com/objects.phtml?type=shop&obj_type=56
// ==/UserScript==
//Credited by wil, edit: Pirate&Lost Desert Eggs
var x = 1000 //set the refresh rate here.

if(document.body.innerHTML.indexOf('>Blue Draik Egg') != -1){
var item= document.evaluate('//b[. = "Blue Draik Egg"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Lost Desert Draik Egg') != -1){
var item= document.evaluate('//b[. = "Lost Desert Draik Egg"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Pirate Draik Egg') != -1){
var item= document.evaluate('//b[. = "Pirate Draik Egg"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Green Draik Egg') != -1){
var item= document.evaluate('//b[. = "Green Draik Egg"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Yellow Draik Egg') != -1){
var item= document.evaluate('//b[. = "Yellow Draik Egg"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Red Draik Egg') != -1){
var item= document.evaluate('//b[. = "Red Draik Egg"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Ice Draik Egg') != -1){
var item= document.evaluate('//b[. = "Ice Draik Egg"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Island Draik Egg') != -1){
var item= document.evaluate('//b[. = "Island Draik Egg"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Zombie Draik Egg') != -1){
var item= document.evaluate('//b[. = "Zombie Draik Egg"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Darigan Draik Egg') != -1){
var item= document.evaluate('//b[. = "Darigan Draik Egg"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else { window.setTimeout(function(){window.location.reload() ;},x) ;}return;