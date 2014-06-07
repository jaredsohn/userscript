// ==UserScript==   
// @name            TopicPageLinks
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.0.0
// @description     Converts the "last" link in the forums into a link to individual pages in the topic (ie. "1 | 2 | 3 | 4" instead of "last")
// @include         http://www.kongregate.com/forums/*
// @homepage        http://userscripts.org/scripts/show/98515
// ==/UserScript==  
if (/^\/?forums\/\d+[^\/?]*[^\/][\s\S]*/.test(window.location.pathname)) {
setTimeout(function() {
var body = document.body;
body.innerHTML = String(body.innerHTML).gsub(/<small><a href="([^?"]+\?page=)(\d+)">last<\/a><\/small>/i, function(a){
var url = a[1], last = parseInt(a[2], 10), rtn = "<small>";
if (last > 7) {
	rtn += '<a href="'+url+'1">1</a> | <a href="'+url+'2">2</a> | <a href="'+url+'3">3</a> | \u2026 | ';
	last -= 2;
	rtn += '<a href="'+url+last+'">'+last+++'</a> | <a href="'+url+last+'">'+last+++'</a> | <a href="'+url+last+'">'+last+++'</a>';
} else if(last == 7) {
	rtn += '<a href="'+url+'1">1</a> | <a href="'+url+'2">2</a> | <a href="'+url+'3">3</a> | <a href="'+url+'4">4</a> | <a href="'+url+'5">5</a> | <a href="'+url+'6">6</a> | <a href="'+url+'7">7</a>'
} else if(last>1) {
	var i=1;
	while(i!=last) {
		rtn += '<a href="'+url+i+'">'+i+++'</a> | ';
	}
	rtn += '<a href="'+url+i+'">'+i+++'</a>';
}
return rtn + "</small>";
});
}, 1250);
}