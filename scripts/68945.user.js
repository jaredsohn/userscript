/*
Wykop.pl - Podmiana wyszukiwarki na Google
Copysrajt (:P) 2010 HUMiN

Niniejszy program jest wolnym oprogramowaniem - cokolwiek to znaczy.
Możesz go rozprowadzać dalej, modyfikować, plagiatować na warunkach 
Powszechnej Licencji Wolvera SRAQ wydanej przez Fundację Polsat Dzieciom
według wersji 666 tej Licencji, możesz równiesz wsadzić go sobie w 
<ocenzurowano>, jeśli ci się to podoba.

Niniejszy program rozpowszechniany jest z nadzieją, iż jakiś idiota go
ściągnie. Autor nie bierze żadnej odpowiedzialności za to co zrobisz z tym
oprogramowaniem. Podsumowując - jeżeli nie znasz się na tym programie,
skasuj go natychmiast. 

Powinieneś otrzymać papierową kopię tej licencji w ilości pół miliona sztuk.
Jeśli licencja nie została dostarczona lub Ci się nie podoba, odwiedź adres 
http://www.google.com/search?q=software+license
i znajdź sobie inną, która ci odpowiada.

Pełny tekst licencji dostępny jest pod adresem:
http://www.wolver.yoyo.pl/licensing/LICENCJA.TXT


Jestem beznadziejny w pisaniu skryptów w JS - nie narzekać!
*/
// ==UserScript==
// @name 		Narzekasz na Wykopową wyszukiwarkę?
// @description	Skrypt podmienia wyszukiwarkę Wykop.pl na Google'a.
// @include		*.wykop.pl*
// ==/UserScript==


var szukajka=document.getElementById("search-form"); // form
szukajka.action="http://www.google.pl/search";
var phrase=document.getElementsByName("phrase")[0]; // input szukajki

var tx=document.createElement("input");  // input do którego dodamy parametry Google'a - site, inurl, etc

tx.setAttribute("type","hidden"); 
tx.setAttribute("name","q");
tx=phrase.parentNode.insertBefore(tx,phrase);

var prv=document.createElement("input"); // włączenie podglądu strony
prv.setAttribute("type","hidden");
prv.setAttribute("name","tbs");
prv.setAttribute("value","prv:1");
phrase.parentNode.insertBefore(prv,phrase);

phrase.addEventListener("change", function(){ //dodajemy parametry G
	tx.setAttribute("value",phrase.value+" site:wykop.pl inurl:link -inurl:powiazane -inurl:wykopali -inurl:zakopali");
}, false);
