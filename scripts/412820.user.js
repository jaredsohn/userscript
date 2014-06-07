// ==UserScript==
// @name            Reddit Visited Link Hider
// @version         0.1
// @namespace       paul.bakaus@gmail.com
// @description     Auto hides links that are marked as visited. Probably only works with Reddit Gold, as links are not marked visited otherwise. Supports RES image toggler, hides on collapse!
// @include         http://*reddit.com/*
// @exclude         http://www.reddit.com/r/*/comments/*
// @exclude         http://www.reddit.com/user/*
// @exclude         http://www.reddit.com/message/*
// @exclude         http://www.reddit.com/reddits/*
// @exclude         http://www.reddit.com/prefs/*

// ==/UserScript==

var lazyIntervalIsLazy = window.setInterval(function() {
    var visible = $('div.thing.visited:visible');
    if(visible.length) {
    	hideTheDamnLink(visible);
    }
}, 500);

function hideTheDamnLink(visible) {
    var first = visible.eq(0);
	$('form.hide-button a', first).click();
}

$('div.thing').on('click', 'a.toggleImage.collapsed', function() {
	hideTheDamnLink($(this).closest('.thing'));
});