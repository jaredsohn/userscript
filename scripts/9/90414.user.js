// ==UserScript==
// @name           Modyfikacja naszej-klasy by Tomazzi
// @namespace      nima
// @description    Modyfikacja panelu w profilu osób na naszej-klasie by Tomazzi
// @include        http://nk.pl/#profile/*
// @include        http://nk.pl/*
// @include        http://www.nk.pl/*
// ==/UserScript==

var a=document.getElementsByTagName("a");
for (var i=0;i<a.length;i++) {
	if (a[i].title=="Wyślij wiadomość") {
		html=a[i].innerHTML;
		html=html.replace(" Napisz wiadomość"," Napisz wiadomość");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Pokaż listę znajomych") {
		html=a[i].innerHTML;
		html=html.replace(" Znajomi"," Kumple :)");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Pokaż listę wspólnych znajomych") {
		html=a[i].innerHTML;
		html=html.replace(" Wspólni znajomi"," Wspólni znajomi");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Galeria zdjęć") {
		html=a[i].innerHTML;
		html=html.replace(" Galeria zdjęć"," Zdjęcia :P");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Kwiaty") {
		html=a[i].innerHTML;
		html=html.replace(" Wyślij kwiaty"," Wyślij kwiaty");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Wyślij prezent") {
		html=a[i].innerHTML;
		html=html.replace(" Wyślij prezent"," Wyślij prezent");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Wyślij kartkę") {
		html=a[i].innerHTML;
		html=html.replace(" Wyślij kartkę"," Wyślij kartkę");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Oblej wodą") {
		html=a[i].innerHTML;
		html=html.replace(" Oblej wodą"," Oblej wodą");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Podaruj €urogąbki") {
		html=a[i].innerHTML;
		html=html.replace(" Doładuj €urogąbki"," Doładuj €urogąbki");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Ustaw skórkę") {
		html=a[i].innerHTML;
		html=html.replace(" Ustaw skórkę"," Ustaw skórkę");
		a[i].innerHTML=html;
	}
}
var a=document.getElementsByTagName("button");
for (var i=0;i<a.length;i++) {
	if (a[i].title=="Śledź") {
		html=a[i].innerHTML;
		html=html.replace(" Śledź"," Śledź");
		a[i].innerHTML=html;
	}
}
var a=document.getElementsByTagName("span");
for (var i=0;i<a.length;i++) {
	if (a[i].innerHTML=="Śledź") {
		a[i].innerHTML="Śledź";
        }
        if (a[i].innerHTML=="Nie śledź") {
		a[i].innerHTML="Nie śledź";
	}
}