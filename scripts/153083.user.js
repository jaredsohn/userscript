// ==UserScript==
// @name        720p Youtube
// @namespace   720p
// @description Always runs youtube in 720p
// @include     https://*.youtube.com/*
// @include     http://*.youtube.com/*
// @version     1.1.1
// ==/UserScript==

/*
    This script is free : you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This script is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/

/*

This script is written by ogelami, former of Forward Development Sweden.
Feel free to ask questions, or leave a thanks to ogelami@gmail.com

    What does 720p Youtube do?
    
        * it forces 720p, lets say you click a link that does not contain hd=1,
        this will cause a redirection to the same page with hd=1 as argument.
        
        * also changes all youtube links so that they contain hd=1 on youtube.

        * added in an URL button for shortened youtube links that shows up next
        to the "report flag".
*/


var link   = document.body.getElementsByTagName("a");
var url    = document.location.toString();

//this loop injects hd=1 to all watchlinks in the page.
for(var i = 0; i < link.length; i++)
{
    //if the link does not contain the hd parameter, and do contain "watch".
    if(link[i].href.toString().indexOf("hd=1") == -1 && link[i].href.toString().indexOf("watch") != -1)
        link[i].href += "&hd=1";
}

if(url.indexOf("watch") != -1)
{
    //this forces hd if its not already set.
    if(url.indexOf("hd=1") == -1)
        document.location = url + "&hd=1";
    
    
    var start           = url.indexOf("v=") + 2;
    var stop            = url.indexOf("&", start);
    var shortenedUrl    = url.substring(start, stop);
    
    var button          = document.createElement("button");
    button.type         = "button";
    button.className    = "yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default";
    button.onclick      = function (){ window.prompt("Copy to clipboard: Ctrl+C, Enter", "http://youtu.be/" + shortenedUrl); };
    button.id           = "linkurl_";
    button.style        = "margin-top : 10px;";
    
    //this adds in an button for shortened url.
    var watchActions = document.getElementById("watch-actions");
    
    if(typeof watchActions === 'undefined' || !watchActions)
    {
        watchActions = document.getElementById("watch-like-dislike-buttons");
        button.className = "yt-uix-button-icon";
    }    
    
    var image           = document.createElement("img");
    image.src           = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABJlBMVEX///9OTk7w8PCFhYXq6urQ0NDy8vJPT09HR0eSkpKEhISfn59XV1eMjIx4eHhfX1+IiIhLS0vx8fG7u7uampqPj49cXFyJiYnv7++Kioo+Pj6pqal+fn6Dg4O9vb1ycnJ2dnZnZ2dVVVW5ublgYGCgoKBmZmZ/f39oaGjc3NyYmJhYWFjt7e3IyMj5+flJSUn+/v5vb2+cnJy6urr6+vp8fHzZ2dlsbGynp6fa2tqAgICxsbE/Pz/k5OT19fXb29tGRkZKSkpWVlbNzc17e3tNTU2UlJReXl5ZWVmhoaFISEi4uLhMTEzd3d1tbW3r6+vBwcGmpqb4+Ph3d3dTU1PAwMCsrKzU1NRubm5bW1uvr69SUlKdnZ2Ghobs7OxaWlpUVFRQUFDks+m+AAAAAXRSTlMAQObYZgAAAMhJREFUGJVjYIABCS0Pc10GBIjj01b3Y5eD81ki4p01/bmlnKF8A5fI8BivYCZOfqgAm2NooKCqmJtvIlTALFEmMTo2ISyAB8y1tfR1d7BmtomxjJcEmR+bEK3iE+WdIG3m7hcE5EdEGrs4RHnruyo4qekwMPgHx4dbJForO5p6WoUJATWIxrPG+ERzJTC6Qc1PlLXlEIm1CZQXhwooGtpZOSUY2buGQgUCQjztLKLsI81NYL4I8xIID/XQCEL4UzgiRIlXD8YDAHPGJgzCYSNUAAAAAElFTkSuQmCC';
    
    if(typeof image === 'undefined' || !image)
        image = document.createTextNode('URL');
    
    button.appendChild(image);
    watchActions.appendChild(button);
}

function killAds()
{
	var mp          = window.document.getElementById('movie_player');
	var mp_flash    = window.document.getElementById('movie_player-flash');
    
	if(!mp && mp_flash)
		mp = mp_flash;
        
    if(mp !== 'undefined')
    {
        var mpC = mp.cloneNode(true);
        
        mpC.setAttribute('flashvars', mpC.getAttribute('flashvars').replace(/[\&\?]?(ad_|advideo|cta_xml|infringe|invideo|watermark)([^=]*)?=[^\&]*/gi,'').replace(/(^[\&\?]*)|([\&\?]*$)/g,'')+'&invideo=false');
        mp.parentNode.replaceChild(mpC, mp);
    }

}

killAds();