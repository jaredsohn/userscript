// ==UserScript==
// @name           TurboZgłaszacz
// @namespace      localhost
// @include        http://www.fotka.pl/profil/*
// ==/UserScript==


var box = document.getElementById("czarna_confirm");
if (box != undefined){
	box.addEventListener('focus', dodajPanel, true); //dodaj kontrolki po wyświetleniu kursora w textboxie
}

var razDodane = false;

function dodajPanel(e){	
	if (!razDodane){	
		var kontrolki = document.createElement("div");
		kontrolki.id = "box_kontrolki";
		
		var zdj = nowaGrupa("zdjęcia: ");
		
		zdj.appendChild(nowyInput("fejk","fejki"));
		zdj.appendChild(nowyInput("kradzione","zdjęcia ściągnięte z innego profilu"));
		zdj.appendChild(nowyInput("erotyka", "erotyka"));
		zdj.appendChild(nowyInput("nieczytelne", "zdjęcia nieczytelne"));

		var prof = nowaGrupa("profil: ");
		prof.appendChild(nowyInput("wspólny", "profil należy do kilku osób"));
		prof.appendChild(nowyInput("automat.", "osoba używa automatów"));
		prof.appendChild(nowyInput("obraźliwy", "profil jest obraźliwy"));
                prof.appendChild(nowyInput("wulgarny opis", "opis jest wulgarny"));
		prof.appendChild(nowyInput("wiek", "sfałszowany wiek"));
		prof.appendChild(nowyInput("lokalizacja", "nierealna lokalizacja"));
		
		kontrolki.appendChild(zdj);
		kontrolki.appendChild(prof);
		
		box.firstChild.insertBefore(kontrolki,  document.getElementById("f_czarna"));
		
		document.getElementById("czarna_confirm_question").nextSibling.style.display = "none";
		document.getElementById("f_czarna").style.fontSize = "10pt";
		razDodane = true;
	}
}


function nowyInput(nazwa, opis){
	var ret = document.createElement("input");
	ret.type = "button";
	ret.name = nazwa;
	ret.alt = opis;
	ret.value = nazwa;
	ret.style.fontSize = "10px";	
	ret.addEventListener('click', wpisz, false); 	
	return ret;	
}

function nowaGrupa(nazwa){
	var ret = document.createElement("form");
	var name = nazwa;
	var etykietka = document.createElement("span");
	etykietka.innerHTML = nazwa;
	ret.appendChild(etykietka);
	
	return ret;
}

function wpisz(e){
	var ibox =  document.getElementById("f_czarna")
	if (ibox.value==""){
		ibox.value = e.target.alt;
	}else{
		ibox.value = ibox.value + ", " + e.target.alt;		
	}
	e.target.disabled = true;
}







