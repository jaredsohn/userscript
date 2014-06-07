// ==UserScript==
// @name Technorati Rank
// @namespace http://www.joostdevalk.nl/code/technorati-rank/
// @description Shows the Technorati rank of the current page
// @include *
// ==/UserScript==

function printBox(url, rank) {
	var id = "technoratirankscript";
	
	if (top != window) {
		framesets = top.document.getElementsByTagName("frameset");
		if (!framesets[0]) {
			d = top.document;			
		} else {
			d = document;
		}
	} else {
		framesets = document.getElementsByTagName("frameset");
		if (!framesets[0]) {
			d = document;
		} else {
			frames = document.getElementsByTagName("frame");
			d = frames[0].contentWindow.document;
		}
	} 
	div = d.createElement("div");
	div.id = id;
	div.innerHTML = '<div style="position: absolute; left: 0px; top: 0px;' +
	'text-align: center; width: 200px; margin-bottom: 5px; z-index: 100; background-color: #000; padding: 2px;">' +
	'<p style="margin: 2px 0; background-color: inherit;"> ' +
	'<a target="_blank" style="border-bottom: 1px solid #000; background-color: inherit; ' +
	'font: bold 10px Verdana; color: #fff; font-weight: bold;" href="http://technorati.com/blogs/'+url+'">'+rank+'</a>' +
	'</p></div>';
	
	d.body.insertBefore( div, d.body.firstChild );
	window.setTimeout(
		function() {
			var div = d.getElementById( id );
			if ( div ) {
				div.parentNode.removeChild( div );
			}
		}
	, 2500 ); 
}

var url = document.location;

if (url != "") {
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://www.joostdevalk.nl/code/technorati-rank/technorati.php?url='+url,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
			if (responseDetails.responseText != "") {
	        	printBox(url, responseDetails.responseText);
			}
	    }
	});
}