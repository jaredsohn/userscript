// ==UserScript==
// @name          GMailToCraigsList
// @namespace     james.m.drummond@gmail.com -- thanks to andrinvr@gmail.com for original code I modded
// @description   Forces all mailto links to open in GMail and then adds information from craiglist
// @include       http://*.craigslist.org/*/*
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
				var as = document.getElementsByTagName('H2');
				count=0;
				while (count<as.length){
					subject = as[count].textContent
					count=count+1;
				}
				target.href="http://mail.google.com/mail/?view=cm&fs=1&tf=1&to="+mail+"&su=" +subject+"&body=" +document.baseURI;
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
