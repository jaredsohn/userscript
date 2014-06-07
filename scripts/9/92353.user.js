// ==UserScript==
// @name           Newgrounds BBS User Online Status
// @namespace      greasemonkey.knugen.com/bbsonline
// @description    Shows the online status for all users on the forum. 
// @include        http://*newgrounds.com/bbs/topic/*
// @contributor	   VitaminP (vitaminp.newgrounds.com, userscripts.org/users/VitaminP)
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/Posted at: /g, "");

GM_xmlhttpRequest(
{
	method: "GET",
	url: "http://www.newgrounds.com/bbs/",
   	headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    	},
	onload: function(response)
	{
		var parser = new DOMParser();
		var dom = parser.parseFromString(response.responseText, "application/xml");
		var userNodes = dom.getElementsByClassName('dottedtall')[1].getElementsByTagName("a")
		var users = Array();
		for (var i = 0; i < userNodes.length; i++)
		{
			users.push(userNodes[i].textContent.toLowerCase());
		}
		
		var posts = document.getElementsByClassName('heading');

		for (i = 0; i < posts.length; i++)
		{
			if (!posts[i].id.match(/bbspost/)) continue;	
			
			var insertInto = posts[i].getElementsByClassName('userlinks')[0];
			var username = String(posts[i].getElementsByTagName('h3')[0].firstChild.innerHTML).toLowerCase();
			
			var isOnline = (users.indexOf(username) != -1);
			var status 	= document.createElement('span');
			
			if (isOnline)
			{
				status.className = "moderator";
				status.innerHTML = "Taking a break from gay buttsex.";
			}
			else 
			{
				status.className = "administrator";
				status.innerHTML = "Getting fucked in the ass";
			}	
			
			var delimit = document.createTextNode(' | ');
			insertInto.insertBefore(status, insertInto.childNodes[1]);
			insertInto.insertBefore(delimit, insertInto.childNodes[2]);
			
		}
	}
});