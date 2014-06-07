// ==UserScript==
// @name          Reddit de-emph viewed stories
// @description	  De-emphasize viewed stories and remove entries for particular domains
// @namespace     http://reddit.com/user/juneof44
// @include       http://reddit.com/*
// @include       http://*.reddit.com/*
// @exclude       http://*.reddit.com/r/*/comments/*
// @exclude       http://reddit.com/r/*/comments/*
// ==/UserScript==

//list of domains to remove from story list. (example.org|example.org)
var site_blacklist = /examplesite1.org|examplesite2.org/ig;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//what to do to the thing element of a visited story
function theVisitedAction(thing){
	thing.children().css('opacity','0.2');
}

//reverse visited action for mouseover
function reverseVisitedAction(thing){
	thing.children().css('opacity','1');
}

//what to do to the thing element when it is from a blacklisted domain
function theSiteBlacklistAction(thing){
	thing.remove();
}

//wire the thing element for mouseover and perform the visited action on element
function wireUpVisitedThing(thing){
	theVisitedAction(thing);
	
	//remove de-emph on hover
	thing.children().hover(function(){reverseVisitedAction($(this).parent('.thing')); }, function(){theVisitedAction($(this).parent('.thing')); })
}

// get jQuery from Reddit
$ = unsafeWindow.jQuery;

// give the visited links a unique bit to identify them by
addGlobalStyle('a:visited { z-index: 666}');


//wire up all story links to de-emph on click as well as de-emph visited
$('.entry > .title').each(function(i){
	var me = $(this);
	var meA = me.find('a');

	//de-emph visited
	if(meA.css('z-index')=='666')
        	{
		wireUpVisitedThing(me.parents('.thing'));
	}

	//de-emph on mousedown
	meA.mousedown(function(){wireUpVisitedThing($(this).parents('.thing'));return true;})

	//domain blacklist removal
	if(me.find('.domain').text().replace(/\(\)/).match(site_blacklist))
	{theSiteBlacklistAction(me.parents('.thing'));}
});