// DailyTodo Keyboard Shortcuts
// version 0.1 BETA!
// 2008-11-18
// Copyright (c) 2008, Serkan Kenar
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 
// --------------------------------------------------------------------
// DailyTodo Script
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          DailyTodo Keyboard Shortcuts
// @description   Keyboard shortcuts for DailyTodo.net service
// @include       http://dailytodo.net/*
// ==/UserScript==

function keyPressed(e)
{
  var keynum = e.charCode ? e.charCode : e.keyCode;
  var ch = String.fromCharCode(keynum).toLowerCase();
  if (!e.altKey) { return; }
  if      (ch == '4')  { window.document.location = 'http://dailytodo.net/todo/?cat=1'; } // daily
  else if (ch == '3')  { window.document.location = 'http://dailytodo.net/todo/?cat=2'; } // weekly
  else if (ch == '2')  { window.document.location = 'http://dailytodo.net/todo/?cat=3'; } // monthly
  else if (ch == '1')  { window.document.location = 'http://dailytodo.net/todo/?cat=5'; } // comprehensive
}


// Main
window.addEventListener("keypress", keyPressed, true);