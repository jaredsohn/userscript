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
	var iconcolor = 0; // 0 blue, 1 green, 2 red
	var icons = [
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKAgMAAADwXCcuAAAADFBMVEUWJgGkyP%2F%2F%2F%2F8AZv87Gt1vAAAAAXRSTlMAQObYZgAAAC1JREFUCNdjYP7%2FgYF51QYG%2Fv8bGHhXb2BgXg2hzco%2FMNw8z8BgzsDAwMPAAAAtcQzEPgrvTwAAAABJRU5ErkJggg%3D%3D",
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKAgMAAADwXCcuAAAADFBMVEUbHgGW0nL%2F%2F%2F9SqxuFak3hAAAAAXRSTlMAQObYZgAAAC1JREFUCNdjYP7%2FgYF51QYG%2Fv8bGHhXb2BgXg2hzco%2FMNw8z8BgzsDAwMPAAAAtcQzEPgrvTwAAAABJRU5ErkJggg%3D%3D",
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKAgMAAADwXCcuAAAADFBMVEUbHgH%2Fq47%2F%2F%2F%2F%2FVBnJ4fJlAAAAAXRSTlMAQObYZgAAAC1JREFUCNdjYP7%2FgYF51QYG%2Fv8bGHhXb2BgXg2hzco%2FMNw8z8BgzsDAwMPAAAAtcQzEPgrvTwAAAABJRU5ErkJggg%3D%3D"
		];
	var icons2 = [
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAAeElEQVQY02NkQAIB0%2F7%2FZ8ABWNAF1mdiKgqczsDASMi09ZkQhSgmFjozMNipoZoEA0wwxoYsRsb%2BvQw4AROy1YXOuBUyIyuyU2NgOHSLgaFgFQODFD8Dw4n7DAwrzyCZdPDm%2F%2F%2F%2F%2F0NomKcCpiHYKOGHrAgvIKQIAECSPtEmaizfAAAAAElFTkSuQmCC",
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAAi0lEQVQY02NkQAIdR5P%2FM%2BAALOgC5VZzMBR1HkthYCRkWrnVHIbOYymoJupLWzN4yCeimAQDTDBGhfVcxotPj%2BJyIkJhx9Hk%2F%2FrS1jgVMiIr8pBPZNjxcD7DxadHGfSlrRlQbOg4mvx%2F%2B4N5%2F%2F%2F%2F%2F%2F9%2F%2B4N5%2F2Ge6jia%2FB%2FDgzDF%2BMKRqMBmYGBgAAApFkF%2BHyXzbAAAAABJRU5ErkJggg%3D%3D",
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAAf0lEQVQY042QyxGCQBBE36BRQQ4UKSw5QA4sOeDVo5gDxOCdQNqDfN1asS8zNfWqa7qNneSdiOgaXKoupNoSO3WrOmjLL8esgDQ%2FOC1KlsXqmzE8Yi9uoLwTWREFLwcozWF8wr0BM5heMPabk4Zekj5zDiXvFARc4R89%2FlU2wBsinj50jQNjuAAAAABJRU5ErkJggg%3D%3D"
		];
	var bgprefix = "url("
	var bgsuffix = ") center right no-repeat";

	function addWikiLinkStyle()
	{
		var wikiLinkStyle = document.createElement('style');
		wikiLinkStyle.id = "wikilinkstyle";
		wikiLinkStyle.type = "text/css";
		wikiLinkStyle.innerHTML = '.wikilink, .wikilink_over {\n'
			+ 'color: inherit;\n'
			+ 'padding-right: 13px;\n'
			+ '}\n'
		    + '.wikilink {\n'
			+ 'background: transparent ' + bgprefix + icons[iconcolor] + bgsuffix + ';\n'
			+ '}\n'
		    + '.wikilink_over {\n'
			+ 'background: transparent ' + bgprefix + icons2[iconcolor] + bgsuffix + ';\n'
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
