// ==UserScript==
// @name    		Gaia Booty Grab - Remove Comments.
// @author  		Awesomolocity [http://www.gaiaonline.com/p/King Awesomolocity]
// @description    	Changes the Booty Grab URL to a URL where there is no comments in the tank. It removes some lag.
// @include 		http://www.gaiaonline.com/tank/*
// @version         7.0.0
// @require         http://sizzlemctwizzle.com/updater.php?id=74309
// ==/UserScript==

//Function allows for support in Google Chrome.
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
addGlobalStyle('#add_comment{display:none;}'+
	'#comment_box{display:none;}'+
	'#comment_list{display:none;}'+
	'#comment_pagination{display:none;}'+
	'#sysMsg{display:none}');