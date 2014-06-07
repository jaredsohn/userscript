// ==UserScript==
// @name           Facebook Chat-box Re-sizer
// @namespace	   http://userscripts.org/users/152462
// @creator	   Will Haynes
// @description    Increase the tiny chat box size!
// @version	   0.1
// @include        *.facebook.tld/*
// ==/UserScript==
	
// CSS to increase chat box size


addStyle(  'div.conversationContainer { height : auto !important;  max-height : 400px !important ; min-height : 241px}'  );


// Function to add style


function addStyle(css) {

	if (typeof GM_addStyle !== 'undefined') { 
		return GM_addStyle(css); 
		}

	else if (heads = document.getElementsByTagName('head')) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		heads[0].appendChild(style);
		}
}

