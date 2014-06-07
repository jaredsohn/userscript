// ==UserScript==
// @name           Spaniard Kings Toolbar 
// @version        1.0.2
// @namespace      Kjoe
// @description   Says if forum has new posts
// @include        http://goallineblitz.com/game/*
// ==/UserScript==if(window.location.href.indexOf('login.pl') === -1 && window.location.href.indexOf('replay.pl') === -1){
var myDiv2 = document.createElement("div");
var check = false;
var count = 0;

document.getElementById('toolbar').appendChild(myDiv2);

GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://goallineblitz.com/game/forum_thread_list.pl?team_id=518',
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
			onload: function(response){
				div = document.createElement("div");
				div.innerHTML = response.responseText;
				var body = document.getElementsByTagName('body')[0];
				body.appendChild(div);
				var imgs = div.getElementsByTagName('img');
				for(i=0; i < imgs.length; i++){
				if(imgs[i].src == "http://goallineblitz.com/images/game/forum/new_posts.gif")
					{
					count = count + 1;
					check = true;
					}
				}
				div.innerHTML = '';
				
				myDiv2.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?team_id=518">Kings(' + count + ')</a>';
			}
	});	
}