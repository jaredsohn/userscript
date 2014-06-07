// ==UserScript==
// @name           Neopets : Shops : Pharmacy
// @description	   Grabs Pharmacy Items Quickly
// @namespace      http://userscripts.org/users/neocheats
// @include        http://www.neopets.com/objects.phtml?type=shop&obj_type=13
// @include        http://www.neopets.com/objects.phtml?obj_type=13&type=shop
// @exclude        http://www.neopets.com/haggle.phtml?obj_info_id=*&stock_id=*&g=*
// ==/UserScript==


var x = 3000 //set the refresh rate here.

if(document.body.innerHTML.indexOf('Sporkle Syrup') != -1){
var item= document.evaluate('//b[. = "Sporkle Syrup"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Tasty Pie') != -1){
var item= document.evaluate('//b[. = "Tasty Pie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Cactopus Cream') != -1){
var item= document.evaluate('//b[. = "Cactopus Cream"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Magic Goop') != -1){
var item= document.evaluate('//b[. = "Magic Goop"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Neck Brace') != -1){
var item= document.evaluate('//b[. = "Neck Brace"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Mushroom Ointment') != -1){
var item= document.evaluate('//b[. = "Mushroom Ointment"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Spyder Juice Elixir') != -1){
var item= document.evaluate('//b[. = "Spyder Juice Elixir"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Potion of Concealment') != -1){
var item= document.evaluate('//b[. = "Potion of Concealment"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Grumble Be Gone Tablets') != -1){
var item= document.evaluate('//b[. = "Grumble Be Gone Tablets"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Honey Blossom Extract') != -1){
var item= document.evaluate('//b[. = "Honey BLossom Extract"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Herbal Scrambled Eggs') != -1){
var item= document.evaluate('//b[. = "Herbal Scrambled Eggs"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Medicinal Soap') != -1){
var item= document.evaluate('//b[. = "Medicinal Soap"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Extra Thick Goggles') != -1){
var item= document.evaluate('//b[. = "Extra Thick Goggles"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}


else { window.setTimeout(function(){window.location.reload() ;},x) ;}return;

