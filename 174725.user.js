// ==UserScript==
// @name        FTDBplayer
// @namespace   Alysa
// @description Remplace le player allocine et sont "autoplay" de m**** par un player Youtube avec recherche instantané.
// @include     https://www.frenchtorrentdb.com/?section=INFOS&hash=*
// @include     http://www.frenchtorrentdb.com/?section=INFOS&hash=*
// @include     http://www2.frenchtorrentdb.com/?section=INFOS&hash=*
// @include     http://www3.frenchtorrentdb.com/?section=INFOS&hash=*
// @include     http://www4.frenchtorrentdb.com/?section=INFOS&hash=*
// @include     http://www5.frenchtorrentdb.com/?section=INFOS&hash=*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @version     1.1
// ==/UserScript==

var getTitle = document.getElementsByTagName('b');{

for (var i = 0, c = getTitle.length; i < c; i++) {

var titre = encodeURIComponent(getTitle[2].firstChild.nodeValue);}


}
// Youtube API 
var yt_url = 'http://gdata.youtube.com/feeds/api/videos?q='+titre+'&format=5&max-results=1&v=2&alt=jsonc';

$.ajax
({
type: "GET",
url: yt_url,
success: function(response)
{

if(response.data.items)
{
$.each(response.data.items, function(i,data)
{

var video_id=data.id;

$("iframe").replaceWith( "<div><iframe width='640' height='381' src='http://www.youtube.com/embed/"+video_id+"' frameborder='0' type='text/html'></iframe></div>" );

});
}
}
});