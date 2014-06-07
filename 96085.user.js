// ==UserScript==
// @name           RTL-NL Media URL
// @namespace      http://userstyles.org
// @description    This script presents the WVX (Windows Media) URL for videos on rtl.nl sites, including RTL XL.
// @author         haffmans
// @homepage       http://userscripts.org/scripts/show/96085
// @include        http://rtl.nl/*
// @include        http://*.rtl.nl/*
// ==/UserScript==

(function() {

function linkHtml(url) {
	return '<div class="medialink" style="padding: 4px; background: white;"><a href="' + url + '" title="' + url + '" style="font-weight: bold; font-size: 1.2em; background: white; color: #800000; margin: 4px auto; display: block; border: 1px solid #800000; text-align: center;">Right-click for Stream URL</a></div>';
}

function getClipInfo(value) {
	var items = value.items;
	var bandwidth = 0;
	var url = '';
	for (i in items) {
		item = items[i];
		if (item.bandwidth > bandwidth) {
			url = item.file;
		}
	}
	
	if (url == '') {
		return;
	}

	player = document.getElementById('rtlpp_player');
	player.innerHTML = linkHtml(url) + player.innerHTML;
}

var xlLastUrl = '';

function xlPageLoad() {
	slc = document.getElementById("silverlight_control");
	if (!slc) {
		setTimeout(xlPageLoad, 1000);
		return;
	}

	params = slc.children;
	for (p in params) {
		param = params[p];
		if (param.tagName != "PARAM" || param.attributes.getNamedItem("name").value != "source") {
			continue;
		}
		value = (param.attributes.getNamedItem("value")) ? param.attributes.getNamedItem("value").value : '';
		
		if (value == '' || value == xlLastUrl) {
			break;
		}
		
		xlLastUrl = value;
		url = unsafeWindow.host + value;
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function(response) {
				contents = response.responseText;
				lines = contents.split("\n");
				for (var i = 0; i < lines.length; ++i) {
					line = lines[i];
					if (line.substr(0,8) != "x-asxurl") {
						continue;
					}
					asxurl = line.substr(9);
					asxurl = asxurl.replace('(%replace%)', '');
					
					player = document.getElementById('xl_player_container');
					player.innerHTML = linkHtml(asxurl) + player.innerHTML;
				}
			}
		});
	}
	setTimeout(xlPageLoad, 3000);
}


if (unsafeWindow.RTLPlayerPage && unsafeWindow.clipInfo) {
	getClipInfo(unsafeWindow.clipInfo);
}
else if (unsafeWindow.RTLPlayerPage) {
	// RTL XL
	xlPageLoad();
}

})();
