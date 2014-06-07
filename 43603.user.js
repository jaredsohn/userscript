// ==UserScript==
// @name           Twitpic Thumbnailer
// @namespace      http://matatabi.homeip.net
// @description    show thumbnail image of Twitpic
// @include        http://twitter.com/*
// @include        http://search.twitter.com/*
// ==/UserScript==

(function(d){
    function main() {
	var anchors = d.getElementsByTagName('a');
	var anchors_length = anchors.length;
	for (var i=0; i<anchors_length; i++) {
	    var a = anchors[i];
	    if (a.hostname != 'twitpic.com') continue;
	    if (a.pathname.indexOf('.') != -1) continue;
	    if (a.pathname.length < 2) continue;
	    if (a.pathname.lastIndexOf('/') != 0) continue;
	    if (a.search || a.hash) continue;
	    
	    var imgs = a.getElementsByTagName('img');
	    var imgs_length = imgs.length;
	    var showing = false;
	    for (var j=0; j<imgs_length; j++)
		if (imgs[j].src.indexOf(a.hostname)) {
		    showing = true;
		    break;
		}
	    if (showing) continue;
	    
	    var img = d.createElement('img');
	    img.style.display = 'block';
	    img.src = 'http://' + a.hostname + '/show/mini' + a.pathname;
	    a.appendChild(img);
	}
	setTimeout(main, 60000);
    }
    setTimeout(main, 100);
}(document));
