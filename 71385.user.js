// ==UserScript==
// @name           Highlight BadWords
// @description    Highlights BadWords
// @include        *
// @copyright      Brian Quinn
// @version        0.5
// @namespace      http://userscripts.org/users/122764
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// ==/UserScript==

(function() {

    var patterns = [], classes = [];

    /*	If the first character is "=", the match will be
	case-sensitive, otherwise it wont. */

    //	Colors for the word lists

    addGlobalStyle('span.bad1 { background-color: #FF0000; } ' +
		   'span.bad2 { background-color: #00FF00; } ' +
		   'span.bad3 { background-color: #0000FF; } ');

    //	Very bad words = bad1

    defwords([
		"fuck",
		"fucker",
		"fucking",
		"fucked",
		"motherfucker",
		"pussy",
		"cunt",
		"cock",
		"cocksucker",
		"nigger",
	     ],
	"bad1");

    //	kind of bad words = bad2

    defwords([
		"ass",
		"asshole",
		"shit",
		"bitch",
		"goddamn",
	     ],
	"bad2");

    //	not really bad words = bad3

    defwords([
		"butt",
		"butthole",
		"jerk",
		"crap",
		"hell",
	     ],
	"bad3");

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

    //	We only modify HTML/XHTML documents
    if (document.contentType &&
    	(!(document.contentType.match(/html/i)))) {
    	return;
    }

    // Highlight words in body copy

    var textnodes = document.evaluate("//body//text()", document, null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < textnodes.snapshotLength; i++) {
	var node = textnodes.snapshotItem(i);
	/* Test whether this text node appears within a
	   <style>, <script>, or <textarea> container.
	   If so, it is not actual body text and must
	   be left alone to avoid wrecking the page. */
	if (node.parentNode.tagName != "STYLE" &&
	    node.parentNode.tagName != "TEXTAREA" &&
	    node.parentNode.tagName != "SCRIPT") {
	    /* Many documents have large numbers of empty text nodes.
	       By testing for them, we avoid running all of our
	       regular expressions over a target which they can't
	       possibly match. */
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
