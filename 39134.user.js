// TK_popmundo user script
// version 1.0
// 2008-09-11
// Copyright (c) 2008, Luigi Sapienza
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           TK_popmundo
// @namespace      http://www.popmundo.com
// @description    Features for CEO on popmundo
// @include        http://www*.popmundo.com/common/*
// @include        http://www*.popmundo.com/Common/*
// @version				 1.0
// ==/UserScript==

var URLCOMPANY_SHOWS   = 'Company.asp?action=Shows';

if (location.href.indexOf(URLCOMPANY_SHOWS) > 0)
{
	
	var aElements = document.getElementsByTagName('a');
	var cella;
	for(var i = 0; i < aElements.length; i++)
	{
	    if(aElements[i].href.indexOf('Company.asp?action=InvitationShows') > 0)
	    {
	    	cella = aElements[i].parentNode;
				break;
			}
	}
	if(cella)
	{
    var newdiv = document.createElement('div');
		var stringa = '<a href="javascript:void(0)" onclick="' +
			' var classi = new Array(); ' +
			' classi[0]=\'popomungo_ticketLimitAlertIcon\'; ' +
			' classi[1]=\'popomungo_ticketLimitWarningIcon\';  ' +
			' classi[2]=\'popomungo_highTicketPriceAlertIcon\'; ' +
			' classi[3]=\'popomungo_highTicketPriceWarningIcon\'; ' +
			' document.getElementsByClassName = function(cl) { ' +
			' var retnode = []; ' +
			' var myclass = new RegExp(\'\\\\b\'+cl+\'\\\\b\'); ' +
			' var elem = this.getElementsByTagName(\'*\'); ' +
			' for (var i = 0; i < elem.length; i++) { ' +
			' var classes = elem[i].className; ' +
			' if (myclass.test(classes)) retnode.push(elem[i]); ' +
			' } ' +
			' return retnode; ' +
			' }; ' +
			' for (var i = 0; i < classi.length; i++) ' +
		  ' { ' +
			' 	var imgElements = document.getElementsByClassName(classi[i]); ' +
			' 	for(var j = 0; j < imgElements.length;j++) ' +
			' 	{ ' +
			' 		var y = imgElements[j].parentNode.parentNode.childNodes[7]; ' +
			' 		while (y.nodeType!=1)  ' +
			' 		{ y=y.nextSibling; } ' +
			' 		var _url = y.childNodes[0]; ' +
			' 		window.open(_url); ' +
			' 	} ' +
		  ' } ' +
		';return false;"> Apri Concerti Problematici</a>';
		newdiv.innerHTML = stringa;
		cella.appendChild(newdiv);
		
		var stringa = '<a href="javascript:void(0)" onclick="' +
			'var tdE = document.getElementsByTagName(\'td\'); ' +
			'for (var i = 0; i < tdE.length; i++) ' +
			'{ ' +
			'	if(tdE[i].innerHTML.indexOf(\'10000()\') > 0 && tdE[i].innerHTML.indexOf(\'<td\') < 0) {' +
			'		var y = tdE[i].parentNode.childNodes[7];  ' +
			'		while (y.nodeType!=1)  ' +
			'		{ y=y.nextSibling; }  ' +
			'		var _url = y.childNodes[0]; ' +
			' 		window.open(_url); }}' +
		';return false;"> Apri Concerti a 10000</a>';			
		newdiv2 = document.createElement('div');
		newdiv2.innerHTML = stringa;
		cella.appendChild(newdiv2);
	}
}