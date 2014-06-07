// ==UserScript==
// @name          AutoAcepto GSMSpain
// @namespace     http://www.GSMSpain.com/
// @description   Rellena automáticamente el Campo Acepto de GSMSpain
// @include       http://www.gsmspain.com/foros/*
// ==/UserScript==

formulario = document.forms.namedItem("vbform");
item = formulario.elements.namedItem("aceptarnormas");
item.value="ACEPTO";