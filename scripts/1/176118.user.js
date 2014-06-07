// ==UserScript==
// @name       Torrent Kitty Vod
// @namespace  http://rix.li/
// @version    0.1
// @description  Add Xunlei Vod play button for search results.
// @match      *://www.torrentkitty.com/*
// @copyright  2013, Rix
// ==/UserScript==

var results = document.querySelectorAll('#archiveResult tr');

var listener = function(url) {
    return function(event) {
        console.log(url);
        window.open('http://vod.xunlei.com/iplay.html?uvs=_4_&url=' + encodeURIComponent(url),
        	'_blank',
                    'channelmode=1,directories=0,location=0,menubar=0,height=640,width=1030,resizeble=0,scrollbars=0,status=0,toolbar=0,top=200,left=400');
        return event.preventDefault();
    }
}

for(var i in results) {
	var link = results[i].querySelector('.action a[href^=magnet]');
    if(link != undefined) {
    	var a = document.createElement('a');
        a.innerText = 'Play';
        a.href='#';
        a.addEventListener('click', listener(link.href));
        results[i].querySelector('.action').appendChild(a);
    }
}