// ==UserScript==

// @name           Cheggit User's Posts
// @namespace      http://nipsden.blogspot.com
// @description    Links the number of posts in the user's profile page to a search of their posts
// @include        http://cheggit.net/users.php*

// ==/UserScript==


var tables=document.getElementsByTagName('TABLE');
// Hardcoded for now
var nick=document.getElementsByTagName('P')[0].innerHTML;
var tbl=tables[1];
var tr=tbl.rows[5];
var numposts=tr.cells[1].innerHTML;
if (numposts > 0) {
	tr.cells[1].innerHTML='<a href="forums.php?op=search&amp;q=&amp;f=0&amp;u_name='+ nick +'">'+ numposts +'</a>';
}
