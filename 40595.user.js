// ==UserScript==
// @name           TurboZgłaszacz
// @namespace      localhost
// @include        http://www.fotka.pl/profil/*
// ==/UserScript==
// autor: bozar.fotka.pl



var razDodane = false;
var box = document.getElementById("czarna_confirm");
if (box != undefined){	
	box.addEventListener("click", dodajPanel, true);
}

function dodajPanel(e){	
	if (!razDodane){
			
		var kontrolki = document.createElement("div");
		kontrolki.id = "box_kontrolki";
		
		var zdj = nowaGrupa("zdjęcia: ");			
		zdj.appendChild(nowyInput("obrazek","obrazek z internetu"));
		zdj.appendChild(nowyInput("fejk","fejk"));
		zdj.appendChild(nowyInput("kradzione","zdjęcia skradzione z innego profilu"));
		zdj.appendChild(nowyInput("porno", "pornografia"));
		zdj.appendChild(nowyInput("podpisy", "wulgarne podpisy pod zdjęciami"));
		zdj.appendChild(nowyInput("niewidoczny","żadne ze zdjęć nie pozwala na identyfikację osoby"));

		var prof = nowaGrupa("profil: ");
		prof.appendChild(nowyInput("wspólny", "profil należy do kilku osób"));
		prof.appendChild(nowyInput("automat", "podejrzenie o automat"));
		prof.appendChild(nowyInput("obraźliwy", "profil jest obraźliwy"));
        prof.appendChild(nowyInput("opis", "nieregulaminowy opis"));
		prof.appendChild(nowyInput("wiek", "sfałszowany wiek"));
		prof.appendChild(nowyInput("lokalizacja", "fikcyjna lokalizacja"));
		prof.appendChild(nowyInput("płeć", "błędnie podana płeć"));		
		prof.appendChild(nowyInput("reklama", "reklama w opisie"));	
		prof.appendChild(nowyInput("spam kom", "spamowanie w komentarzach"));
		prof.appendChild(nowyInput("spam pw", "spamowanie we wiadomościach"));
		prof.appendChild(nowyInput("login", "wulgarny login"));
		prof.appendChild(nowyInput("wyłudzanie", "wyłudzanie doładowań itp"));
		prof.appendChild(nowyInput("status", "nieregulaminowy status"));
		prof.appendChild(nowyInput("nazwisko", "wulgaryzmy zamiast nazwiska"));
				
		kontrolki.appendChild(zdj);
		kontrolki.appendChild(prof);
		
		var gdzie = document.getElementById("czarna_inny");
		var textbox = document.getElementById("f_czarna");
		gdzie.insertBefore(kontrolki, textbox);
		gdzie.style.marginTop="5px";
		
		
		//document.getElementById("czarna_confirm_question").nextSibling.style.display = "none";
		
		textbox.style.fontSize = "10pt";
		textbox.style.paddingTop = "5px;";
	
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
	var etykietka = document.createElement("div");
	etykietka.innerHTML = "<b>"+nazwa+"</b>";
	ret.style.textAlign="left";
	//ret.style.marginTop="0.5em";
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







