// ==UserScript==
// @id             z0r.de-description@darkdaskin.tk
// @name           z0r.de animation description
// @namespace      darkdaskin.tk
// @author         Dark Daskin
// @description    Shows animation description from index.z0r.de
// @include        http://z0r.de/*
// ==/UserScript==

window.addEventListener('load', function() {
	var match = (/z0r.de\/(\d+)/i).exec(window.location);
	if (!match) return;
	var id = match[1];
	
	var indexUrl = 'http://index.z0r.de/Seite' + (Math.floor(id / 100) + 1) + '.html';
	GM_xmlhttpRequest({
		method: "GET",
		url: indexUrl,
		onload: function(response) {
			var wrapper = document.createElement('wrapper');
			wrapper.innerHTML = response.responseText;
			var row = document.evaluate(".//table[@id='zebra']//tr[th/a='" + id + "']", wrapper, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			
			var tag = row.cells[4].innerHTML;
			if(tag == 'a') tag = 'Anime/Cartoon';
			if(tag == 'f') tag = 'Film/Movie';
			if(tag == 'g') tag = 'Game';
			if(tag == 'tv') tag = 'TV-Show/Series';
			if(tag == 'mv') tag = 'Music Video';
			if(tag == 'x') tag = 'Misc.';

			var infoDiv = document.createElement('div');
			infoDiv.innerHTML = "<b>Interpreter</b>: " + row.cells[1].innerHTML + 
								"<br /><b>Song Title</b>: " + row.cells[2].innerHTML + 
								"<br /><b>Image Source</b>: " + row.cells[3].innerHTML + 
								"<br /><b>Tag</b>: " + tag;
			
			var navigationDiv = document.getElementById('navigation');
			navigationDiv.parentNode.insertBefore(infoDiv, navigationDiv);
			
		}
	});
}, false);