// ==UserScript==
// @name          Wildcat
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Wildcat picture viewer
// @include       http://www.wildcat.de/*
// ==/UserScript==

//2008-03-20

var allElements = document.getElementsByTagName('a');
if (allElements) {
	for (var i = 0; i < allElements.length; i++) {
		var thisElement = allElements[i];

		var strRef = thisElement.href;

		if (strRef.indexOf('view=pro_picture') >= 0) {
			followLink(thisElement);
		} else if (strRef.indexOf('var f=window.open') >= 0) {
			//open gallery in a new tab
			//thisElement.href = 'index.php?view=pro_pic&layout=2&id' + strRef.match(/id(.*?)\'/)[1] + '&filter=gt0'
			thisElement.href = strRef.match(/\'(.*?)\'/)[1];
			thisElement.target = '_blank';
		}
	}
}

function followLink(link) {
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: strRef,
	    onload: function(responseDetails) {
	    	var inhalt = responseDetails.responseText;
	    	link.href = inhalt.match(/img src="(http.*?checksum.*?)"/)[1];
	    	link.rel = 'lytebox[group]'; //lytebox
		    link.title = link.parentNode.textContent;
		    link.innerHTML = link.innerHTML.replace('border="0"', 'border="4"');
	    }
	});
}

var head = document.getElementsByTagName('head')[0];
if (head) {
	var link
	link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'StyleSheet';
	link.href = 'http://www.faszination-china.com/css/lytebox_322cmod1.3.css'; //lytebox_mod
//	link.href = 'http://www.dolem.com/lytebox/lytebox.css'; //lytebox
	head.appendChild(link);

	link = document.createElement('script');
	link.type = 'text/javascript';
	link.language = "javascript"
	link.src = 'http://www.faszination-china.com/js/lytebox_322cmod1.3.p.js'; //lytebox_mod
//	link.src = 'http://www.dolem.com/lytebox/lytebox.js'; //lytebox
	head.appendChild(link);
}