// ==UserScript==
// @name           Anda Ress\u00fcbersicht beim Handel
// @description    Ressourcen\u00fcbersicht aller St\u00e4dte im Handelsfenster
// @include        http://game1.andaloria.de/Trade.php
// @include        http://game1.andaloria.de/Balance.php
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @grant          GM_getValue
// @grant          GM_setValue
// @updateURL      http://userscripts.org/scripts/source/165882.meta.js
// @downloadURL    https://userscripts.org/scripts/source/165882.user.js
// @version        1.1
// ==/UserScript==

GM_addStyle("#fcunits3 {  font-weight:bold; border:1px solid #300; position: fixed; top:20px; left:20px; background-image: url(http://img.andaloria.de/7706/layouts/1/main/main.jpg); z-Index:9999;}");
GM_addStyle("#btn      {  position:relative; top:-20px; left:600px; width:19px; height:0px; border:0px solid #300; padding-left: 2px; z-Index:9999;}");
GM_addStyle(".tbfood   {  background-color:#e89f7b; opacity:0.75;}");
GM_addStyle(".tbwood   {  background-color:#ae7e3d; opacity:0.75;}");
GM_addStyle(".tbstone  {  background-color:#dbd7e1; opacity:0.75;}");
GM_addStyle(".tbiron   {  background-color:#636266; color:#dbd7e1; opacity:0.75;}");
GM_addStyle(".tbgold   {  background-color:#e1ae41; opacity:0.75;}");


if (window.location.href.indexOf("http://game1.andaloria.de/Balance.php") >= 0){
ckh = document.getElementsByClassName('main')[2].innerHTML
if (ckh != ' <tbody><tr><td>Die Auswertung findet jeweils in der 19. Minute statt.</td></tr> </tbody>'){
hoj = ckh;

hoj = hoj.split('<img src="http://img.andaloria.de/7706/resources/mana.png"');

var tabDei5 = hoj[0].replace('<tr class="row0"> <td class="lbox"><img src="http://img.andaloria.de/7706/resources/food.png" alt="Nahrung" title="Nahrung" class="goodimg"> Nahrung</td>', '<tr class="tbfood"> <td class="lbox"><img src="http://img.andaloria.de/7706/resources/food.png" alt="Nahrung" title="Nahrung" class="goodimg"> Nahrung</td>');
var tabDei4 = tabDei5.replace('<tr class="row1"> <td class="lbox"><img src="http://img.andaloria.de/7706/resources/wood.png" alt="Holz" title="Holz" class="goodimg"> Holz</td>', '<tr class="tbwood"> <td class="lbox"><img src="http://img.andaloria.de/7706/resources/wood.png" alt="Holz" title="Holz" class="goodimg"> Holz</td>');
var tabDei3 = tabDei4.replace('<tr class="row0"> <td class="lbox"><img src="http://img.andaloria.de/7706/resources/stone.png" alt="Stein" title="Stein" class="goodimg"> Stein</td>', '<tr class="tbstone"> <td class="lbox"><img src="http://img.andaloria.de/7706/resources/stone.png" alt="Stein" title="Stein" class="goodimg"> Stein</td>');
var tabDei2 = tabDei3.replace('<tr class="row1"> <td class="lbox"><img src="http://img.andaloria.de/7706/resources/iron.png" alt="Eisen" title="Eisen" class="goodimg"> Eisen</td>', '<tr class="tbiron"> <td class="lbox"><img src="http://img.andaloria.de/7706/resources/iron.png" alt="Eisen" title="Eisen" class="goodimg"> Eisen</td>');
var tabDei1 = tabDei2.replace('<tr class="row0"> <td class="lbox"><img src="http://img.andaloria.de/7706/resources/gold.png" alt="Goldm\u00fcnzen" title="Goldm\u00fcnzen" class="goodimg"> Goldm\u00fcnzen</td>', '<tr class="tbgold"> <td class="lbox"><img src="http://img.andaloria.de/7706/resources/gold.png" alt="Goldm\u00fcnzen" title="Goldm\u00fcnzen" class="goodimg"> Goldm\u00fcnzen</td>');
var tabDei0 = tabDei1.replace(/<td class="lbox2">/g, '<td style="white-space: nowrap; text-align: right; padding-left:5px;">');
var tabDeix = tabDei0.replace(' Goldm\u00fcnzen', ' Gold');

hoz = tabDeix.split('<tr');
rams = hoz[0]+ "<tr" + hoz[1]+  "<tr" + hoz[2]+  "<tr" + hoz[5]+  "<tr" + hoz[6]+  "<tr" + hoz[7]+  "<tr" + hoz[8]+  "<tr" + hoz[9]+  "<tr" + hoz[10];


GM_setValue('andaBilanz', rams);



var UpDate = new Date();
var UpDateString;

UpDate.setDate(UpDate.getDate());

UpDateString = ('0' + UpDate.getDate()).slice(-2) + '.'
             + ('0' + (UpDate.getMonth()+1)).slice(-2) + '.'
             + UpDate.getFullYear() + '&nbsp;&nbsp;&nbsp;'
             + ('0' + UpDate.getHours()).slice(-2) + ':'
             + ('0' + UpDate.getMinutes()).slice(-2);

GM_setValue('andaBilanzDate', UpDateString);
}
}

biz   = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAASCAYAAAC5DOVpAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAPjSURBVHjanFRbbBtFFD2zO7u2d2MHO05sJw6u8yw4SpoIRJSKUAlRRAWkiJ9C+eEhfqiEFPEJBT4Q4g/ELxJVBeIHhOCvICSiEtRWSojyoMFtcBInjte1HT/X630yLiIKVRGIkeZqdmfuuXPuuXd43GXE743KL8w8egzEqWWUYhP/dwz1x+VPP3rv280fLzqfnz/zXadX9PxXX+6ObxLu7Bjv8rc/tbq0hPWlxceCMr2P/SatTVEUyERiSA6HgvRfwTjCSUPx6OPE0mr7xRxIoGdXF7whwKGCINAzM09Of/zu62sfnHvmfb/sFu8EO4jA8zx99eyzr7wz+9KbeimLPa4biYmRnnSFnNtIK1t9saj79BMnvuRtI2hkb7zRF+C/Wqjjyt3AyNMnp4+/PfvihyIlWFAyaPe4EPG14fh4/6nv539pU1Xt2l5WKet2IfhbpqgY1BMG6i36zsGFWqZNluTzr5395IGRgdjcryv45tplhPw+jPV2Q/bwCPq9sUAwPDo+1Bv0oMYNjyZotmxuLq9vXmbu9uGckbGjfYn7j3ROq7US6rUiqtU8csUC6g0VPhePRyb6cWww3LajKNQf6kD/kah7aiz+HMtj8DDNVqro86emXj45mThhOhbmry/CMnWoRhOlegODHV3YUXLYzhTw9eISvAEJDw3E4JPEAFNMX03u/GxalnkbTHKJrpkHo291e61Yo9HAYvIm5pbXYGtN9EheNGoakuk8NnbzSN3KIRb2Y3I4DhdxMDoYebiuGcnl5M6K7TgOL/CcR6jnZ81GueOnlS3sbZcgGBQBTsJ+voqrqxtYS+7gxrYCSRJgixZkyY1YoB2FYhkW4RJXl1MXVK2pUz8LkbqlXtr4IVlVDTLW0A0qiQJYEKY1B8ch0JtNaLqBCB/ErmJj5fcU4rIXW0oJ+WJ1iAq0k7GsEpEn4DgiaoadmBwbuNjXGxnJFfZxfTMNq15Hd0AGJ4iwGSh1U8SjARztDcEybOQrGorVJuaXU1O7yv4VqlusTCxHv8crZ05PDXMjg1FkayY+u9REOrkJSSBoEg51VYPHsZHeLiC7V4bJ/FjtgbGDY5h9AuWuHHSAzSTJ3Fxvj7jrUGoCIm4X7EgXKipTlk1Nt1CpNxltQDeNBcrxCmOkWpa9yXp21ye7yZ9grI+9IuhCcq+czFV7Cg0HFaaiwOi1ypuy3LmJAMe2YZgWDIu7UFKNL5iCNbZtEmLaHIFD/rpZu5vneJ7zVTUjJPJcjIGEOOKEKcf52FqglGfITsWynS2BCnO1pplqNA3nb0/OPzxN5NA8OMdMi6XN6DmtxW1zaPwhwAAtoreN9cwbsAAAAABJRU5ErkJggg==';

function hvs(){
document.getElementById('fcunits3').style.display = 'none';
document.body.removeChild(divpunit);
}
function hvr(){
sho = GM_getValue('andaBilanz', '');
lsave = GM_getValue('andaBilanzDate', '');
var punts = "";
punts += "<div width='100%' height='100%' style='cellspacing='0px' cellpadding='0px'> ";
punts += "<table>";
punts += sho;
punts += "</table>";
punts += "</div><div style='padding:10px 0px 5px 10px; font-size:12px'> Letzte Speicherung &nbsp;&nbsp;&nbsp;"+lsave+"</div>";
divpunit = document.createElement('div');
divpunit.id = 'fcunits3';
divpunit.style.display = "block";
divpunit.innerHTML = punts;
document.body.appendChild(divpunit);
}


if (window.location.href.indexOf("http://game1.andaloria.de/Trade.php") >= 0){

if (!document.getElementsByClassName('main')[3]){
rababer =document.getElementsByClassName('main')[2];
}else{
rababer =document.getElementsByClassName('main')[3];
}
raubst = rababer.getElementsByTagName('td')[0].innerHTML;
rababer.getElementsByTagName('td')[0].innerHTML = raubst+ "<div id='btn'><img src='"+biz+"'></div>";
document.getElementById('btn').addEventListener('mouseover', function(event) {hvr()},false);
document.getElementById('btn').addEventListener('mouseout', function(event) {hvs()},false);
}


 
