// ==UserScript==
// @name           Mangekyou Filler DELUXE
// @namespace      Mangekyou Filler DELUXE
// @description    Auto rellena los submit de las Instant US
// @include        http://www.*
// ==/UserScript==




var Zip = "43812"
var Nombre = "George"
var Apellido = "Lasseter"
var Direccion = "945 Jessie Street"
var Ciudad = "Coshocton"
var Estado = "OH"
var Tel1 = "770"
var Tel2 = "205"
var Tel3 = "6689"






var Consonantes = new Array('l', 'g', 'r', 't', 's', 'c', 'v', 'n', 'm', 'p', 'f', 'd');
var Vocales = new Array('a', 'e', 'i', 'o', 'u');
var Silabas = new Array('tr', 'tl', 'br', 'bl', 'cr', 'cl', 'pr', 'pl');
var Letras = new Array('s', 'r', 'n', 'm');
var Numeros = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '0');

var aConsonante = Consonantes[Math.floor(Math.random()*Consonantes.length)];
var aConsonante1 = Consonantes[Math.floor(Math.random()*Consonantes.length)];
var aVocal = Vocales[Math.floor(Math.random()*Vocales.length)];
var aVocal1 = Vocales[Math.floor(Math.random()*Vocales.length)];
var aVocal2 = Vocales[Math.floor(Math.random()*Vocales.length)];
var aSilaba = Silabas[Math.floor(Math.random()*Silabas.length)];
var aLetra = Letras[Math.floor(Math.random()*Letras.length)];
var aNumero = Numeros[Math.floor(Math.random()*Numeros.length)];
var aNumero1 = Numeros[Math.floor(Math.random()*Numeros.length)];
var aNumero2 = Numeros[Math.floor(Math.random()*Numeros.length)];

var Email = aConsonante+aVocal+aConsonante1+aVocal1+aSilaba+aVocal2+aNumero+aNumero1+aNumero2;




var Meses = new Array('01','02','03','04','05','06','07','08','09','10','11','12')
var Dias = new Array('01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28')

var Mes = Meses[Math.floor(Math.random()*Meses.length)];
var Dia = Dias[Math.floor(Math.random()*Dias.length)];
var Año = "1985"



function FormularioEmail(){
document.getElementById("email").value = Email+"@hotmail.com"
}

function FormularioInicial(){
document.getElementById("zip").value = Zip
document.getElementsByName("pse_53_fname").item(0).value = Nombre
document.getElementsByName("pse_53_lname").item(0).value = Apellido
document.getElementsByName("pse_53_address").item(0).value = Direccion
document.getElementById("city").value = Ciudad
document.getElementById("state").value = Estado
document.getElementById("dob_month_short").value = Mes
document.getElementById("dob_day").value = Dia
document.getElementById("dob_year").value = Año
document.getElementsByName("pse_53_phone_area").item(0).value = Tel1
document.getElementsByName("pse_53_phone_prefix").item(0).value = Tel2
document.getElementsByName("pse_53_phone_suffix").item(0).value = Tel3
document.getElementsByName("pse_53_gender").item(0).click()
}













var inOffer = document.getElementById("email")
var inOffer1 = document.getElementById("zip")





/*if(inOffer){
FormularioEmail()
}
if(inOffer1){
FormularioInicial()
}*/