// ==UserScript==
// @name        Wall Post Links
// @namespace   http://www.erepublik.com
// @description	Adds a link to each wall post on eRepublik
// @include     http://www.erepublik.com/*
// @version     0.0.2
// @updateURL	https://userscripts.org/scripts/source/175914.meta.js
// @downloadURL	https://userscripts.org/scripts/source/175914.user.js
// @grant		GM_wait
// ==/UserScript==

GM_wait();

function GM_wait() {

	//jQuery is already defined by eRep, waits for it to load
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	}
	else {
		$ = unsafeWindow.jQuery;
		
        scan();
        observeNewComments();	
	}
}

function observeNewComments() {
	var target = document.querySelector('.wall_post_list > ul');
	var observer = new MutationObserver(function(mutations) {
  			scan();
		});
	var config = { childList: true };
	observer.observe(target, config);
}

function scan() {
    $('.wall_post').each(function(index){
        if(!$(this).attr('hasLink')) {
        	var id = $(this).attr('id').replace('post_', '');
        	$(this).find('.post_actions')
        		.append(' <span>·</span> ')
        		.append('<a href="http://www.erepublik.com/en?viewPost=' + id + '">Link</a>');
            $(this).attr('hasLink', true);
        }
    });
}

