// ==UserScript==
// @name           LDR - FIFO Pin
// @namespace      http://iwamot.com/
// @include        http://reader.livedoor.com/reader/*
// @include        http://fastladder.com/reader/*
// @version        1.0.1
// ==/UserScript==

(function(){
	window.addEventListener('load', onLoad, false);

	function onLoad(){
		location.href = 'javascript:(' + function(){
			pin.add = function(url, title, info){
				if (this.has(url) || this.pins.length >= 100) return;
				this.hash[url] = true;
				var data = {title: title, url: url};
				if (info) data.icon = info.icon;
				this.pins.push(data);
				this.update_view();
				new Pinsaver().add(url, title);
			}
		}.toString() + ')()';
	}
})();
