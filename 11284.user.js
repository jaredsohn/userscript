// ==UserScript==
// @name          insert location info into Google Maps search box
// @namespace     http://d.hatena.ne.jp/Koumei_S/
// @description	  inserts lat/long info into Google Maps by double-clicking at search box.
// @include       http://maps.google.co.jp/*
// @include       http://maps.google.com/*
// @include       http://www.google.co.jp/maps*
// @include       http://www.google.com/maps*
// @version       1.3
// ==/UserScript==

(function(){
	var o=document.getElementById('q_d');
	var input=function(){
		var loc=document.getElementById('link').href;
		if(loc.match(/[\?&]ll=([\d\.\-]+,[\d\.\-]+)/)){
			this.value=loc.match(/[\?&]ll=([\d\.\-]+,[\d\.\-]+)/)[1];
		}
		else if(loc.match(/[\?&]near=(.*?)[&$]/)){
			this.value=decodeURI(loc.match(/[\?&]near=(.*?)[&$]/)[1]);
		}
		else if(loc.match(/[\?&]q=(.*?)[&$]/)){
			this.value=decodeURI(loc.match(/[\?&]q=(.*?)[&$]/)[1]);
		}
	};
	o.addEventListener('dblclick',input,false);
})();