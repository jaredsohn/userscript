// ==UserScript==
// @name           Tiny check
// @namespace      http://onet.5q.pl
// @description    Sprawdza tiny-urle
// @include        http://www.wykop.pl/link/*
// ==/UserScript==

//CONFIG

var services = new Array(
	'tnij.',
	'tiny.',
	'm4ly.',
	'ytq.',
	'skocz.',
	'tinyurl.',
	'gourl.',
	'ujeb.',
	'goo.'
);

//CONFIG END


function get(url, cb) {
 GM_xmlhttpRequest({
 method: "GET",
 url: url,
 onload: function(xhr) { cb(xhr.responseText); }
}); 
}

function add_title(obj,reason){
	get('http://l.misie.org/?link='+obj.href,function(text){
			var start=text.indexOf('value="')+7;
			var len  =text.indexOf('"wfs"')-start-2;
			
			var t=text.substr(start,len);
			var url=t.substr(0,t.indexOf('"'));
			console.log(url);
			var start=text.indexOf('<a');
			var len  =text.indexOf('</a>')-start;
			
			var t=text.substr(start,len);
			var hint=t.substr(t.indexOf('>')+1);
			console.log(hint);
			
			var links = document.getElementsByTagName('A');
			for(var i=0; i<links.length; i++){
				if(links[i].href.indexOf(url)>=0 && links[i].innerHTML.indexOf('Redirect:')<0){
					links[i].innerHTML+=' <b>Redirect: '+hint+'</b>';
					console.log('Math: '+reason);
				}
			}
	});
}

var links = document.getElementsByTagName('A');

for(var i=0; i<links.length; i++){
    for(var j=0; j<services.length; j++){
		if(links[i].href.indexOf(services[j]) > -1)
			add_title(links[i],services[j]);
    }
}














