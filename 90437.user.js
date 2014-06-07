// ==UserScript==
// @name           AllSiemens AntiCaptcha
// @namespace      http://def.w2c.ru
// @description    Автоматическое решение математической задачки на странице авторизации
// @author         Def
// @include        http://*forum.allsiemens.com/login.php*
// ==/UserScript==
//
numarr=['нoль', 'oдин', 'двa', 'тpи', 'чeтыpe', 'пять', 'шecть', 'ceмь', 'вoсeмь', 'дeвять', 'десять', 'одиннадцать', 'двенaдцать', 'тринaдцaть', 'чeтырнадцать', 'пятнадцaть', 'шecтнадцать', 'ceмнадцать', 'вocемнадцать', 'дeвятнадцать', 'двaдцать'];
txt=document.getElementsByClassName('gen')[0].innerHTML;
txtsplit = txt.split(' ');
first = texttonum (txtsplit[4]);
second = texttonum (txtsplit[6].substring(0,txtsplit[6].length-1));
if (txtsplit[2]=='cумму') {result=first+second;} else {result=first-second;}
document.forms[1].elements[0].value=result;
//
function texttonum (text) {
i=0;
while (text!=numarr[i]) {i++;}
return i;
}
