// ==UserScript==
// @name           test-warsim
// @namespace      
// @description    aaa
// @include        http://sp2.looki.pl/index.php?*
// ==/UserScript==

var allHTMLTags = new Array();
	var clb = 0;

	function getElementByClass(theClass) {

		//Create Array of All HTML Tags
		var allHTMLTags=document.getElementsByTagName("*");
		
		var allClassElements = new Array();
		//Loop through all tags using a for loop
		for (i=0; i<allHTMLTags.length; i++) {

			//Get all tags with the specified class name.
			if (allHTMLTags[i].className==theClass) {
				
				clb++;
				allClassElements[allClassElements.length]=allHTMLTags[i];
				//allHTMLTags[i].style.display=�none�;
	
			}
		}
		return allClassElements;
	}
	

function test(){
	var cos=getElementByClass("data");
	for(var kk in cos){
	//alert(cos[kk].maxlength);
		if(cos[kk].maxLength==4) cos[kk].maxLength=9;
	}
}	

window.setInterval(test, 1000);	