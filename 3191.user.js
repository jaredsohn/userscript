// ==UserScript==
// @name          My_LiveJournal_Style
// @description   Show all LiveJournals in your style.
// @version       2.1.1
// @author        sburke@cpan.org (Sean M. Burke)
// @XXComment     Time-stamp: "2006-02-10 22:05:41 AST"
// @namespace     http://interglacial.com
// @include       http://*.livejournal.com/*
// @exclude       http://*.livejournal.com/*s2id=*
// @exclude       http://www.livejournal.com/doc/*
// @exclude       http://*.livejournal.com/profile*
// @exclude       http://*.livejournal.com/data/*
// @exclude       http://pics.livejournal.com/*
// @exclude       http://www.livejournal.com/portal/*
// ==/UserScript==
/*			"My LiveJournal Style"

This changes all views of LiveJournal journals to display in the style
of *your* LiveJournal.  (You have to be logged in for this to work.)

This is based on Steven Chai's GM script "mylj", which was what got me
into GreaseMonkey back in the day.  If this script stops working,
first look for a new update of this script at
http://userscripts.org/people/3306 and if upgrading doesn't
work, then email me, and in the meantime, drop back to Steve's script,
which is at http://userscripts.org/scripts/show/1097

-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-
 This is a Greasemonkey user script.
 To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
*/

function do_it () {
  if(	    document // Basic sanity
	&&  document.documentElement
	&&  document.documentElement.tagName == "HTML"
	&&  document.contentType == "text/html"
	&&  document.body
        && (location.pathname ||'').indexOf('.bml'  ) == -1 // not a form
        && (location.search   ||'').indexOf('style=') == -1 // not styled
  ) return do_redirect();
  do_rewrite_links();
  return;
}


function do_redirect () {
  // This used to do just location.search = withMyStyle(location.search);
  //  but that did painful things when you were hitting the Back button
  //  and would hit a page that would cause a redirect.  So now we
  //  have the little delay.

  window.setTimeout(
    function () {  location.replace(  withMyStyle(location.search)  )  },
    2345 // milliseconds, mind you.
  );
  window.status = "* My_LiveJournal_Style: redirecting in just a moment *";
  return;
}


function do_rewrite_links () {
  var eachlink;
  for ( var i = 0; i < document.links.length; i++ ) {
    eachlink = document.links[i];	
    if ( 
	( /\.livejournal\.com$/i).test(
            eachlink.hostname || '')
	&& (eachlink.pathname || '').indexOf('.bml'  ) == -1
	&& (eachlink.search   || '').indexOf('style=') == -1
    ) { 
      eachlink.search = withMyStyle(eachlink.search); 
    }
  }
  return;
}


function withMyStyle(s) {
  return( (s ? ( s + '&') :'?') + 'style=mine' );
}


do_it();

// For more fun, see http://interglacial.com/hoj/
