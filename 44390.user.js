// ==UserScript==
// @name           Luelinks Topic Auto-Pagification
// @namespace      none so far
// @description    v2
// @include        http://boards.endoftheinter.net/showmessages.php?board=*&topic=*
// @include        https://boards.endoftheinter.net/showmessages.php?board=*&topic=*
// ==/UserScript==

function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}
var get = getUrlVars() ;
var p = ("page" in get) ? parseInt(get['page']) : 1 ;
var loadingPage = false ;
function topicAutoPagification() {
	//some code to detect window position
	var scrollH = window.pageYOffset ;
	var dispH = window.innerHeight ;
	var maxS = document.body.clientHeight ;
	
	if (maxS < scrollH + (dispH * 3) && loadingPage == false) {
		loadingPage = true ;
		p = p + 1 ;
		//alert("Loading page " + p);
		url = (document.location.href.indexOf("https://") != -1) ? "https://" : "http://" ;
		url = url + "boards.endoftheinter.net/showmessages.php?board=" + get['board'] + "&topic=" + get['topic'] + "&page=" + (p) ;
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: function(xhr) { insertNextPage(xhr.responseText) }
		})
	}
}
function insertNextPage(req) {
	page = req.split("<div class=\"infobar\"")[1]
	page = page.substring(page.indexOf("</div>") + 6) ;
	//page is now just the messages on the next page
	var divs = document.body.getElementsByTagName("div") ;
	len = divs.length ;
	for(var i = 0; i < len;  i++)
		if (divs[i].getAttribute("class") == "infobar")
			div = divs[i] ;
	if (page.length > 50) {
		pa = document.createElement("div") ;
		pa.innerHTML = page ;
		div.parentNode.insertBefore(pa, div.nextSibling) ;
		loadingPage = false ;
	} else {
		clearInterval(paging) ;
	}
		
}
var paging = setInterval(topicAutoPagification, 500) ;