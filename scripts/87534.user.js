// Tools/Manage User Scripts and manually uninstall the previous
// version before installing this one.  Sorry, this is a limitation
// of Greasemonkey.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select "BringAlienBack", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// www.reddit.com
// - replaces logo with orignal alien
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            BringAlienBack
// @namespace       
// @description     Replaces logo with orignal alien
// @include         http://www.reddit.com/*
// ==/UserScript==

var logo;
logo = document.getElementById('header-img');
logo.src = "http://static.reddit.com/reddit.com.header.png";




//
// ChangeLog
// 2010-10-8 - 0.2 - Replaced logo with one on reddit.com
// 2010-10-8 - 0.1 - Initial
// 
