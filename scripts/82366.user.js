// ==UserScript==
// @name Redirecionador De Premios Estandar
// @namespace Premios!
// @description Premio de lockerz
// @include *ptzplace.lockerz.com*
// @author Juanixo
// @license Selecciona premios :)™
// ==/UserScript==

// Aqui es donde puedes personalizar tu script y cambiar los premios

var product1=/1000/i;       //Cantidad de Paypal va aquí. Solo pon el numero, por ejemplo para $300 seria solamente 300 - Sin el signo $
var product2=/New iPad - 32 GB WiFi + 3G/i;       //Cantidad de Paypal va aquí. Solo pon el numero, por ejemplo para $300 seria solamente 300 - Sin el signo $
var product3=/iMac 21.5 inch Computer/i;       //Cantidad de Paypal va aquí. Solo pon el numero, por ejemplo para $300 seria solamente 300 - Sin el signo $
var product4=/Flip Video Ultra HD/i;  

// Fin de la edicion. NO toques nada del codigo de abajo, si lo haces tu script NO FUNCIONARA!

var bool=false;
check();
function check(){
var spanarray=document.getElementsByTagName('a');
var x=0;
for (x in spanarray){
if (bool==false){
found=0;
var check=spanarray[x].innerHTML;
var patt2=/PayPal/i;
var found1=check.search(patt2);
var found=check.search(product1);
if (found>0 && found1>0){
window.location=spanarray[x].href;
bool=true;
} } }for (x in spanarray){
if (bool==false){
found=0;
var check=spanarray[x].innerHTML;
var patt2=/PayPal/i;
var found1=check.search(patt2);
var found=check.search(product2);
if (found>0 && found1>0){
window.location=spanarray[x].href;
bool=true;
} } }for (x in spanarray){
if (bool==false){
found=0;
var check=spanarray[x].innerHTML;
var patt2=/PayPal/i;
var found1=check.search(patt2);
var found=check.search(product3);
if (found>0 && found1>0){
window.location=spanarray[x].href;
bool=true;
} } }for (x in spanarray){
if (bool==false){
found=0;
var check=spanarray[x].innerHTML;
var patt2=/productInfo/i;
var found1=check.search(patt2);
var found=check.search(product4);
if (found>0 && found1>0){
window.location=spanarray[x].href;
bool=true;
} } }}