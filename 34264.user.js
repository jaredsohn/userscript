// Yahoo Answers Signature
// version 0.1 BETA!
// 9-22-08
// Copyright (c) 2008, Weydson Lima <weyseal@gmail.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Yahoo Answers Signature", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Yahoo Answers Signature
// @namespace     http://www.altatimes.com/yahooanswerssig.user.js
// @description   Allows to add a signature to Yahoo Answers
// @include       http://answers.yahoo.com/question/answer*
// ==/UserScript==

// ***** IMPORTANT - Needs to be changed *****
// Change to your signature
// Use \n for new lines
var signature = "---\nDefault Signature\nYahoo Answers Signature (Greasemonkey Script)";

var answerText = document.getElementById("yan-answer-answer");
answerText.value = signature;