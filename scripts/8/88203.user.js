// ==UserScript== 
// @name numlock_to_tab 
// ==/UserScript==
var formiterator=0;

function keyPress(AEvent) { 
		if (AEvent.keyCode == 33) { 
			AEvent.preventDefault();
			formiterator--;
			alert(formiterator);
				}
		if (AEvent.keyCode == 34) { 
			AEvent.preventDefault();
			formiterator++;
			alert(formiterator);
				}
		document.forms[0].elements[formiterator].focus();
		return true;
}
document.onkeyup=function(e){ keyPress(e||window.event); };
