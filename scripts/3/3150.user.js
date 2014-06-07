/*
 * Title: GoogleIG Columns
 * Description: Allows the user to modify the width of the columns in their Google Personalised Homepage
 * Author: Tim Parkinson
 * Updated: 7/2/06
 * 
 * ------------------------------------------------------
 * How to customise
 * ------------------------------------------------------
 * Below there are three variables named column1, column2 and column3. Modify the value of these
 * variable to set the aproximate width of the corresponding column.
 * 
 * NOTE: This is a very basic version of this script. I hope to add more functionality.
 *
 */

// ==UserScript==
// @name GoogleIG Columns
// @description Allows the user to modify the width of the columns in their Google Personalised Homepage
// @include http://*google*ig*

// ==/UserScript==

(function(){ 
	function addStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	var column1 = 100;
	var column2 = 10;
	var column3 = 10;	

	var cssStyle = '#c_1{width:' + column1 + '%} #c_2{width:'+ column2 +'%} #c_3{width:'+column3+'%}';
	
	addStyle(cssStyle);
})() 





