// ==UserScript==
// @name       MarcaSmart
// @namespace  http://google.es
// @version    1.0
// @description  Marca.com sin publicidad con estructura sencilla.
// @match      http://www.marca.com/futbol/equipos/*
// @copyright  2013, Sergio
// ==/UserScript==

var element = document.getElementById('publi_sup');
element.parentNode.removeChild(element);

var element = document.getElementById('extras');
element.parentNode.removeChild(element);

var element = document.getElementById('destacamos');
element.parentNode.removeChild(element);

var element = document.getElementById('barra-menu');
element.parentNode.removeChild(element);

var element = document.getElementById('bloque_pestanas_lomas');
element.parentNode.removeChild(element);

var element = document.getElementById('contenedor-foot');
element.parentNode.removeChild(element);

var element = document.getElementById('barra');
element.parentNode.removeChild(element);

var element = document.getElementById('cont_inferior');
element.parentNode.removeChild(element);

 
document.getElementById('migas').style.background = 'url(http://estaticos02.marca.com/deporte/img/v3.0/sub33.gif) repeat-x';  
document.getElementById('contenedor-portadilla').style.background = '#fff';  
document.getElementById('estructura-2col').style.width = '970px';
document.getElementById('estructura-2col').style.background = '0';
document.getElementById('colum1').style.width = '490px';
document.getElementById('colum1').style.textAlign = 'justify';
document.getElementById('colum2').style.width = '450px';
document.getElementById('colum2').style.float = 'right';
document.getElementsByClassName('barra-arriba')[0].style.display = 'none';
document.getElementsByClassName('resultados')[0].style.width = '430px';
document.getElementsByClassName('resultados')[1].style.width = '430px';
document.getElementsByClassName('clasificacion')[0].style.width = '430px';
document.getElementsByClassName('publi_630_portadilla').style.display = 'none';
