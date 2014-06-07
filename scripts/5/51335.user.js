// ==UserScript==
// @name           Tumblr Noise Meter
// @namespace      http://pilnick.com
// @include        http://www.tumblr.com/following
// ==/UserScript==

var list=document.getElementById("following");
var count=0;
var x;
var strong;
var li;
var newElement;
var time;
var d = new Date();
var num = 100;
for( x in list.childNodes ){
	count++;
	li = list.childNodes[x];
	
	if(li.nodeName.toLowerCase() != "li")
		continue;

	strong = li.getElementsByTagName("strong");
	
	strong[0].addEventListener('click', fetch(li) , true);
}


function fetch(li){
	return function () {
		api = li.getElementsByTagName("a")[0].href + "api/read?num=1&start=" + num;
		
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: api,
		    headers: {
		        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
		        'Accept': 'application/atom+xml,application/xml,text/xml',
		    },
		    onload: function(responseDetails) {
		        var parser = new DOMParser();
		        var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
		        var post = dom.getElementsByTagName('post');
				var time = (d.getTime() /1000) - post[0].attributes.getNamedItem("unix-timestamp").value;
				time = time / ( 60 * 60 * 24 );
				time = Math.round((num * 10) / time)/10;
				strong = li.getElementsByTagName("strong");
				strong[0].innerHTML = time + " times per day.";
		    }
		});
	}
}