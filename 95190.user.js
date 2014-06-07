// ==UserScript==
// @name           SomaFM Prevent Autoplay
// @namespace      http://maxkueng.com/gmscripts
// @description    Prevents auto-forward to the stream and links the "Listen" links directly to the audio stream
// @version        1.0
// @author         Max Kueng
// @homepage       http://maxkueng.com/
// @include        http://somafm.com/
// @include        http://somafm.com/play/*
// ==/UserScript==


(function (){
	
	var links = document.getElementsByTagName('a');
	var reg_href = /.+\/play\/([a-z0-9\/]+)$/i;
	for (var i = 0; i < links.length; i++) {
		if (links[i].href.match(reg_href)) {

			var has_img = false;
			var children = links[i].childNodes;

			for (var ii = 0; ii < children.length; ii++) {
				has_img = (children[ii].nodeName == 'IMG')
			}

			if (has_img) {
				var m = reg_href.exec(links[i].href);
				links[i].href = 'http://somafm.com/' + m[1] + '/played';
			
			} else {
				var m = reg_href.exec(links[i].href);

				links[i].href = 'http://somafm.com/' + m[1] + '.pls';
			}

		}
	}



}());
