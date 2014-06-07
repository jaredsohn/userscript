// PHD  user script
// version 0.3
// 2008-08-31
// Copyright (c) 2008, miserablegit
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          PornHub Downloader v2
// @description   Add a "download" link to PornHub pages
// @include       http://www.pornhub.com/view_video*
// @include       http://pornhub.com/view_video*
// ==/UserScript==

// find where the xml with data is
re = /(.*)mx_player_config.php(.*)\"\);/gm
plDiv = document.getElementById("playerDiv_0"); 

script = new String(plDiv.nextSibling.nextSibling.textContent);
info = re.exec(script);
var url;

url = "http://www.pornhub.com/mx_player_config.php" + decodeURIComponent(info[2]);

// get the xml fragment
GM_xmlhttpRequest({
	method: 'GET',
	url: url,
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(responseDetails) {
		// extract url
		flv_re = /\<flv_url\>(.*)\<\/flv_url\>/gmi
		flvurl = responseDetails.responseText.match(flv_re)[0].replace(flv_re,"$1");
		// add link to page		
newDiv = document.createElement('div');
		newDiv.innerHTML = '<div class="video-info" style="text-align: center;"><a href="' + flvurl+ '">Download this video</a> (right-click, Save As) without signup.</div>';
		var allDivs, thisDiv;
		allDivs = document.evaluate(
			"//div[@class='sub-video-menu']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		for (var i = 0; i < allDivs.snapshotLength; i++) {
			thisDiv = allDivs.snapshotItem(i);
			thisDiv.parentNode.insertBefore(newDiv,thisDiv);
		}
	}
});

