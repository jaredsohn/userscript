// ==UserScript==
// @name				Basecamp - Weekend highlighter.
// @description		Highlight weekends on calendars, to avoid making mistakes.
// @version			0.1
// @date				10/17/2011
// @author			Andre Gil
// @include			http*://*basecamphq.com/*
// ==/UserScript==

(function () {

	function addNewStyle(newStyle) {
    	
		var styleElement = document.getElementById('styles_js');
    	
		if (!styleElement) {
		
        	styleElement = document.createElement('style');
        	styleElement.type = 'text/css';
        	styleElement.id = 'styles_js';
        	document.getElementsByTagName('head')[0].appendChild(styleElement);
    	}

    	styleElement.appendChild(document.createTextNode(newStyle));
	}

	function styleWeekends() {
		
		addNewStyle('.weekend { background-color: #FF2E38 !important; }');
	}

	styleWeekends();
	window.addEventListener( 'load', styleWeekends, true );

})()