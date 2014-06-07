// ==UserScript==
// @name                Bildu Google Reader 1.0
// @namespace      		http://anpulubila.tximinia.net
// @description       	Google Reader eta Bildu zerbitzuen arteko zubia.
// @include             http://google.*/reader/*
// @include             http://*.google.*/reader/*
// ==/UserScript==


// Ian Oxleyren del.icio.us Reader scriptetik egokitua (http://userscripts.org/scripts/review/11233).

(function() {
	
	var entries=document.getElementById("entries");
	entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);}, true);
	
	function nodeInserted(event){	
		if (event.target.tagName=="DIV"){
			try {
				if (event.target.className!=""){
					var linkbar;
					if (event.target.className=="entry-actions"){
						linkbar=event.target;
					}
					else if (event.target.firstChild && event.target.firstChild.className=="card"){
						linkbar=event.target.firstChild.firstChild.childNodes[2].
							childNodes[1].firstChild;
					}
					else
						return;
					var bilduLink = document.createElement("a");
					bilduLink.className="item-star star link";
					bilduLink.innerHTML="Bildu";
					bilduLink.addEventListener("click", postBookmark, false);
					linkbar.appendChild(bilduLink);
				}
			}
			catch(e){
				//GM_log(e);
			}
		}
	}
	
	function postBookmark(event) {
		var bilduWin = window.open(buildUrl(), "bilduWindow");
		bilduWin.focus();
	}
	

	function buildUrl() {
		var current = document.getElementById('current-entry');
		var title = document.evaluate("//div[@id='current-entry']/div[@class='entry-container']/div[@class='entry-main']/h2[@class='entry-title']/a[@class='entry-title-link']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
				
			if (title.snapshotLength == 1) {
			var link = title.snapshotItem(0);
			return 'http://www.bildu.net/bookmarks/bildu?action=add&address=' + encodeURIComponent(link.href) + '&title=' + encodeURIComponent(link.childNodes[0].nodeValue);
		}
		return 'http://www.bildu.net/bookmarks';
	}
})();
