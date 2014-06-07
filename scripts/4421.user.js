// ==UserScript==
// @name          PayPal Secure Login
// @author        Ezy Inc.
// @namespace     http://www.ezyinc.com
// @description   Automatic redirection to secure PayPal login page
// @include       http://www.paypal.com/
// @include       http://www.paypal.com.au/au
// @include       http://www.paypal.at/at
// @include       http://www.paypal.be/be
// @include       http://www.paypal.ca/ca
// @include       http://www.paypal.com.cn/cn
// @include       http://www.paypal.fr/fr
// @include       http://www.paypal.de/de
// @include       http://www.paypal.it/it
// @include       http://www.paypal.nl/nl
// @include       http://www.paypal.es/es
// @include       http://www.paypal.ch/ch
// @include       http://www.paypal.co.uk/uk
// ==/UserScript==

(function(){
	var url = location.href;
	
	//Determine country
	var url_array = url.split('paypal.');
	url_array = url_array[1].split('/');
	
	var country = url_array[0];
	country = country.replace('com.','');
	country = country.replace('com','');
	country = country.replace('co.','');
	
	
	//Redirect browser
	if(url.indexOf("https://")!=0) {
	
		//Non-US
		if(country != '') {
			//var redirect = confirm('NOTICE\nSelect OK to automatically proceed to the PayPal secure log in page. Otherwise, select Cancel.');
			var redirect = true;
			if(redirect) {
				url = 'https://www.paypal.com/'+country+'/cgi-bin/webscr?cmd=_login-run';
				window.location = url;
			}
		}
		//US
		else {
			url = 'https://www.paypal.com/';
			window.location = url;
		}
	}
	
})();