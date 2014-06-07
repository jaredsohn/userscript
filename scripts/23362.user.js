// ==UserScript==
// @name          de-cr@pify.email
// @namespace     Adrian232
// @description   Turns even heavily munged (spammer-protected) e-mail addresses into a link.
// @creator       Adrian (myspace.com/adrian232)
// @version       0.2
// @date          2008-3-6
// @include       *
// ==/UserScript==
// Loosely based on Linkify Plus
// Special thanks to LenR for the name

(function() {
var notInTags=['a', 'head', 'noscript', 'option', 'script', 'style', 'title', 'textarea'];
var res = document.evaluate("//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]",
	document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var ss = '[{(_\\-<'; var es = '\\]})_\\->';
var at = ['@', '['+ss+']@['+es+']', '\\sat\\s', '['+ss+']at['+es+']'];
var dot = ['['+ss+']\\.['+es+']', '\\sdot\\s', '['+ss+']dot['+es+']'];
var tld = ['com', 'org', 'net', 'edu', 'gov', 'us', 'uk', 'aero', 'asia', 'biz', 'cat', 'coop', 'info', 'int', 'jobs', 'mil', 'mobi', 'museum', 'name', 'pro', 'tel', 'travel', '[a-z]{2}'];
var wc = "(?:[-_+.\\w]|\\s*(?:"+dot.join('|')+")\\s*)+";

var emailRE = new RegExp(wc+"\\s*(?:"+at.join('|')+")\\s*"+wc+"(?:\\.|\\s*(?:"+dot.join('|')+")\\s*)(?:"+tld.join('|')+")\\b", "gi");
var atRE = new RegExp("\\s*(?:"+at.join('|')+")\\s*", "gi");
var dotRE = new RegExp("\\s*(?:"+dot.join("|")+")\\s*", "gi");

var el = null;
for (var i = 0; el = res.snapshotItem(i); i++) {
	//grab the text of this element and be sure it has a URL in it
	var txt = el.textContent;
	var span = null;
	var p = 0;
	//if (text && !text.match(/^\s*$/))
	//	GM_log(text);
	while (m = emailRE.exec(txt)) {
		if (span == null) {
			//create a span to hold the new text with links in it
			span = document.createElement('span');
		}

		//get the link, translating to @'s .'s and removing garbage at the end
		var l = m[0].replace(atRE, "@").replace(dotRE, ".");
		//put in text up to the link
		span.appendChild(document.createTextNode(txt.substring(p, m.index)));
		//create a link and put it in the span
		var a = document.createElement('a');
		a.className = 'de-cr@pified.email';
		a.appendChild(document.createTextNode(m[0]));
		a.setAttribute('href', 'mailto:'+l);
		span.appendChild(a);
		p = m.index + m[0].length;
	}
	if (span) {
		//take the text after the last link
		span.appendChild(document.createTextNode(txt.substring(p, txt.length)));
		//replace the original text with the new span
		el.parentNode.replaceChild(span, el);
	}
}
})();
