// ==UserScript==
// @name           Mofiquote
// @namespace      Hacked from Mefiquote (http://plutor.org/)
// @description    Adds "quote" links to Monkeyfilter comments.
// @include        http://monkeyfilter.com/*
// @include        http://*.monkeyfilter.com/*
// ==/UserScript==

(function () {
	//var t0 = new Date().getTime();
	var xpath = "//p[(@class='footer') and starts-with(text()[position()=1], 'posted by') and (count(child::*) > 1) and" +
				" (parent::blockquote)" +
				"]";

	var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
		var cdet = cand.childNodes;
		var name = cdet[1].firstChild.nodeValue;
		var commenturl = cdet[3].href;

		var commenttext = new Array();
		var ps = cand.previousSibling;
		var oh = document.createElement("p");
		for (; ps && !(ps.tagName == 'A' && !ps.getAttribute('href')); ps = ps.previousSibling) {
			// OuterHTML Gecko hack
			var temp = ps.cloneNode(true);
			oh.appendChild(temp);
			commenttext.unshift(oh.innerHTML);
			oh.removeChild(temp);
		}
		commenttext = commenttext.join("");
		commenttext = commenttext.replace(/        /g, "");
		commenttext = commenttext.replace(/<br>/g, "\\n");
		commenttext = commenttext.replace(/<p class="footer">posted by.*/, "");
		commenttext = commenttext.replace(/<p>/g, "");
		commenttext = commenttext.replace(/<\/p>/g, "");
		commenttext = commenttext.replace(/\\n\s*$/, "");
		commenttext = commenttext.replace(/<a href="(.*)">/, "");
		commenttext = commenttext.replace(/<\/a>/, "");
		commenttext = commenttext.replace(/'/g, "\\'");

		var n = document.createElement("a");
		var nt = document.createTextNode("quote");
		n.href = "javascript:(function(){document.forms[0].comment.value += '<a href=\"" + commenturl + "\">" + name + "</a> wrote: \"<em>" + commenttext + "</em>\"\\n\\n'; document.forms[0].comment.focus()})()";
		n.appendChild(nt);

		cdet[cdet.length-1].nodeValue += " [";
		cand.appendChild(n);
		cand.appendChild(document.createTextNode("]"));
	}
	//var t1 = new Date().getTime();
	//alert("Mofiquote took " + ((t1 - t0) / 1000) + " seconds, " + (i) + " candidates");
})();