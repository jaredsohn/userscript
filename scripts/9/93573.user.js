// ==UserScript==
// @name           Kwasowy Chat - dodatkowe funkcje
// @namespace      Kwasowa grota, chat, wersja 1.0
// @include        http://www.chat.acidcave.net/
// ==/UserScript==
addEventListener(window, 'load', initShare); //dodajemy kod OnLoad



function initShare() {
	
	

	//.
	/*
		USTAWIENIA!
		USTAWIENIA!
		USTAWIENIA!
		USTAWIENIA!
		USTAWIENIA!
		USTAWIENIA!


	*/
	var nick  = ''; //twoj nick, obecnie raczej niepotrzebne
	var ignore = 0; // 0 - brak ignore. 1 - ignorowanie innych. 2 - przyszarzanie wiadomości ignorowanych
	//na dzien obecny (26.12.2010) nie dziala jeszcze
	var ignore_table = [ // kolejne nicki oddzielamy przecinkami, ostatni nick bez przecinka, nick w cudzysłowach
		'nick_ignorowanego_uzytkownika_numer_1',
		'nick_ignorowanego_uzytkownika_numer_2' 
	]
	
	/*
		Koniec ustawień, dalej będziesz musiał radzić sobie sam.
	*/
	
	var temp; // tymczasowa zmienna do różnych bzdur

	var ciag  = '@'+nick+':'; // ciąg do zamienienia
	var nowe  = '<span class="wezwanie">@'+nick+'</span>:'; // do zamiany
	var nicks = ["Ginden",
		     "Hobbit",
		     "Kirin",
		     "Acid Dragon",
		     "Trith",
		     "Dragonar",
		     "f!eld",
		     "Hubertus",
		     "Mitabrin",
		     "Alamar",
		     "BanBreaker",
		     "Rah",
		     "Wiwern",
		     "Trang Oul",
		     "Altair",
		     "Enleth",
		     "xelacient",
		     "Haregar",
		     "Quba Drake",
		     "Kreator Irhak",
		     "packa",
		     "Eniphoenix",
		     "Raven",
		     "Rabican",
		     "Vatras",
		     "MCaleb",
		     "OGARexs",
		     "Heroes"
		     ]; // tablica, taka, a nie inna z powodu nieznajomości regexpów
	var skrypt_pomocniczy = document.createElement('script'); // tworzymy skrypt, dla takiej drobnostki nie trzeba zewnętrznego
	skrypt_pomocniczy.innerHTML = "function reply_to(user_nick)"+ "{" +
	"var pole_tresci = top.inpt.document.forms.duck.tresc; \n" +
	"if (pole_tresci.value.indexOf(user_nick, 0) == -1) "+ "{ \n \n" +
		"if (pole_tresci.value != '')"+ //coś już napisono
			"pole_tresci.value = pole_tresci.value + ' @'+ user_nick+': '; \n \n"+
		"if (pole_tresci.value == '')"+ // puste pole
			"pole_tresci.value = '\@'+ user_nick+': '; \n \n"+
	"} \n \n"+
	"pole_tresci.focus(); \n \n" //wpisywanie znowu w polu
	
	+"}";		
	
	skrypt_pomocniczy.setAttribute("type", "text/javascript");
	
	

	var costam = document.documentElement.lastChild.firstChild; // w teorii - tabela. Mamy nadzieje, ze Acid nic nie zmieni.
	document.body.insertBefore(skrypt_pomocniczy, costam);
	skrypt_pomocniczy = null; // czyścimy, na wszelki wypadek.
	skrypt_pomocniczy = document.createElement('script');
	skrypt_pomocniczy.innerHTML = 'function reply_by_time(czas) {' // cytowanie czasu
		+'var pole_tresci = top.inpt.document.forms.duck.tresc;'
		+'if (pole_tresci.value.indexOf(czas, 0) == -1)  {'
		+"if (pole_tresci.value != '')"
		+"pole_tresci.value = pole_tresci.value + ' ' + czas + ' – ';"
		+"if (pole_tresci.value == '')"
		+"pole_tresci.value = czas + ' – ';"
		+"}" 
		+"pole_tresci.focus();"
		+"}";
	skrypt_pomocniczy.setAttribute("type", "text/javascript");
	document.body.insertBefore(skrypt_pomocniczy, costam); // wstawiamy skrypt
	var AJAX_1;
	var temp = 0;
	if (document.URL == "http://www.chat.acidcave.net/coutput.php" && costam != null) // tylko coutput.php, jesli sa wiadomosci na chacie.
		{
		costam.innerHTML = costam.innerHTML.replace(new RegExp(ciag, 'gi'), nowe);	//gi - w całym dokumencie, bez zwracania uwagi na wielkosc znakow.
		var ciag = nick+':'; // ciąg do zamienienia
		var nowe = '<span class="wezwanie">'+nick+'</span>:';
		if (nick != '') {
			costam.innerHTML = costam.innerHTML.replace(new RegExp(ciag, 'gi'), nowe);
		}
		
		while(temp <= 100) {
			if (nicks[temp] === undefined) //kończy się tablica, więc przerywamy
				break;	
			ciag = '<span class="'+nicks[temp]+'">'+nicks[temp]+'</span> :';
			nowe = '<span onclick="reply_to(\''+nicks[temp]+'\');" class="'+nicks[temp]+' reply_button">'+nicks[temp]+'</span> :';
			costam.firstChild.innerHTML = costam.firstChild.innerHTML.replace(new RegExp(ciag, 'gi'), nowe);
			temp = temp + 1;
		}
	
		
		var chat_table = costam.firstChild.lastChild.lastChild.firstChild.firstChild.firstChild; // tabela rozmow
		temp = 0; //czas na petle
		var chat_table_nodes = chat_table.childNodes;
		
		while (chat_table_nodes[temp] != null) {
			if(chat_table_nodes[temp].lastChild.innerHTML.indexOf('odchodzi w zaświaty...</i>') != -1) { // pierwsza forma. Sprawdzamy odchodzenie w zaswiaty
				chat_table_nodes[temp].lastChild.previousSibling.innerHTML =
						chat_table_nodes[temp].lastChild.innerHTML.substring(
						3,
						chat_table_nodes[temp].lastChild.innerHTML.indexOf('odchodzi w zaświaty...</i>'))
						;
				chat_table_nodes[temp].lastChild.innerHTML =
					chat_table_nodes[temp].lastChild.innerHTML.replace(
						chat_table_nodes[temp].lastChild.previousSibling.innerHTML, '');
				chat_table_nodes[temp].lastChild.previousSibling.innerHTML = '<i>'+chat_table_nodes[temp].lastChild.previousSibling.innerHTML+'</i>';
			}
			if (chat_table_nodes[temp].lastChild.innerHTML.indexOf('﻿*') != -1) {
				chat_table_nodes[temp].lastChild.innerHTML = chat_table_nodes[temp].lastChild.innerHTML.replace('﻿*', '<i class="me">');
				chat_table_nodes[temp].lastChild.innerHTML = chat_table_nodes[temp].lastChild.innerHTML.replace('*﻿', '</i>');
				//usunelismy juz znaczki, czas na usunięcie znaczka z poprzedniej komórki
				chat_table_nodes[temp].lastChild.previousSibling.innerHTML = chat_table_nodes[temp].lastChild.previousSibling.innerHTML.replace('</span> :', '</span>');
			}
			//
			//
			
			if (chat_table_nodes[temp].firstChild != null) { //oddzielenie logiczne bloków
			
				chat_table_nodes[temp].firstChild.innerHTML = chat_table_nodes[temp].firstChild.innerHTML.replace(' :', ':'); // a po co ta dziura?
				chat_table_nodes[temp].firstChild.innerHTML = '<span class="reply_by_time" onClick="reply_by_time(\''+
					chat_table_nodes[temp].firstChild.innerHTML + '\');">' +
					chat_table_nodes[temp].firstChild.innerHTML + '</span>'; //odpowiadanie wg czasu
			}
			
			
			
			 
			
			temp ++;
		}

	}
	if (document.URL == "http://www.chat.acidcave.net/cinput.php")
	{ //podmieniamy historię, by otwierała sie w nowym oknie
		skrypt_pomocniczy = document.createElement('script');
		skrypt_pomocniczy.setAttribute("type", "text/javascript");
		skrypt_pomocniczy.innerHTML = 'function funkcja_pomocnicza()' +' { \n'
+		'temp = document.getElementsByName("tresc")[0]; \n'
+		'if (temp.value.indexOf("/me ") == 0) { \n'
+		'	temp.value = temp.value.replace("/me ", "﻿*"); \n'
+		'	temp.value = temp.value +"*﻿"; \n'			
+		'}'

+		'}'
		;
		
		document.documentElement.insertBefore(skrypt_pomocniczy, document.documentElement.lastChild);
		costam = document.documentElement.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild;
		costam.innerHTML = costam.innerHTML.replace('parent.location=\'chistory.php\'', 'window.open(\'chistory.php\')');
	//	temp = "﻿"; //pusty znak, sygnalizuje skryptowi /me
		temp = document.documentElement.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild;
		temp.setAttribute('onsubmit', 'funkcja_pomocnicza();');
		temp = document.getElementsByName("tresc")[0];
		if (temp.value.indexOf('﻿') == 0) {
			alert('cos');
			
		}
	        ///html/body/table/tbody/tr/td/form/input
	} 
}



function addEventListener(element, eventName, callback, useCapture) {
  if (element.addEventListener) {
    element.addEventListener(eventName, callback, useCapture || false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + eventName, callback);
  } else {
    return false;
  }
  return true;
}

