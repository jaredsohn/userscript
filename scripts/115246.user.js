// ==UserScript==
// @name           AFR Copy
// @namespace      AFRCopy
// @description    Copy and paste from the afr.com.au site.
// @include        http://www.afr.com/*
// @require http://sizzlemctwizzle.com/updater.php?id=115246
// ==/UserScript==

function RemoveHidden(obj) {
	var o=obj.firstChild;
	while(o) {
		RemoveHidden(o);
		var next=o.nextSibling;
		try {
			var st=getComputedStyle(o);
			if(st.position=='absolute') {
				o.parentNode.removeChild(o);
			}
		} catch(e) {}
		o=next;
	}
}

window.addEventListener('load',function() {
	RemoveHidden(document.body);
});