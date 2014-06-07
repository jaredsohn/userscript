// ==UserScript==
// @name           EasyEdit
// @namespace      http://ccstalkers.com
// @description    Adds a formatting editor to Click Critters.
// @include        http://www.clickcritters.com/forum/new_topic.php?id=*
// @include        http://www.clickcritters.com/forum/view_topic.php?id=*
// @include        http://www.clickcritters.com/forum/edit_post.php?id=*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// ==/UserScript==

var GM_JS = document.createElement('script');
GM_JS.src = 'http://ccstalkers.com/nicedit/nicEdit.js';
GM_JS.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JS);
var GM_JS1 = document.createElement('script');
GM_JS1.src = 'http://ccstalkers.com/nicedit/load.js';
GM_JS1.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JS1);
var GM_JS2 = document.createElement('script');
GM_JS2.src = 'http://ccstalkers.com/nicedit/load2.js';
GM_JS2.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JS2);
var GM_JS3 = document.createElement('script');
GM_JS3.src = 'http://ccstalkers.com/nicedit/load3.js';
GM_JS3.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JS3);

// Check if loaded
function GM_wait() {
	if(typeof unsafeWindow.prettyPrint == 'undefined') {
		window.setTimeout(GM_wait,200); 
	} else { 
		unsafeWindow.prettyPrint();
	}
}

GM_wait();

