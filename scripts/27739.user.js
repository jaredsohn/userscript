// ==UserScript==

// @name          Ultimate GReader favicons 

// @description   Adds favicons to feeds and entries
// @author        X4lldux
// @version       0.2

// @include       http://*google.tld/reader/view*

// @include       https://*google.tld/reader/view*

// ==/UserScript==

const ALL_FEED_ICON_XPATH = '//img[contains(@class, "icon icon-d-2")]',
		UNFIXED_FEED_ICON_XPATH = '//img[contains(@src, "-tree-view-subscription.gif")]',

		EXPORT_URL = '/reader/subscriptions/export',

		FAVICON_URL = ['http://', '/favicon.ico'],
		SEPERATOR = '|#$|';



var feedDomains = {}

var fixAll=1;


function setFavicon(title) {
    var faviconsList = GM_getValue('faviconsList', null);
    var url="";
    
    var favicons = {};
    if (faviconsList !="" && faviconsList != null) {

		favicons = faviconsList.split(SEPERATOR);

		for (var i=0; i<favicons.length; i++, i++) {
			if(favicons[i] == title) {
				url=favicons[i+1];
				break;
			}
		}
		var newUrl = prompt("Enter favicon url for "+title, url);
		favicons[i]=title;
		favicons[i+1]=newUrl;
		if(newUrl=="" || newUrl==null)
			favicons.splice(i, 2);
	} else {
		url = prompt("Enter favicon url for"+title, url);
		if(url!="" && url!=null)
			favicons=new Array(title, url);
	}

	faviconsList = favicons.join(SEPERATOR);
	GM_setValue('faviconsList', faviconsList);

	refreshDomains();
}




function refreshDomains(all) {
	var xhr = new XMLHttpRequest();

	xhr.open('get', EXPORT_URL, true);

	xhr.onload = function(){

		setFeedDomains(xhr.responseXML);

	};

	xhr.send('');

}




function setFeedDomains(opml) {

	feedDomains = {}

	var faviconsList = GM_getValue('faviconsList', null);
	if (faviconsList != null) {

		var favicons = faviconsList.split(SEPERATOR);

		for (var i=0; i<favicons.length; i++, i++) {
			feedDomains[favicons[i]]=favicons[i+1];
		}
	}

	Array.forEach(opml.getElementsByTagName('outline'), function(outline){

		if (! outline.hasAttribute('htmlUrl')) return;

		var title = outline.getAttribute('title');
		var domain = outline.getAttribute('htmlUrl').split(/\/|\?/)[2];

		var tmp;
		if(feedDomains[title] == null)

			tmp = FAVICON_URL.join(domain);
		else
			tmp = feedDomains[title];
		feedDomains[title] = tmp;


		if (title.length > 24)

			feedDomains[title.substr(0, 21) + '...'] = tmp;

	});
	
	fixAll=2;
	fixIcons();

}




function fixIcons() {

	var icon, i = 0, label;


	var uncorrectedIcons;
	if(fixAll>0) {

		uncorrectedIcons = document.evaluate(ALL_FEED_ICON_XPATH, document, null, 6, null);
		fixAll--;
	} else
		uncorrectedIcons = document.evaluate(UNFIXED_FEED_ICON_XPATH, document, null, 6, null);


	// feed favicons
	while (icon = uncorrectedIcons.snapshotItem(i++)) {
		if(fixAll==0 && icon.className.indexOf(" reverted_favicon")>0)
			continue;

		icon.width = "16";

		var titleElement = icon.nextSibling;
		titleElement.removeEventListener('click', setPromptForUrl, true);
		titleElement.addEventListener('click', setPromptForUrl, true);


		label = titleElement.firstChild.textContent;
	
		icon.removeEventListener('error', revertIcon, false);
		icon.addEventListener('error', revertIcon, false);	
			

		if (feedDomains.hasOwnProperty(label)) {
			icon.src = feedDomains[label];
		}

	}
  
  
	// entries favicons
	var entries = document.getElementById('entries');

	for (var i=0; i< entries.childNodes.length; i++) {

		var entry = entries.childNodes[i];

		var collapsedTitle = findNode(entry, './/div[@class="collapsed"]//h2');

		var entryContainerTitle = findNode(entry, './/div[@class="entry-container"]//h2');



		var entryLink, collapsedLink;

		if (entryContainerTitle != null) {

			entryLink = entryContainerTitle.firstChild;

		}
		if (collapsedTitle != null)
			collapsedLink = collapsedTitle.parentNode.parentNode.firstChild;


		if (entryContainerTitle != null && getFaviconImg(collapsedTitle) == null) {
			addFaviconToNode(collapsedLink.nextSibling.textContent, entryLink.firstChild);
			

		} else if (collapsedTitle != null && getFaviconImg(collapsedTitle) == null) {

			addFaviconToNode(collapsedLink.nextSibling.textContent, collapsedTitle);

		}

	}

}


function revertIcon(event) {
	this.className += " reverted_favicon";
	this.src = "http://www.google.com/reader/ui/4183653108-tree-view-subscription.gif";
}

function setPromptForUrl(event) {
	if(event.altKey == false && event.ctrlKey == true && event.shiftKey == true) {
		event.cancelBubble=true;
		var unreadCount = this.firstChild.nextSibling.textContent;
		var title = this.title.replace(unreadCount, "")
		setFavicon(title);
	}
}


function findNode(root, xpath) {

	var result = document.evaluate(xpath, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	if (! result.snapshotLength) return null;

	return result.snapshotItem(0);

}




function addFaviconToNode(feedTitle,node) {
	var favicon = findNode(node.parentNode, ".//img[contains(@class, 'entry-favicon')]");
	if (favicon!=null)
		return;
	
	favicon = document.createElement('img');

	favicon.setAttribute('class', 'entry-favicon');

	favicon.removeEventListener('error', revertIcon, false);
	favicon.addEventListener('error', revertIcon, false);

	var faviconUrl=feedDomains[feedTitle];


	favicon.src = faviconUrl;
	favicon.width = 16;

	favicon.alt   ="";

	favicon.style.border = "0";
	

	

	favicon.style.marginRight = "1ex";

	node.parentNode.insertBefore(favicon,node);

}




function getFaviconImg(node){

	return findNode(node,'.//img[contains(@class, "entry-favicon")]');

}

	



refreshDomains();

setInterval(fixIcons, 5000);