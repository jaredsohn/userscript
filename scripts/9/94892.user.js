// ==UserScript==
// @name           Kansas State Wildcat Toolbar
// @version        1.1.0
// @namespace      Kjoe
// @description   Says if forum has new posts
// @include        http://goallineblitz.com/game/*
// @exclude			http://goallineblitz.com/game/login.pl
// @exclude			http://goallineblitz.com/game/logout.pl
// @exclude			http://goallineblitz.com/game/replay.pl*
// ==/UserScript==

window.setTimeout(function() {
	ksu();
}, 1000);

function ksu() {
	GM_xmlhttpRequest({ 
				method: 'GET',
				url: 'http://goallineblitz.com/game/forum_thread_list.pl?team_id=6083',
				headers: {
					'User-agent': navigator.userAgent,
					'Accept': 'text/xml'
				},
				onload: function(response){
					var count = response.responseText.split("images/game/forum/new_posts.gif").length-1;

					var myA = document.createElement("a");
                                        if(count >=1){myA.setAttribute("style","color:#9E7BFF");}
					myA.setAttribute("class","toolbar_item");
					myA.href="http://goallineblitz.com/game/forum_thread_list.pl?team_id=6083"
					myA.innerHTML = 'Ksu(' + count + ')';

					document.getElementById('toolbar').appendChild(myA);
				}
	});	
}