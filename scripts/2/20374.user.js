// ==UserScript==
// @name           Beon fast friend
// @namespace      *
// @include        http://beon.ru/online/    
// ==/UserScript==

function init() 
{
		var all = document.getElementsByTagName('a')
		for (var i = 0, o; o = all[i]; i++) {
			var username = o.href.match("http:\/\/(.*?)\.beon\.ru");
			if(username){
				o.href='http://beon.ru/p/request_for_friendship.cgi?login='+username[1];
				o.style.color='green';
			}
		}
}
init();
