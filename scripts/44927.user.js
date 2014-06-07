// ==UserScript==
// @name 	Download YouTube Videos
// @namespace 	Krrishnaaaa
// @description 	Downloads Videos From Youtube
// @version 	3.7
// @date 	2008-5-17
// @include 	http://*youtube.com/watch*
// ==/UserScript==

 var playerDiv = document.getElementById('movie_player');
 var flashvars = document.evaluate("attribute::flashvars", playerDiv, null, XPathResult.STRING_TYPE, null).stringValue;
 var id = flashvars.match(/video_id=([^(\&|$)]*)/)[1];
var dwl="&nbsp; &nbsp;(<a href='http://www.linkyoutube.com/watch?v=" + id + "'> Download This Video </a> <img src='http://img134.imageshack.us/img134/591/downloadsw8.gif' valign='middle'>) &nbsp;  &nbsp; <a class='yt-button' href='http://www.buy-youtube-views.com/products.html'> <div align='right'> <b> <font color='red'>Buy</font> <font color='green'>Views/Ratings/Comments</font></b> </div></a>";
 	
          var title = document.getElementById("watch-vid-title").innerHTML;
        title=  title.replace("<h1>","");
         title=title.replace("</h1>","");
	title= title + dwl;

        title="<h1 >" + title + "</h1>";
         document.getElementById("watch-vid-title").innerHTML = title;