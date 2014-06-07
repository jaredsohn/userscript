// ==UserScript==
// @name           Hide visited links for reddit
// @description    Hide visited links for reddit
// ==/UserScript==


modules['hideVisited'] = {
	moduleID: 'hideVisited',
	moduleName: 'Hide All Visited Links',
	cacheName: 'RESmodules.hideVisited.links',
	options: {
	},
	description: 'Simple script to hide visited links',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: new Array(
		/https?:\/\/([a-z]+).reddit.com\/[\?]*/i,
		/https?:\/\/([a-z]+).reddit.com\/r\/[-\w\._]*\//i
	),
	exclude: new Array(
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			if(RESUtils.pageType() == 'comments'){
				this.markLink();
			}
			else if (RESUtils.pageType() == 'linklist'){
				document.body.addEventListener('DOMNodeInserted', function(event) {
					if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') == 'siteTable')) {
						modules['hideVisited'].hideLinks(event.target);
					}
				}, true);
				this.hideLinks();
			}
		}
	},
	// check each link, and if it has been visited, hide it from view
	hideLinks: function(ele) {
		var visitedLinks = safeJSON.parse(RESStorage.getItem(this.cacheName));
		if(visitedLinks) {
			if (ele == null) {
				var entries = document.querySelectorAll('#siteTable div.thing.link');
			} else {
				var entries = ele.querySelectorAll('div.thing.link');
			}
			
			for (var i=0, len=entries.length; i<len;i++) {
				var url = entries[i].querySelector('.entry a');
							
				if(visitedLinks[url] == true) {
					entries[i].style.display = 'none';
				}
			}
		}	
	},
	// mark links as visited once their comments pages have been visited
	markLink: function() {
		var link = document.querySelectorAll('.title > a')[0];
		
		var visitedLinks = safeJSON.parse(RESStorage.getItem(this.cacheName));
		
		if(!visitedLinks) {
			visitedLinks = new Object(); 
		}
		visitedLinks[link] = true;
		
		RESStorage.setItem(this.cacheName, JSON.stringify(visitedLinks));
	}
};