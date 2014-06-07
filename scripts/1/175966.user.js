// ==UserScript==
// @name Deviation - Deviaton Sub-Forum link in your taskbar.
// @namespace Deviation Sub Forum
// @description Adds a header link for the Deviation Subforum
// @include http://discussionzone.net/index.php
// @include http://www.discussionzone.net*
// @version 1.0
// ==/UserScript==

var regex = "User CP</a>";
var revised = "User CP</a> &mdash; <a href='http://www.discussionzone.net/forumdisplay.php?fid=271'>Deviation</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);