// Hello World! example user script
// version 0.1 BETA!
// 2012-01-14
// Released under the GPL License
// http://www.gnu.org/copyleft/gpl.html
// 
// --------------------------------------------------------------------
//
// This is Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name		 Fuck you Umbrellas
// @grant        none
// @namespace	 http://www.chlomo.org/*
// @namespace	 http://chlomo.org/*
// @namespace	 https://www.chlomo.org/*
// @namespace	 https://chlomo.org/*
// @description  Adds the umlaut
// @include http://www.chlomo.org/*
// @include https://www.chlomo.org/*
// ==/UserScript==
var txtArea = document.getElementById("body");
txtArea.onblur = function () {
	if (txtArea.value.length==5) {
		txtArea.value = String(txtArea.value).replace(/chloe/g, " Chloë"); 
		txtArea.value = String(txtArea.value).replace(/Chloe/g, " Chloë"); 
	}
	
	txtArea.value = String(txtArea.value).replace(/ chloe/g, " Chloë"); 
	txtArea.value = String(txtArea.value).replace(/ Chloe/g, " Chloë"); 
	
	txtArea.value = String(txtArea.value).replace(/ chloe /g, " Chloë "); 
	txtArea.value = String(txtArea.value).replace(/ Chloe /g, " Chloë "); 
	
	txtArea.value = String(txtArea.value).replace(/chloe /g, "Chloë "); 
	txtArea.value = String(txtArea.value).replace(/Chloe /g, "Chloë "); 

	txtArea.value = String(txtArea.value).replace(/chloe,/g, "Chloë,"); 
	txtArea.value = String(txtArea.value).replace(/Chloe,/g, "Chloë,"); 
	
	txtArea.value = String(txtArea.value).replace(/\*\*chloe\*\*/g, "\*\*Chloë\*\*"); 
	txtArea.value = String(txtArea.value).replace(/\*\*Chloe\*\*/g, "\*\*Chloë\*\*"); 

	txtArea.value = String(txtArea.value).replace(/''chloe''/g, "''Chloë''");
	txtArea.value = String(txtArea.value).replace(/''Chloe''/g, "''Chloë''"); 
	
	txtArea.value = String(txtArea.value).replace(/chloe's/g, "Chloë's");
	txtArea.value = String(txtArea.value).replace(/Chloe's/g, "Chloë's"); 
	
	txtArea.value = String(txtArea.value).replace(/'''chloe'''/g, "'''Chloë'''"); 
	txtArea.value = String(txtArea.value).replace(/'''Chloe'''/g, "'''Chloë'''"); 
	
}
