// ==UserScript==
// @name           SA Quoteblocker n/t version
// @description    completely hide quoted text from ignored users while retaining the quoter's post on Something Awful forums
// @include        http://*somethingawful.com/showthread.php?*
// ==/UserScript==

var ignoreURL = 'http://forums.somethingawful.com/member2.php?action=viewlist&userlist=ignore';

var assholeList = new Array();

var functionText = document.createElement('script');
functionText.type = 'text/javascript';
functionText.innerHTML = "function toggleQuote(quoteId) { \
		if (document.getElementById(quoteId).style.display == 'inline') { \
			document.getElementById(quoteId).style.display = 'none'; \
		} else { \
			document.getElementById(quoteId).style.display = 'inline'; \
		} \
}";

var head = document.getElementsByTagName('head')[0];

head.appendChild(functionText);

function pruneQuotes() {
	
	var quotes = document.evaluate('//blockquote[@class="qb2"]',
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for(var j = 0; j < quotes.snapshotLength; ++j) {
		var thisQuote = quotes.snapshotItem(j);
		
		for (k = 0; k < assholeList.length; k++) {
		        thisAsshole = assholeList[k];
		
			if (thisQuote.innerHTML.match("<h4>" + thisAsshole)) {
				oldContent = thisQuote.innerHTML;
				
				var quoteId = "quote" + j;
				
				newContent = ' ';
				
				thisQuote.innerHTML = newContent;
			}

		}
	
	}	
}
	
GM_xmlhttpRequest({
	method: "GET",
	url: ignoreURL,
	onload:function(responseDetails) {
	
		ignorePage = responseDetails.responseText.replace(/\n/g,' ');;

		ignorePage = ignorePage.replace(/^.*?Edit Ignore List<\/h2>/g,'');
		ignorePage = ignorePage.replace(/<div class="inner">/,'<ROOT>');
		ignorePage = ignorePage.replace(/<br>/g,'');
		ignorePage = ignorePage.replace(/To remove.*$/,'</ROOT>');
		ignorePage = ignorePage.replace(/<input.*?value=\"(.*?)\" size.*?>/g,'<ASSHOLE>$1</ASSHOLE>');
		ignorePage = ignorePage.replace(/<input.*?>/g,'');

		var parser = new DOMParser();
		var xobj = parser.parseFromString(ignorePage,'text/xml');
		var li = xobj.getElementsByTagName('ASSHOLE');
		
		for (q = 0; q < li.length; q++) {
			assholeList.push(li[q].textContent);
		}
		
		if (assholeList.length > 0) {
			pruneQuotes();
		}

	}
});