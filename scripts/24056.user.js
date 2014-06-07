// ==UserScript==
// @name ElfwoodBigThree
// @namespace http://userscripts.org/scripts/show/24056
// @description Highlights the Elfwood Big Three words as well as some other "offensive language trigger words"
// @include *
// @version 1.3
// @homepage http://www.fourmilab.ch/webtools/greasemonkey/

/*
		     bigthreewords.user
			version 1.3
	      by Ulpu "Ulputti" Pajari

    This Firefox Greasemonkey word-highlighting script
    is designed to make an Elfwood Moderator's life tad easier by allowing
    highlighting certain words or phrases in the body text of web pages.

    Adding of your own words or highlight groups is possible. You can also
    change the highlight colours for each group.

    By default, the highlight group named "kill" is the one that holds the
    highlightable Big 3 words. "Whack" group holds other potentially offensive
    words. Other groups with no functions are kept in order to 
    provide an easier start for those who wish to modify the script. to their 
    liking.

    By default, the "kill" group is highlighted in red. The "whack" group
    is highlighted in blue. You can change the highlight colours if you wish,
    by changing the addGlobalStyle part of the script that has lines such as:
    'span.kill { background-color: #FF0000;} '
    Simply change the HEX code to your liking. The code also accepts common
    colour names such as "red", "silver" and "teal".

    DISABLING HIGHLIGHTING: the most secure way to do this is to simply modify
    the span line ('span.kill { background-color: #FF0000;} ') so that the stuff
    between the braces is removed. To make a certain word from being highlighted,
    simply remove its line from the group in which it's listed.

    * MARKS! Strings containing * marks don't seem to work. Even one bad string
    makes the script fail. Unfortunately it seems you will have to find the f***s
    yourself for the time being...

    "WHACK" GROUP: many of the words listed here have innocent usage,
    such as "peacock". This group is meant to be used as a visual cue only;
    a few blue words here and there probably are all right, but if you start seeing
    loads of little blue bars...

    FEEDPACK AND SUGGESTIONS: please contact me via email or Elfwood Moderator's
    mailing list (my nick there is "hdg_pidgey").

    v1.3 fixed the script to that it actually *functions*. Woots.
    
    v1.2: removed the faulty hit "ftw" (for the win) which is not offensive.
    Reflecting the new rules of Elfwood, created a new group for words that 
    might point out a case of excessive swearing/ offensive language without 
    the use of the Big 3. The "whack" category is currently very short, please
    feel free to mail me suggestions. You will fing my mail address via Elfwood,
    my UID is Ulputti.

    v1.1: added a category that will highlight tickets locked to "yourUIDehere"
    with bright blue: category name is "mod". Replace "yourUIDehere" with your UID
    to make this script highlight all tickets locked to you.

    Happy Modding, Ulputti

*/

/*  This script is derived from Media Trigger Words:
	http://www.fourmilab.ch/webtools/greasemonkey/MediaTriggerWords/
     which in turn was derived from the the Profanity Filter:
	http://userscripts.org/scripts/show/7286
    which in turn is based upon the Jmaxxz Vulgar Word Blocker
	http://userscripts.org/scripts/show/2287
    and the "Dumb Quotes" script:
	http://diveintogreasemonkey.org/casestudy/dumbquotes.html
    in Mark Pilgrim's "Dive into Greasemonkey":
	http://diveintogreasemonkey.org/
*/

// ==/UserScript==

(function() {

    var patterns = [], classes = [];

    /*	The following define the classes of words.  If the first
	character of the specification is "=", the match will be
	case-sensitive, otherwise it will be case-insensitive.
	The specification is a regular expression, and should
	contain metacharacters to handle variant spellings and
	plurals.  Any grouping within these patterns *must* be done
	with a (?: ... ) specification to avoid messing up the
	capture from the text string.

	You may add additional categories as you wish, but be sure to
	declare their rendering in the style definition below.  */

    //	Rendering styles for our various word classes

    addGlobalStyle('span.love {} ' +
		   'span.mod { background-color: #0000FF;}' +
		   'span.hate {} ' +
		   'span.kill { background-color: #FF0000;} ' +
		   'span.whack { background-color: #0000FF;} ');

    //	"love" words

    defwords([
		"Moderat(?:or|ors)",
		"ERB",
		"The Rules",
		"Elfwood?",
	     ],
	"love");
    //	"mod" words

    defwords([
		"Locked by insertyourUIDehere for?",
	     ],
	"mod");

    //	"hate" words

    defwords([
		"NG",
		"Quality issue(?:s)?",
	     ],
	"hate");

    //	The 3 Big Bad Words

    defwords([
		"fuck?",
		"shi(?:t)",
		"cun(?:t)",
		"wtf?",
		"fucking?",
		"(?:mother|mudda|mom|mum|ma|mother |mutha|ma )fuck(?:er|in|a)(?:s|g|h)?",
		"STFU?",
		"RTFM?",
		"mofo?",
	     ],
	"kill");    

    //	The Other Bad Words

    defwords([
		"(?:you|they|ya|y'all|u|this|that) suck(?:s|er| )(?:my|mah|mi)?",
		"(?:god|god )dam(?:n|mmit|d)(?:ed)?",
		"heck?",
		"hell?",
		"WTH?",
		"(?:ass|arse|butt)(?:hole|s)?",
		"(?:dick|cock|prick|ball)(?:s)",
		"(?:pussy|twat)",
		"(?:loser|homo|wank|nigger|fag|faggot)(?:er|ers|y|ish)?",
		"(?:slut|whore|ho)(?:s|es|ty|tish)?",
	     ],
	"whack");

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