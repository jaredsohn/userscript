// LJ repost killer
// version 0.1
// 2010-10-19
// Copyright (c) 2010, rocketsan.livejournal.com
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
// select "LJ repost killer", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            LJ Repost Button killer
// @description     Удаляет назойливую кнопку репоста из вашей ЖЖ-френдленты
// @include         http://*.livejournal.com/*
// ==/UserScript==

var forms = document.querySelectorAll("form[action='http://www.livejournal.com/update.bml'] input[type='submit']");
for (var i=0; i<forms.length; i++)
   forms[i].style.display="none";

