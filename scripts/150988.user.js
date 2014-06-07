// ==UserScript==
// @name           RemovePub
// @namespace      minotor45
// @description    Suppression des pubs
// @version        1.0
// @author         minotor45
// @require	       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.js
// @include        http://sourceforge.net/*
// ==/UserScript==

$.fn.addStyle = function(key,value) {
	var obj_css = {};
	if(typeof key == 'object') obj_css = key;
	else obj_css[key] = value;
	
	var styles = '';
	for(key in obj_css) styles +=key+':'+obj_css[key] +' !important;';

	$('head').append($('<style>',{
		type:'text/css'
	}).html(this.selector +' {' +styles+' } '));
	
	return this;
}

$('.ads').addStyle('display','none');