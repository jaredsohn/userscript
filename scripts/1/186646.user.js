// ==UserScript==
// @name			Translate on Google
// @namespace		Translate_on_Google
// @include			*
// @datecreated		2013-12-23
// @lastupdated		2013-12-23
// @version			1.0
// @author			Volkan K.
// @copyright 		2013+, Volkan K.
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		Translate current page on Google Translate by redirecting to Google. Return to original page on menu command.
// @run-at 			document-end
// ==/UserScript==

//this.$ = this.jQuery = jQuery.noConflict(true);

if (/^translate\.google(?:\.[\w]{2,3}){1,2}$/i.test(window.location.hostname)) {
	// Successful match. we are in google translate host
	if ( isTranslatedURL() ){
		GM_registerMenuCommand("Return to Original Page", function(){
			window.location.href=getTranslatedURL();
		});
	}
} else {
	// Match attempt failed, we are NOT in google translate host.
	GM_registerMenuCommand("Translate on Google", function(){
		var lang = navigator.language || navigator.userLanguage;
		var lang_2 = lang.substring(0,2);
		//alert (lang_2); // for testing

		var gtl_url="http://translate.google.com/translate?sl=auto&tl="+lang+"&u="+encodeURIComponent(window.location);
		//alert(gtl_url); // for testing
		window.location.href=gtl_url;
	});
}

function isTranslatedURL(){
	if (!(/^translate\.google(?:\.[\w]{2,3}){1,2}$/i.test(window.location.hostname))) {
		return false;
	}
	if (document.getElementById('gbqfq') && 
		document.getElementById('gbqfq').value && 
		document.getElementById('gbqfq').value!=null && 
		(/^http[s]?:\/\//i.test(document.getElementById('gbqfq').value)) ){
		return true;
	}
	if (/^http[s]?:\/\//i.test(loadPageVar('u'))){
		return true;
	}
	return false;
}

function getTranslatedURL(){
	if (!(/^translate\.google(?:\.[\w]{2,3}){1,2}$/i.test(window.location.hostname))) {
		return null;
	}
	if (document.getElementById('gbqfq') && 
		document.getElementById('gbqfq').value && 
		document.getElementById('gbqfq').value!=null && 
		(/^http[s]?:\/\//i.test(document.getElementById('gbqfq').value)) ){
		return document.getElementById('gbqfq').value;
	}
	if (/^http[s]?:\/\//i.test(loadPageVar('u'))){
		return loadPageVar('u');
	}
	return null;
}

function loadPageVar (sVar) {
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
 