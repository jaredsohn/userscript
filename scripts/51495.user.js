// ==UserScript==
// @name           Travian Catapults Target
// @namespace      catapults_target
// @version        1.0.2
// @author         benuix
// @description    Fixes the alignment of OK button in single-target and two-target waves with catapults.Useful when sending multiple waves with both real and fake attacks and having to switch tabs fast.
// @include        http://s*.travian*.*/a2b.php*
// ==/UserScript==



var j = 0;

var catas=new Array();

var els = document.getElementsByTagName("select");

	var elsLen = els.length;

	for (i = 0; i < elsLen; i++)

		if ( els[i].name.indexOf("kata")!=-1 ) {

			catas[j] = els[i];

			j++;

		}

	

if(catas.length==1){

	var padd="<div style='padding-top:24px;visibility:hidden;'></div>";

	var ps=document.getElementsByTagName("p");

	var p=ps[ps.length-1];

	p.innerHTML=padd+p.innerHTML;

}