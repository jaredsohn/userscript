// ==UserScript==
// @name           LicznikZgłoszeń
// @namespace      localhost
// @include        http://www.fotka.pl/profil/*
// ==/UserScript==

// autor: bozar88.fotka.pl



// funkcja pozwala na obejście zabezpieczneń funkcji GM_*
// http://wiki.greasespot.net/0.7.20080121.0_compatibility
function safeWrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
  };
}


// dodaje ramkę licznika
function inicjalizuj(e) {	
	if (!razDodane){		
		ustawDate();
		var przycisk = document.getElementById("czarna_confirm_ok")
		przycisk.addEventListener('click', nalicz, false);
		
		var licznik = document.createElement("div");
		licznik.style.cssText = "color: #4996BA; margin-bottom: 2px; margin-right: 5px; text-align: right; font-size: 10px;";
		
		licznik.innerHTML = "<b>" + GM_getValue("licznik") + "</b> zgłoszeń od " + GM_getValue("licznik_data");
		box.appendChild(licznik);
		razDodane=true;
	}
}

// nalicza 1 zgłoszenie
function nalicz(){	
	var tresc = document.getElementById("f_czarna").value;
	if (tresc != ""){
		var i = GM_getValue("licznik");
		if (i==null || i=='undefined') i=0;
		i++;
		GM_setValue("licznik",i);
	}
}

// ustawia datę pierwszego zgłoszenia jeśli jest taka potrzeba na bieżącą lub podaną w parametrach
function ustawDate(d,m,r){	
	var teraz;
	if (d==null || m==null || r==null ){ 			// w przypadku wywołania bez parametrów
		if (GM_getValue("licznik_data")==null){		// w przypadku kiedy nie ma jeszcze tej wartości
			teraz = new Date();						// twórz bieżącą datę. jest to 1sze wywołanie programu
		}else return;								// jak już jest wartość daty, to olej i wyjdź ;)
	}else{
		teraz = new Date();							// jak podano parametry, to użyj ich
		teraz.setFullYear(r);
		teraz.setMonth(m);
		teraz.setDate(d);
	}
	
	var mc = teraz.getMonth() + 1;
	if (mc<10) mc = "0" + mc;
	var data = teraz.getDate() + "-" + mc + "-" + teraz.getFullYear();	
	GM_setValue("licznik_data",data);	
}

// zmiana parametrów
function konfig(){
	var teraz = new Date();	
	var r=prompt("Podaj ROK daty początku naliczania głosów (xxxx)");
	var mc=prompt("Podaj MIESIĄC daty początku naliczania głosów (1-12)") - 1; // styczeń to 0
	var d=prompt("Podaj DZIEŃ daty początku naliczania głosów (1-31)");
	var x=prompt("Podaj ilość zgłoszeń od której należy naliczać", GM_getValue("licznik"));
	
	if (mc<=9) mc = "0" + mc;
	if(r!=null && d!=null && x!=null){
		ustawDate(d,mc,r);
		GM_setValue("licznik",x);
		alert("Dane dostały zmienione. Odśwież stronę.");
	}else alert("Anulowano operację zmiany danych.");
}

function resetIlosc(){
	ustawDate(); // na dziesiejszą
	GM_setValue("licznik",0); // wyzeruj
	alert("Wyzerowano liczbę zgłoszeń oraz ustawiono datę na dziesiejszą.");
}
		
	
// zamiana funcji na ich "bezpieczne" odpowiedniki	
inicjalizuj=safeWrap(inicjalizuj);
nalicz=safeWrap(nalicz);
ustawDate=safeWrap(ustawDate);
konfig=safeWrap(konfig);
resetIlosc=safeWrap(resetIlosc); 


// przygotowanie przeglądarki
var razDodane = false;
var box = document.getElementById("czarna_confirm");
if (box != undefined){		
	box.addEventListener('focus', inicjalizuj, true); 			//dodaj kontrolki dopiero po wyswietleniu kursora w textboxie	
	GM_registerMenuCommand("Licznik zgłoszeń: ustaw parametry początkowe", konfig);
	GM_registerMenuCommand("Licznik zgłoszeń: zresetuj", resetIlosc);	
}


