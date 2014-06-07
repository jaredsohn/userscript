// ==UserScript==
// @name           No-hover scrolling
// @description    Disables CSS hover events while scrolling, improving scroll performance.
// @include        http*

// ==/UserScript==

var body = document.body
,	timer
,	defaultValue = body.style.pointerEvents

window.addEventListener('scroll', function() {
	clearTimeout(timer);
	if ( !body.classList.contains('disable-hover') ) {
		body.classList.add('disable-hover');
		body.style.pointerEvents = 'none';
	}
	
	timer = setTimeout(function(){
		body.classList.remove('disable-hover');
		body.style.pointerEvents = defaultValue;
	}, 250);
}, false);