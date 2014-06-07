// Google GMAIL Fixed Left Menu + Search
// version 0.3 BETA!
// 15-07-2005
// Copyright (c) 2005, Michael Pritchard
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
// select "Google GMAIL Fixed Left Menu + Search", and click Uninstall.
//
// Made thanks to http://diveintogreasemonkey.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google GMAIL Fixed Left Menu + Search
// @namespace     http://www.blueghost.co.uk/gmail_flm.html
// @description   Fixes the Left Menu in place
// @include       http*://*mail.google.com/*mail*
// ==/UserScript==

(function(){

window.fillSBox		= function(){
	var sb	= document.getElementById('ss_box');
	var rb	= document.getElementsByTagName('input');
	for (var i=0; i <rb.length; i++){
		if (rb[i].name == 'q'){
			rb[i].value= sb.value;
			return;
		}
	}
}
var menu 			= document.getElementById('nav');
if (menu !=null){
	menu.style.position = "fixed";
}
var l_m				= document.getElementById('in');
if (l_m == null){/*try again???*/
	l_m				= document.getElementById('nb_1');
}
if (l_m != null){
	var s_form			= document.createElement('div');
	s_form.id			= 'side_bar_search';
	s_form.innerHTML 	= '<form id="s_2" class="s" style="padding-bottom: 5px; white-space: nowrap;" onsubmit="return top.js._MH_OnSearch(window,0)">'+
						'<input style="width: 100%;" maxlength="2048" id="ss_box" name="q_2" value=""><br/>'+
						'<input value="Search&nbsp;Mail" onclick="javascript:fillSBox();" type="submit">'+
						'</form>';
	l_m.parentNode.insertBefore(s_form, l_m.nextSibling);
}
//fix top menu
var t = document.getElementById('tc_top');
if (t != null){
	t.style.position = "fixed";
}else{/*VIEWING MAIL*/
	var tbl	= document.getElementsByTagName('table');
	for (var i=0; i <tbl.length; i++){
		if (tbl[i].className == 'th'){ /*GET FIRST TABLE LIKE THIS ONLY*/
			tbl[i].style.position = "fixed";
			i = tbl.length;
		}
	}
	//move right hand side across
	var sps	= document.getElementsByTagName('span');
	for (var i=0; i <sps.length; i++){
		if (sps[i].className == 'rz'){
			sps[i].style.position 	= "fixed;";
			sps[i].style.right		= "5px;";
			i = sps.length;
		}
	}
}
var et = document.getElementById('fi');
if (et != null){/*READING EMAIL*/
	//et.style.position = "relative";
	//et.style.padding = "30px 21ex 0pt 8px";
	et.style.padding = "2em 21ex 0pt 8px";
}else{/*LOOKING AT A FOLDER*/
	var tb = document.getElementById('tb');
	if (tb != null){
		//tb.style.position = "relative";
		//tb.style.margin = "50px 0px 0px 0px";
		tb.style.margin = "3em 0px 0px 0px";
	}
}
})() 