// ==UserScript== 
// @name Tahribat++ 
// @description Tahribat.com'a ek ozellikler kazandirir.
// @author x3uqm4
// @include http://tahribat.com/
// @include http://tahribat.com/Forum*
// @include http://www.tahribat.com/
// @include http://www.tahribat.com/Forum*
// @exclude http://*.tahribat.com/forumnewmessage.asp*
// @exclude http://tahribat.com/forumnewmessage.asp*
// @exclude http://*.tahribat.com/forumnewmessage.asp*
// @exclude http://tahribat.com/forumnewmessage.asp*
// @exclude http://*.tahribat.com/forumnewtopic.asp*
// @exclude http://tahribat.com/forumnewtopic.asp*
// @include http://www.tahribat.com/
// @include http://www1.tahribat.com/
// @include http://www2.tahribat.com/
// @include http://www3.tahribat.com/
// @version 0.1
// ==/UserScript==

window.addEventListener("load", function() {
	TahribatPlus();
	Sayfalat();
}, false);

function TahribatPlus() {
		// Katman
		var bK = document.createElement('div');
	    bK.style.position = 'fixed';
	    bK.style.top = '0';
		bK.style.textAlign = 'right';
		bK.style.bgColor = '#000';
	    bK.style.width = '100%';
	    bK.style.color = '#FFF';
		bK.setAttribute('id','aramadiv');
		bK.innerHTML = '<form method="POST" action="/Search.asp" name="SearchForm" id="SearchForm"><input type="text" name="search" /><input type="submit" value="Ara" name="B3"></form>';
		document.body.appendChild(bK);

}


function Sayfalat() {
		// Katman
		var bK = document.createElement('div');
	    bK.style.position = 'absolute';
	    bK.style.top = '158px';
	    bK.style.width = '90%';
	    bK.style.left = '5%';
	    bK.style.right = '5%';
	    bK.style.color = '#000';
	    bK.style.zIndex = '9999';
		bK.setAttribute('id','sayfala_div');
		// Katman 
		var pBas = 0;
		var objP = document.getElementsByTagName('p');
		if (objP.length != 0){
		var pSon = objP.length-1;
		var nStr = objP[pSon].innerHTML;
		if (nStr.indexOf('[1]') > -1){
		bK.innerHTML = '<p align=\"right\">' + nStr + '</p>';
		document.body.appendChild(bK);
		}
		}
}