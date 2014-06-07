
// ==UserScript==
// @name erisilebilir eksi sozluk
// @namespace www.eksisozluk.com
// @description eksi sozlugu erisilebilir yapma aparati
// @include http://www.eksisozluk.com/*
// @include http://eksisozluk.com/*
// ==/UserScript==

if (window.location.href.indexOf("show.asp") >= 0) {
	var KEY_SONRAKI_SAYFA = "l", KEY_ONCEKI_SAYFA = "k", KEY_BASLIK_ICINDE_ARA = "f";  
	
	var pagenav = document.getElementsByClassName('pagi');
	
	if (pagenav.length > 0) {
	
		var anchorList = pagenav[0].childNodes[0].getElementsByTagName("a"), backBtn, fwdBtn;
		
		for (var i = 0; i < anchorList.length; i++) {
			var a = anchorList[i];
			
			if (a.title.indexOf("önceki") > -1) {
				backBtn = a;
				continue;
			}
			else if (a.title.indexOf("sonraki") > -1) {
				fwdBtn = a;
				break;
			}
		}
		
		if (backBtn) {
			var backBtn2 = backBtn.cloneNode(true);
			backBtn2.setAttribute("accesskey", KEY_ONCEKI_SAYFA);
			backBtn.parentNode.replaceChild(backBtn2, backBtn);
		}
		
		if (fwdBtn) {
			var fwdBtn2 = fwdBtn.cloneNode(true);
			fwdBtn2.setAttribute("accesskey", KEY_SONRAKI_SAYFA);
			fwdBtn.parentNode.replaceChild(fwdBtn2, fwdBtn);
		}
	}
	
	var innerSearch, inputList = document.getElementsByClassName("aratext"), innerSearch2;
	if (inputList.length > 0) {
		innerSearch2 = (innerSearch = inputList[0]).cloneNode(true);
		innerSearch2.setAttribute("accesskey", KEY_BASLIK_ICINDE_ARA);
		innerSearch.parentNode.replaceChild(innerSearch2, innerSearch);
	}
}
