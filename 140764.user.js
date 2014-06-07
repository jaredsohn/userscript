// version 1.0
// ==UserScript==
// @name           st mp3player
// @namespace      ifree.common
// @author         ifree
// @description    a helper with songtaste.com
// @include        http://*songtaste.com/playmusic.php*
// ==/UserScript==

//not testing Greasemonkey for fit chrome
/*if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}*/
//insert the player
var script = document.createElement('script');
script.type='text/javascript';
script.src='http://mediaplayer.yahoo.com/js';
var me= document.getElementsByTagName('head')[1];
document.getElementsByTagName('head')[0].insertBefore(script,me);

var links=document.getElementsByName("+SongName+")
var box="<ul>";
for(var i=0,j=links.length;i<j;i++){
    box+="<li><a href='"+links[i].value+"' name='musiclist' title='"+links[i].nextSibling.nextSibling.innerHTML+"'>*</a><a name='ref' class='underline' href='"+links[i].value+"' >"+
links[i].nextSibling.nextSibling.innerHTML+"</a></li>";
}
document.body.innerHTML=box+"</ul>";

