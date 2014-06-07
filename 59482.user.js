// ==UserScript==
// @name           Vote Confirmation
// @namespace      codingcromulence.blogspot.com
// @description    Enforce Vote Confirmation
// @include        http://meta.stackoverflow.com/*
// @include        http://stackoverflow.com/*
// @include        http://superuser.com/*
// @include        http://serverfault.com/*
// ==/UserScript==

(function(){
    // Milliseconds to wait for the second click.
	var clickDelay = 1000;
	
	//Function for finding the window's jQuery variable.
	//http://meta.stackoverflow.com/questions/12448/greasemonkey-users-here-is-your-vote-reputation-info-plug-in-for-stackoverflow/12454#12454
	function GM_wait() {
		var daWindow;
		if (window.opera) {
			daWindow=window;
		} else {
			daWindow = unsafeWindow;
		}
		if(typeof daWindow.jQuery == 'undefined') {
			window.setTimeout(GM_wait,100);
		} else {
			jQuery_init(daWindow.jQuery);
		}
	}
	GM_wait();

	var $;
	function jQuery_init(x){
	    $=x;
		More_wait();		
	};
	
	function More_wait() {
		if (
		    (typeof $('.vote-up').length > 0 &&
			 typeof $($('.vote-up')[$('.vote-up').length-1]).data('events') == 'undefined')
			) {
			setTimeout(More_wait,100);
		} else {
			Finally_go($);
		}
	}
	
	function Finally_go($) {
		$(function() {
			$('.vote-up,.vote-down').each(function(i) {
				var el = $($('.vote-up,.vote-down')[i]);
			    if (typeof el.data('events') == 'undefined') {				
					return;
				}
				var f;
				for (j in el.data('events').click) {
					f = el.data('events').click[j];
				}
				el.unbind('click');
				el.click(function(E) {
					if (typeof el.data('sofuVoteClicker') == 'undefined' || el.data('sofuVoteClicker') == false) {
						el.data('sofuVoteClicker',true);
						setTimeout(function() {
							el.data('sofuVoteClicker',false);
						},clickDelay);
					} else {
						el.data('sofuVoteClicker',false);
						el.bind('fake_click',f);
						el.trigger('fake_click');
					}
				});
			});
		});
	};
})();