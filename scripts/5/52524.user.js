// ==UserScript==
// @name           	Bigger Edit Post Box
// @namespace      	goallineblitz.com
// @description    	Make the box you edit your post in larger.
// @include        	http://goallineblitz.com/game/forum_edit_post.pl*
// @version		2009.06.27
// @author		GarrettFoster
// ==/UserScript==

document.getElementById('reply_box').rows = 25; //a larger number will make the box bigger
