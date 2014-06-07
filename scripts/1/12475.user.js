// ==UserScript==
// @name           Google Reader - Remove Right Section
// @namespace      Sembiance
// @include        http://www.google.com/reader/view/
// ==/UserScript==

function removeItem()
{
	var targetItem = document.getElementById("right-section");
	if(targetItem!=null)
		targetItem.style.display = "none";
	else
		window.setTimeout(removeItem, 500);
}

window.setTimeout(removeItem, 500);
