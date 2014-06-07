// ==UserScript==
// @name	   Beon	add all online
// @namespace	   *
// @include	   http://beon.ru/online/
// @description	   Add all online to friends. WARNING: high resource-consumption.
// ==/UserScript==

function init()
{
	var all	= document.getElementsByTagName('a')
	for (var i = 0,	o; o = all[i]; i++) {
		var username = o.href.match("http:\/\/(.*?)\.beon\.ru");
		if (!username) { username = o.href.match("http:\/\/beon\.ru\/users\/(.*?)\/"); } //http://beon.ru/users/agentmn/
		
		if(username){
			
			o.href='http://beon.ru/p/request_for_friendship.cgi?login='+username[1];
			o.style.color='green';
	
			r=new XMLHttpRequest();
	
			r.open("GET",o.href,false);
			r.setRequestHeader("Referer", window.location);
			r.send('');
			
			o.style.color='gray'
			
			
			
		}
		
	}
}
init();