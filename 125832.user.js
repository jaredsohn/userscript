// ==UserScript==
// @name          4Chan remove XXX
// @namespace     http://boards.4chan.org/*
// @description   Turn the XXX on the post numbers back into the actual post numbers on 4chan.
// @include       http://boards.4chan.org/*
// ==/UserScript==


/* 
 * Originally by Spick and Span
 * updated to work with autorefreshing scripts
 */


function repeatInfinitely(){
	var allSpans, thisSpan;
	allSpans = document.getElementsByTagName('span');
	for (var i = 0; i < allSpans.length; i++) {
	    thisSpan = allSpans[i];
	    if (thisSpan.id.length > 5)
	    {
		  if (thisSpan.id.substr(0,8)=="nothread")
		    {
			thisSpan.childNodes[1].innerHTML = thisSpan.id.substr(8);
		    }
	
	    	  if (thisSpan.id.substr(0,5)=="norep")
		    {
			thisSpan.childNodes[1].innerHTML = thisSpan.id.substr(5);
		    }
		}
	}
	/*
	 *	Check for new posts every half second.
	 */
	setTimeout(function(){repeatInfinitely();},500);
}

repeatInfinitely();