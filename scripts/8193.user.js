// ==UserScript==
// @name           Userscripts - Colored Bar *Customizable*
// @namespace      http://www.myspace.com/tp_
// @description    Changes the bright orange color of Userscripts.org to a different color.
// @include        http://userscripts.*

// ==/UserScript==

// ==== EDIT HERE ====
// To chose a color simply put "// " in front of
// all the other colors, except the one you want

// var color = "custom";
var color = "custom2";
// var color = "blue";
// var color = "black";
// var color = "purple";
// var color = "red";
// var color = "green";


// ==== DO NOT EDIT HERE - UNLESS YOUR SURE WHAT YOUR DOING ====

if(color=="custom"){
document.getElementById('header').style.backgroundColor = '#000000';
var images = document.getElementsByTagName("img");
for (var i = 0; i < images.length; i++) {
  var elem = images[i];
  if (elem.src.match('static.userscripts.org/images/userscripts.org.png'))
    elem.src = "http://i58.photobucket.com/albums/g254/illiterate_retard/Custom-Userscripts.png";
} }

if(color=="custom2"){
document.getElementById('header').style.backgroundColor = '#0096ff';
var images = document.getElementsByTagName("img");
for (var i = 0; i < images.length; i++) {
  var elem = images[i];
  if (elem.src.match('static.userscripts.org/images/userscripts.org.png'))
    elem.src = "http://i58.photobucket.com/albums/g254/illiterate_retard/Custom2.png";
} }

if(color=="blue"){
document.getElementById('header').style.backgroundColor = '#056ff1';
var images = document.getElementsByTagName("img");
for (var i = 0; i < images.length; i++) {
  var elem = images[i];
  if (elem.src.match('static.userscripts.org/images/userscripts.org.png'))
    elem.src = "http://i58.photobucket.com/albums/g254/illiterate_retard/userscripts.png";
} }

if(color=="black"){
document.getElementById('header').style.backgroundColor = '#000000';
var images = document.getElementsByTagName("img");
for (var i = 0; i < images.length; i++) {
  var elem = images[i];
  if (elem.src.match('static.userscripts.org/images/userscripts.org.png'))
    elem.src = "http://i58.photobucket.com/albums/g254/illiterate_retard/userscripts-1.png";
} }

if(color=="purple"){
document.getElementById('header').style.backgroundColor = '#b505f1';
var images = document.getElementsByTagName("img");
for (var i = 0; i < images.length; i++) {
  var elem = images[i];
  if (elem.src.match('static.userscripts.org/images/userscripts.org.png'))
    elem.src = "http://i58.photobucket.com/albums/g254/illiterate_retard/userscripts-2.png";
} }

if(color=="red"){
document.getElementById('header').style.backgroundColor = '#f10512';
var images = document.getElementsByTagName("img");
for (var i = 0; i < images.length; i++) {
  var elem = images[i];
  if (elem.src.match('static.userscripts.org/images/userscripts.org.png'))
    elem.src = "http://i58.photobucket.com/albums/g254/illiterate_retard/userscripts-3.png";
} }

if(color=="green"){
document.getElementById('header').style.backgroundColor = '#35f105';
var images = document.getElementsByTagName("img");
for (var i = 0; i < images.length; i++) {
  var elem = images[i];
  if (elem.src.match('static.userscripts.org/images/userscripts.org.png'))
    elem.src = "http://i58.photobucket.com/albums/g254/illiterate_retard/userscripts-4.png";
} }