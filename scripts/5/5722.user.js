// ==UserScript==
// @name          GMailTo
// @namespace     andrinvr@gmail.com
// @description   Forces all mailto links to open in GMail
// @include       *
// ==/UserScript==


//Super fast recursive lookup if it is a mailto: link
function goUp(target,howmany) {
	if(howmany>0) {
		if(target.nodeName=="A") {
			if(target.href.indexOf("mailto:")==0) {
				mail=target.href.substring(7);
				if((strip=mail.indexOf("?"))!=-1) {
					mail=mail.substring(0,strip);	
				}
				if((strip=mail.indexOf("&"))!=-1) {
					mail=mail.substring(0,strip);	
				}
				target.href="http://mail.google.com/mail/?view=cm&fs=1&tf=1&to="+mail;
				target.target="_blank";
			} else {
				return;
			}
		} else {
			if(target.parentNode!=null) {
				goUp(target.parentNode,--howmany);
			} else {
				return;
			}
		}
	} else {
		return;
	}
}

window.addEventListener("click",function(e) {
	if(e.which==1) {
		mail=goUp(e.target,5)
	}
}, false);
