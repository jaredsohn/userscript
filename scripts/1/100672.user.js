// ==UserScript==
// @name    		Gaia Online - Achievments Page Fixer
// @author  		Awesomolocity [http://www.gaiaonline.com/p/King Awesomolocity]
// @description    	Makes the Achievements page on Gaia Online smaller and less laggy.
// @include 		http://www.gaiaonline.com/achievements/
// @version         1.0.1
// @require         http://sizzlemctwizzle.com/updater.php?id=100672
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
addGlobalStyle('#share {'+
	'border: 2px solid #C9C9BF ! important;'+
	'top: -400px;'+
	'right: -275px ! important;'+
	'position: absolute ! important;'+
'}'+
'.ach .bd {'+
	'overflow: auto;'+
	'max-height: 100px;'+
'}'+
'#incompleted, #available {'+
	'max-height: 100px ! important;'+
	'min-height: 0px ! important;'+
	'overflow: auto;'+
'}'+
'#pro_tip {'+
	'display: none;'+
'}'+
'#share .rc.btm_lt{'+
	'display: none;'+
'}';