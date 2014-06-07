// ==UserScript==
// @name           Kontera Advert killer
// @namespace      http://userscripts.org/users/useridnumber
// @description    Removes Kontera adverts
// @include        http://*
// @author         Joseph Reeve
// ==/UserScript==
myfunction=function() {
	count=0;
	while(document.getElementById("KonaLink"+count)){
		advert = document.getElementById("KonaLink"+count)
		advertText = advert.firstChild.firstChild.firstChild.textContent
		advert.nextSibling.textContent = advertText + advert.nextSibling.textContent
		advert.parentNode.removeChild(advert)
        count=count+1;
	}
}
setTimeout(myfunction,6000);