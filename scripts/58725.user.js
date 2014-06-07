// ==UserScript==
// @name           Orodlin Farma
// @namespace      C:\Documents and Settings\MaciekG\Moje dokumenty\FF-Wtyczki\Orodlin Farma\o_farma.js
// @include        http://orodlin.pl/*
// @exclude	       http://orodlin.pl/farm.php?step=plantation&action=chop
// ==/UserScript==

var FarmaButton = document.createElement('span');
var FarmaDiv = document.createElement('div');

FarmaButton.innerHTML = "Otwórz Farmę";
FarmaButton.style.cursor = "pointer";
FarmaButton.setAttribute ('onclick', "var div = document.getElementById('FarmaDiv'); if (div.style.display == ''){div.style.display = 'none'; this.innerHTML = 'Otwórz Farmę'} else {div.style.display = ''; this.innerHTML = 'Zamknij Farmę'}");

FarmaDiv.id = "FarmaDiv";
FarmaDiv.style.display = "none";
FarmaDiv.innerHTML = "Wczytuję farmę...";

document.getElementById('box1').appendChild(FarmaButton);
document.getElementById('box1').appendChild(FarmaDiv);

xhtml = new XMLHttpRequest();
xhtml.open("GET", "http://orodlin.pl/farm.php?step=plantation&action=chop");
xhtml.onreadystatechange = function () {
if (xhtml.readyState == 4){
	
	var tresc = xhtml.responseText;
	var x; 
	var illani = new Array();
	var illanias = new Array();
	var nutari = new Array();
	var dynallca = new Array();
	
	var reg = /Nie znajdujesz się w mieście/g;
	
	if (reg.exec(tresc))
	{	
		FarmaDiv.innerHTML = "Musisz być w mieście, aby załadować farmę.";
		return;
	}
	reg = /<fieldset>(.*)<\/fieldset>/g;
	tresc = reg.exec(tresc);
	
	reg = /<legend>Farma w (.*)<\/legend>/g;
	var naglowek = reg.exec(tresc[0]);
	
	reg = /(\d*)">illani<\/a> ilość: (\d*) wiek: (\d*)/g;
	x = reg.exec(tresc[0]);
	while (reg.exec(tresc[0]) != null){
		illani.push(x);
		x = reg.exec(tresc[0]);
	}
	reg = /(\d*)">illanias<\/a> ilość: (\d*) wiek: (\d*)/g;
	x = reg.exec(tresc[0]);
	while (x != null){
		illanias.push(x);
		x = reg.exec(tresc[0]);
	}
	reg = /(\d*)">nutari<\/a> ilość: (\d*) wiek: (\d*)/g;
	x = reg.exec(tresc[0]);
	while (reg.exec(tresc[0]) != null){
		nutari.push(x);
		x = reg.exec(tresc[0]);
	}
	reg = /(\d*)">dynallca<\/a> ilość: (\d*) wiek: (\d*)/g;
	x = reg.exec(tresc[0]);
	while (reg.exec(tresc[0]) != null){
		dynallca.push(x);
		x = reg.exec(tresc[0]);
	}
	FarmaDiv.innerHTML = "Farma w " + naglowek[1] + ": <BR/>";

	if (illani[0] != null){
		for (var i = 0; (illani.length - 1) >= i; i++){
			FarmaDiv.innerHTML += "Illani: ";
			FarmaDiv.innerHTML += "<a href='farm.php?step=plantation&amp;action=chop&amp;id=" + illani[i][1] + "' title='Zbieraj'>(i:" + illani[i][2] + " w:" + illani[i][3]+ ")</a> ";
		}
		FarmaDiv.innerHTML += "<BR/>";
	}
	
	if (illanias[0] != null){
		for (var i = 0; illanias.length - 1 >= i; i++){
			FarmaDiv.innerHTML += "Illanias: ";
			FarmaDiv.innerHTML += "<a href='farm.php?step=plantation&amp;action=chop&amp;id=" + illanias[i][1] + "' title='Zbieraj'>(i:" + illanias[i][2] + " w:" + illanias[i][3]+ ")</a> ";
		}
		FarmaDiv.innerHTML += "<BR/>";
	}
	
	if (nutari[0] != null){
		for (var i = 0; nutari.length - 1 >= i; i++){
			FarmaDiv.innerHTML += "Nutari: ";
			FarmaDiv.innerHTML += "<a href='farm.php?step=plantation&amp;action=chop&amp;id=" + nutari[i][1] + "' title='Zbieraj'>(i:" + nutari[i][2] + " w:" + nutari[i][3]+ ")</a> ";
		}
		FarmaDiv.innerHTML += "<BR/>";
	}
	
	if (dynallca[0] != null){
		for (var i = 0; dynallca.length - 1 >= i; i++){
			FarmaDiv.innerHTML += "Dynallca: ";
			FarmaDiv.innerHTML += "<a href='farm.php?step=plantation&amp;action=chop&amp;id=" + dynallca[i][1] + "' title='Zbieraj'>(i:" + dynallca[i][2] + " w:" + dynallca[i][3]+ ")</a> ";
		}
		FarmaDiv.innerHTML += "<BR/>";
	}
}
}
xhtml.overrideMimeType("text/html; charset=utf-8");

xhtml.send(null);