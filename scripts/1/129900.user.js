// ==UserScript==
// @name lol?
// @namespace lol/lol/
// @description Adds a special link in UserCP only for members of Propitious
// @include http://hackforums.net/*
// @include http://www.hackforums.net/*
// @version 1.0
// This is a test all the credit goes to "Xerotic".
// ==/UserScript==
<br>
var regex = "User CP</strong></a>";
var revised = "User CP</strong></a> &mdash; <a href='http://www.hackforums.net/forumdisplay.php?fid=230'>Propitious</a> &mdash; <br><a href='http://www.hackforums.net/forumdisplay.php?fid=1'>Test1</a></br> &mdash; <a href='http://www.hackforums.net/showthread.php?tid=2285154'>Propitious Lounge</a>";</br>
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);