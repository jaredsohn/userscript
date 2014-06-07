// Gmail: Chat Right Signature
// version 0.2 BETA
// 2006-09-27
// Copyright (c) 2006, Robson Braga Araujo
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Gmail: Chat Right", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Gmail: Chat Right
// @namespace     http://valfenda.cjb.net/~robson/userscripts
// @description   Move the quick contacts to the right.
// @include       http://gmail.google.com/*
// @include       https://gmail.google.com/*
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @author        Robson Braga Araujo (robsonbraga at gmail dot com)
//
/////////////////////////////////////////////////////////////
//
// 27 September 2006
// - Fixed error where the chat div was not moving to the right of the screen
// 11 July      2006
// - First Release
//
// ==/UserScript==

(function(){

var cm_compose = document.getElementById('cm_compose');
// Disable for compose mode until we figure out a way to make it work
if (cm_compose) return;

// We basically create a new div, position it in the right and move the quick
// contatcs div to it.

var co_div = document.getElementById('co');

var nav_div = document.getElementById('nav');
var main_div = co_div.parentNode;
var right_div = document.createElement('div');

co_div.style.marginRight = "16.6ex";

var i;
for (i = nav_div.childNodes.length - 1; i >= 0; --i) {
  var d = nav_div.childNodes[i];
  if (d.id == "nb_3" || d.id == "nb_2") {
    if (right_div.childNodes.length == 0) {
      right_div.appendChild(d);
    } else {
      right_div.insertBefore(d, right_div.childNodes[0]);
    }
  }
}

right_div.style.width = "17ex";
right_div.style.right = "0.4px";
right_div.style.position = "absolute";
right_div.id = 'right_div';

main_div.insertBefore(right_div, co_div);

// Gmail loads the contact div to the right. We check if it's out of bounds
// and reposition it.
function updatePosFunction() { 
  var pop = window.document.getElementById('pop');
  var right_div = window.document.getElementById('right_div');
  if (pop) {
    var left = pop.offsetLeft;
    var max = right_div.offsetLeft;
    if (left > max) {
      left = max - pop.offsetWidth - 10;
      pop.style.left = left + 'px';
    }
  }
  window.setTimeout(updatePosFunction, 1000);
};
window.setTimeout(updatePosFunction, 1000);


})();


