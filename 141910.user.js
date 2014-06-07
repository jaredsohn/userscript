// ==UserScript==
// @name        KG - upload: add [img] tags
// @namespace   KG
// @include     http*://*karagarga.net/upload.php*
// @grant	none
// @version     0.3
// ==/UserScript==

var d = document.getElementsByName("descr")[0];

if (d && d.type != 'hidden') {  // only run on second step of upload.php

	 var code = 'javascript: '
		 + 'var d = document.getElementsByName("descr")[0];'
		 + 'd.value = d.value.replace(/^\\s+(?=http)/gim, "");'		 
		 + 'd.value = d.value.replace(/(https?:\\S*?\\S\\.(png|jpg|jpeg|gif))/gi, "[img]$1[/img]\\n");'
		 + 'return false;'
		 ;
	 
	 var tagImg = document.createElement("a");
	 tagImg.setAttribute("onclick", code);
	 tagImg.textContent = "Add [IMG][/IMG] tags";
	 tagImg.href = "#";
	 
	 d.parentNode.insertBefore(tagImg, d.nextSibling);
}