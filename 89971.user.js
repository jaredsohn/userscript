// ==UserScript==
// @name           Blue Headers for Unread Posts
// @namespace      http://hateradio.co.cc/
// @description    Show unread posts in blue
// @include        http*://*what.cd/forums.php?*viewthread*
// @version        1.0
// ==/UserScript==

function unread(){
	this.css = function(){
        s = document.createElement('style');
		s.type = 'text/css';
		s.appendChild(document.createTextNode('table.forum_unread tr.colhead_dark td {background: skyblue; color: #555}'));
        document.getElementsByTagName('head')[0].appendChild(s);
	}
}

var add = new unread();
add.css();