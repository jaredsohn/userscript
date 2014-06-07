// ==UserScript==
// @name        redmine links
// @namespace   redmine
// @description redmine links to rt and svn
// @include     http://redmine.tld/my/page
// @version     1
// @grant       none
// ==/UserScript==

var comments= document.getElementsByClassName("comments");

var reRT= /RT#(\d+)/gi;
var reSVN= /SVN#(\d+)/gi;

for (var i = 0; i < comments.length; i++) {
 comments[i].innerHTML= comments[i].innerHTML.replace(reRT,'<a href=\"http://rt.mydomain.tld/Ticket/Display.html?id=$1\">RT#$1</a>');
 comments[i].innerHTML= comments[i].innerHTML.replace(reSVN,'<a href=\"http://svn.mydomain.tld/trac/changeset/$1\">SVN#$1</a>');
}
