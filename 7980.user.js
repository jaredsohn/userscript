// ==UserScript==
// @name PUCV Navegador Academico Auto Login
// @description Ingresa automaticamente al navegador academico
// @include https://nave5.ucv.cl/Universis/index.htm*
// @author C.Salas	
// @version 1.0
// ==/UserScript==


window.addEventListener('load',
function() {

var formexists = document.getElementsByTagName('form');

if (formexists.length) {
	var form = document.forms.namedItem('login');
	form.elements.namedItem('rut_num').value = "rut"; //rut sin digito verificador
	form.elements.namedItem('rut_dv').value = "verificador";// digito verificador
	form.elements.namedItem('user_pas').value = "contraseña"; // contraseña
	form.submit();
} 

}, true);