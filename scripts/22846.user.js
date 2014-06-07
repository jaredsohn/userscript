// Auto-reload page script
// version 0.0.005 Beta
// 2008-02-14
// Copyright (c) 2008, Everton Fraga
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "My WeShow Widget Panel", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name         Auto-reload page script
// @namespace     http://www.evertonfraga.com
// @description   Reload a page continuously. To set a page to Auto-reload Script, just a right-click on GreaseMonkey menu -> Script Commands -> 'Set page to Auto-reload Script'. And Voilà!
// @include       http://*
// ==/UserScript==

//---------------------
//global functions

//funtion that adds URL to GreaseMonkey 'cache'
addUrl = function(){
	var confirmAddUrl = confirm('Are you sure you want to set this URL to Auto-reload Script?');
	if(confirmAddUrl){
		setUrl(window.location.href)
		alert('You\'ve set '+getUrl()+' to Auto-reloading script. To remove it, right-click on Greasmonkey menu -> Clear')
		reload()
	}
}

//function to remove URL from GreaseMonkey 'cache'
removeUrl = function(){
	var confirmRemoveUrl = confirm('Are you sure you want to remove '+getUrl()+' from Auto-reload Script?')
	if(confirmRemoveUrl){
		setUrl('')
		alert(getUrl())
	}
}

//encapsuling function that returns URL saved on Greasemonkey's cache
getUrl = function(){
	return GM_getValue('addressValue', null)
}

//encapsuling function that sets URL to GreaseMonkey's cache
setUrl = function(value){
	return GM_setValue('addressValue', value)
}

//function that reloads page according to saved URL
reload = function(){
	if(getCurrentUrl()==getUrl()){
		window.location.reload()
	}
}

//returns current URL
getCurrentUrl = function(){
	return window.location.href
}

//where it all starts
init = function(){	
	GM_registerMenuCommand('Set this page to Auto-reload Script', addUrl);
	if(getUrl()!=null){
		GM_registerMenuCommand('Remove page from Auto-reload Script', removeUrl)
	}
	reload()
}
init()
//window.addEventListener('load', init, false);