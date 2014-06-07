// ==UserScript==
// @name          UncheckFBCheckBox
// @description   Unchecks the "Keep me logged in" checkbox By Swapnil S. Mahajan
// @include       *.facebook.com/
// @author	  Swapnil S. Mahajan
// ==/UserScript==

(function() {

	checkBox = document.getElementById('persistent');
	
	if (checkBox!=null) {
		checkBox.checked = false;
	} 

})();

