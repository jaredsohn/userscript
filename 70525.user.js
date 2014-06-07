// ==UserScript==
// @name           BBS Online Indicator
// @namespace      http://userscript.org/user/citricsquid
// @description    BBS Online Indicator -  includes an online/offline indicator next to BBS posts and a users last online time!
// @include        http://*newgrounds.com/bbs/topic/*
// ==/UserScript==

	var posts = document.getElementsByClassName('userstats');
	var users = new Array();
	var getUsers = '';

	for (i = 0; i < posts.length; i++){
		
		var username = posts[i].parentNode.getElementsByTagName ('h3')[0].textContent.toLowerCase();
		var matchedusername = /http:\/\/(.*)\.newgrounds.com/.exec(username);
		username = matchedusername[1];
		users.push(username);
		users[username] = new Object();
		getUsers += '&user[]='+username;
		
	}
	

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://m00d.net/greasemonkey/online/online.php?type=stats'+getUsers,
		onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
        var entries = dom.getElementsByTagName('user');
			for (var i = 0; i < entries.length; i++) {
				var username = entries[i].getElementsByTagName('username')[0].textContent;
				users[username].status = entries[i].getElementsByTagName('status')[0].textContent;
				users[username].last = entries[i].getElementsByTagName('last')[0].textContent;
			}
			
			for (i = 0; i < posts.length; i++){
				
				var username = posts[i].parentNode.getElementsByTagName ('h3')[0].textContent.toLowerCase();
				var matchedusername = /http:\/\/(.*)\.newgrounds.com/.exec(username);
				username = matchedusername[1];
				if(users[username].status == "offline"){
					posts[i].innerHTML+='<p><span class="gray">Status:</span> <span class="administrator">offline</span></p>';
					if(users[username].last != ""){
						posts[i].innerHTML+='<p><span class="gray">Last:</span> '+users[username].last+'</p>';
					}
				}else if(users[username].status == "online"){
					posts[i].innerHTML+='<p><span class="gray">Status:</span> <span class="moderator">online</span></p>';
				}
			}
		}
	});