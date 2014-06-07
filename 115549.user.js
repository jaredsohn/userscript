// ==UserScript==
// @name          	Clicker
// @description    	rpg game
// @namespace      	http://www.chaosrpg.com/
// @include        	http://www.chaosrpg.com/clicker.php
// @copyright       2011
// @version      	0.1
// ==/UserScript==


function getText(where, first, second) {
		var x = where.indexOf(first) + first.length;
		var y = where.indexOf(second, x);
		return where.substring(x,y);
}
function main(){ 
		 var CaptchasId = document.forms[1].elements[0].value;
		 var CaptchasCode = getText(document.body.innerHTML, '<font style="font-size: 50px; color: rgb(0, 0, 204);">', '</font>').replace(/,/g,'');
		     alert(CaptchasCode);
		     
}