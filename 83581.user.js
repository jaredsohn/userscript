// ==UserScript==
// @name           IMDb: Budget on title main page
// @description    Puts the budget (and gross) of a movie on its details page
// @creator        kuehlschrank
// @version        0.4.2
// @date           2013-01-29
// @include        http://www.imdb.com/title/tt*/
// @include        http://www.imdb.com/title/tt*/reference*
// @include        http://www.imdb.com/title/tt*/maindetails*
// @include        http://www.imdb.com/title/tt*/combined*
// @noframes
// ==/UserScript==

(function()
{

	var hideWhenNA = true;
	var showGross  = true;
	
	var titleId    = window.location.pathname.match(/\/(tt\d+)\//)[1];
	var container  = insertContainer((showGross) ? 'Budget / Gross' : 'Budget');
	var cache      = new TempCache();

	var info = cache.get(titleId);
	if(info !== false) {
		showInfo(container, info);
		return;
	}

	var req = new XMLHttpRequest();
	req.open('GET', 'http://www.imdb.com/title/' + titleId + '/business', true);
	req.onreadystatechange = function() {
		switch(req.readyState) {
			case 1:
				container.innerHTML = 'Requesting...';
				break
			case 2:
				container.innerHTML = 'Receiving...';
				break;
			case 4:
				if(req.status == 200) {
					info = parseInfo(req.responseText);
					showInfo(container, info);
					cache.set(titleId, info);
				} else {
					container.innerHTML = 'Error: HTTP ' + req.status + ' ' + req.statusText;
				}
				break;
		}
	};
	req.send(null);


	function insertContainer(name) {
		var outer = document.createElement('div');
		outer.className = 'info';
		outer.innerHTML = '<h5>' + name + ':</h5> ';
		var span = document.createElement('span');
		span.innerHTML = 'Initializing...';
		var inner = document.createElement('div');
		inner.className = 'info-content';
		outer.appendChild(inner);
		inner.appendChild(span);
		var refNode = document.evaluate('id("tn15content")/div[contains(h5, "Genre") or contains(h5, "Release")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		if(!refNode) {
			refNode = document.querySelectorAll('div.info')[5];
		}
		refNode.parentNode.insertBefore(outer, refNode);
		return span;
	}
	
	function parseInfo(html) {
		var budget = '', gross = '';
		try {
			budget = html.match(new RegExp('<h.>Budget</h.>[\n\s]*(.+?)\s*[(<]', 'i'))[1];
		} catch(ex) { }
		try {
			gross = html.match(new RegExp('<h.>Gross</h.>[\n\s]*(.+?)(\\(<|<)', 'i'))[1];
		} catch(ex) { }
		return {'budget':budget,'gross':gross};
	}
	
	function showInfo(container, info) {
		if(!showGross && info.budget) {
			container.innerHTML = info.budget;
		} else if(showGross && (info.budget || info.gross)) {
			var text = (info.budget) ? info.budget : 'N/A';
			text += ' / ' + ((info.gross) ? info.gross : 'N/A');
			container.innerHTML = text;
		} else {
			if(hideWhenNA) {
				container.parentNode.parentNode.style.display = 'none';
			} else {
				container.innerHTML = 'N/A';
			}
		}
	}

	function TempCache() {
		var s  = (typeof(unsafeWindow) == 'undefined') ? window.sessionStorage : unsafeWindow.sessionStorage;
		var n = 'kuehlschrank.business.';
		this.get = function(key) {
			try {
				if(s[n + key] != null) {
					return JSON.parse(s[n + key]);
				}
			} catch(ex) { }
			return false;
		}
		this.set = function(key, value) {
			try {
				s[n + key] = JSON.stringify(value);
			} catch(ex) { }
		}
	}

})();