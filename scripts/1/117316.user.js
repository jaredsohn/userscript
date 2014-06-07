// ==UserScript==
// @name            HackForums Reputations Link Clickable
// @namespace       xerotic/clickreplink
// @description     Makes links surrounded by either whitespace or dots (periods) clickable.
// @include         http://hackforums.net/reputation.php*
// @include         http://www.hackforums.net/reputation.php*
// @version         1.0
// ==/UserScript==


document.getElementById('content').innerHTML=document.getElementById('content').innerHTML.replace(/\shttp\:\/\/(.*?)\s/g, " <a href='http://$1'>http://$1</a> ");
document.getElementById('content').innerHTML=document.getElementById('content').innerHTML.replace(/\.http\:\/\/(.*?)\s/g, ".<a href='http://$1'>http://$1</a> ");
document.getElementById('content').innerHTML=document.getElementById('content').innerHTML.replace(/\shttp\:\/\/(.*?)\./g, " <a href='http://$1'>http://$1</a>.");
document.getElementById('content').innerHTML=document.getElementById('content').innerHTML.replace(/\.http\:\/\/(.*?)\./g, ".<a href='http://$1'>http://$1</a>.");
