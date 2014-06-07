// ==UserScript==
// @name           Google Reader: Show Feed Favicons
// @author henrah / LudoO(xeoos.fr) 
// @namespace      http://henrah.googlepages.com
// @include        htt*://www.google.*/reader/view*
// ==/UserScript==

var Favicons = {
	UNFIXED_ICON_XPATH: '//span[contains(@class,"icon sub-icon")][not(@label)]',
	EXPORT_URL: '/reader/subscriptions/export',
	FAVICON_URL: ['http://', '/favicon.ico'],
	
	PARSE_DOMAIN: /:\/\/([\w\.]+)/,
	
	domains: {},
	cacheIcons: {},
	
	loadDomains: function () {
		var xhr = new XMLHttpRequest();
		xhr.open('get', this.EXPORT_URL, true);
		xhr.onload = function(){
			Favicons.setDomains(xhr.responseXML);
		};
		xhr.send('');
	},
	
	parseDomain: function(url) {
		var match = this.PARSE_DOMAIN.exec(url);
		return match && match[1];
	},
	
	setDomains: function (opmlDoc) {
		var outline, i = 0,
			outlines = opmlDoc.getElementsByTagName('outline');
			
		while (outline = outlines[i++]) {
			if (! outline.hasAttribute('htmlUrl')) continue;
			var title = outline.getAttribute('title');
					
			if (title.length > 24)
				title = title.substr(0, 21) + '...';
				
			this.domains[title] =
				this.parseDomain(outline.getAttribute('htmlUrl'))
				|| this.parseDomain(outline.getAttribute('xmlUrl'));
		}
		setInterval(function () {
			Favicons.fixAllIcons();
		}, 2000);
	},
	
	fixAllIcons: function () {
		var icon, i = 0, label;
		var uncorrectedIcons = document.evaluate(this.UNFIXED_ICON_XPATH, document, null, 6, null);
		while (icon = uncorrectedIcons.snapshotItem(i++)) {
			  label = icon.nextSibling.firstChild.textContent;
	        var urlIcon = this.FAVICON_URL.join(this.domains[label]);
	        var img = document.createElement('img');
	        icon.appendChild(img);
	        icon.setAttribute('label', label);
			img.setAttribute('style', 'display:none');
	        img.src = urlIcon;
	        
	        img.addEventListener("error", function(e){
			  e.target.parentNode.removeChild(e.target);
	        }, false);
	        
	        img.addEventListener("load", function(e){
			  var FAVICON_STYLE= ['background: url(', ');'];
	          e.target.parentNode.setAttribute('style', FAVICON_STYLE.join(e.target.src));
	          e.target.parentNode.removeChild(e.target);
	        }, false);
        
		}
	}
};

Favicons.loadDomains();
