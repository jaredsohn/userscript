// ==UserScript==
// @name          Combine Toolbar Editor
// @version        1.1.0
// @namespace      Kjoe
// @description   Says if forum has new posts
// @include        http://goallineblitz.com/game/*
// @exclude			http://goallineblitz.com/game/login.pl
// @exclude			http://goallineblitz.com/game/logout.pl
// @exclude			http://goallineblitz.com/game/replay.pl*
// ==/UserScript==

window.setTimeout(function() {
	combine();
}, 1000);

function combine() {
	GM_xmlhttpRequest({ 
				method: 'GET',
				url: 'http://goallineblitz.com/game/forum_thread_list.pl?forum_id=2274',
				headers: {
					'User-agent': navigator.userAgent,
					'Accept': 'text/xml'
				},
				onload: function(response){
					var count = response.responseText.split("images/game/forum/new_posts.gif").length-1;

					var myA = document.createElement("a");
                                        if(count >=1){myA.setAttribute("style","color:#FFA824");}
					myA.setAttribute("class","toolbar_item");
					myA.href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=2274"
					myA.innerHTML = 'Combine(' + count + ')';

					document.getElementById('toolbar').appendChild(myA);
				}
	});	
}

