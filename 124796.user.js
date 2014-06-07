// ==UserScript==
// @name          OKTMIN MASS MAILER 
// @description   Segítség a levélküldésben
// @include       *
// ==/UserScript==
// this function fills out form fields
//
var zTextFields = document.getElementsByTagName("input");
for (var i=0; i<zTextFields.length; i++) {
  thefield=zTextFields[i].name;
  if (!thefield) thefield=zTextFields[i].id;
  // Set up your auto-fill values here
  if (thefield == "citizen_subject") zTextFields[i].value="Isten hozott!";
}
var zTextFields = document.getElementsByTagName("textarea");
for (var i=0; i<zTextFields.length; i++) {
  thefield=zTextFields[i].name;
  if (!thefield) thefield=zTextFields[i].id;
  // Set up your auto-fill values here
  if (thefield == "citizen_message") zTextFields[i].value="Fontos levél az Oktatási Minisztériumból \n\nÜdvözöllek eRepen! \n\nJó hogy regisztráltál a játékba, de mégjobb lenne, ha nem hagynád sorsára a karaktered az első pár napban, ahogy azt sajnos sok újonc teszi... \n\nLEGYÉL TE A RITKA KIVÉTELEK EGYIKE, ÉS NE ADD FEL RÖGTÖN AZ ELEJÉN!!! \n\nHa segítségre van szükséged ezen kérdőív kitöltésével: http://tinyurl.hu/Vxws/ \nIgényelheted egy mentor segítségét, kivel remélem igénylésed után minél hamarabb találkozol. \n\nHa gondod adódna a kitöltéssel, bátran írj. \n\nA gyorsabb fejlődésed érdekében csatlakozz az Oktatási Minisztérium által üzemeltetett Harcosképző Akadémiához, amit itt találsz: \nhttp://www.erepublik.com/en/main/group-show/134 \n\nMiután beléptél a Harcosképzőbe, az alábbi küldetéseket kell majd teljesítened: \n-meg kell ölnöd legalább 10 ellenséget \n-el kell érned a honvéd (private) rangot \n\nHa ezt megteszed a Harcosképző teljes jogú tagjává válsz, ami újabb küldetésekkel és jutalmakkal jár! \n\nHa késtünk a levéllel és már bejelentkeztél másik egységhez, javaslom, hogy jelentkezz át mihozzánk, ennek módja hogy a \njelenlegi alakulatod profiljára lépsz akkor a fejlécben lévő Resign-re kattintva el tudod hagyni az alakulatodat. \n\nDe cseten is szolgálatodra lehetünk: http://tinyurl.hu/ugw3/ , de a Harcosképző üzenőfalán is felteheted a kérdésed (ha már beléptél)! \n\nTudnivaló az első napokról: http://sites.google.com/site/fauketto/elso-napok/elso-nap-tudnivalok \n\nJó játékot, és ne feledd: Pinkontom szeret :) \n\nJorek ";
}