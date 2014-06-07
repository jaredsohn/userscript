// JavaScript Document
// Woody's Facebook Stripper Alpha1.0
// version 0.1 Alpha
// 2007-01-17
// Copyright (c) 2007, Woody Hayday
// email: woodyhayday@hotmail.com
// --------------------------------------------------------------------
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
////
// -------PLEASE NOTE THIS IS A VERY VERY BASIC SCRIPT -if u want to improve it please send me alterations and i will release with credit--------------
////
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Woody's Facebook Stripper Alpha1.0
// @namespace     http://www.critix.co.uk
// @description   Short - crass and really rushed this script is no where near done but does work (for use with a mass image saver, addons available for mozilla work well): Strips all content and titles from a facebook Album, shows just the images, in large size which can then be easily mass saved with a plugin script for mozilla.
// @include       http://www.facebook.com/album.php*
// @include       www.facebook.com/album.php*
// ==/UserScript==
alert('Welcome to Woodys Amazing Facebook Stripper! (aLPHA 1.0 - hence dodgyness.)');
////genraly deletes all teh crap from facebook page 
var ad1 = document.getElementById('pageheader');
if (ad1) {
    ad1.parentNode.removeChild(ad1);
}
var ad2 = document.getElementById('homelink');
if (ad2) {
    ad2.parentNode.removeChild(ad2);
}
var ad3 = document.getElementById('gnav');
if (ad3) {
    ad3.parentNode.removeChild(ad3);
}
var ad4 = document.getElementById('myprofile');
if (ad4) {
    ad4.parentNode.removeChild(ad4);
}
var ad5 = document.getElementById('myfriends');
if (ad5) {
    ad5.parentNode.removeChild(ad5);
}
var ad6 = document.getElementById('ssponsor');
if (ad6) {
    ad6.parentNode.removeChild(ad6);
}
var ad7 = document.getElementById('pagefooter');
if (ad7) {
    ad7.parentNode.removeChild(ad7);
}
var ad8 = document.getElementById('public_link_album');
if (ad8) {
    ad8.parentNode.removeChild(ad8);
}
var ad11 = document.getElementById('photoprintstatus');
if (ad11) {
    ad11.parentNode.removeChild(ad11);
}
var ad12 = document.getElementById('post_form_id');
if (ad12) {
    ad12.parentNode.removeChild(ad12);
}
var ad13 = document.getElementById('photoactions');
if (ad13) {
    ad13.parentNode.removeChild(ad13);
}
var ad14 = document.getElementById('toppager');
if (ad14) {
    ad14.parentNode.removeChild(ad14);
}
var ad15 = document.getElementById('photoactions');
if (ad15) {
    ad15.parentNode.removeChild(ad15);
}
var ad19 = document.getElementById('sidebar');
if (ad19) {
    ad19.parentNode.removeChild(ad19);
}
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='album_tags']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
}
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='share_and_hide clearfix s_and_h_big']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
}
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='footer_nav']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
}
////changes the s for an 'n' so images are larger and then displays the images
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//img",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    var st = thisDiv.src
    var dir = st.substring(0, st.lastIndexOf("/"))
    var fle = st.substring(st.lastIndexOf("s"), st.length)
    var rep2 = fle.replace(/s/,"/n")
    var rep3 = dir+rep2
    var rep5 = rep3.replace(/http/,"<img style='max-width:130px;'src='http")
    var rep6 = rep5.replace(/jpg/,"jpg'>")
    document.write(rep6)
}
