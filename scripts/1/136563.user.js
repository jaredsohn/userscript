// ==UserScript==
// @name            HackForums Count Awards
// @namespace       xerotic/countawards
// @description     Counts the number of given awards for each award.
// @include         *hackforums.net/myawards.php?awid=*
// @version         1.0
// ==/UserScript==

var x = document.getElementsByTagName('tr').length - 2;
var regex = /Awards<\/strong>/;
var replace = 'Awards</strong> - Awards Granted:  '+x;
document.body.innerHTML=document.body.innerHTML.replace(regex,replace);