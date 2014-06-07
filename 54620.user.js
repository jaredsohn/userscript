// ==UserScript==
// @name           głosy pro
// @namespace      local
// @include        http://www.fotka.pl/konto_glosy.php
// @copyright	   bozar
// @version        1.0.2
// ==/UserScript==

var $ = unsafeWindow.$;


///////////////
var max_h = 25
if ($("#strona") != null){
	init()
}
///////////////



function init(){
	var wys =  wczytajOcenyWys()
	var wykresWys = wykres(wys, "Częstość wystawiania ocen:")

	var kontener = document.createElement("DIV")
	kontener.innerHTML = "<h2 style='margin-top: 0px; margin-top: 15px; margin-bottom: 30px'>Graficzne statystyki</h2>"
	kontener.style.cssText = "margin-left: 30px; float: right"
	kontener.appendChild(wykresWys)


	var otrz = wczytajOcenyOtrz()
	if(otrz != null){
		var wykresOtrz = wykres(otrz, "Częstość otrzymywania ocen:")
		kontener.appendChild(wykresOtrz)
	}

	var tabelka = $("table.glosy");
	tabelka.css("width", "75%")	;
	tabelka.css("display", "inline-block")	;
	tabelka.after(kontener);
}


function wykres(listaOcen, podpis){
	var zewn = document.createElement("DIV");

	zewn.style.cssText = "width: 180px; position: relative; margin-bottom: 40px; border-bottom: #666 solid thin;";
	zewn.style.height = (max_h + 1) + "px"	;

	var podp = document.createElement("DIV");
	podp.innerHTML = podpis;
	podp.style.cssText = "position: relative; color: #666; top: -20px; font-size: 8pt";
	zewn.appendChild(podp)	;

	var suma = 0;
	for(i=0; i<11; i++){
		suma += parseInt(listaOcen[i]);
	}

	var maksimum = 0;
	for(i=0; i<11; i++){
		if(listaOcen[i] > maksimum){
			maksimum = listaOcen[i];
		}
	}

	var skalowanie = max_h / (max_h * (maksimum / suma));

	for(i=0; i<11; i++){
		var słupek = document.createElement("DIV");
		var etykietka = document.createElement("DIV");

		słupek.style.cssText = "border-left: thin solid #666;	\
								border-right: thin solid #666;	\
								border-top: thin solid #666; 	\
								width: 10px; position: absolute; bottom: 0px; \
								background-color: #4996BA";
		słupek.style.left = (i*15 + 10) + "px";
		etykietka.innerHTML = i + 1
		etykietka.style.cssText = "position: absolute; bottom: -16px; width: 20px; text-align: center; \
								   font-size: 8pt; color: #666	";
		etykietka.style.left = (i*15 + 7) + "px";

		var wys = max_h * (listaOcen[i] / suma) * skalowanie; 		// !!!!!
		słupek.style.height = wys + "px";

		zewn.appendChild(słupek);
		zewn.appendChild(etykietka);
	}

	return zewn
}



function wczytajOcenyWys(){
	var tabelkaObiekt = $("td.count");
	var oceny = [];
    for(var i=0; i<11; i++){
        oceny.push(parseInt(tabelkaObiekt[i].textContent));
    }
	return oceny;
}

function wczytajOcenyOtrz(){
	var tabelkaObiekt = $("td.count");
	var oceny = [];
    for(i=11; i<22; i++){
        oceny.push(parseInt(tabelkaObiekt[i].textContent));
    }
	return oceny;
}


function div(op1, op2) {
	return (op1 / op2 - op1 % op2 / op2);
}
