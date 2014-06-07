// ==UserScript==
// @name           	draugiem.lv music download
// @namespace     	2xa|06466bfef6e7e40e52d572902df6757d
// @description    	download music tracks from draugiem.lv music section
// @include        	http://*draugiem.lv/*
// @include        	http://*frype.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version        	0.7
// ==/UserScript==

var musicPlayer = $('div[id^="player_player_"]');

if (typeof(musicPlayer) != "undefined" && musicPlayer != null)
{	var url = decodeURIComponent($(musicPlayer).children('embed:first').attr('flashvars')).substr(5);
	var domain = window.location.host;
	if (domain.search(/draugiem/i) >= 0) { var link_title = "Lejupielādēt dziesmas"; }
	else { var link_title = "Download songs"; }

	if (GM_xmlhttpRequest) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://' + domain + url,
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'application/xml,text/xml',},
			onload: function(responseDetails) {
				var parser = new DOMParser();
				var responseText = responseDetails.responseText.replace(/^\s*/,"");
				var dom = parser.parseFromString(responseText, "text/xml");
				var entries = dom.getElementsByTagName('song');
				var downloadLinks = new Array();
				var c = 0;
				for (var i = 0; i < entries.length; i++)
				{ downloadLinks[i] = ++c + '. ' + '<a href="' + entries[i].attributes.getNamedItem("url").value + '">' + entries[i].attributes.getNamedItem("name").value +'</a>'; }

				if (downloadLinks.length > 0) {
				    var downloadLinkDiv = document.createElement('div');
				    downloadLinkDiv.innerHTML = '<script type="text/javascript">function expand_collapse() { ' +
				                             'var downloadMenu = document.getElementById("downloadable_songlist");' +
				                             'if ( downloadMenu.style.display != "none" ) { downloadMenu.style.display = "none"; } ' +
				                             'else { downloadMenu.style.display = ""; }' +
				                             '}</script>' +

				                             '<div>' +
				                                '<a onclick="expand_collapse()" style="cursor: pointer;"><b><u>' + link_title + '</u></b></a>' +
				                                '<div id="downloadable_songlist" style="display: none; background: #fafafa; padding: 4px; border: solid 1px #e3e3e3; ">' +
				                                downloadLinks.join("<br />") +
				                                '</div>' +
				                             '</div>';
				    $(musicPlayer).append(downloadLinkDiv);
			    }
			}
		});
 	}
}
