// ==UserScript==
// @name        Disable rightclick trap
// @namespace   dudesnude.com
// @description Disable rightclick trap
// @include     http://dudesnude.com/show.php?id=*
// @include     http://www.dudesnude.com/show.php?id=*
// @version     1.0
// ==/UserScript==

function returnTrue() {
	return true;
}
function clearClickHandlers() {
	if (document.readyState != "uninitialized" &&
		document.readyState != "loading") {
		//alert("Clearing");
		if(document.images) {
			for(i=0;i<document.images.length;i++) {
				document.images[i].onmousedown=returnTrue;
				document.images[i].onmouseup=returnTrue;
			}
		}
	}
	else alert(document.readyState);
}
window.onload = clearClickHandlers;
document.addEventListener ("DOMContentLoaded", clearClickHandlers, true);
setTimeout(clearClickHandlers, 200);
setTimeout(clearClickHandlers, 2000);
