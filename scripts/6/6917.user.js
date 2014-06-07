// ==UserScript==
// @name         weakgame.com video download link
// @namespace     http://www.digivill.net/~joykillr
// @description   Adds a download link to weakgame.com so videos can be downloaded.
// @include       http://*.weakgame.com/*
// @include       http://weakgame.com/*
// ==/UserScript==
//

function xpath(doc, xpath) {
	return doc.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }

	function getURL(tokenURL) {
GM_xmlhttpRequest({
  method:"GET",
  url:tokenURL,
  headers:{
    "User-Agent":"Mozilla/4.8 [en] (Windows NT 5.1; U)",
    "Accept":"text/xml",
    },
onload:function(details) {
      var URLstring = new String(details.responseText);
	  URLstring = "http://media.weakgame.com/" + URLstring.split("http://media.weakgame.com/")[1].split('"')[0];
		//topnav_temp.jpg
	  var URLDLbox = document.createElement("tr");
	  URLDLbox.setAttribute("style", "display: block !important; margin-left:16px;");
	  //URLDLbox.innerHTML = '<a href="' + URLstring + '">Click Here To Download Video</a>';
	  URLDLbox.innerHTML = '<td style="text-align:left;"><a href="' + URLstring +
	  //'" style="background:url(http://www.weakgame.com/images/topnav_temp.jpg);' +
	  '" style="background-color:yellow;' +
	  'color:#000000; border-width:medium;' + 
	  //'border-style:solid; border-color:#4361a7;">' +
	  'border-style:double; border-color:black;">' +
	  'Click Here To Download Video</a></td>';

  document.getElementById("media_left").parentNode.parentNode.insertBefore(URLDLbox, document.getElementById("media_left").parentNode.parentNode.firstChild);
  }
  
});
}

var nodes = xpath(document,"//div[@class='mediaplayer']/script");

for (x=0;x<nodes.snapshotLength;x++) {
	var loc = nodes.snapshotItem(x).src;
	loc = loc.split("&src=")[1].split("&width=")[0];
	getURL(loc);
	}
	