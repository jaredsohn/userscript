// ==UserScript==
// @name           Google Reader to Instapaper - The Remix
// @namespace      http://alexkessinger.net/
// @description    add to instapaper directly from greader
// @include        http://www.google.com/reader/view/*
// ==/UserScript==
(function(){
	var w = unsafeWindow;
	var shortCutKey = 'b';
	var USER_KEY = 'MxtGPCQwxkcH';
	function toInstapaper(title, url)
	{
		var e = encodeURIComponent;
		var f = 'http://www.instapaper.com/b?v=4&k='+USER_KEY+'&u=' + e(url) + '&t=' + e(title);
		
		
		GM_xmlhttpRequest({
            method: 'GET',
            url: f,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Accept': 'application/atom+xml,application/xml,text/xml',
            }
        });
        /*
		var script = document.createElement("script");
		script.src = f;
		console.log(script);
		document.body.appendChild(script);
		*/
		
	}

	function keyPressEvent(event){
		var kcode = (event.keyCode)?event.keyCode:event.which;
		var k = String.fromCharCode(kcode);
		if(k == shortCutKey){
		var parent = event.target;
	  	var link = parent.getElementsByClassName("entry-title-link")[0].getAttribute('href');
	  	var title = parent.getElementsByClassName("entry-title-link")[0].innerHTML;
	  	
	  	debug(title);
	  	debug(link);
	  	toInstapaper(title, link);
	   }
	}

	document.addEventListener("keypress", keyPressEvent, true);
	
})();
