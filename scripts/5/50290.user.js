// ==UserScript==



// @name	Block Bloodcopy



// @description	Block Bloodcopy tags on gawker sites

// @namespace	http://userscripts.org/users/92396



// @include	http://lifehacker.com/*

// @include	http://valleywag.com/*

// @include	http://jalopnik.com/*

// @include	http://consumerist.com/*

// @include	http://gizmodo.com/*

// @include	http://jezebel.com/*

// @include	http://deadspin.com/*

// @include	http://kotaku.com/*

// @include	http://io9.com/*

// @include	http://*.gawker.com/*

// @include	http://gawker.com/*

// @include	http://defamer.com/*

// @include	http://fleshbot.com/*

// ==/UserScript==



(function () {

var tags = document.getElementsByTagName('div');

for (var key in tags)

with (tags[key])

	if (className == 'bloody') {
		parentNode.style.display = 'none';}
	else if (className == 'sponsored') {
		parentNode.style.display = 'none';}

})();