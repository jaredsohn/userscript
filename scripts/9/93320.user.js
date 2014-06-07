// ==UserScript==
// @name           DPRZap
// @namespace      com.ap
// @description    DPReview Zap
// @include        http://www.dpreview.com/*
// ==/UserScript==
// document.bgColor = '#FFFFFF';
document.body.style.background="white none repeat scroll 0% 0%";
// document.fgColor = '#000000';
// document.bgColor = '#FFFFFF';

document.title = "DPR";

var newSS, styles='* { background: #F0F0F0 ! important; color: black !important } :link, :link * { color: #0000EE !important } :visited, :visited * { color: #551A8B !important }';
if(document.createStyleSheet) { 
	document.createStyleSheet("javascript:'"+styles+"'"); 
}
else { 
	newSS=document.createElement('link');
 	newSS.rel='stylesheet'; 
 	newSS.href='data:text/css,'+escape(styles); 
 	document.getElementsByTagName("head")[0].appendChild(newSS); 
}