// ==UserScript==
// @name        Post with shift + enter
// @namespace   pendevin
// @description Posts your message when you hit shift + enter
// @include     http://endoftheinter.net/postmsg.php*
// @include     http://endoftheinter.net/inboxthread.php*
// @include     http://boards.endoftheinter.net/postmsg.php*
// @include     http://boards.endoftheinter.net/showmessages.php*
// @include     https://endoftheinter.net/postmsg.php*
// @include     https://endoftheinter.net/inboxthread.php*
// @include     https://boards.endoftheinter.net/postmsg.php*
// @include     https://boards.endoftheinter.net/showmessages.php*
// @version     1
// ==/UserScript==

//figure out where the post button is
var post=null;
//postmsg shit
if(location.pathname=='/postmsg.php')
	post=document.getElementsByName('submit')[0];
//inboxthread and showmessages
else
	post=document.getElementsByName('post')[0];

//listen for all the keys
if(post)
	document.addEventListener('keypress',keyPress,true);

function keyPress(e){
	if(e.shiftKey&&e.keyCode==13){
		e.preventDefault();
		post.click();
	}
}