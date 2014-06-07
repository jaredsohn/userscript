// ==UserScript==
// @match http://*joemonster.org/phorum/read.php*
// @description Skrypt ostrzega o postach wybranych użytkowników i umożliwia ich pominięcie
// @name JM Phorum Skipper
// @namespace com.akulowaty.userscripts.skipper
// @version 1.0.1
// @require blacklist.txt
// @resource blacklist blacklist.txt
// ==/UserScript==
// *************************************
// *              TODO:                *
// * - obsługa czarnej listy z pliku   *
// * - ustawienia                      *
// * - poprawa obsługi skopanych       *
// *   linków z maili                  *
// *************************************
(function() {
	// variables
	var regex_short=/http:\/\/(www\.|)joemonster\.org\/phorum\/read\.php\?f=[0-9]+&t=[0-9]+/;
	var regex_long= /http:\/\/(www\.|)joemonster\.org\/phorum\/read\.php\?f=[0-9]+&i=[0-9]+&t=[0-9]+/;
	var blacklist=new Array();
		blacklist[0]="empatyczna";
		blacklist[1]="Diuna888";
	
	// functions
	function getAuthor() { // zwraca autora wątku
		var author=document.getElementsByClassName("postHeader")[0].getElementsByTagName("a")[1].innerHTML
		return author;
	}
	function verify(author, blacklist){ // sprawdza czy autor *author* znajduje się na liście *blacklist* (tablica)
		var skip=false;
		for(var i=0; i<blacklist.length; ++i) {
			if(blacklist[i] == author) {
				skip = confirm("Uwaga!\nAutorem wątku jest "+author+".\nChcesz pominąć ten wątek?");
			}
		}
		return skip;
	}
	function getID(url) { // zwraca id bieżącego wątku
		if(regex_short.test(url)) {
			return url.substring(url.indexOf("&t=")+3);
		} else if(regex_long.test(url)) {
			return url.substring(url.indexOf("&i=")+3,url.indexOf("&t="));
		} else {
			return 999999999;
		}
	}
	function getDirection() { // zwraca kierunek przeglądania wątków (nowszy/starszy)
		if(document.referrer=="") return "starszy";
		else {
			if (getID(document.referrer)<getID(document.URL)) {
				return "nowszy";
			} else {
				return "starszy";
			}
		}
	}
	function older() { // przechodzi do starszego wątku
		window.location=document.URL+"&a=2";
	}
	function newer() { // przechodzi do nowszego wątku
		window.location=document.URL+"&a=1";
	}
	
	// script body
	console.log(getDirection());
	if(verify(getAuthor(), blacklist)==true) {
		console.log("czas spierdalać: "+getDirection());
		if(getDirection()=="starszy") {
			older();
		} else {
			newer();
		}
})()	}