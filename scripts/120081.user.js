// ==UserScript==
// @name          google_url_fix
// @namespace     http://www.flive.net
// @version	      v1.1.3
// @include       http://www.google.com.hk/search*
// @include       https://www.google.com.hk/search*
// @include       http://www.google.com.au/search*
// @include       https://www.google.com.au/search*
// @include       http://www.google.com/search*
// @include       https://www.google.com/search*
// @include       http://www.google.com.*/search*
// @include       https://www.google.com.*/search*
// ==/UserScript==

fixSearchUrl = function() {
	var fixer = function(url) {
		//Thanks to lee_sc_chs: http://userscripts.org/topics/97651
		if(url.indexOf('http://www.google.com.hk/url') == 0 || 
			url.indexOf('http://www.google.com/url') == 0 ||
			((url.indexOf('http://www.google') == 0 ||
				url.indexOf('https://www.google') == 0 )&& 
			(url.indexOf('/url')!=-1))) {
			var arr = url.split('&');
			for(n =0; n < arr.length;n++) {
				var str = arr[n];
				var arr2 = str.split('=');
				if(arr2.length ==2 && arr2[0] == 'url') {
					return decodeURIComponent(arr2[1]);
				}
			}
		}
		return url;
	}
	var fix_pager = function(q, url) {
		var re = /start=(\d+)/;
		var w = re.exec(url);
		if(w && w.length == 2) {
			url = "/search?q=" + q + "&start=" + w[1];		
		}
		return url;
	}
	
	
	var obj1=document.getElementById('ires').getElementsByTagName("a"); 
	var num=obj1.length; 
	for (i=0;i<num;i++) {
		obj1[i].onclick = function(event){
			event.preventDefault();
			var	url = fixer(this.href);
			window.open(url);
			return false;
		}
	} 
	
	
	var q = encodeURIComponent(document.getElementById('lst-ib').value);
	
	obj1=document.getElementById('nav').getElementsByTagName("a"); 
	num=obj1.length; 
	for (i=0;i<num;i++) {
		obj1[i].onclick = function(event){
			event.preventDefault();
			var	url = fix_pager(q, this.href);			
			window.location.href =url;
			return false;
		}
	} 
	
	
	
}

function contentEval( source ) {	
	if ('function' == typeof source) {
		source = '(' + source + ')();'
	}
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}
contentEval( fixSearchUrl );