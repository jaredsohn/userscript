// ==UserScript==
// @name        Remove Google Bar and Compact Margin
// @version     1.3
// @description Remove top bar and compact margin to save screen estate.
// @updateURL   https://userscripts.org/scripts/source/133536.user.js
// @include     *://*.google.*/*
// @exclude     *://code.google.*/*
// @exclude     *://docs.google.*/*
// ==/UserScript==

// Define CSS rules
var elem = document.getElementById('gb');
var css = (elem && elem.clientHeight > 30 || location.hostname.search('mail') >= 0
	?	// New-style bar
		'#gbx3, #gbzw { display: none !important; }' +
		'#gb { height: 45px !important; }' +
		'#gbx1, #gbq, #gbu { top: 0px !important; }' +
		'#gbu, #gbq2 { padding-top: 8px !important; }' +
		'#gbqlw { height: 44px !important; }' +
		'#gbbw { top: 60px !important; }' +
		// Gmail
		(!document.getElementById('gbx1') || document.getElementById('gbx1').clientHeight ? '#gbx1 { height: 44px !important; }' : '') +
		'.G-atb { margin-top: 2px !important; padding-bottom: 7px !important; }' +
		'.aki { padding: 2px 16px 15px 1px !important; }' +
		// Google Reader
		'#viewer-header, #sections-header { height: 43px !important; }' +
		'#viewer-top-controls-container { margin-top: -15px !important; }' +
		'#logo-section { height: 31px !important; line-height: 31px !important; }' +
		'#lhn-add-subscription { top: 20px !important; }' +
		'#lhn-add-subscription-section { height: 35px !important; }' +
		// Google Docs
		'#viewpane-toolbar, .product-logo { padding-top: 7px !important; padding-bottom: 7px !important; }' +
		'.contentcreationpane { padding-top: 7px !important; padding-bottom: 6px !important; }' +
		'.doclist-header { height: 24px !important; }' +
		'.doclist-container { padding-top: 24px !important; }' +
		// Google Books
		'#menu_td { padding-top: 7px !important; }' +
		'#menu_scroll { margin-top: 36px !important; }' +
		// Google Groups
		'#t-h { padding-top: 2px !important; }' +
		// Google Latitude
		'#latitude-app-bar { height: 11px !important; padding-top: 10px !important; }' +
		// Google Maps
		'.header-buttons { padding-top: 8px !important; }' +
		'#topbar { line-height: 43px !important; }' +
		'#topbar-startcol { height: 43px !important; }' +
		'#panel { top: 44px !important; }' +
		'.launcher { padding-top: 11px !important; }' +
		'#dir_wps { margin-top: 8px !important; }' +
		'#mp-navbar, #mp-create-map { margin-top: 11px !important; margin-bottom: 11px !important; }' +
		'.subpanel { padding-top: 11px !important; }' +
		'#qmod { margin-bottom: 0px !important; }' +
		'.rmi-rpl-k { margin-top: 9px !important; }' +
		// Google Calendar
		'#vr-nav { margin-top: 6px !important; padding-bottom: 7px !important; }' +
		'#sidebar { padding-top: 7px !important; }' +
		'#mainbody { padding-top: 7px !important; }' +
		(document.getElementById('page-header') ?
		// Google News
		'.kd-appbar { height: 43px !important; }' +
		'.kd-appname-wrapper { margin-top: 9px !important; }' +
		'.in-header { top: 7px !important; }' :
		// Google Patents
		'.kd-appbar { padding: 7px 0 !important; }') +
		// Google Translate
		'#gt-appbar { padding-top: 5px !important; padding-bottom: 14px !important; height: 22px !important; }' +
		'#contentframe { top: 87px !important; }' +
		// Account Settings
		'.ZaPDOe { padding-top: 7px !important; padding-bottom: 7px !important; }' +
		'.h19TVe { padding-top: 8px !important; }' +
		'.NxHZPb { top: 89px !important; }' +
    '.la.g-t { top: 117px !important; }' +
		// Search Settings
		'.appbar { height: 29px !important; line-height: 29px !important; padding: 7px !important}' +
		'.leftPane { margin-top: 10px !important; }' +
		'.rightPane { margin-top: 0px !important; }' +
		// Advanced Search
		'.advsearch { margin-top: 14px !important; }' +
		// Google Plus
		'.RWa { top: 113px !important; }' +
		'.AYoUUe { top: 46px !important; }' +
		'.cVa.dFEfVe { top: 160px !important; }' +
		// Google Search
		'#searchform { top: 265px !important; }'
	:	// Old-style bar
	 	(elem && elem.parentNode.removeChild(elem),
		'#gb, #google_bar { display: none !important; }' +
		'.sfbg { top: 0px !important; }' +
		'.sfbg, .sfbgg { height: 44px !important; }' +
		'#sform, #sfcnt { height: 6px !important; }' +
		'.tsf-p { top: -15px !important; }' +
		'#logo { top: -1px !important; height: 40px !important }' +
		'#docs-titlebar-container { top: 0px !important; }' +
		'#gs_hdr { height: 45px !important; }' +
		'#gs_hdr_bg, #gs_hdr_lt, #kd-googlebar, #kd-appswitcher { height: 44px !important; }' +
		'#gs_hdr_rt, #gs_hdr_md { padding-top: 8px !important; }' +
		'#gs_hdr_lt .gs_ico_ggl { top: -13px !important; }' +
		'.gs_el_sm #gs_hdr_lt .gs_ico_ggl { top: 5px !important; }' +
		'#gs_ab { height: 43px !important; }' +
		'#gs_ab_na { top: 10px !important; }' +
		'#gs_ab_md { top: 14px !important; }' +
		'#gs_ab_rt { top: 7px !important; }' +
		'#gs_bdy { margin-top: 7px !important; }' +
		'table.layout { margin-top: 0px !important; margin-bottom: 0px !important; }' +
		// Google Search
		'#ab_ctls { top: 7px !important; }' +
		'#resultStats { top: 14px !important; }' +
		'#rcnt { margin-top: 7px !important; }'))
	+
		'#ab_name { top: 9px !important; }' +
		'.sp_cnt { margin: 0px !important; }' +
    // Google Scholar
    '#gs_gb { display: none !important; }' +
    '#gs_ab_rt { top: -7px !important; }';
function attrObserver(callback) {
	var observer; if(observer = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver) {
		observer = new observer(function(mutations) { mutations.forEach(function(mutation) { callback(mutation.target); }); });
		return {
			observe: function(elem) { observer.observe(elem, { attributes: true }); },
			disconnect: function() { observer.disconnect(); } };
	} else {
		var elemList = []; function listener(event) { callback(event.target); }
		return {
			observe: function(elem) { elem.addEventListener('DOMAttrModified', listener); elemList.push(elem); },
			disconnect: function() { while(elemList.length) elemList.pop().removeEventListener('DOMAttrModified', listener); } } } }
function heightLimit(elem, height) {
	function callback(elem) { elem.clientHeight > height && (elem.style.height = height.toString() + 'px'); };
	attrObserver(callback).observe(elem); callback(elem); };
// Google Plus
(elem = document.getElementsByClassName('G3a')).length && heightLimit(elem[0], 45);
(elem = document.getElementsByClassName('Dob')).length && heightLimit(elem[0], 45);
// Google Instant
(elem = document.getElementById('gbx1')) && heightLimit(elem, 44);
// Movie Showtimes
(elem = document.querySelector('#search_form > table > tbody > tr > td > a > img')) && (elem.vspace = '0',
	document.querySelector('#search_form > table > tbody > tr > td + td + td > table > tbody > tr > td').style.height = '12');
// Google Trends
(elem = document.querySelector('body > form > table > tbody > tr > td > a > img')) && (elem.style.marginTop = '0px',
	elem = document.querySelector('body > form > table > tbody > tr > td + td + td'),
	elem.parentNode.removeChild(elem),
	document.querySelector('body > form > table:nth-child(3) > tbody > tr > td').style.height = '7');
// Google Scholar
(elem = document.querySelector('#scife_hdr > div')) && (elem.style.margin = '3px',
	document.querySelector('#scife_hdr').style.marginBottom = '2px');
// Google Search
(elem = document.querySelector('#topabar > div')) && (elem.style.height = '43px');
// Google Search Hong Kong
document.body.addEventListener('DOMNodeInserted', function listener(event) {
	event.target.id == 'extabar' && (
		event.target.querySelector('#topabar > div').style.height = '43px', document.body.removeEventListener('DOMNodeInserted', listener)); });
// Google Groups
if(location.hostname.search('groups') >= 0) {
	function observe(elem, pred) {
		function predRec(elem) {
			return pred(elem) || (function () { var elemList = elem.getElementsByTagName('*');
				for(var i = 0; i < elemList.length; ++i) if(pred(elemList[i])) return true; return false; })(); }
		function stop() {}
		var observer = attrObserver(function(elem) { pred(elem) && stop(); });
		var listener = function(event) { predRec(event.target) && stop(); }
		predRec(elem) || (elem.addEventListener('DOMNodeInserted', listener), observer.observe(elem)); };
	observe(document.body, function(elem) {
		return elem.clientHeight == 58 && (
			elem.style.cssText = 'height: 43px !important;',
			elem.querySelector('div').style.cssText = 'margin-top: 7px !important;',
			elem.querySelector('h2').style.cssText = 'top: 10px !important;', true); });
	function cssPaddingText(px) { return 'padding-top: ' + px.toString() + 'px !important; padding-bottom: ' + px.toString() + 'px !important;'; };
	var cssFontText = 'font-size: inherit !important; font-weight: bold !important;';
	observe(document.body, function(elem) {
		return elem.id == 'sg-ft' && (
			elem.style.cssText = cssFontText, elem = elem.parentNode.parentNode.parentNode.parentNode,
			elem.parentNode.style.cssText = cssPaddingText(0),
			elem.style.cssText = cssPaddingText(5), true); });
	observe(document.body, function(elem) {
		return elem.id == 'f-h' && (
			elem.style.cssText = cssPaddingText(5),
			observe(elem.querySelector('#f-h > div > div'), function(elem) { elem.style.display != 'inline' && (elem.style.display = 'inline'); }),
			elem.querySelector('div > span > span + span > span').style.cssText = cssFontText, true); });
	observe(document.body, function(elem) { return elem.id == 'nt-c' && (elem.querySelector('div').style.cssText = cssPaddingText(7), true); });
	observe(document.body, function(elem) {
		return (elem.id == 'fs-h' || elem.id == 's-h') && (
			elem.style.display == 'none' || (elem.style.cssText = cssPaddingText(4 + (elem.id == 's-h'))),
			elem = elem.parentNode.querySelector('div + div > div > div > div').childNodes[0],
			elem.childNodes[0].style.cssText = cssPaddingText(0),
			observe(elem, function(elem) {
				var style = window.getComputedStyle(elem);
				style.getPropertyValue('padding-top') == '16px' && style.getPropertyValue('padding-bottom') == '16px' &&
					(elem.style.cssText = cssPaddingText(7)); }), true); }); }
(elem = document.querySelector('#sft')) && (elem.style.marginTop = '10');
// Google Alerts
(elem = document.querySelector('#kd-appswitcher img')) && (elem.style.marginTop = '4px');
// Advanced Search
(elem = document.querySelector('.advsearch > div')) && (elem.style.marginBottom = '21px');
// Insert CSS rules
GM_addStyle(css);
