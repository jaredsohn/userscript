// ==UserScript==
// @name          Mr. Sky's HF Quick Search
// @namespace     mrsky/qsearch
// @description   Allows you to perform a quick search from anywhere on the forum
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var ss = "(Unread $1) <form method='post' action='http://hackforums.net/search.php' style='display:inline;'><input type='hidden' name='action' value='do_search' /><input type='hidden' name='postthread' value='1' /><input type='hidden' name='forums' value='all' /><input type='hidden' name='showresults' value='threads' /><input type='text' class='textbox' name='keywords' value='Search' onfocus=\"if (this.value=='Search')this.value='';\" onblur=\"if (this.value=='')this.value='Search';\" /><input type='submit' class='button' value='Go' /></form>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,ss);