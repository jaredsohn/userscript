// ==UserScript==
// @name           Ikariam Ally Chat Room with Freeshoutbox
// @autor          giangkid
// @email          gianglt0227@gmail.com
// @namespace      Ikariam
// @description    Internal Ally page does not allow <iframe> tag. This script replace the string that indicates the shoutbox with freeshoutbox code. Register a box in freeshoutbox.net, then put this string to the ally page: "[shoutbox]SB_url[/shoutbox]". Where SB_url is the url you get from freeshoutbox.net.
// @include        http://*.ikariam.*/index.php?view=embassy&*
// ==/UserScript==

function shoutbox(){
	
search = new Array(
		  /\[shoutbox\](.*?)\[\/shoutbox\]/g);

replace = new Array(

		  "<div align=\"center\"><iframe src=\"$1\" height=\"400\" width=\"650\" frameborder=\"0\"></iframe></div>");
var text = document.getElementById('internalPage').innerHTML;
var text2 = document.getElementById('internalPage');

for(i = 0; i < search.length; i++) {
	     text = text.replace(search[i],replace[i]);

		 text2.innerHTML = text;
		 }

	}
	shoutbox();