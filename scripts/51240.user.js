/*
 * Title: CPBoardLinux
 * Description: Greasemonkey script for Firefox to change the appearance of CPBoard
 * Author: 
 * Updated:
 * 
 */

// ==UserScript==
// @name CPBoardLinux
// @namespace http://bukku.co.cc
// @description Greasemonkey script for Firefox to change the appearance of CPBoard
// @include http://www.cp.eng.chula.ac.th/webboard/*
// ==/UserScript==

(function(){ 
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	var cssStyle = 'font,th,td,p {
	font-family: Tahoma, CordiaUPC, AngsanaUPC;
	color : #666666;
}.maintitle,h1,h2	{
			font-weight: bold; font-size: 18px; font-family: Tahoma, CordiaUPC, AngsanaUPC;
			text-decoration: none; line-height : 140%; color : #639ACE;
}
.quote {
	font-family: Tahoma, CordiaUPC, AngsanaUPC; font-size: 11px; color: #999999; line-height: 145%;
	background-color: White; border: #777777; border-style: dashed;
	border-left-width: 1px; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px
}
input.button {
	background-color : #E8E8E8;
	color : #666666;
	font-size: 11px; font-family: Tahoma, CordiaUPC, AngsanaUPC;
}
td.newpms {
	font-family : Tahoma, CordiaUPC, AngsanaUPC;
	font-size : 10px;
	background-repeat: no-repeat;
	color : White;
	text-align : center;
	background-image : url(images/topimg_pm.jpg);
}
td.forumcolumns {
	font-family : Tahoma, CordiaUPC, AngsanaUPC;
	font-size : 9px;
	color : #666666;
	text-align : center;
	background-color : #639ACE;	
}
';
	
	addGlobalStyle(cssStyle);
})();