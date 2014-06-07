// ==UserScript==
// @name    		Gaia Online - Ad Remover
// @author  		Awesomolocity [http://www.gaiaonline.com/p/King Awesomolocity]
// @description    	Removes Gaia Online Ads
// @include 		http://www.gaiaonline.com/*
// @version         1.0.1
// @require         http://sizzlemctwizzle.com/updater.php?id=100808
// ==/UserScript==

//Function allows this to work in Chrome.
function addGlobalStyle(css){
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if(!head){
		return;
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
addGlobalStyle('.gaia-ad, #gaia_content .gaia-ad, #aswift_0_anchor {display: none ! important;)}');
if(location.href.indexOf('/forum/subscription/')!=-1){
	addGlobalStyle('#gaia_content table.forum-list, table.forum-list {width: 127% ! important;}');
}