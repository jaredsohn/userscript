// ==UserScript==
// @name           xkcd link display
// @namespace      notme
// @description    Get xkcd comics from <a> ( http://xkcd.com/605/ ) and displays it on the page
// @include        http://*
// @exclude       http://xkcd.com*
// @exclude       http://*.xkcd.com*
// @exclude	*google*
// @exclude	*userscripts.org*
// ==/UserScript==


// *********** Notes
// http://xkcd.com/license.html seems to okay hotlinking
// The script does create a link back to xkcd.com
// Also leaves the orginal link in place

function wDiv(divstuff, dDiv) {
	var f = document.getElementById(dDiv);
	f.innerHTML = divstuff;
}


function gxkcd(xUrl, dDiv) {

	GM_xmlhttpRequest({
		method: "GET",
		url: xUrl,
		onload: function(responseDetails) {

			var dtype = document.implementation.createDocumentType("html", 
			"-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
			doc = document.implementation.createDocument('', '', dtype),
			html = doc.createElement('html');

			html.innerHTML = responseDetails.responseText;
			doc.appendChild(html);


			var tags = doc.getElementsByTagName('img');

			//Code to Snag src, title, alt
			for (var y = 0; y < tags.length; y++) {

				if (tags[y].src.match("comics") != null) {
					// Add style later
					var iDiv = "</br><center><h6><a class=\'xlnk\' href="+xUrl+" target=_blank title=" + xUrl + ">" 

+ tags[y].alt + "</a></h6></small></br>";
					iDiv += "<img src=" + tags[y].src + "></br>";
					iDiv +=  tags[y].title  + "</center></br>";

					wDiv(iDiv, dDiv);

				} // End if

			} // End for 
		}  // End onload
	}); // End GM_xmlhttpRequest
} // end gxkcd




var a = document.getElementsByTagName('a');
var wS = 0;
var mxp = new RegExp("http://xkcd.com/[0-9]");

for (var i = 0; i < a.length; i++) {
	if (a[i].href.match(mxp) != null) {

		//a[i].parentNode.innerHTML += "<div id=xk"+ i +" class=xk><small>(xkcd)</small></div>" ;
		var xDiv = document.createElement('div');
		xDiv.setAttribute('id',  'xk'+i);
		xDiv.setAttribute('class', 'xk');
		a[i].parentNode.insertBefore(xDiv, a[i].nextSibling);
		


			if (!wS) {
				GM_addStyle(".xlnk { color: #000000 !important; text-decoration: none !important; } h6 { font-family: tahoma !important; font-size: 40px; font-weight: bold; color: #000000 } .xk { color: #000000 !important; background-color: #96a8c8 !important; border:1px solid #ffffff !important; display: table !important; padding:4px !important;}");
				wS = 1;
			}
		gxkcd(a[i].href.toString() , "xk"+ i);
		//a[i].parentNode.removeChild(a[i]);

	} // end if


}


