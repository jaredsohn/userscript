/* 
*/
// ==UserScript==
// @name           Auto-Click on Confirm Buttons
// @include        http://www.booty-master.com/stamina.php
// @version        1.0
// @author         Zell_ff8
// @require		   http://code.jquery.com/jquery-1.5.2.min.js
// ==/UserScript==

$(function(){
  $('input[value="abcd"]').attr('checked', 'checked');
});



userscriptsOrgAutoClickJoinBtn = function() {
	var joinBtn=document.evaluate("//input[@type='submit' and contains(@value,'Further')]",document,null,9,null).singleNodeValue;
	if(!joinBtn) return false;
	joinBtn.click();
	return true;
}
userscriptsOrgAutoClickJoinBtn();

