
// Kongregate Cleanup
// version 1.0
// 2011-10-01
// Copyright (c) 2011, Alvin Mites
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a quick Greasemonkey script to remove extra boxes
// from a Kongregate game.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Kongregate Cleanup
// @namespace     http://www.mitesdesign.com
// @description   This is a quick Greasemonkey script to remove extra boxes from a Kongregate game.
// @include       http://www.kongregate.com/games/*
// ==/UserScript==

function removeElement(id) {
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
}

// Remove extra boxes
removeElement('headerwrap');
removeElement('gamepage_header');
removeElement('subwrap');
removeElement('chat_container_cell');
removeElement('full-nav-wrap');

// Remove Chat Window
var element = document.getElementById('quicklinks');
element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);

// Set game wrapper width
var game_width = document.getElementById('game').style.width;
document.getElementById('maingame').style.width = game_width;
document.getElementById('maingamecontent').style.width = game_width;
document.getElementById('flashframecontent').style.width = game_width;

// Remove all margins / padding
document.getElementById('primarywrap').style.margin = 0;
document.getElementById('primarywrap').style.padding = 0;
document.getElementById('maingame').style.margin = 0;
document.getElementById('maingame').style.padding = 0;


// Set Title - why not
document.title('Hello World');
