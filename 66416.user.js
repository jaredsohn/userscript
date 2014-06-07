// ==UserScript==
// @name           Stack Overflow: Show Interesting Plus
// @namespace      http://userscripts.org/users/ahatchkins
// @description    Adds a tab to the Stack Overflow navigation that shows most recent interesting questions
// @include        http://stackoverflow.com/questions*
// ==/UserScript==

function wait() {
	if(typeof unsafeWindow.jQuery != 'function') { 
		window.setTimeout(wait, 100); 
	} else { 
        unsafeWindow.jQuery('#tabs').append('<a id="filter-interesting" title="Most recent interesting questions" href="/questions/tagged?tagnames='+unsafeWindow.jQuery.map(unsafeWindow.jQuery('#interestingTags a'),function(a){return a.text}).join('%20or%20')+'&sort=newest">interesting</a>');
	}
}

wait();