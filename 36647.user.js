// ==UserScript==
// @name           Google Scholar immediately available highlighter
// @namespace      http://www.vex.net
// @description    Highlights links in Google Scholars page that can be seen immediately and at no cost.
// @include        http://scholar.google.*
// ==/UserScript==

function get(url, callBack, a) {
	GM_xmlhttpRequest({
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': ',text/html', },
		method: "GET",
		url: url,
		onload: function ( xhr ) { callBack ( xhr . responseText, a ); }
	});
}

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

var as = document.getElementsByTagName("a");

function callBack ( responseText, a ) {
	if ( responseText.indexOf ( '/ERICWebPortal/contentdelivery/servlet/ERICServlet' ) != -1 ) {
		a.innerHTML = "<span style='font-size: 150%; font-weight: bold; '>" + a.innerHTML + "</span>";
	}
}

for (i=0; i<as.length; i++) {
	if (as[i].href.slice(0,20) == "http://books.google.") { as[i].innerHTML = "<span style='font-size: 150%; font-weight: bold; '>" + as[i].innerHTML + "</span>";}
}

for (i=0; i<as.length; i++) {
	if (as[i].href.slice(0,18) == "http://eric.ed.gov") { 
		get ( as[i].href, callBack, as [ i ] ) ;
	}
}

var anchors = $x("//p/span/span/following-sibling::*");
anchors.forEach( 
	function(anchor) { 
		anchor.innerHTML = "<span style='font-size: 150%; font-weight: bold; '>" + anchor.innerHTML + "</span>";
	}
);

var anchors = $x("/html/body/b/a");
anchors.forEach( 
	function(anchor) { 
		anchor.innerHTML = "<span style='font-size: 150%; font-weight: bold; '>" + anchor.innerHTML + "</span>";
	}
);

var anchors = $x('//h3/font/b[text()="[PDF]"]/parent::*/parent::*/a');
anchors.forEach( 
	function(anchor) { 
		anchor.innerHTML = "<span style='font-size: 150%; font-weight: bold; '>" + anchor.innerHTML + "</span>";
	}
);

