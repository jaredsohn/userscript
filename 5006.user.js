/*
 * Title: GMail CSS Skin
 * Description: Greasemonkey script for Firefox to change the appearance of GMail
 * Author: RL
 * Updated: 2/2/2007
 *
 */

// ==UserScript==
// @name GMail RL CSS Skin
// @description Greasemonkey script for Firefox to change the appearance of GMail
// @include http://gmail.google.com/*
// @include http://mail.google.com/*
// @include https://gmail.google.com/*
// @include https://mail.google.com/*

// ==/UserScript==


(function()
{
	function addGlobalStyle(css) {
	    var head,style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
}


var BasicFontStyle =		'.lk,' +
							'tr.rr td,tr.ur td,' +
							'span.l,' +
							'a,a:link,a:visited,a:active,a:hover ' +
							'{' +
							'font-family:Arial;' +
							'font-weight:normal;' +
							'font-size: 11px;' +
							'color: #336699; ' +
							'text-decoration: none;' +
							'}';
addGlobalStyle(BasicFontStyle);


var additionalFontStyle =  	'div#fbc,' +
							'div.tbcs,' +
							'div.tbcp b,div.tbcp span,' +
							'div.fq,' +
							'div#fic b,' +
							'span.md,' +
							'div.mb,' +
							'div.ll,' +
							'table.rtab,' +
							'div.rlb,' +
							'div.rhma,' +
							'div.thm,' +
							'span#shwn,' +
							'span#shwn b,' +
							'div.chc div,' +
							'span.bz_mecdn,' +
							'span.bz_rbbb,' +
							'span.bz_men,' +
							'span.lkw,' +
							'td.cdl b,' +
							'td.s,' +
							'td.nm,' +
							'span.setl,' +
							'span.psm,' +
							'span.ctsm,' +
							'tr.tlhc td,' +
							'tr.y td,' +
							'tr.y td a, tr.y td a:visited,tr.y td a:active,tr.y td a:link,tr.y td a:hover,' +
							'tr.y td b,' +
							'td.pr,' +
							'table.pe td,' +
							'table.bookmarks,' +
							'table.bookmarks a,table.bookmarks a:link,table.bookmarks a:visited,table.bookmarks a:active,table.bookmarks a:hover ' +
							'div.tbcp' +
							'{' +
							'font-family:Arial;' +
							'font-weight:normal;' +
							'font-size: 11px;' +
							'color: #336699; ' +
							'text-decoration: none;' +
							'}';
addGlobalStyle(additionalFontStyle);


var newFormsStyle = 		'input,select,textarea,button' +
							'{' +
							'font-family: Arial;' +
							'font-size: 11px;' +
							'color:#336699;' +
							'background-color: #FFFFFF;' +
							'border: 1px solid #336699;' +
							'margin: 0px 0px 0px 0px;' +
							'padding: 0px 0px 0px 0px;' +
							'}';
addGlobalStyle(newFormsStyle);


var newMessagesListStyle = 	'td.sc' +
							'{' +
							'height:20px;' +
							'} ' +
							'.cg,.rr' +
							'{' +
							'background-color: #FFFFFF' +
							'}';
addGlobalStyle(newMessagesListStyle);


var newHiddenStyle = 		'div.ft,div.fv,div.fcs,div.fp,div.rhh,a.lc,div#fbl' +
							'{' +
							'display: none' +
							'}';
addGlobalStyle(newHiddenStyle);



var newHoverStyle = 		'table.tlc tr.ur:hover,table.tlc tr.rr:hover' +
							'{' +
							'background-color: #E0ECFF;' +
							'} ' +
							'table.tlc tr.sr:hover ' +
							'{' +
							'background-color: #E0ECFF;' +
							'}';
addGlobalStyle(newHoverStyle);



var newUnreadItems = 		'table.tlc tr.ur' +
							'{' +
							'background-color: #FFFFFF;' +
							'} ' +
							'table.tlc tr.ur td' +
							'{' +
							'color: #000000;' +
							'}';
addGlobalStyle(newUnreadItems);



var newSpaceLeftStyle = 	'div.fq' +
							'{' +
							'position:absolute; right:5px; top:60px;' +
							'}';
addGlobalStyle(newSpaceLeftStyle);



var newFontStyleLabel = 	'.ct' +
							'{' +
							'font-family:Arial;' +
							'font-size:11px;' +
							'font-weight:normal;' +
							'color: #0C273B;' +
							'text-decoration: underline;' +
							'}';
addGlobalStyle(newFontStyleLabel);
})()



