// ==UserScript==
// @name           CitationNeeded
// @namespace      http://d.hatena.ne.jp/naraba/
// @description    Add [citation needed] to all the sentences in Japanese.
// @include        http://ja.wikipedia.org/wiki/*
// ==/UserScript==

(function() {
	var targetRegExp = /。/g;
	var toURL = "http://ja.wikipedia.org/wiki/Wikipedia:%E3%80%8C%E8%A6%81%E5%87%BA%E5%85%B8%E3%80%8D%E3%82%92%E3%82%AF%E3%83%AA%E3%83%83%E3%82%AF%E3%81%95%E3%82%8C%E3%81%9F%E6%96%B9%E3%81%B8";
	var allowedParents = [
		"abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
		"caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
		"fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
		"ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
		"s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"];
	var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")]"
	var textnodes = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var text;
	
	for (var i = 0; text = textnodes.snapshotItem(i); i++) {
		var source = text.nodeValue;
		if (targetRegExp.test(source)) {
			var span = document.createElement("span");
			text.parentNode.replaceChild(span, text);
			
			targetRegExp.lastIndex = 0;
			var lastIndex = 0, match;
			while (match = targetRegExp.exec(source)) {
				span.appendChild(document.createTextNode(source.substring(lastIndex, match.index)));
				var sup = document.createElement("sup");
				sup.appendChild(document.createTextNode("["));
				var link = document.createElement("a");
				link.setAttribute("href", toURL);
				link.setAttribute("title", "この記述には信頼できる情報源への参照が求められています。");
				link.setAttribute("style", "font-style:oblique");
				link.appendChild(document.createTextNode("要出典"));
				sup.appendChild(link);
				sup.appendChild(document.createTextNode("]"));
				span.appendChild(sup);
				span.appendChild(document.createTextNode(match[0]));
				lastIndex = targetRegExp.lastIndex;	
			}
			span.appendChild(document.createTextNode(source.substring(lastIndex)));
			span.normalize();
		}
	}
})();
