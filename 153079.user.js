// ==UserScript==
// @name          Reddit Mod Nuke Userscript
// @version       3.141.592.653
// @include       htt*://*.reddit.com/*
// @author        djimbob (dr jimbob)
// @description   This userscript helps reddit moderators delete threads.
// ==/UserScript==

delete_function = function(thread_root) {
    var elmnts = document.getElementsByClassName('id-'+thread_root)[0].querySelectorAll('form input[value="removed"]~span.option.error a.yes,a[onclick^="return big_mod_action($(this), -1)"]');
    for(var i=0; i < elmnts.length; i++) {
	setTimeout(
	    (function(_elmnt) {
		return function() {
		    var event = document.createEvent('UIEvents');
		    event.initUIEvent('click', true, true, window, 1);
		    _elmnt.dispatchEvent(event);
		}}
	    )(elmnts[i]), 1500*i); // 1.5s timeout prevents overloading reddit.
    };
}

if(document.querySelector('body.moderator')){ // only execute if you are a moderator
    var nuke_button = new Array();
    var divels = document.querySelectorAll('div.noncollapsed');
    var comment_ids = new Array();


    for (var i = 0; i < divels.length; i++) {
	var author_link = divels[i].querySelector('p.tagline>a.author,p.tagline>span.author,p.tagline>em');
	// p.tagline>a.author is normal comment;
	// some author deleted comments seem to have either
	// p.tagline>span.author or p.tagline>em 
	
	comment_ids[i] = divels[i].parentElement.parentElement.getAttribute('data-fullname');
	
	if(author_link) {
	    // create link DOM element
	    nuke_button[i] = document.createElement('a')
	    nuke_button[i].setAttribute('href', 'javascript:void(0)');
	    nuke_button[i].setAttribute('title', 'Nuke!');
	    nuke_button[i].setAttribute('id', 'nuke_'+i);	    
	    nuke_button[i].innerHTML= "[<strong>Nuke</strong>]";
	    // append after the author's name
	    author_link.parentNode.insertBefore(nuke_button[i], author_link.nextSibling);

	    // Add listener for click; using IIFE to function with _i as value of i when created; not when clicked
	    nuke_button[i].addEventListener('click', 
                (function(_i) {
		    return function() {
			var continue_thread = divels[_i].parentElement.parentElement.querySelectorAll('span.morecomments>a');
			var comment_str = " comments?";
			if(continue_thread.length > 0) {
		    	    comment_str = "+ comments (more after expanding collapsed threads; there will be a pause before the first deletion to retrieve more comments)?";
			}
			var delete_button = divels[_i].parentElement.parentElement.querySelectorAll('form input[value="removed"]~span.option.error a.yes,a[onclick^="return big_mod_action($(this), -1)"]');
			// form input[value="removed"]~span.option.error a.yes -- finds the yes for normal deleting comments.
			// a.pretty-button.neutral finds the 'remove' button for flagged comments
			if (confirm("Are you sure you want to nuke the following " + delete_button.length + comment_str)) {
		    	    for (var indx=0; indx < continue_thread.length; indx++) {
		    		var elmnt = continue_thread[indx];
		    		setTimeout(
		    		    function() {
		    			var event = document.createEvent('UIEvents');
		    			event.initUIEvent('click', true, true, window, 1);
		    			elmnt.dispatchEvent(event);
		    		    }, 2000*indx); // wait two seconds before each ajax call before clicking each "load more comments"
		    	    } 
			    if(indx > 0) {
				setTimeout(function() {delete_function(comment_ids[_i])},
					   2000*(indx + 2)); // wait 4s after last ajax "load more comments"
			    } else {
				delete_function(comment_ids[_i]); // call immediately if not "load more comments"
			    }
			}
		    }
		}
		)(i)); // end of IIFE (immediately invoked function expression)
	}
    }
}
