// ==UserScript==
// @name           TechCrunch Light 
// @namespace      http://userscripts.org/scripts/show/107687
// @description    Makes TC's titles smaller, removes logo's creeper
// @include        http://techcrunch.com/*
// ==/UserScript==


(function(){ 
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	var cssStyle = '.module-post .headline, .module-post.quote-post .body-copy, .page .left-container h1, .single .left-container h1{font-size:30px;} .global-module-header-default span{font-size: 15px;} #site-logo{top: -120px !important; min-height: 146px;}';
	
	addGlobalStyle(cssStyle);
})()