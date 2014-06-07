// ==UserScript==
// @name           Hide Signature
// @namespace      signature
// @description    A script to hide the signatures of the nexon forum
// @include        http://forum.nexoneu.com/NXEU.aspx?g=posts&t=*
// @include        http://forum.nexoneu.com/NXEU.aspx?g=posts&m=*
// ==/UserScript==
/*
Hide signature 0.5b
Developed by dvil88 <dvil88 at gmail dot com>
*/



window.addEventListener('load',function(e){
	forum_hr = (navigator.appName == 'Opera') ? '<HR noshade="">' : '<hr noshade="noshade">';
	var is = document.getElementsByTagName ('hr');
	strReplaceAll = document.body.innerHTML;
	size = is.length;
	while (size != 0){
		strReplaceAll = strReplaceAll.replace( forum_hr, "<br /><br /><input type=\"button\" onclick=\"var state = document.getElementById("+ size +").style.display; new_display = (state == 'none') ? 'block' : 'none'; document.getElementById("+ size +").style.display = new_display;\" style=\"cursor:pointer;float:right;\" class=\"pbutton\" value=\"Show/hide\" /><div style=\"height:1px; width:100%; background-color:#ccc;\"></div><div id=\""+ size +"\" style=\"display:none;\">");
        	size=size-1;
	}
	document.body.innerHTML = strReplaceAll;


},true);
