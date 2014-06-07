// ==UserScript==
// @id             DiZ
// @name           Default is Zero
// @version        1.0
// @namespace      Product of Studio TAKUMI
// @author         J. "TAKUMI" Burton
// @description    Fixing dropdowns / it's an easy feat / and JS makes it all complete... XD
// @include        http://www.valenth.com/adoptions*
// @include        http://valenth.com/adoptions*
// ==/UserScript==


//console = unsafeWindow.console;
TheSelected = document.getElementsByTagName('select');
Reggie = /cat_[0-9]+/;
Regselected = /selected/;
Choice = false;
MagicOfZero = '';

for (i = 0; i < TheSelected.length; i++) {
	if (Reggie.test(TheSelected[i].id)) {
		Choice = false;
	
		if (Regselected.test(TheSelected[i].innerHTML)) {
			for (j in TheSelected[i].childNodes) {
				if (TheSelected[i].childNodes != undefined && Choice == false && TheSelected[i].childNodes[j].selected == true) {
					Choice = true;
				}
			}
		}
		
		MagicOfZero = document.createElement('option');
		MagicOfZero.innerHTML = 'No Category';
		MagicOfZero.value = "0";
				
		TheSelected[i].insertBefore(MagicOfZero,TheSelected[i].childNodes[0]);
		
		if (Choice == false) {
			TheSelected[i].value = 0;
		}
	
	}
}
