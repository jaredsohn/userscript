// ==UserScript==
// @name          grepolis
// @description   Segítség a levélküldésben
// @include       http://*.grepolis.com/game/*
// ==/UserScript==
// this function fills out form fields
//
var zTextFields = document.getElementsByTagName("input");
for (var i=0; i<zTextFields.length; i++) {
  thefield=zTextFields[i].id;
  if (!thefield) thefield=zTextFields[i].id;
  // Set up your auto-fill values here
  if (thefield == "subject") zTextFields[i].value="Isten hozott!";
}
var zTextFields = document.getElementsByTagName("textarea");
for (var i=0; i<zTextFields.length; i++) {
  thefield=zTextFields[i].id;
  if (!thefield) thefield=zTextFields[i].id;
  // Set up your auto-fill values here
  if (thefield == "message_new_message") zTextFields[i].value="[b]Fontos levél a Szociális és Oktatási Minisztériumból[/b] \n\n[b]Üdvözöllek Esimen![/b] \n\n Ezt a levelet azért kapod mert, látjuk hogy azon kevesek között vagy aki nem csak beregisztrál a játékba hanem be is lép. \n Jó hogy regisztráltál a játékba, de még jobb lenne, ha nem hagynád sorsára a karaktered az első pár napban, ahogy azt sajnos sok újonc teszi... \n\n[b]LEGYÉL TE A RITKA KIVÉTELEK EGYIKE, ÉS NE ADD FEL RÖGTÖN AZ ELEJÉN!![/b]! \n\nHa segítségre van szükséged ezen kérdőív kitöltésével: \n[url=https://docs.google.com/spreadsheet/viewform?formkey=dEZsUmJMWHVPMHJmV3hsWlo1SS0zS1E6MQ]Mentor program[/url] \nIgényelheted egy mentor segítségét, kivel remélem igénylésed után minél hamarabb találkozol. \n\n[u]Ha gondod adódna a kitöltéssel, bátran írj.[/u] \n\n[center][b]A gyorsabb fejlődésed érdekében csatlakozz a Minisztérium által üzemeltetett Támogatási Rendszerhez , amiről bővebb információt itt találsz: \n[url=http://e-sim.org/article.html?id=23340]Támogatási rendszer információk[/url][/center][/b] \n\nTovábbá szeretnénk néhány segítséget ajánlani a kezdéshez.\n\n [url=http://smagyarorszag.comuv.com/page.php?9]Első lépések[/url] \n [url=http://smagyarorszag.comuv.com]Átfogó ismeretek a játékról[/url]\n\nTovábbá szeretnénk ösztönözni a chat használatára, mivel ott mindig friss információkat találsz, és sok segítőkész játékost.\n\n[url=http://mibbit.com/?channel=%23esim-hu&server=rizon.mibbit.org]Közös_chat[/url] \n\n[url=http://mibbit.com/?channel=%23szoc-okt.min&server=rizon.mibbit.org]Minisztériumi chat[/url]  \n\n[b]Jó játékot kíván a Minisztériumi csapat![/b] \n\n ";
}