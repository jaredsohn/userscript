// ==UserScript==
// @name		Wikiproxy: Greasemonkey Edition
// @namespace		http://www.allpeers.com/blog/greasemonkey
// @description		Adds Wikipedia links to key terms in webpages
// @include		http://*
// @exclude		http://wikiproxy.whitelabel.org/*
// @exclude		http://www.theyworkforyou.com/*
// @exclude		http://*.wikipedia.*

// ==/UserScript==

// original version by Matthew Gertner
// modified by Valentin Laube to identify Wikipedia links with an icon
// the design of the icon is inspired by the wikipedia icon for external links

(function() {

	function addWikiLinkStyle()
	{
		var wikiLinkStyle = document.createElement('style');
		wikiLinkStyle.id = "wikilinkstyle";
		wikiLinkStyle.type = "text/css";
		wikiLinkStyle.innerHTML = '.wikilink, .wikilink_over {\n'
			+ 'color: inherit;\n'
			+ 'text-decoration: none;\n'
			+ '}\n'
		    + '.wikilink {\n'
			+ 'border-bottom: dotted 1px black;\n'
			+ '}\n'
		    + '.wikilink_over {\n'
			+ 'border-bottom: dotted 1px white;\n'
			+ '}';
		document.getElementsByTagName('head')[0].appendChild(wikiLinkStyle);
	}

	var requestUrl = "http://wikiproxy.whitelabel.org/xml.php";
	var wikipediaUrlPrefix = "http://en.wikipedia.org/wiki/";
	var excludeAncestors = new Array("a", "script", "style", "input", "textarea", "select", "option");
	
	var excludeXPath = "ancestor::*[";
	for (var tagNum=0; tagNum<excludeAncestors.length; tagNum++)
		excludeXPath += (tagNum == 0 ? "" : " or ") + "self::" + excludeAncestors[tagNum];
	excludeXPath += "]";
	
	// Regular expression definitions from News Wikiproxy
  	var capsword = "A|[A-Z][a-zA-Z'0-9]{1,}"; // not starting with number, as catches too much
  	var fillerwords = "a|of|and|in|on|under|the";
  	var middlewordre = "(" + capsword + "|" + fillerwords + "|[A-Z]\.)[ \\t]*";
  	var endwordre = "(" + capsword + ")[ \\t]*"; // and, of etc. can't appear at ends
  	var acronymre = "\\b([A-Z][A-Z0-9]{2,})\\b";

	// Match either "Two Endwords" or "Endword and Some Middle Words"
  	var greedyproperre = "\\b(" + endwordre + "(" + middlewordre + ")*" + endwordre + ")\\b";
	// Match without filler words (so if you have a phrase like
	// "Amnesty International and Human Rights Watch" you also get both parts
	// separately "Amnesty International" and "Human Rights Watch")
	var frugalproperre = "\\b((" + endwordre + "){2,})\\b";
	
	var usedTerms = new Array();

	function getTerms(str, regexpstr, terms)
	{
		var candidates = str.match(new RegExp(regexpstr, "mg"));
		for (var i=0; i<candidates.length; i++)
		{
			var term = candidates[i];
			while (term.charAt(term.length-1) == " ")
				term = term.substring(0, term.length-1);
			if (usedTerms[term] == null)
			{
				if (terms.length > 0)
					terms += " ";
				terms += term.replace(/ /g, "_");
				usedTerms[term] = term;
			}
		}
		return terms;
	}

	if (document.documentElement.tagName == "HTML")
	{
		var treeWalker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT, null, false);
		var text = "";
		var textNode;
		while (textNode = treeWalker.nextNode())
		{
			if (!document.evaluate("ancestor::script", textNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue)
				text += textNode.nodeValue + "\n";
		}
			
			
		var terms = getTerms(text, greedyproperre, "");
		terms = getTerms(text, frugalproperre, terms);
		terms = getTerms(text, acronymre, terms);
		
		GM_xmlhttpRequest({
		    method: 'POST',
		    url: requestUrl,
		    headers: {
		        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		        'Content-type': 'application/x-www-form-urlencoded'
		    },
		    data: 'text=' + escape(terms),
		    onload: function(responseDetails) {
		    	var parser = new DOMParser();
			var responseXML = parser.parseFromString(responseDetails.responseText, "text/xml");
			var termSnapshot = responseXML.evaluate("/wikiproxy/term/text()", responseXML, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var normalizedTerms = new Array();
			var termRegExp = "";
			for (var i=0; i<termSnapshot.snapshotLength; i++)
			{
				var termNodeValue = termSnapshot.snapshotItem(i).nodeValue.replace(/_/g, " ");
				normalizedTerms[termNodeValue.toLowerCase()] = termNodeValue;
				if (termRegExp.length > 0)
					termRegExp += "|";
				termRegExp += termNodeValue;
			}
			termRegExp = new RegExp("\\b(" + termRegExp + ")\\b", "mg");			
			
			treeWalker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT, null, false);
			while (textNode = treeWalker.nextNode())
			{
				if (responseXML.evaluate(excludeXPath, textNode, null, 
					XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue)
					continue;
				
				var matches = textNode.nodeValue.match(termRegExp);
				if (!matches)
					continue;
					
				// add wiki link style
				if (!document.getElementById('wikilinkstyle')) {
					addWikiLinkStyle();
				}

				for (i=0; i<matches.length; i++)
				{
					var term = matches[i];
					if(!term)continue;
					var displayTerm = term.replace(/_/g, " ");
					term = normalizedTerms[term.toLowerCase()];
					var termIndex = textNode.nodeValue.indexOf(displayTerm);
					var preTermNode = document.createTextNode(textNode.nodeValue.substring(0, termIndex));
					textNode.nodeValue = textNode.nodeValue.substring(termIndex+displayTerm.length);
					var anchor = document.createElement("a");
					anchor.className = "wikilink";
					anchor.onmousemove = function () {this.className = 'wikilink_over';};
					anchor.onmouseout = function () {this.className = 'wikilink';};
					anchor.href = wikipediaUrlPrefix + term;
					var termNode = document.createTextNode(displayTerm);
					anchor.insertBefore(termNode, anchor.firstChild);
					textNode.parentNode.insertBefore(preTermNode, textNode);
					textNode.parentNode.insertBefore(anchor, textNode);
				}
			}
		    }
		});
	}

	if (window.GM_registerMenuCommand) {

		function undoWikify()
		{
			var wlinks = document.evaluate('//a[@class="wikilink"]', document, null,
						       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			// GM_log(wlinks.snapshotLength + ' wikilinks found.');
			for (var i = 0; i < wlinks.snapshotLength; i++) {
				var wlink = wlinks.snapshotItem(i);
				var text = document.createTextNode(wlink.textContent);
				wlink.parentNode.replaceChild(text, wlink);
			}
		}

		GM_registerMenuCommand('Undo Wikify', undoWikify);

	}

})();

