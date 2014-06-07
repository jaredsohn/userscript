// ==UserScript==
// @name Hackear votaciones ComalCool
// @namespace ComalCool
// @description Envía el formulario de votación
// @include http://indomesticables.tourbus.redbull.es/banda/comalcool
// ==/UserScript==

$(document).ready(function(){
 var form = $('#form1');
 form[0].onsubmit = null;
 form.submit();
});