// ==UserScript==
// @name		Show Company Details
// @version		0.04
// @description	Shows Company Details on every company page without clicking "Show more details" button
// @author		piotrek78
// @namespace	piotrek78
// @include		http://ww*.erepublik.com/*/company/*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

window.addEventListener('load', function(){
	if(typeof ($ = jQuery.noConflict()) != "undefined"){	
		unsafeWindow.open_company_details();
		$('#open_details').hide("fast");		
	}
}, false);

// =============================================================================================================
// 	Version		Date			Change Log
//
//	0.04		8 jan 2010		Changed way to display details to one provided by erepublik.com. If it doesn't work use previous version (http://userscripts.org/scripts/version/65933/160862.user.js)
//
//	0.03		8 jan 2010		Removed "Show more/details button" after seccesful details load. If You want it use previous version.
//
//  0.02		8 jan 2010		Removed timeout - should be faster
//
//  0.01		8 jan 2010		Initial release
