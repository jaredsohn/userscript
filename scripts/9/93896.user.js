// ==UserScript==
// @name           NeoGAF - Block Individual User Avatars
// @description    Block members whose avatars you don't want to see.
// @namespace      http://hateradio.co.cc/
// @include        http://www.neogaf.com/forum/showthread.php*
// @author         hateradio
// @version        1.1
// ==/UserScript==

var im = document.getElementById('posts').getElementsByTagName('img');

// Add users to the following list. Separate names by the pipe "|" character.
// This is case sensitive for precision.
var users = /\b(User1|User2|User3)\b/;

for(var i = 0; i < im.length; i++){
	if(im[i].getAttribute('alt') && users.test(im[i].getAttribute('alt'))){
		im[i].style.display = 'none'
	}
}