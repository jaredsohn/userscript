// ==UserScript==
// @name        Xooit unhide
// @namespace   http://userscripts.org/users/489328
// @include		*://*/*
// @version     1
// ==/UserScript==
function unhider(){
	var hides=document.getElementsByTagName('div');
	for(i=0;i<hides.length;i++) {
		if (hides[i].className=='hide3') {
			if (hides[i].firstChild&&typeof hides[i].firstChild.className != 'undefined'&&hides[i].firstChild.className=='hide3-v2'){
				hides[i].innerHTML=unescape(hides[i].firstChild.innerHTML);
			}
			hides[i].style.position='static';
			hides[i].style.visibility='visible';
		} else if (hides[i].className=='hide3_text') {
			hides[i].style.position='absolute';
			hides[i].style.visibility='hidden';
		}
	}
	}
setTimeout(unhider,5000);