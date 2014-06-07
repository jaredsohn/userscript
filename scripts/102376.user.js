// ==UserScript==
// @name           Modyfikacja naszej-klasy wg. demotywatora
// @namespace      http://pl*.grepolis.com/game/*
// @description    Modyfikacja panelu w profilu osób na naszej-klasie wg. demotywatora: http://demotywatory.pl/1333455/Nasza-klasa
// @include        http://pl*.grepolis.com/game/*
// ==/UserScript==

var a=document.getElementsByTagName("a");
for (var i=0;i<a.length;i++) {
	if (a[i].title=="Jednostki") {
		html=a[i].innerHTML;
		html=html.replace(" Jednostki"," Wyślij w pizdu");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Pokaż listę znajomych") {
		html=a[i].innerHTML;
		html=html.replace(" Znajomi"," Prawdziwi znajomi");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Pokaż listę wspólnych znajomych") {
		html=a[i].innerHTML;
		html=html.replace(" Wspólni znajomi"," Nieznane kmioty");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Galeria zdjęć") {
		html=a[i].innerHTML;
		html=html.replace(" Galeria zdjęć"," Przegląd pasztetów");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Kwiaty") {
		html=a[i].innerHTML;
		html=html.replace(" Wyślij kwiaty"," Wyślij trojana");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Wyślij prezent") {
		html=a[i].innerHTML;
		html=html.replace(" Wyślij prezent"," Wyślij na drzewo");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Wyślij kartkę") {
		html=a[i].innerHTML;
		html=html.replace(" Wyślij kartkę"," Wyśli donos do US");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Oblej wodą") {
		html=a[i].innerHTML;
		html=html.replace(" Oblej wodą"," Olej pokemona");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Podaruj €urogąbki") {
		html=a[i].innerHTML;
		html=html.replace(" Doładuj €urogąbki"," Nakabluj małżonkowi");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Ustaw skórkę") {
		html=a[i].innerHTML;
		html=html.replace(" Ustaw skórkę"," Zaszpanuj kasiorą");
		a[i].innerHTML=html;
	}
}
var a=document.getElementsByTagName("button");
for (var i=0;i<a.length;i++) {
	if (a[i].title=="Śledź") {
		html=a[i].innerHTML;
		html=html.replace(" Śledź"," Zaproponuj sex");
		a[i].innerHTML=html;
	}
}
var a=document.getElementsByTagName("span");
for (var i=0;i<a.length;i++) {
	if (a[i].innerHTML=="Śledź") {
		a[i].innerHTML="Zaproponuj sex";
        }
        if (a[i].innerHTML=="Nie śledź") {
		a[i].innerHTML="Strzel focha";
	}
}