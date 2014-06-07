// ==UserScript== // @name          Twitter Display Popular Trends// @namespace     http://www.imusicmash.com// @description   Display popular Twitter Trends on Twitter home page
// @include       http://twitter.com/home*
// @include       https://twitter.com/home*
// ==/UserScript==

(function() {
	
var tabMenuElem = document.getElementById("tabMenu");
var popSearchLi = document.createElement("li");

popSearchLi.setAttribute("style","padding-left:12px;");
tabMenuElem.appendChild(popSearchLi);

var html = "";

GM_xmlhttpRequest({method: 'GET',url: 'http://search.twitter.com/trends.json',
headers:{
    "User-Agent":"Mozilla/5.0",
    "Accept":"text/xml"
},    
onload: function(results) {
    var data = eval('('+results.responseText+')');     
    for (var i=0; i<data.trends.length; i++) {
    	var searchTerm = data.trends[i].name;
    	var searchTermUrl = data.trends[i].url;
    	html += '<a style="background-image:url(); display:inline; font-size:100%; font-weight:normal;padding:3px;" href="' + searchTermUrl + '" target="_blank">'+searchTerm+'</a><br>';	
    }   
    html = '<span style="font-size:110%; font-weight:bold;">Popular Trends</span><br>' + html;
    popSearchLi.innerHTML = html; 	   	
}
}); // end of http request

})(); 