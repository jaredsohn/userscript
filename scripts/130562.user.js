// ==UserScript==
// @name          SZOC. OKT. MIN. MASS MAILER 
// @description   Segítség a levélküldésben
// @include       http://e-sim.org/composeMessage.html*
// ==/UserScript==
// this function fills out form fields
//
var zTextFields = document.getElementsByTagName("input");
for (var i=0; i<zTextFields.length; i++) {
  thefield=zTextFields[i].id;
  if (!thefield) thefield=zTextFields[i].id;
  // Set up your auto-fill values here
  if (thefield == "titleInput") zTextFields[i].value="Isten hozott!";
}
var zTextFields = document.getElementsByTagName("textarea");
for (var i=0; i<zTextFields.length; i++) {
  thefield=zTextFields[i].id;
  if (!thefield) thefield=zTextFields[i].id;
  // Set up your auto-fill values here
  if (thefield == "messageForm") zTextFields[i].value="[b]Fontos levél a Szociális és Oktatási Minisztériumból[/b]\n\n[b]Üdvözöllek Esimen![/b]\n\nEzt a levelet azért kapod mert, látjuk hogy azon kevesek között vagy aki nem csak beregisztrál a játékba hanem be is lép.\n Jó hogy regisztráltál a játékba, de még jobb lenne, ha nem hagynád sorsára a karaktered az első pár napban, ahogy azt sajnos sok újonc teszi...\n\n[b]LEGYÉL TE A RITKA KIVÉTELEK EGYIKE, ÉS NE ADD FEL RÖGTÖN AZ ELEJÉN!![/b]!\n\n[b]Szociális és Oktatási Minisztérium által szervezett programokról, amelyeken való részvétel segíti a fejlődésedet,  [url=http://primera.e-sim.org/article.html?id=57613]ITT[/url] olvashatsz.[/b] Jelentkezz osztásra és kérd a mentor segítségét! Ha kitöltéssel problémád lenne nyugodtan írj!\n\nTovábbá szeretnénk ösztönözni a chat használatára, mivel ott mindig friss információkat találsz, és sok segítőkész játékost.\n\n[url=http://mibbit.com/?channel=%23esim-hu&server=rizon.mibbit.org]Közös_chat[/url]\n\n[url=http://mibbit.com/?channel=%23szoc-okt.min&server=rizon.mibbit.org]Minisztériumi chat[/url]  \n\n[b]Jó játékot kíván a Minisztériumi csapat![/b]";
}