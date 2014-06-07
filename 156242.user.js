// ==UserScript==
// @name        SeeVolution Collector
// @namespace   com.seevolution.script
// @description SeeVolution Collector
// @include     http*
// @version     1
// @grant	none
// ==/UserScript==

(function(){
	if(!!window['0xSeeVolution']) return; // code already on page

	window.setTimeout(function(){
		if(!!window['0xSeeVolution']) return;

		if(console && console.debug)
			console.debug('Loading SeeVolution Collector');
		
    var ms = window.document.createElement("script"); 
    ms.setAttribute('src', '//assets.seevolution.com/cjs.aspx');
    ms.setAttribute('async', true);
    ms.setAttribute('type', 'text/javascript');
    var s = window.document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ms, s);

	}, 1000);
})();