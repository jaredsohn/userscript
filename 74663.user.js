// ==UserScript==
// @name           Facebook Fixed Header
// @namespace	   http://userscripts.org/users/152462
// @creator	   Will Haynes
// @description    Fix the Header on Facebook
// @version	   1.1.1
// @include        *.facebook.tld/*
// @exclude	   http://blog.facebook.tld/*
// @exclude	   https://blog.facebook.tld/*
// ==/UserScript==
	
// CSS to make Header Fixed.

addStyle(

	'  #globalContainer { position : relative !important; margin : 0 auto !important; }  ' + 
	'  #blueBar{ position : fixed !important; top : 0px !important; float : center !important; z-index: 13 !important ; } ' + 
	'  #pageHead{ z-index : 14 !important ; position : relative !important; left : auto !important; width : 980px !important;  float : center !important; } ' + 
	'  #pageLogo, #jewelCase { position : fixed !important; top : 10 !important; left : auto !important; }  ' +
	'  #jewelCase {margin-left : 97px !important; height : 31px !important; }    ' +
	'  #headNav { position : fixed !important; top : 10px !important; width : 799px !important;}  ' +
	'  #content{ margin-top : 31px !important } '

	);

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