// ==UserScript==
// @name			TBT Sayfalama
// @description			Tahribat.Com Forum Sayfalarindaki Sayfalama Paragrafini Uste Kopyalar.
// @author			knuckle@tbt
// @include			http://tahribat.com/Forum*
// @include			http://www.tahribat.com/Forum*
// @include			http://www1.tahribat.com/Forum*
// @include			http://www2.tahribat.com/Forum*
// @include			http://www3.tahribat.com/Forum*
// @version			0.1
// ==/UserScript==

window.addEventListener("load", function() {
	haydiBastir();
}, false);

function haydiBastir() {
		// Katman
		var bK = document.createElement('div');
	    bK.style.position = 'absolute';
	    bK.style.top = '158px';
	    bK.style.width = '90%';
	    bK.style.left = '5%';
	    bK.style.right = '5%';
	    bK.style.color = '#000';
	    bK.style.zIndex = '9999';
		bK.setAttribute('id','knuckle_div');
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