// ==UserScript==
// @name        KG - show year on requests
// @namespace   KG
// @include     http*://*karagarga.net/viewrequests.php*
// @version     1
// ==/UserScript==

var match = "imdb.com/title/tt";

// don't run in iframes
if (window.frameElement) return;

var links = document.links;
for (i=0; i < links.length; i++) {
	var h = links[i].href + "";
	if (h.indexOf('/reqdetails.php?') != -1 && h.indexOf('#') == -1) {
		getIMDB(links[i]);
	}
}

function getIMDB(link) {
	if ( /\(\d\d\d\d\)/.test(link.textContent) ) { return; }  // match four digits in brackets, return if already exists

	 GM_xmlhttpRequest({
  method: "GET",
  url: link.href,
  onload: function(response) {
   
   var code = response.responseText;
   var url = response.finalUrl;  
   
   var start = code.indexOf(match);
   if (start != -1) {
	   var imdbNum = code.substr(start + match.length, 7);
	   getYear(link, imdbNum);
   }
   
  }
 });
}


function getYear(link, imdbNum) { 
	// GM_log(imdbNum + " : " + link.href);
	
GM_xmlhttpRequest({
  method: "GET",
  url: "http://imdb.com/title/tt" + imdbNum,
  onload: function(response) {
   
   var code = response.responseText;
   var url = response.finalUrl;  
   
   var code2 = code.substr(code.indexOf("<title>"));
   var year = code2.match(/\(\d\d\d\d\)/);

   link.textContent += " - " + year;

   
   }
 });	
}