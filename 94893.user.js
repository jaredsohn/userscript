// ==UserScript==
// @name           He-Man Toolbar Editor
// @version        1.1
// @namespace      Kjoe
// @description   Says if forum has new posts
// @include        http://goallineblitz.com/game/*
// @include        http://goallineblitz.com/game/*
// @exclude			http://goallineblitz.com/game/login.pl
// @exclude			http://goallineblitz.com/game/logout.pl
// @exclude			http://goallineblitz.com/game/replay.pl*
// ==/UserScript==

window.setTimeout(function() {
	heman();
}, 1000);

function heman() {
	GM_xmlhttpRequest({ 
				method: 'GET',
				url: 'http://goallineblitz.com/game/forum_thread_list.pl?team_id=4915',
				headers: {
					'User-agent': navigator.userAgent,
					'Accept': 'text/xml'
				},
				onload: function(response){
					var count = response.responseText.split("images/game/forum/new_posts.gif").length-1;

					var myA = document.createElement("a");
                                        if(count >=1){myA.setAttribute("style","color:#9C661F");}
					myA.setAttribute("class","toolbar_item");
					myA.href="http://goallineblitz.com/game/forum_thread_list.pl?team_id=4915"
					myA.innerHTML = 'HeMan(' + count + ')';

					document.getElementById('toolbar').appendChild(myA);
				}
	});	
}