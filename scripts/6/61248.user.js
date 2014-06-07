// ==UserScript==
// @name           mymedia.yam parser
// @author         frank38
// @version        1.0
// @namespace      
// @description    create a donwload link 
// @include		   http://mymedia.yam.com/m/*
// ==/UserScript==

loc = window.location.toString();

if(loc.match(/mymedia.yam/))
	yam_parser(loc);

function yam_parser(url) {
	var id = url.toString().match(/\d+/gim);
	parseUrl = 'http://mymedia.yam.com/api/a/?pID=' + id;
	ajaxRequest(parseUrl);
}

function ajaxRequest(url) {
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: url,
	    onload: function(responseDetails) {
	    	if(/(=)(http.+mp3)/.test(responseDetails.responseText.toString())) {
	    		download = responseDetails.responseText.toString().match(/(=)(http.+mp3)/)[2].toString();
	    		createHtml(download);
	    	} else {
	    		createHtml(null);
	    	}
		},
		onerror: function () {
			createHtml(null);
		}
	});
}

function createHtml(link) {
	if(!link)
		return;
	html = '<a style="padding-left:4px;color:#F00;text-decoration: none;" href="' + link + '">[DL]</a>';
	h1_tag = document.getElementsByTagName('h1');
	for(i=0; i<h1_tag.length; i++) {
		if(h1_tag[i].className.match(/heading/)) {
			h1_tag[i].children[0].innerHTML += html;
			break;
		}
	}
}
