// ==UserScript==
// @name        Teamsite Navigation
// @namespace   Teamsite
// @description makes Navigation smaller
// @version     0.2
// @grant       none
// @include     */iw-cc/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js
// ==/UserScript==
// (C) Copyright DieWildenSchafe 2013.


var version="0.2";
var debug=false,TeamsiteNavigationInitilied=false;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

if(typeof $ == 'undefined'){ var $ = unsafeWindow.jQuery; }
if(debug) {
	console.log('Teamsite Navigation start version: ' + version);
	console.log('jquery version: '+$().jquery);
	console.log(TeamsiteNavigationInitilied);	
}

if(TeamsiteNavigationInitilied==false){
	//console.log($('td.iw-base-heading-div a'));
	$.each($('td.iw-base-heading-div a'),function(i,e){
		innerhtml = $(e).html();
		innerhtml =innerhtml.split('>');
		$(e).html(innerhtml[0] + '><span>' +innerhtml[1]+'</span>');
	});
	TeamsiteNavigationInitilied = true;	
}

addGlobalStyle('td.iw-base-heading-div a {position:relative;} td.iw-base-heading-div a span { position:absolute;background:white;padding:3px;border:1px solid grey; display:none;top:10px;left:10px; z-index:999;} td.iw-base-heading-div a:hover span{display:block;} td.iw-base-heading-div a img {margin:0 !important;} .iw-base-heading-right-link {padding-left:10px;}');