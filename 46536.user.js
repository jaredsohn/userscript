// ==UserScript==
// @name           Uni Faboo Avatar
// @description	   Grabs r80 Items Quickly
// @namespace      http://userscripts.org/users/83296
// @include        http://www.neopets.com/objects.phtml?type=shop&obj_type=4
// ==/UserScript==
var x = 3000 //set the refresh rate here.

if(document.body.innerHTML.indexOf('>Blue Cap') != -1){
var item= document.evaluate('//b[. = "Blue Cap"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Feepits Win T-shirt') != -1){
var item= document.evaluate('//b[. = "Feepits Win T-shirt"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}'

else if(document.body.innerHTML.indexOf('Green JubJub Cap') != -1){
var item= document.evaluate('//b[. = "Green JubJub Cap"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('I Love My Mutant Faellie Shirt') != -1){
var item= document.evaluate('//b[. = "I Love My Mutant Faellie Shirt"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}


else if(document.body.innerHTML.indexOf('JubJub T-shirt') != -1){
var item= document.evaluate('//b[. = "JubJub T-shirt"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Lord Kass Halloween Costume') != -1){
var item= document.evaluate('//b[. = "JLord Kass Halloween Costume"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Lucky Fishing Boots') != -1){
var item= document.evaluate('//b[. = "Lucky Fishing Boots"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Lucky Fishing Hat') != -1){
var item= document.evaluate('//b[. = "Lucky Fishing Hat"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}


else if(document.body.innerHTML.indexOf('Meepits Win T-shirt') != -1){
var item= document.evaluate('//b[. = "Meepits Win T-shirt"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Orange Cap') != -1){
var item= document.evaluate('//b[. = "Meepits Win T-shirt"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Red Cap') != -1){
var item= document.evaluate('//b[. = "Meepits Win T-shirt"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('War Chia Top') != -1){
var item= document.evaluate('//b[. = "War Chia Top"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Yellow Mortog T-Shirt') != -1){
var item= document.evaluate('//b[. = "Yellow Mortog T-Shirt"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else { window.setTimeout(function(){window.location.reload() ;},x) ;}return;