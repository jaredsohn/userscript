/*
BlogThis Quote Fixer
1.0
2005-03-06
Copyright (c) 2005, Phil Ringnalda
Released under the BSD license
http://www.opensource.org/licenses/bsd-license.php

--------------------------------------------------------------------
(Text lifted from Mark Pilgrim's scripts,
 http://diveintomark.org/projects/greasemonkey/)

This is a Greasemonkey user script.

To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
Then restart Firefox and revisit this script.
Under Tools, there will be a new menu item to "Install User Script".
Accept the default configuration and install.

To uninstall, go to Tools/Manage User Scripts,
select "BlogThis Quote Fixer", and click Uninstall.
*/

// ==UserScript==
// @name            BlogThis Quote Fixer
// @namespace       http://philringnalda.com/greasemonkey/
// @description     Replaces "quoted" quoted text with a <blockquote/>
// @include         http://www.blogger.com/blog_this*
// @include         http://www.blogger.com/blog-this*
// ==/UserScript==

(function() {
    var BlogThisQuoteFixer =
    {
        fixQuotes: function()
        {
            var txa = document.getElementById("postBody");
            if (!txa) return;
            var val = txa.value;
            // bail if we've already worked it over
            if (val.indexOf("<blockquote>") !== -1) return;
            var idx = val.indexOf("/a>:")+4;
            // bail if there wasn't a quote
            if (idx == 3) return;
            var quoted = val.slice(idx);
            // replace "foo\n\nbar" with <blockquote><p>foo</p><p>bar</p></blockquote>
            var rNewlines = /\n\n/g;
            var rQuote = /"/;
            // \n\n to </p><p>
            quoted = quoted.replace(rNewlines,"</p><p>");
            // first " to \n\n<blockquote>
            quoted = quoted.replace(rQuote,"\n\n<blockquote><p>");
            // second " to </blockquote>\n\n
            quoted = quoted.replace(rQuote,"</p></blockquote>\n\n");
            // stick it back in
            val = val.slice(0,idx+1) + quoted;
            txa.value = val;
        }
    }
    BlogThisQuoteFixer.fixQuotes();
})();
