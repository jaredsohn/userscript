// ==UserScript==
// @name 	Download YouTube
// @namespace 	DownloadYoutube
// @description Download Videos From Youtube 
// @version 	6.0
// @date 	2010-08-20
// @creator 	downloadmp4.info
// @include 	http://*youtube.com/watch*
// ==/UserScript==


 var playerDiv = document.getElementById('movie_player');
 var flashvars = document.evaluate("attribute::flashvars", playerDiv, null, XPathResult.STRING_TYPE, null).stringValue;
 var id = flashvars.match(/video_id=([^(\&|$)]*)/)[1];
 
 var title = document.getElementById("watch-vid-title").innerHTML;

 
var dwl="&nbsp; &nbsp;(<a href='http://downloadmp4.info/download.php?id=" + id + "' target='_blank'> Download This Video </a> <img src='http://www.downloadmp4.info/img/downloadsw8.gif' valign='middle'>) &nbsp;  &nbsp; <a class='yt-button' href='http://www.downloadmp4.info' target='_blank'> <div align='right'> <b> <font color='red'>Grid View</font> <font color='green'></font></b> </div></a>";


 	title=  title.replace("<h1>","");
        title=title.replace("</h1>","");
	title= title + dwl;


        title="<h1 >" + title + "</h1>";
         document.getElementById("watch-vid-title").innerHTML = title;