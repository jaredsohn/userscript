// ==UserScript==
// @name           Redtube Cleaner
// @description    Cleans up redtube and removes adds
// @version        0.1
// @namespace      http://userscripts.org/scripts/source/64680.user.js
// @include        http://*redtube.com/*
// @exclude        http://*redtube.com/1*
// @exclude        http://*redtube.com/2*
// @exclude        http://*redtube.com/3*
// @exclude        http://*redtube.com/4*
// @exclude        http://*redtube.com/5*
// @exclude        http://*redtube.com/6*
// @exclude        http://*redtube.com/7*
// @exclude        http://*redtube.com/8*
// @exclude        http://*redtube.com/9*
// ==/UserScript==

(function()
{  
document.getElementsByTagName("head")[0].innerHTML =     '<title>' + document.title + '</title>' +
    '<link href="/css/style.css" rel="stylesheet" type="text/css" media="screen"/>' +
    '<link href="/css/layout.css" rel="stylesheet" type="text/css" media="screen"/>' +
    '<style type="text/css">body{background:#000;}#contain{width:780px;margin:50px auto}#pages{float:right}.clear{clear:both}</style>';
if(window.location.href=="http://redtube.com/channels" || window.location.href=="http://www.redtube.com/channels" )
{
    var videos = document.getElementsByTagName("ul")[1];
    document.getElementsByTagName("body")[0].innerHTML = 
    '<div id="contain"><img src="http://thumbs.redtube.com/_thumbs/v2009/logo/redtube_260x52_black.png" /><ul class="videoThumbs"><div id="pages">Categories <span>|</span> ' +
    '<a href="/new">Newest Videos</a> <span>|</span> <a href="/top">Top Rated Videos</a></div><br class="clear" /><br />' + 
	videos.innerHTML +
    '</div><br class="clear" /></div>';
}
else
{
    var videos = document.getElementsByTagName("ul")[1];
    var pages = document.getElementsByTagName("div")[7];
    document.getElementsByTagName("body")[0].innerHTML = 
    '<div id="contain"><img src="http://thumbs.redtube.com/_thumbs/v2009/logo/redtube_260x52_black.png" /><ul class="videoThumbs"><div id="pages"><a href="/channels">Categories</a><span>|</span>' + 
    pages.innerHTML + 
    '</div><br class="clear" /><br />' + 
    videos.innerHTML + 
    '<ul><div id="pages">' + 
    pages.innerHTML + 
    '</div><br class="clear" /></div>';
}
})();