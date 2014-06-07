// ==UserScript==
// @name					Technorati Links
// @namespace			http://www.chriswere.com/code
// @description		Show the most recent references to the current page as they appear on technorati
// @exclude				http://*google.com*
// ==/UserScript==

// Author: Chris Were
// Blog: http://www.chriswere.com/
// ...
// Shameless plug:
// Want to try a different RSS reader?
//
// http://www.feedtagger.com


(function() {

	numLinks = 5;
	
	// create an element to place content into
	var pageElm = document.createElement("DIV");
	pageElm.style.position = 'fixed';
	pageElm.style.left = '10px'
	pageElm.style.bottom = '10px'
	pageElm.style.zIndex = 100;
	pageElm.style.backgroundColor = '#FFFFFF';
	pageElm.style.fontSize = '10pt';
	pageElm.style.fontFamily = 'Arial';
	pageElm.style.textAlign = 'left';
	pageElm.style.padding = '3px';
	pageElm.style.filter = "alpha(opacity=70)";
	pageElm.style.opacity = '0.70';
	pageElm.style['-moz-opacity'] = '0.70';
	pageElm.style.display = "none";
	
	make_visible = function() {
		pageElm.style.filter = "alpha(opacity=100)";
		pageElm.style.opacity = '1';
		pageElm.style['-moz-opacity'] = '1';
	}
	
	pageElm.onmouseover = make_visible;
	
	var body = document.getElementsByTagName("body");
	body[0].appendChild(pageElm);
	
	GM_xmlhttpRequest({
    method: 'GET',
    url: "http://www.technorati.com/search/"+escape(location.href),
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
      if (responseDetails.status == 200)
				parse_page(responseDetails.responseText,pageElm);
    }
	});
	
	function parse_page(resp,pageElm) {
		var re = /<cite>(.+)<\/cite>/gi;
		var ma = resp.match(re);
		limit = numLinks;
		if (ma) {
			for (m in ma) {
				pageElm.innerHTML += ma[m]+'<br />';
				limit--;
				if (limit == 0)
					break;
			}
			pageElm.style.display = "block";
		}
	}
	
	
	
})();
