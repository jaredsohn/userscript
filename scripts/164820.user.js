// ==UserScript==
// @name          F23-stopka
// @description   Ułatwia dodawanie stopki, zapamiętuję ją itd. - tylko dla pomarańczowych !
// @include       http://forum.o2.pl/nowy.php*
// @author        dumny anarchista	
// @version       0.1.2
// ==/UserScript==


//// na początek dodamy kilka funkcji, i utworzymi dwie pomocnicze któ¶e wrzucimy na stronę. Jest to KONIECZNE żeby skrypt działal !

function readCookie(name) { /// standardowa funkicja odczytująca ciasteczko - dokłądnie taka sama jaką można znaleźć w sieci
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length,c.length));
	}
	return null;
}

var F23script = document.createElement("script"); /// jako że w Google Chrome user.scripts są uruchamiane w sanbox, tworzy na stronie kontener z dwoma funkcjami
F23script.textContent = ' '+
'function createCookieF23(name,value,days) { ' + /// ta funkcja służy do zapisywania ciasteczka - dokładnie taką samą można znaleźć w sieci
'	if (days) { ' +
'		var date = new Date(); ' +
'		date.setTime(date.getTime()+(days*24*60*60*1000)); ' +
'		var expires = ";expires="+date.toGMTString(); ' +
'	} ' +
'	else { var expires = ""; } ' +
'	document.cookie = name+"="+escape(value)+expires+"; path=/"; ' +
'} ' +
' ' +
'function F23on_submit_stopka() { ' + /// ta funkcja jest wykonywana kiedy pomarańczka wysyła post
'	var stopka = document.getElementById(\'F23stopka\').value; ' + /// pobranie stopki z formularza/pola tekstowgo na stronie i zapisanie jej do zmiennej lokalnej stopka
'	var chc = document.getElementById(\'F23sendstopka\').checked;' + // zwraca do zmienne chc aktualny stan checkboxa
'   document.getElementById(\'F23stopka\').parentNode.removeChild(document.getElementById(\'F23stopka\'));' + /// usunięcie formularza ze strony - usuwany jest po to żeby nie wysyłać dodatkowego pola POST podczas dodawania tematu. Stopka i tak zostanie wysyłana na końcu postu, a tego pola textarea skrypt forum nie wziął by pod uwagę
'   if ((stopka == \'\') || (chc == true)) return true;' + /// nie dołączaj, ani zapisuj stopki w ciasteczko, kiedy pomarańczka usunie stopkę albo zaznaczy checkboxa
'	document.forms[2].getElementsByTagName("textarea")[0].value += \'[stopka]\' + stopka + \'[/stopka]\'; ' + /// dołączenie stopki na sam koniec napisanego przez uzytkownika postu, pomiędzy [stopka] a [/stopka]
'	createCookieF23(\'F23stopka\',stopka,365); ' + /// zapisanie nowej stopki (nie ważne czy się zmieniłą czy nie) do ciasteczka, tak aby pamiętał w przyszsłości - ważność ciasteczka to 365 dni
'	return true; ' + /// standardowo zwraca true po zakończeniu funkcji
'} ' +
' ' +
'function F23checkbox(e) { ' + // funkcja do obsługi checkboxu wł/wył stopkę
'  var c = e.checked;' + // zwraca true/false do zmiennej c, w zalezności od tego czy checkbox jest zaznaczony czy nie
'  if (c) {' + // jak jest zaznaczony to..
' 		document.getElementById(\'F23stopka\').disabled=true;' + /// dezaktywuje textare ze stopką
'  } else {' + /// a jak jest nie zaznaczony..
' 		document.getElementById(\'F23stopka\').disabled=false;' + /// to aktywuje w/w textarea ze stopką
'  } ' +
'  createCookieF23(\'F23checkboxstopka\',c,365);' + /// zapisuje cisteczko z aktualnym stanem checkboxa
'} ';

document.body.appendChild(F23script); /// dodaje powyższe dwie dunkcje na stronę, reszta tego pliku jest już uruchamiana w sandbox


/// A teraz zabierzemy się za dodanie nowego pola tekstowego, gdzie będzie można wpisać sobie stopkę
/// i przy kazji obromy trochę formularz, tak aby wszystko przebiegło automagicznie :


if (document.getElementsByName('wyloguj')[0]) { /// sprawdza czy użytkownik jest zalogowany
	/// jak jest zalogowany to nic nie robimy, skrypt jest przecież dla niezalogowanych
} else {
	/// a jak jest pomarańczka...
	if (document.forms[2]) { /// to sprawdzamy czy jest na stronie formularz dodania nowego postu
		var onsubmitold = document.forms[2].getAttribute('onsubmit'); /// pobieramy z tego formularza stare zdarzenie onsubmit, tak żeby w przyszłości skrypt nie korelował z innymi podobnymi skryptami
		if (onsubmitold == null) onsubmitold = ''; /// jak nie ma starego atrybutu onsubmit to czyścimy zmienną żeby nie zapisywać "bzdur"
		document.forms[2].setAttribute('onsubmit','F23on_submit_stopka();'+ onsubmitold); /// dodajemy nasz zdarzenie onsubmit, czyli wykonanie funkcji F23on_submit_stopka tuż przed wysłąniem formularza. co robi funkcja F23on_submit_stopka patrz wcześniej
		var F23stopka = readCookie('F23stopka'); /// wczytanie starej stopki zapisanej wcześniej z ciasteczka
		var checkbox = readCookie('F23checkboxstopka'); /// zwraca zapisany wcześniejszy stan zaznaczenia checkboxa
		if (F23stopka == null) F23stopka = ''; /// jak by starej stopki nie było to czyścimy zmienną żeby nie wpisywać bzdur typu "null"
		var span = document.createElement("span"); /// tworzy kontener <span>
		var disabled = (checkbox == 'true') ? ' disabled="true"' : ''; /// tworzy zmienną w zalezności od poprzedniego ustawienia checkboxa, która to zmienna będzie dołączona do pola textare i będzie decydować czy pole jest aktywne czy nie
		var checked = (checkbox == 'true') ? ' checked="true"' : ''; /// jak wyżej i w podobny sposób, tyle że ustala obecny stan checkboxa
		span.innerHTML = '<br/><br/><textarea name="F23stopka" rows="4" cols="70" class="f12" id="F23stopka"'+disabled+'>'+F23stopka+'</textarea><input type="checkbox" id="F23sendstopka" onclick="F23checkbox(this);"'+checked+'></span>'; /// wypełnia kontener span nowym polem tekstowym i checkboxem
		var node = document.forms[2].getElementsByTagName("textarea")[0]; /// zwraca objekt (DOM) textare z treścią postu
		node.parentNode.insertBefore(span,node.nextSibling); /// i tuż za nim dodaje kontener ze stopką i checkboxem

	}
}

/// no i to by było na tyle :)
