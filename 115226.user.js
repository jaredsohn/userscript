// ==UserScript==
// @name          Cartola FC: Remove o alerta de salvar time
// @namespace     hada.cb@gmail.com
// @description   Remove o alerta de salvar time do Cartola FC
// @include       http://*cartolafc.globo.com/*
// ==/UserScript==

window.setInterval(function() {window.alertaSalvar = false;}, 1);