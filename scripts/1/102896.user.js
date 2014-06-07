// ==UserScript==
// @name Linklerin açık hali
// @namespace http://diveintogreasemonkey.org/download/
// @description İndirme linklerini gösterir
// @include *
// @exclude http://hotfile.com/*
// @exclude http://rapidshare.com/*
// @exclude http://fileserve.com/*
// @exclude http://megaupload.com/*
// @exclude http://www.filesonic.com/*
// @exclude http://netload.in/*
// @exclude http://x7.to/*
// @exclude http://www.uploadstation.com/*
// @exclude http://ul.to/*
// @exclude http://oron.com/*
// @exclude http://www.duckload.com/*
// @exclude http://uploading.com/*
// @exclude http://bitshare.com/*
// @exclude http://www.wupload.com/*
// @exclude http://www.turkcealtyazi.org/*
// @exclude http://divxplanet.com/*
// ==/UserScript==


function linkleri_ac(){
	var siteler=new Array("rapidshare.com","hotfile.com","fileserve.com","megaupload.com","filesonic.com","netload.in","x7.to","uploadstation.com","ul.to","oron.com","duckload.com","uploading.com","bitshare.com","wupload.com","turkcealtyazi.org","divxplanet.com");
	var l=document.getElementsByTagName("a");
	for(a=0;a<=l.length-1;a++){
		var brt=document.createElement("br");
                for(x in siteler){
			if(l[a].href.search(siteler[x])>0){
				l[a].innerHTML=l[a].href;
                                l[a].appendChild(brt);
			}
		}
	}
}

linkleri_ac();

