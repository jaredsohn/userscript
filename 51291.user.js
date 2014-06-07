// ==UserScript==
// @name	Newsweek Popular List
// @description	Renders the Newsweek Top 5/10 Viewed/Recommended/Emailed Articles without Flash
// @include	http://www.newsweek.com/id/*
// ==/UserScript==

window.addEventListener('load', function() { doTheHack() }, true);

var cE = function(el) { return document.createElement(el); }

function makeHeading(title) {
	var h = cE('div');
	h.setAttribute('style', 'font-weight: bold;');
	h.innerHTML = title;
	return h;
}

function listMaker() {
	var list = cE('ol');
	list.setAttribute('style', 'list-style-type: decimal; padding: 0.5em 0em 1em 2em;');
	return list;
}

function addToList(list, link) {
	var listlink = cE('a');
	listlink.innerHTML = link.title;
	listlink.setAttribute('href', link.url);
	var litem = cE('li');
	litem.appendChild(listlink);
	list.appendChild(litem);
}

function doTheHack() {
	if (!unsafeWindow.flashvars || !unsafeWindow.flashvars.channel) {
		return;
	}
	var chTitles = [0, "E-Mailed", "Viewed", "Recommended"];
	var ourList = cE('div');
	var lists = [];
	var done = 0;
	for (var ch = 1; ch < 4; ch++) {
		var url = "http://www.newsweek.com/top.aspx?searchTypeID=" + ch + "&channel=" + unsafeWindow.flashvars.channel + "&range=24";
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function(responseDetails) {
				var parser = new DOMParser();
				var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
				var list = listMaker();
				var heading = dom.getElementsByTagName('Top10')[0];
				var chx = heading.getAttribute('searchTypeID');
				var items = dom.getElementsByTagName('Item');
				for (var i = 0; i < items.length; i++) {
					item = items[i];
					addToList(list, {
						title:item.getAttribute('title'),
						url:item.getAttribute('url')
					});
				}
				lists[chx] = list;
				done++;
				if (done == 3) {
					appendList();
				}
			}
		});
	}

	function appendList() {
		for (var ch = 1; ch < 4; ch++) {
			ourList.appendChild(makeHeading(chTitles[ch]));
			ourList.appendChild(lists[ch]);
		}
	}

	var origListWrapper = document.getElementById('topTenVertical');
	origListWrapper.style.height = 'auto';
	origListWrapper.innerHTML = "";
	origListWrapper.appendChild(ourList);

}