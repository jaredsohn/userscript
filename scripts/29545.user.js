// ==UserScript==
// @name           Last.fm torrent search
// @namespace      http://slackers.se/lastfm/torrent
// @description    Adds search links to torrentz and demonoid on all artist links on Last.fm. This script is VERY beta and might not be working correctly on all links.
// @include        http://www.last.fm/music/*
// @include        http://www.last.fm/user/*
// @include        http://www.last.fm/event/*
// ==/UserScript==

function xpath(query, doc) {
    return doc.evaluate(query, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function isValid(name) {
	if (name.indexOf("/music/") < 0)
		return false;

	if (name.indexOf("/+") >= 0)
		return false;

	if (name.indexOf("#shoutid") >= 0)
		return false;

	if (name.indexOf("?setlang") >= 0)
		return false;

	if (name.indexOf("?change") >= 0)
		return false;

	if (name.indexOf("?autostart") >= 0)
		return false;

	if (name.indexOf("/_/") >= 0)
		return false;

	return true;
}

window.addEventListener('load', function(event) {  
		// import the $-function from prototype
		$ = unsafeWindow['$'];

		unsafeWindow.ts_s = function (element, source) {			
			source = $(source); 
			element = $(element);

			var valueT = 0, valueL = 0, height = source.offsetHeight;
			do {
				valueT += source.offsetTop  || 0;
				valueL += source.offsetLeft || 0;
				source = source.offsetParent;
			} while (source);
			
			element.setStyle({
					left: (valueL)+'px',
						top: (height+valueT)+'px'
						});

			element.show();
		};
		
		unsafeWindow.ts_h = function (element) {
			$(element).hide();
		};
		
		
		var head = xpath("/html/head", document).snapshotItem(0);		
		var style = document.createElement("style");

		style.innerHTML = ".tss{font-size:12px;color:#000;position:absolute;width:92px;height:57px;background-color:#fff;padding:2px;border:1px solid #000;} .tss a ,.tss a:hover{margin:0;padding:0;background: transparent;border:0;outline:0}";
		head.appendChild(style);

		var result = xpath("//a", document);
		var regexp = new RegExp("/music/([^/]*)");
		var invalid = new RegExp("/\+.*");
		
		//.. loop through all links
		for(var i=0;i<result.snapshotLength;i++) {
			var tag = result.snapshotItem(i);
			
			if (isValid(tag.href)) {
				var parts = tag.href.split("/");
				
				if (parts.length >= 4) {
					var query = parts[4];
					if (parts[5]) {
						query = query + " " + parts[5];
					}
					if (query.length > 1) {
						//GM_log(parts + " query: " + query);
															

						//.. create the "tooltip"
						var div = document.createElement('div');
						var html = 'Torrent Search:<br/>';
						html += '<a href="http://www.torrentz.com/search?q='+query+'">torrentz.com</a><br/>';
						html += '<a href="http://www.demonoid.com/files/?category=0&subcategory=All&quality=All&seeded=0&external=2&uid=0&sort=&query='+query+'">demonoid.com</a>';
						
						div.setAttribute('id', 'tsd'+i);
						div.setAttribute('class', 'tss');
						div.style.display = 'none';
						div.innerHTML = html;
						
						// wrap both the link and the div in a span-tag
						var span=document.createElement('span');
						
						span.setAttribute('onmouseover', 'window.ts_s("'+div.getAttribute('id')+'", this);');
						span.setAttribute('onmouseout', 'window.ts_h("'+div.getAttribute('id')+'");');
						
						span.appendChild(tag.cloneNode(true));
						span.appendChild(div);
						
						// replace the linnk with the span-tag.
						tag.parentNode.replaceChild(span, tag);
					}
				}
			}
		}	

	}, false);
