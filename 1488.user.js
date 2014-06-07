//
// Copyright (c) 2005, Vlajbert
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "WashingtonPost Auto-Login", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          WashingtonPost Auto-Login
// @namespace     http://vlajbert.blogspot.com/
// @description   Removed inline story ads from Salon.
// @include       http://www.washingtonpost.com/ac2/wp-dyn*
// @version       0.0.1
// ==/UserScript==

(function() {
	if( document.location.search.match( '=admin/registration/login')) login();
	else if( document.location.search.match( '=admin/registration/register')) register();

	function login() {
		document.location = '/ac2/wp-dyn?node=admin/registration/register&destination=register&nextstep=gather';
	}

	function register() {
		var d = new Date();
		var t = d.getTime();
		setValue( 'EmailAddr', t + '@mailinator.com');
		setValue( 'Password', 'abc.123');
		setValue( 'PasswordConfirm', 'abc.123');
		setValue( 'Zip1', '12345');
		setRadio( 'Gender', 0);
		setValue( 'DobYear', '1965');
		setOption( 'JOB_TITLE', 'BOSS');
		setOption( 'PRIM_RESP', 'IT');
		setOption( 'INDUSTRY', 'INTERNET');
		setOption( 'COMP_SIZE', 'SIZE_1');
		
		var form = getObject( document, "//FORM[@name='NewUser']");
		compileAdv( form);
		compilePhoneNum( form);
		checkCookie( form);
	}

	function setOption( select, option) {
		var obj = getObject( document, "//SELECT[@name='" + select + "']/OPTION[@value='" + option + "']").selected = true;
	}
	function setValue( name, value) {
		document.getElementsByName( name).item(0).value = value;
	}

	function setRadio( name, item) {
		document.getElementsByName( name).item(item).checked = true;	
	}

	function getObject( obj, xpath) {
		try { return document.evaluate( xpath, obj, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; } 
		catch( e) { return null; }
	}
})();