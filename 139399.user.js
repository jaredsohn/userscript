// ==UserScript==
// @name       Sunat.gob.pe (Emisión de Recibos) por Diego Ferreyra (@42pe)
// @namespace  http://404.pe/
// @version    0.1
// @description  Corrige el problema de emisión de recibos por honorarios, presente al 26 de Julio de 2012.
// @match      https://*.sunat.gob.pe/*
// @copyright  2012+, Diego Ferreyra
// ==/UserScript==

console.log("Iniciando el script de Corrección de Emisión de Recibos");
if (document.getElementsByName('nombrecliente')[0] != null) {
    document.getElementsByName('nombrecliente')[0].setAttribute('id', 'nombrecliente');
    console.log("Emisión de Recibos corregida!");
}
