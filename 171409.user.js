// ==UserScript==
// @name       Vine.co Resolver
// @namespace  http://openszone.com
// @author	Myfreedom614 <openszone@gmail.com>
// @version    0.1
// @description  Download video from vine.co
// @homepage	https://userscripts.org/scripts/show/171409
// @updateURL	https://userscripts.org/scripts/source/171409.meta.js
// @downloadURL	https://userscripts.org/scripts/source/171409.user.js
// @include        http://vine.co/v/*
// @include        https://vine.co/v/*
// @include        http://www.vine.co/v/*
// @include        https://www.vine.co/v/*
// @grant          none
// @copyright  2013,Myfreedom614
// ==/UserScript==

/* History
 * 2013-06-20 v0.1 First Version
 */

var metas = document.getElementsByTagName('meta');

for (i=0; i<metas.length; i++)
{
    if (metas[i].getAttribute("property") == "twitter:player:stream" )
    {
        var meta_video = metas[i].getAttribute("content");
    }
}

if(meta_video)
{
	var url = meta_video.split("?")[0];
	    
    if(f = document.getElementsByClassName("shot-with-vine")[0].getElementsByTagName("a")[0])
    	f.innerHTML = "<a style = 'color: white;' href=\"" + url +"\">Download this Vine</a></div>";
	else
    {
    	add_html("<a href='" + url +"'>Download this Vine</a></div>");
    }
}
else
{
     add_html("<span style= 'color: red;'>Vine Download didn't work.<br>Contact me: openszone@gmail.com</span>");
}

function add_html(string)
{
	var div = document.getElementsByClassName("info")[0];
	div.innerHTML += "<div class = shot-with-vine\">" + string + "</div>";
}