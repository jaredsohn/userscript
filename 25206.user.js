// ==UserScript==
// @name          YourSpaceVidFetch
// @author        Ryan Rosario
// @description   adds "Download This Video" link where you can download videos in flv format.
// @include       http://vids.myspace.com/index.cfm?fuseaction=vids.individual&videoid=*
// ==/UserScript==


(function() {
	function getFLAddress() {
		return location.href.split("=")[2];
	}

	var xmlURL;
	xmlURL = 'http://mediaservices.myspace.com/services/rss.ashx?type=video&mediaID=' + getFLAddress();

	GM_xmlhttpRequest({
	    method: 'GET',
	    url: xmlURL,
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible)',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
		var match = /url="(http:\/\/content.*?)" /g.exec(responseDetails.responseText);
		var video_url = match[1];
		// add banner with download link
		var my_banner = document.createElement("div"); my_banner.innerHTML =
		'<div style="border-bottom: 1px solid #CCCCCC; margin-bottom: 10px; font-size: small; background-color: #0000FF; color: #FFFFFF;">' +
		    '<p style="margin:0px;padding: 5px;text-align:center;">' +
		    '<a href="' + video_url + '" style="color:#FFFFFF; font-weight:bold; font-size:10px;">Click Here to Download Flash Video to Disk</a>' +
		    '</p></div>';
		document.body.insertBefore(my_banner, document.body.firstChild);
		// clean up body margin
		document.body.style.margin = '0px';
	    },
	   onerror: function(responseDetails) {
	   	alert("Some type of error occurred.");
	   }
	});

})();
