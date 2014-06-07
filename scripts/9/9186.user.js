// Scholar
// 2007-04-30
// Copyright (c) 2007, punkaholic, Based on Butler script.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// ==UserScript==
// @name            Scholar
// @namespace       http://
// @description     Link to Google scholar and citeseer
// @include         http://*.google.*/*
// ==/UserScript==
	
    var ScholarServices = {

	_otherWebSearches: function(q) {
	    var s = '';
	    s += '<a href="http://www.google.co.uk/search?q=' + q + '">Google UK</a>, ';
	    s += '<a href="http://scholar.google.com/scholar?q=' + q + '">Google Scholar</a>, ';
	    s += '<a href="http://citeseer.ist.psu.edu/cis?q=' + q + '">CiteSeer</a>';
	    return s;
	},
	_otherWebSearchesGS: function(q) {
	    var s = '';
	    s += '<a href="http://www.google.co.uk/search?q=' + q + '">Google UK</a>, ';
	    s += '<a href="http://www.google.co.jp/search?q=' + q + '">Google JP</a>, ';
	    s += '<a href="http://citeseer.ist.psu.edu/cis?q=' + q + '">CiteSeer</a>';
	    return s;
	}};

    var Scholar = {

	// add arbitrary CSS styles to page
	addGlobalStyle: function(css) {
            var style = document.createElement("style");
	    style.type = "text/css";
            style.innerHTML = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        }};
     var ScholarFunc = {
	addOtherWebSearches: function() {
	    var header = document.evaluate("//table[@class='t bt']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    if (!header) return;
	    var form = document.forms.namedItem("gs");
	    var input = form.elements.namedItem("q");
	    var q = input.value;
	    var other = document.createElement('div');
	    var s = '<p style="font-size: small">&#x2605; Try your search on ';
	    s += ScholarServices._otherWebSearches(q);
	    s += '</p>';
	    other.innerHTML = s;
       	    header.parentNode.insertBefore(other, header.nextSibling);
	 },
	addOtherWebSearchesGS: function() {
	     var header = document.evaluate("//table[@bgcolor='#dcf6db']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    if (!header) return;
	    var form = document.forms.namedItem("gs");
	    var input = form.elements.namedItem("q");
	    var q = input.value;
	    var other = document.createElement('div');
	    var s = '<p style="font-size: small">&#x2605; Try your search on ';
	    s += ScholarServices._otherWebSearchesGS(q);
	    s += '</p>';
	    other.innerHTML = s;
       	    header.parentNode.insertBefore(other, header.nextSibling);
	 }
     }
    var href = window.location.href;
    if (href.match(/^http:\/\/www\.google\.[\w\.]+\/search/i)) { 
       ScholarFunc.addOtherWebSearches();
    }
    if (href.match(/^http:\/\/scholar\.google\.com\/[\w\.]+/i)) {
	   ScholarFunc.addOtherWebSearchesGS();
    }
