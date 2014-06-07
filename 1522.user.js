// ==UserScript==
// @name           Samurai.fm In RealPlayer
// @namespace      http://maxkueng.com/gmscripts
// @description    Transforms links to samurai.fm stations (popups) into real RealMedia links
// @version        1.0
// @author         Max Kueng
// @homepage       http://maxkueng.com/
// @include        http://*samurai.fm/*
// ==/UserScript==

(function (){
		
	var a = document.getElementsByTagName('a');
	var reg = new RegExp("javascript:openPlayer\\('(\\w\\w)',([0-9]*),'(.*)'\\);");

	for (var i=0;i<a.length;i++) {
		if (a[i].href.match(reg)) {
			var sp = reg.exec(a[i].href);
			a[i].href = 'http://www.samurai.fm/play.ram?id=' + sp[2] + '&t=' + sp[3];
		}	
	}
	
}());

