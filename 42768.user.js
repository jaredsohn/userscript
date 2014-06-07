/*
 *	Name:		Hacker News Comment Marker
 *	Version:	0.1 Beta
 *  Author:		Dan Vogel
 *				http://dmv.transient.net
 *				email: dmv AT transient DOT net
 * 
 *	License:	Hacker News Comment Marker is released under the Open Source MIT License
 *				(c) 2009 Dan Vogel
 *
 *	Original Creation Date:		February 19, 2009
 *
 *	Summary:	Annotate active discussion links with a comment counter variable (&nc=#ofcomments).
 *              Why?  Previously visited discussions that have been added to after the last visit
 *              will appear unvisited.  Idea based on LiveJournal's NCTalkLinks feature (opt_nctalklinks). 
 *
 */

// ==UserScript==
// @name          Hacker News Comment Marker
// @namespace     http://dmv.transient.net/
// @description   Annotate Hacker News conversations with current comment count links, for visited link freshness.
// @include       http://news.ycombinator.com/
// @include       http://news.ycombinator.com/x?*
// @include       http://news.ycombinator.com/news
// @include       http://news.ycombinator.com/newest
// @include       http://news.ycombinator.org/
// @include       http://news.ycombinator.org/x?*
// @include       http://news.ycombinator.org/news
// @include       http://news.ycombinator.org/newest
// ==/UserScript==
 
(function() {
    // jQuery code adding borrowed from Hacker News OnePage script	
	// Add jQuery
	var GM_JQ = document.createElement('script');
	GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js';
	GM_JQ.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	
	// Check if jQuery's loaded
	function GM_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
  	    else { $ = unsafeWindow.jQuery; markupLinks(); }
	}
	GM_wait();
	
	// Let the Fun Begin
    function markupLinks () {
        var comments    =  /(\d+) comments/;
        var items       =  /\/item/;
        var commentcount = [];

        $("a").each( function () {
            if (items.test(this)) {
                commentcount = comments.exec(this.text);
		        if (commentcount!=null && commentcount[0]!=null) {
			        $(this).attr('href',[ this, "&nc=", commentcount[1] ].join(''));
		        }
            }
        });
	}  
})();