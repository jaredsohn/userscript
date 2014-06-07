// ==UserScript==
// @id             remove-wikipedia-money-requests
// @name           Remove Wikipedia notices
// @version        1.1
// @namespace      
// @author         
// @description    
// @include        *wikipedia.org*
// @include        *wikimedia.org*
// @include        *wiktionary.org*
// @include        *wikiversity.org*
// @include        *wikinews.org*
// @include        *wikiquote.org*
// @include        *wikisource.org*
// @include        *wikibooks.org*
// @run-at         document-end
// ==/UserScript==


//main function 
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
	
	//parts of the page to hide
	var cssStyle = '#siteNotice, #enwp-SOPA-GLOBAL-warning, #centralNotice {display:none !important}';
	
	//a little make-up
cssStyle += ''; 

  //add CSS
	addGlobalStyle(cssStyle);
	  
}

)()