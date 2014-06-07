// ==UserScript==
// @name                 Rounded Forms
// @namespace            http://userscripts.org
// @description          Rounds corners and adjusts appearance of buttons and textarea, select, and input fields
// @include              http://*
// @include              https://*
// @author               Pete Farmer  <pfarmer at collaboros.com>
// @updated              26-Apr-09
// @version              1.11
// ==/UserScript==

// Updated 26-Apr-09 (v1.11) A few minor tweaks regarding '!important' so that the script is better behaved
//   at maintaining the dimensions and colors of buttons and form fields, where established by a particular
//   site's CSS.
//
// Updated 16-Apr-09 (v1.10) Simplified greatly.  Redesigned so that input, textarea, and select fields and
//   buttons have dimensions identical to these items as defined in Firefox's 'forms.css' file.
//
// Loaded 9-Jul-08 (v1.0)

(function() {
	var cssGlobal = ' ' +
	'/* Colors and borders for un-focused or un-hovered input, textarea, and select fields */' +
		'input:' +
			'not([type=\"password\"]):' +
			'not([type=\"button\"]):' +
			'not([type=\"checkbox\"]):' +
			'not([type=\"file\"]):' +
			'not([type=\"image\"]):' +
			'not([type=\"radio\"]):' +
			'not([type=\"reset\"]):' +
			'not([type=\"submit\"]), ' +
		'textarea, ' +
		'select ' +
		'{ ' +
			'-moz-box-sizing: content-box !important; ' +
			'-moz-appearance: none !important; ' +
			'background-color: #FFE; ' +
			'color: #333; ' +
			'padding-left: 2px; ' +
			'border: 2px solid #89A !important; ' +
			'-moz-border-radius: 0.5em !important; ' +
			'outline: 1px solid #BCC !important; ' +
			'-moz-outline-radius: 0.5em !important; ' +
			'-moz-outline-offset: -1px !important; ' +
		'} ' +

	'/* Colors and borders for in-focus, hovered, or active */ ' +
	'/*   input, textarea, and select fields */ ' +
		'input:' +
			'not([type=\"password\"]):' +
			'not([type=\"button\"]):' +
			'not([type=\"checkbox\"]):' +
			'not([type=\"file\"]):' +
			'not([type=\"image\"]):' +
			'not([type=\"radio\"]):' +
			'not([type=\"reset\"]):' +
			'not([type=\"submit\"]):focus, ' +
		'textarea:focus, ' +
		'select:focus, ' +
		'input:' +
			'not([type=\"password\"]):' +
			'not([type=\"button\"]):' +
			'not([type=\"checkbox\"]):' +
			'not([type=\"file\"]):' +
			'not([type=\"image\"]):' +
			'not([type=\"radio\"]):' +
			'not([type=\"reset\"]):' +
			'not([type=\"submit\"]):active, ' +
		'textarea:active, ' +
		'select:active, ' +
		'input:' +
			'not([type=\"password\"]):' +
			'not([type=\"button\"]):' +
			'not([type=\"checkbox\"]):' +
			'not([type=\"file\"]):' +
			'not([type=\"image\"]):' +
			'not([type=\"radio\"]):' +
			'not([type=\"reset\"]):' +
			'not([type=\"submit\"]):hover, ' +
		'textarea:hover, ' +
		'select:hover ' +
		'{ ' +
			'background-color: #FFC; ' +
			'color: #000; ' +
			'padding-left: 2px; ' +
			'border: 2px solid #8AA !important; ' +
			'-moz-border-radius: 0.5em !important; ' +
			'outline: 1px solid #BBC !important; ' +
			'-moz-outline-radius: 0.6em !important; ' +
			'-moz-outline-offset: 0px !important; ' +
		'} ' +

	'/* Colors and borders for un-focused or un-hovered password fields */' +
		'input[type=\"password\"] ' +
		'{ ' +
			'-moz-box-sizing: content-box !important; ' +
			'-moz-appearance: none !important; ' +
			'background-color: #FED; ' +
			'color: #333; ' +
			'padding-left: 2px; ' +
			'border: 2px solid #79C !important; ' +
			'-moz-border-radius: 0.5em !important; ' +
			'outline: 1px solid #CDF !important; ' +
			'-moz-outline-radius: 0.5em !important; ' +
			'-moz-outline-offset: 0px !important; ' +
		'} ' +

	'/* Colors for in-focus or hovered password fields */' +
		'input[type=\"password\"]:focus, ' +
		'input[type=\"password\"]:hover ' +
		'{ ' +
			'background-color: #FDC; ' +
			'color: #000; ' +
			'padding-left: 2px; ' +
			'border: 2px solid #89A !important; ' +
			'-moz-border-radius: 0.5em !important; ' +
			'outline: 1px solid #BCC !important; ' +
			'-moz-outline-radius: 0.6em !important; ' +
			'-moz-outline-offset: 0px !important; ' +
		'} ' +

	'/* Buttons:Background (if not already set) and borders */ ' +
	'/* Class exceptions are for Google Search site */ ' +
		'button:' +
			'not([class=\"w10\"]):' +
			'not([class=\"w11\"]):' +
			'not([class=\"w20\"]):' +
			'not([class=\"w21\"]):' +
			'not([class=\"w24\"]):' +
			'not([class=\"wci\"]):' +
			'not([class=\"wpb\"]), ' +
		'input[type=\"button\"]:' +
			'not([class=\"w10\"]):' +
			'not([class=\"w11\"]):' +
			'not([class=\"w20\"]):' +
			'not([class=\"w21\"]):' +
			'not([class=\"w24\"]):' +
			'not([class=\"wci\"]):' +
			'not([class=\"wpb\"]), ' +
		'input[type=\"reset\"]:' +
			'not([class=\"w10\"]):' +
			'not([class=\"w11\"]):' +
			'not([class=\"w20\"]):' +
			'not([class=\"w21\"]):' +
			'not([class=\"w24\"]):' +
			'not([class=\"wci\"]):' +
			'not([class=\"wpb\"]), ' +
		'input[type=\"submit\"]:' +
			'not([class=\"w10\"]):' +
			'not([class=\"w11\"]):' +
			'not([class=\"w20\"]):' +
			'not([class=\"w21\"]):' +
			'not([class=\"w24\"]):' +
			'not([class=\"wci\"]):' +
			'not([class=\"wpb\"]):' +
			'not([id=\"my-submit\"]) ' +
		'{ ' +
			'-moz-appearance: none; ' +
			'background-color: #DDE; ' +
			'color: #000; ' +
			'border: 2px solid #899; ' +
			'-moz-border-radius: 0.9em; ' +
			'outline: 2px solid #BBA; ' +
			'-moz-outline-radius: 1em; ' +
			'-moz-outline-offset: -1px; ' +
		'} ' +

	'/* Change buttons when hovered */ ' +
	'/* Class exceptions are for Google Search site */ ' +
	'/* ID exception is for Mozilla Extensions site */ ' +
		'button:' +
			'not([class=\"w10\"]):' +
			'not([class=\"w11\"]):' +
			'not([class=\"w20\"]):' +
			'not([class=\"w21\"]):' +
			'not([class=\"w24\"]):' +
			'not([class=\"wci\"]):' +
			'not([class=\"wpb\"]):hover, ' +
		'input[type=\"button\"]:' +
			'not([class=\"w10\"]):' +
			'not([class=\"w11\"]):' +
			'not([class=\"w20\"]):' +
			'not([class=\"w21\"]):' +
			'not([class=\"w24\"]):' +
			'not([class=\"wci\"]):' +
			'not([class=\"wpb\"]):hover, ' +
		'input[type=\"reset\"]:' +
			'not([class=\"w10\"]):' +
			'not([class=\"w11\"]):' +
			'not([class=\"w20\"]):' +
			'not([class=\"w21\"]):' +
			'not([class=\"w24\"]):' +
			'not([class=\"wci\"]):' +
			'not([class=\"wpb\"]):hover, ' +
		'input[type=\"submit\"]:' +
			'not([class=\"w10\"]):' +
			'not([class=\"w11\"]):' +
			'not([class=\"w20\"]):' +
			'not([class=\"w21\"]):' +
			'not([class=\"w24\"]):' +
			'not([class=\"wci\"]):' +
			'not([class=\"wpb\"]):' +
			'not([id=\"my-submit\"]):hover ' +
		'{ ' +
			'background-color: #EEF; ' +
			'color: #600; ' +
			'border: 2px solid #BCC; ' +
			'-moz-border-radius: 0.9em; ' +
			'outline: 2px solid #788; ' +
			'-moz-outline-radius: 1em; ' +
			'-moz-outline-offset: -1px; ' +
		'} ' ;

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(cssGlobal);
	}

else if (typeof addStyle != "undefined") {
	addStyle(css);
	}

else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(cssGlobal));
	}
}

})();