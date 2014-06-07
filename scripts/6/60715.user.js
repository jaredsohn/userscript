// ==UserScript==
// @name           Remove Suggestions
// @namespace      www.kvasbo.no
// @include        *facebook*
// ==/UserScript==

function removeBox() {
    
    var box = document.getElementById("pagelet_pymkbox");
	if(box != null)
	{
			
		box.style.display = "none";
		
	}
}


window.onload = removeBox();