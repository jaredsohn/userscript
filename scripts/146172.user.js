// ==UserScript==

// @name          Show messages

// @namespace     http://www.webmonkey.com

// @description   Skrypt wyswietlajacy wiadomosci bez koniecznosci otwierania wyskakujacego okienka

// @include       http://uni117.ogame.pl/game/index.php?page=messages

// ==/UserScript==

setTimeout(function(){

var messageElements = document.getElementsByClassName("entry trigger");//wyciagniecie elementow strony odpowiedzialnych za przechowywanie zapytania o wiadomosc

var arr = new Array();
var newDiv;

for(i = 0; i < messageElements.length; i++){//iterowanie sie po wyszukanych elementach strony
	var message = messageElements[i].getElementsByClassName("subject")[0];
	console.log(message);
	var m2 = message.getElementsByTagName("a")[0];
	if(m2.value.indexOf('Zbiórka szczątków z pola zniszczeń') != -1){
		console.log("zbiorka z pola zniszczeń");	
	}else{
		console.log(m2);
		var m3 = m2.getElementsByTagName("span")[0];
		console.log(m3);
	}
	/*xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", messageElements[i].getElementsByTagName("a")[0].href, false); //tworzenie zapytania do serwera o wiadomość
    xmlhttp.onreadystatechange = function () { 
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log("function = " + xmlhttp.responseText.length);
            var start = xmlhttp.responseText.indexOf('<div class="note">');//poczatek parse'owania wiadomosci i wyciagania porzadanej czesci
            console.log(start);
            var tempString = xmlhttp.responseText.substring(start, xmlhttp.responseText.length);
            console.log(tempString);
            tempString = tempString.substring(0, tempString.indexOf('</div>') + 7);
            console.log(tempString);
            newDiv = document.createElement("tr");//tworzenie elementu umieszczanego na layoucie strony
            newDiv.innerHTML = "<td colspan='5'>" + tempString + "</td>";//dodawanie wiadomosci do utworzonego powyzej elementu
            messageElements[i].parentNode.insertBefore(newDiv, messageElements[i].nextSibling);//wstawianie utworzonego wyzej elementu na leyout strony
        }
    }
    xmlhttp.send();*/
}
}, 500);//opuznienie wywolania skryptu o 0,5s