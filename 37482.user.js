// ==UserScript==
// @name           Google Reader to Instapaper
// @namespace      http://caffo.chaosnet.org/
// @description    add to instapaper directly from greader
// @include        http://www.google.com/reader/view/*
// ==/UserScript==
(function(){
	var w = unsafeWindow;
	var shortCutKey = 'b';
	function toInstapaper(title, url)
	{
		var e = encodeURIComponent;
		var f = 'http://www.instapaper.com/b?v=4&k=Ax0iMVvfQOcN&u=' + e(url) + '&t=' + e(title);
		setTimeout(function(){
			w.open(f,'t','toolbar=0,resizable=0,status=1,width=250,height=150');
		}, 0);
	}

	function keyPressEvent(event){
		var kcode = (event.keyCode)?event.keyCode:event.which;
		var k = String.fromCharCode(kcode);
		if(k == shortCutKey){
	  	var item 	= document.getElementById('current-entry').childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
	  	var title       = item.innerHTML.split("<img")[0];
	  	var url 	= item['href'];
	  	debug(title);
	  	debug(url);
	  	toInstapaper(title, url);
	   }
	}

	document.addEventListener("keypress", keyPressEvent, true);
	
})();