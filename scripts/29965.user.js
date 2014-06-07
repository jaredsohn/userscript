// ==UserScript==
// @name           Something Awful Quote Folding
// @description	Automatically folds all quotes on the Something Awful forums
// @namespace      http://www.mathemaniac.org
// @include        http://forums.somethingawful.com/showthread.php?*
// @include        http://forum.somethingawful.com/showthread.php?*
// @author		Sebastian Paaske Tørholm (Sebbe on SA)
// @homepage	http://www.mathemaniac.org
// @version 1.1.3
// ==/UserScript==

(function() {
	var script = {
		// Thanks to http://www.milonic.com/imagepack/simpleindicators.php for the arrow.
		arrowright:'data:image/gif;base64,R0lGODlhDQANAJECAAAAAAEBAP///wAAACH5BAEAAAIALAAAAAANAA0AAAIjVI4ZJu1vFoTHHUBlu6/2gG2aBYSeBaJfKKJsO31xFymJUAAAOw==',
		arrowdown:'data:image/gif;base64,R0lGODlhDQANAKECAAAAAAEBAP///////yH5BAEAAAIALAAAAAANAA0AAAIkVI4ZJu1vFoRnUikd3poLUB1AUzWg2D3A+pTO2GZWNGuRkggFADs='
	};
	
	// format: <div class="bbc-block"><h4>quote: blooper</h4><blockquote>blabla</blockquote></div>
	
	// Hide quote body
	GM_addStyle("div.bbc-block > blockquote { display: none; } div.bbc-block { padding-bottom: 0.5em } div.bbc-block > h4 { cursor: pointer } .quoteSummary { font-size: x-small; } ");
	
	var qi = document.evaluate("//div[@class='bbc-block']/h4",document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
	var quotes = new Array();
	var quote;
	while (quote = qi.iterateNext()) {
		quotes.push(quote);
	}
	
	var foldDefault = GM_getValue('foldDefault',0);
	GM_registerMenuCommand('Fold all posts on page load ['+(foldDefault > 0 ? 'x' : ' ')+']', function() { 
		GM_setValue('foldDefault',GM_getValue('foldDefault',0) ? 0 : 1); 
		window.location.reload();
	});	
	
	var quoteSummary = GM_getValue('quoteSummary',1);
	GM_registerMenuCommand('Show start of quote when folded ['+(quoteSummary > 0 ? 'x' : ' ')+']', function() { 
		GM_setValue('quoteSummary',GM_getValue('quoteSummary',1) ? 0 : 1); 
		window.location.reload();
	});	
	
	for each (quoteTitle in quotes) {
		var arrowimg = document.createElement('img');
		arrowimg.src = (foldDefault ? script.arrowright : script.arrowdown);
		arrowimg.setAttribute('style','margin-right: 0.3em');
		quoteTitle.insertBefore(arrowimg,quoteTitle.firstChild);
		if (quoteSummary) {
			var summarySpan = document.createElement('span');
			summarySpan.setAttribute('style',foldDefault ? '' : 'display: none; ');
			summarySpan.className = 'quoteSummary';
			// Beware of empty quotes.
			var summaryText = (quoteTitle.nextSibling.firstChild && quoteTitle.nextSibling.firstChild.nodeValue ? quoteTitle.nextSibling.firstChild.nodeValue : ''); 
			summaryText = (summaryText.length > 50 ? summaryText.substr(0,50) + '...': summaryText);
			summarySpan.appendChild(document.createTextNode(summaryText));
			quoteTitle.parentNode.insertBefore(summarySpan,quoteTitle.nextSibling.nextSibling);
		}
		quoteTitle.nextSibling.className = (foldDefault ? '' : 'nohide');
		quoteTitle.nextSibling.setAttribute('style','display: '+(foldDefault ? 'none':'block'));
		quoteTitle.addEventListener("click",function(e) {
			var state = (e.target.nextSibling.className == '');
			e.target.nextSibling.className = (state ? 'nohide': '');
			e.target.nextSibling.setAttribute('style',(state ? 'display: block' : 'display: none'));
			if (GM_getValue('quoteSummary',1))
				e.target.nextSibling.nextSibling.setAttribute('style',(state ? 'display: none' : 'display: block'));
			e.target.firstChild.src = state ? script.arrowdown : script.arrowright;
		},"false");
		arrowimg.addEventListener("click",function(e) {
			var state = (e.target.nextSibling.className == '');
			e.target.parentNode.nextSibling.className = (state ? 'nohide': '');
			e.target.parentNode.nextSibling.setAttribute('style',(state ? 'display: block' : 'display: none'));
			if (GM_getValue('quoteSummary',1))
				e.target.parentNode.nextSibling.nextSibling.setAttribute('style',(state ? 'display: none' : 'display: block'));
			e.target.src = state ? script.arrowdown : script.arrowright;
		},"false");
	}
})();