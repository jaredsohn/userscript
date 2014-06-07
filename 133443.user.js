// ==UserScript==
// @name LLZebraTables
// @namespace http://luelinks.net/
// @description Give LL Zebra Tables to improve readability an sum bulshite
// @require http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js

// @include http://*luelinks.net/showtopics.php*
// @include https://*luelinks.net/showtopics.php*
// @include http://*luelinks.net/links.php*
// @include https://*luelinks.net/links.php*
// DOESN'T WORK // @include http://*luelinks.net/userlist.php*
// DOESN'T WORK // @include https://*luelinks.net/userlist.php*
// DOESN'T WORK // @include http://*luelinks.net/boardlist.php*
// DOESN'T WORK // @include https://*luelinks.net/boardlist.php*
// @include http://*luelinks.net/history.php*
// @include https://*luelinks.net/history.php*
// @include http://*luelinks.net/add.php*
// @include https://*luelinks.net/add.php*
// DOESN'T WORK // @include http://*luelinks.net/showfavorites.php*
// DOESN'T WORK // @include https://*luelinks.net/showfavorites.php*

// @include http://*endoftheinter.net/showtopics.php*
// @include https://*endoftheinter.net/showtopics.php*
// @include http://*endoftheinter.net/links.php*
// @include https://*endoftheinter.net/links.php*
// @include http://*endoftheinter.net/history.php*
// @include https://*endoftheinter.net/history.php*
// @include http://*endoftheinter.net/add.php*
// @include https://*endoftheinter.net/add.php*

// @version 1.0
// @author Stu L Tissimus
// ==/UserScript==

// ============ Default variables, do not change these =====================

var row1colorD = '#D7DEE8';
var borderColorD = '#FFFFFF';
var paddingTopD = 0;
var paddingBottomD = 1;	
var horzBorderD = false;
var vertBorderD = true;
var horzBorderSizeD = '1';
var vertBorderSizeD = '1';

// Wanna reset everything? Set this to true, then false. Useful for Chrome + tampermonkey.
// since it doesn't have an about:config.

addConfigThing();

unsafeWindow.console.log('fuck me');

if (!GM_config.get('row1color')) {
	GM_config.set('row1color', row1colorD);
}

if (!GM_config.get('borderColor')) {
	GM_config.set('borderColor', borderColorD);
}

if (!GM_config.get('paddingTop')) {
	GM_config.set('paddingTop', paddingTopD);
}

if (!GM_config.get('paddingBottom')) {
	GM_config.set('paddingBottom', paddingBottomD);
}

if (!GM_config.get('horzBorder')) {
	GM_config.set('horzBorder', horzBorderD);
}

if (!GM_config.get('vertBorder')) {
	GM_config.set('vertBorder', vertBorderD);
}

if (!GM_config.get('horzBorderSize')) {
	GM_config.set('horzBorderSize', horzBorderSizeD);
}

if (!GM_config.get('vertBorderSize')) {
	GM_config.set('vertBorderSize', vertBorderSizeD);
}

unsafeWindow.console.log('fuck me');


var row1color = GM_config.get('row1color');
var borderColor = GM_config.get('borderColor');
var paddingTop = GM_config.get('paddingTop');
var paddingBottom = GM_config.get('paddingBottom');
var horzBorder = GM_config.get('horzBorder');
var vertBorder = GM_config.get('vertBorder');
var horzBorderSize = GM_config.get('horzBorderSize');
var vertBorderSize = GM_config.get('vertBorderSize');
//var  = GM_config.get('');

// ============================= Functions ==================================

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function $(tag) {
	return document.getElementsByTagName(tag);
}

function markTds() {
	var classic = $('body')[0].className == "classic";
	if (classic) {
		var trs = $('table')[1].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	}
	else {
		var trs = $('table')[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	}
	
	// works with ignorator
	var filteredTrs = new Array();
	for(var i = 0; i < trs.length; i++) {
		if(trs[i].style.display != 'none')
			filteredTrs.push(trs[i]);
	}

	for (var i = 0; i < filteredTrs.length; i++) {
		if(i % 2 == 0) filteredTrs[i].setAttribute('class', 'r0');
           	else filteredTrs[i].setAttribute('class', 'r1');
	}
}
		

function makeAddLinkNotSuck() {
	GM_log($('title')[0].innerHTML);
	if(($('title')[0].innerHTML == "LUElinks - Edit teh link!") || ($('title')[0].innerHTML == "LUElinks - Ad teh link!")) {
		
		$('textarea')[0].cols = '80';
		$('textarea')[0].rows = '15';
		
	}
}

function handleBorders() {
	if (horzBorder) {
		addGlobalStyle('table.grid tr td, table.grid tr th { border-left: ' + horzBorderSize + 'px solid '+borderColor+' !important; }');
		addGlobalStyle('table.grid tr td, table.grid tr th { border-right: ' + horzBorderSize + 'px solid '+borderColor+' !important; }');
	} 
	else {
		addGlobalStyle('table.grid tr td, table.grid tr th { border-left: 0px hidden '+borderColor+' !important; }');
		addGlobalStyle('table.grid tr td, table.grid tr th { border-right: 0px hidden '+borderColor+' !important; }');
	}

	if (vertBorder) {
		addGlobalStyle('table.grid tr td, table.grid tr th { border-top: ' + vertBorderSize + 'px solid '+borderColor+' !important; }');
		addGlobalStyle('table.grid tr td, table.grid tr th { border-bottom: ' + vertBorderSize + 'px solid '+borderColor+' !important; }');
	}
	else {
		addGlobalStyle('table.grid tr td, table.grid tr th { border-top: 0px hidden '+borderColor+' !important; }');
		addGlobalStyle('table.grid tr td, table.grid tr th { border-bottom: 0px hidden '+borderColor+' !important; }');
	}
}

function handleZebraTable() {
	addGlobalStyle(

		'tr.r0 td{ ' +
			'padding-top: '+paddingTop+'px !important; ' +
			'padding-bottom: '+paddingBottom+'px !important; ' +
		'}' +

		'tr.r1 td{ ' +
			'background-color: ' + row1color + ' !important; ' + 
			'padding-top: '+paddingTop+'px !important; ' + 
			'padding-bottom: '+paddingBottom+'px !important; ' +
		'}' + ''
	);
}

/*
var row1colorD = '#D7DEE8';
var borderColorD = '#FFFFFF';
var paddingTopD = 0;
var paddingBottomD = 1;	
var horzBorderD = false;
var vertBorderD = true;
var horzBorderSizeD = '1';
var vertBorderSizeD = '1';
*/
function addConfigThing() {

GM_config.init('zebras', 
{
	'row1color': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Alternate Row Color', // Appears next to field
		'type': 'text', // Makes this setting a text field
		'default': row1colorD // Default value if user doesn't change it
	},
    'borderColor': {'label': "Border Color", 'type': 'text', 'default': borderColorD },
    'paddingTop': {'label': "Pad Top", 'type': 'int', 'default': paddingTopD },
    'paddingBottom': {'label': "Pad Bottom", 'type': 'int', 'default': paddingBottomD },
    'horzBorder': {'label': "Horz Border", 'type': 'bool', 'default': horzBorderD },
    'vertBorder': {'label': "Vert Border", 'type': 'bool', 'default':  vertBorderD},
    'horzBorderSize': {'label': "Horz Size", 'type': 'text', 'default': horzBorderSizeD },
    'vertBorderSize': {'label': "Vert Size", 'type': 'text', 'default': vertBorderSizeD  },
    
}, '',
{ 
    save: function() { location.reload(); }
}
);

GM_registerMenuCommand("Config Zebra Tables", function() { GM_config.open(); } );
}



// ============================== Execution =================================

markTds();
handleBorders();
handleZebraTable();
makeAddLinkNotSuck(); // well that's outdated
