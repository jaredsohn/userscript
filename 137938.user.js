// ==UserScript==
// @name          travi2
// @description   Segítség a levélküldésben
// @include       *s5.travian.hu/nachrichten.php*
// ==/UserScript==
// this function fills out form fields
//
var zTextFields = document.getElementsByTagName("input");
for (var i=0; i<zTextFields.length; i++) {
  thefield=zTextFields[i].name;
  if (!thefield) thefield=zTextFields[i].name;
  // Set up your auto-fill values here
  if (thefield == "be") zTextFields[i].value="Meghívó!";
}
var zTextFields = document.getElementsByTagName("textarea");
for (var i=0; i<zTextFields.length; i++) {
  thefield=zTextFields[i].id;
  if (!thefield) thefield=zTextFields[i].id;
  // Set up your auto-fill values here
 if (thefield == "message") zTextFields[i].value="sMagyarországnak szüksége van rád ! Szeretnélek meghívni egy netes játékba, az e-simbe ami, böngészőben játszható internetes közösségi játék és szinte semmi időt se vesz el más játékodtol. \n Akár lehetsz:\n-katona\n-politikus\n-üzletember\n-újságíró\n\nAz országok szövetségbe tömörülnek, és egymás ellen harcolnak.Sok ország a hazánkra tör és megkellene védenünk de ezt egyedül nem tudjuk véghezvinni. Az shazának szüksége van rád!\n\nRegisztrálni itt tuddsz------------> \n http://e-sim.org/lan.69302/ \n\n Játék elkezdését segítő írások-->\nhttp://e-sim.org/newspaper.html?id=5345\n\nHa még van kérdésed chatre ezen a linken jutsz el --> \n http://cbe003.chat.mibbit.com/?channel=%23esim-hu&server=rizon.mibbit.org ";
}