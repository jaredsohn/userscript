// ==UserScript==
// @name           OKCupid reverse image search button
// @namespace      http://www.google.com/
// @description    Adds a button to put profile pictures into Google Images reverse search
// @include        http://www.okcupid.com/profile/*
// ==/UserScript==



function parseHTML(html) { // code borrowed from http://stackoverflow.com/a/2211473
    var range = document.createRange();
    range.setStartAfter(document.body);
    var xhr_frag = range.createContextualFragment(html);
    var xhr_doc = document.implementation.createDocument(null, 'html', null);
    xhr_doc.adoptNode(xhr_frag);
    xhr_doc.documentElement.appendChild(xhr_frag);
    
    return xhr_doc;
}

function fetch(url, handler) {
	GM_xmlhttpRequest({
	  method: "GET",
	  url: url,
	  onload: handler
	});
}

function reverseSearch(url, success, fail) {
	function gH(resp) {
		var googleDoc = parseHTML(resp.responseText);
		var topEle = googleDoc.getElementById("topstuff");
		if(topEle.innerHTML.match("Best guess")) {
			success(url);
		}
		else {
			fail(url);
		}
	}
	
	fetch("http://www.google.com/searchbyimage?image_url=" + escape(url), gH);
}







function picsH(resp) { 
	
	var albumDoc = parseHTML(resp.responseText);

	var picsDiv = albumDoc.getElementById('album_0');
	var picEles = picsDiv.getElementsByTagName("img");
	var matchCount = picEles.length;
	var caughtCount = 0;
	var goodURLs = [];

	function caughtURL(url) {
		goodURLs.append("http://www.google.com/searchbyimage?image_url=" + escape(url))
		urlsAfter()
	}
	
	function urlsAfter() {
		caughtCount++;
		if(caughtCount == matchCount) {
			if(goodURLs.length > 0) {
				alert("Success! URLS:\n" + goodURLs.join("\n\n"));
			}
			else{
				alert("No matches...");
			}
			tele.innerHTML = " [Done!]";
		}
		else{
			//alert(caughtCount + "\n" + matchCount);
		}
	}
	
	for(var i in picEles) {
		reverseSearch(picEles[i].src, caughtURL, function(url){urlsAfter()});
	}
}

function clickH() {
	tele.innerHTML = " [Working...]";
	fetch("http://www.okcupid.com/profile/" + profName + "/photos#0", picsH);
}



var nameSpan = document.getElementById('basic_info_sn');
var profName = nameSpan.innerHTML;

var tele=document.createElement("div");
tele.appendChild(document.createTextNode(" [Reverse search]"));
tele.style.fontSize="12px";
tele.addEventListener("click", clickH, false);

nameSpan.appendChild(tele);

//clickH()