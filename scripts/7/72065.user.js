// ==UserScript==
// @name           Betterweb
// @description    Hides bullshit words like "epic" and "fail"
// @include        *
// @copyright      Doug Stewart
// @version        0.1
// @namespace      http://userscripts.org/users/2862
// @license        Use as you wish
// ==/UserScript==

(function() {
    var patterns = [], classes = [];

    //	Colors for the word lists
    addGlobalStyle('span.badlist { opacity: 0.1; }');

    defwords([
		"epic",
		"fail",
		"epic fail",
	     ],
	"badlist");


    //	Add one or more words to the dictionary with a specified class
    function defwords(words, class) {
	for (var i = 0; i < words.length; i++) {
	    var w = words[i].replace(/^=/, "");
	    patterns.push(new RegExp("([^a-zA-Z])(" + w + ")([^a-zA-Z])",
		words[i].match(/^=/) ? "g" : "gi"));
	    classes.push(class);
	}
    }

    //	Quote HTML metacharacters in body text
    function quoteHTML(s) {
	s = s.replace(/&/g, "&amp;");
	s = s.replace(/</g, "&lt;");
	s = s.replace(/>/g, "&gt;");
	return s;
    }

    //	Add one or more CSS style rules to the document
    function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) {
	    return;
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
    }

    //	Apply highlighting replacements to a text sequence
    var curpat;     	    // Hidden argument to repmatch()
    var changes;    	    // Number of changes made by repmatch()

    function repmatch(matched, before, word, after) {
	changes++;
	return before + '<span class="' + classes[curpat] + '">' + word + '</span>' + after;
    }

    function highlight(s) {
	s = " " + s;
	for (curpat = 0; curpat < patterns.length; curpat++) {
	    s = s.replace(patterns[curpat],
		    repmatch);
	}
	return s.substring(1);
    }

    if (document.contentType &&
    	(!(document.contentType.match(/html/i)))) {
    	return;
    }

    var textnodes = document.evaluate("//body//text()", document, null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < textnodes.snapshotLength; i++) {
	var node = textnodes.snapshotItem(i);
	if (node.parentNode.tagName != "STYLE" &&
	    node.parentNode.tagName != "TEXTAREA" &&
	    node.parentNode.tagName != "SCRIPT") {
	    if (!(node.data.match(/^\s*$/))) {
		var s = " " + node.data + " ";
		changes = 0;
		var d = highlight(quoteHTML(s));
		if (changes > 0) {
		    var rep = document.createElement("span");
		    rep.innerHTML = d.substring(1, d.length - 1);
		    node.parentNode.replaceChild(rep, node);
		}
	    }
	}
    }

})();