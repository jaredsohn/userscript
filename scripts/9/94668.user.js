// ==UserScript==
// @name İndirme linklerini gösterir
// @namespace http://diveintogreasemonkey.org/download/
// @description İndirme linklerini gösterir
// @include *
// @exclude http://www.hotfile.com/*
// @exclude http://www.rapidshare.com/*
// @exclude http://www.fileserve.com/*
// @exclude http://www.megaupload.com/*
// @exclude http://www.uploaded.to/*
// @exclude http://hotfile.com/*
// @exclude http://rapidshare.com/*
// @exclude http://fileserve.com/*
// @exclude http://megaupload.com/*
// @exclude http://uploaded.to/*
// @exclude http://www.filesonic.com/*
// @exclude http://netload.in/*
// @exclude http://x7.to/*
// @exclude http://www.uploadstation.com/*
// @exclude http://oron.com/*
// @exclude http://www.wupload.com/*
// @exclude http://www.filejungle.com/*
// ==/UserScript==


function linkleri_ac(){
	var siteler=new Array("rapidshare.com","hotfile.com","fileserve.com","ul.to","megaupload.com","uploaded.to","filesonic.com","netload.in","x7.to","uploadstation.com","oron.com","wupload.com","filejungle.com");
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