// ==UserScript==
// @name          prova!
// @namespace     
// @description	  es una pruba
// @include       http://dexgame.net/marchand.php*
// ==/UserScript==

function boton() {
	boton = document.body.innerHTML;
	document.body.innerHTML = boton + '<input type="submit" value="Importar recursos" onClick=importa() style="zindex: 5; " />';
}

function importa() {
	taula = document.getElementsById("resources").innerHTML;
	recursos = taula.getElementsByTagName("td")[0];
	var fso, f1
	fso = new ActiveXObject("Scripting.FileSystemObject");
	f1 = fso.CreateTextFile("home/ramon/prova", true);
	f1.WriteLine("-");
	f1.WriteLine(recursos);
	f1.Close();
}

