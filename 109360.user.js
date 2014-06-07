// ==UserScript==
// @name          Cantr Labels
// @namespace     http://www.cantr-mmorpg.pl/scripts
// @description   Labeling of objects (containers, items) for Polish Cantr characters
// @include       http://www.cantr.net/*
// @include       http://cantr.net/*
// @include       cantr.net/*
// @include       www.cantr.net/*
// @version       0.3
// ==/UserScript==


function labels(){
	// node - cała ścieżka dotarcia do tego co nas interesuje jest długa i kręta
	var node = document.body;
	node = node.getElementsByTagName('center'); // node - wszystkie elementy z <center>
	var table = node[5]; // tabela w <center> nr 6 w tej tabeli są wszystkie przedmioty
	var TRs = table.getElementsByTagName('TR'); // TRy - każdy TR to oddzielny obiekt
	// console.log('TRs[0]: ' + table.innerHTML);
	if (strona == 'inventory'){
		// jeśli to jest inwentarz to usuwamy belkę z typem wyświetlanych surowców (notatki, klucze itp)
		//TRs.splice(0,1); // nie działa! oO
		var temp = new Array();
		for (ind in TRs){
			if (ind > 0 && ind < TRs.length) // LOL!
			temp[ind-1] = TRs[ind];
		}
		TRs = [];
		TRs = temp;

		
	}
	
	for (var TRindex in TRs){ // wyciągamy każdy obiekt (TR) po kolei
		var is1 = (TRindex < TRs.length && TRs[TRindex].getElementsByTagName('table').length > 0);
		var is2 = (TRindex < TRs.length);
		if ((is1 && strona == 'objects') || (is2 && strona == 'inventory')){
		var inTR = null;

		// początek przedzierania się przez kolejne tagi żeby zejść niżej do poszczególnych obiektów
		if (strona == 'objects'){
			var tagTD = TRs[TRindex].getElementsByTagName('td')[0]; // pierwszy z brzega TDek
			var inTab = tagTD.getElementsByTagName('table')[0];
			inTR = inTab.getElementsByTagName('tr')[0];
		}
		else {
			inTR = TRs[TRindex];
		}
			
			if ((inTR.innerHTML.indexOf('notatka') < 0) && (inTR.getElementsByTagName('form').length > 0) && (inTR.innerHTML.indexOf('gram') < 0)){ // pomijamy notatki i stoły itp.
				var n_Form = inTR.getElementsByTagName('form')[0]; // Form z inputami (także tymi hidden - ważnymi)
				var inputs = n_Form.getElementsByTagName('input');
				var hiddenIn = inputs[1]; // to jest input w stylu <input type="hidden" value="x" name="object_id">
				var objID = hiddenIn.attributes.getNamedItem("value").nodeValue; // ID obiektu
			// tutaj już jestem na miejscu
				
				// wyświetla ID do konsoli dla celów informacyjnych
				console.log(objID);
				
				// tworzony jest nowy tag TD w którym znajdą się dodawane dane
				var TDnames = inTR.getElementsByTagName('td');
				var TDname = TDnames[TDnames.length-1];
				var setLink = document.createElement('a');
				var szpan = document.createElement('span');
				
				setLink.addEventListener("click", zew(objID), true);
				setLink.innerHTML = " [set]";
				szpan.appendChild(setLink);
				
				var labelTag = document.createElement('span');

				if (localStorage.getItem(objID) != null){
					console.log('kamememe');
					labelTag.innerHTML = " - " + localStorage.getItem(objID);
					szpan.appendChild(labelTag);
				}
				TDname.appendChild(szpan);
				
				toDel[toDel.length] = szpan;
				toDelIn[toDelIn.length] = TDname;
			}
		}
	}

}

	function zew(jakis){
		return function(){ addTag(jakis); }
	}

	/*
	* DODAJE tag (etykietę) do localStorage - magazynu na dane wewnątrz przeglądarki
	*/
	function addTag(oID){ // funkcja wyświetla okienko z którego zbiera informację o nazwie dla danego obiektu i zapisuje ją
		var nazwa = prompt('Podaj identyfikator dla tego obiektu', '');
		if (nazwa != null){
			localStorage.setItem(oID, nazwa);
		}
		delAll();
		labels();
	}
	
	/*
	* USUWA stare dane (komórkę TD zawierającą przycisk SET i dotychczasowe etykietki) żeby wyświetlić je na nowo razem z ewentualnymi zmianami
	*/
	function delAll(){
		for (var TDtoDel in toDel){
			if (TDtoDel < toDel.length){
				toDelIn[TDtoDel].removeChild(toDel[TDtoDel]);
			}
		}
		
		toDel = [];
		toDelIn = [];
	}
	
	function checkStrona(){
	var node = document.body;
	node = node.getElementsByTagName('center'); // node - wszystkie elementy z <center>
	if(node.length > 4){ // czy w ogóle istnieje czwarty center
	var code = node[4].innerHTML; // kod <center> nr 5 czyli tego z belką w której jest nazwana podstrona
	
	if(code.indexOf('OBIEKTY') >= 0 || code.indexOf('OBJECTS') >= 0)
		return ('objects');
	if(code.indexOf('INWENTARZ') >= 0 || code.indexOf('INVENTORY') >= 0)
		return ('inventory');
	}

		// jeśli żadnej nas interesującej nie znajdzie
	return ('no');
	}




// tu zaczyna działać tak naprawdę po raz pierwszy

// tablice przechowujące doklejony kod HTML - dzięki niemu można później usunąć by wyświetlić na nowo

var strona = checkStrona(); // sprawdzamy czy znajdujemy się na której ze stron "znaczących" - takich na których skrypt ma coś robić
var toDel = new Array();
var toDelIn = new Array();
if (strona == 'objects' || strona == 'inventory'){ // sprawdzam czy jest to strona OBIEKTY lub INWENTARZ
	labels(); // odpala kod do nadawania i wyświetlania etykietek
}


