// ==UserScript==
// @name          Ordenes de Batalla [Argentina]
// @version       1.2
// @author        Gko / El Bort
// @namespace     Ordenes_eArgentina
// @description   Plugin para visualizar las Ordenes de Batalla de Argentina.
// @include       http://*.erepublik.com/*
// ==/UserScript==

var ni = document.getElementById('mapContainer');
var numi = document.getElementById('mapContainer');
var num = (document.getElementById('mapContainer').value -1)+ 2;
numi.value = num;
var newdiv = document.createElement('div');
var divIdName = 'my'+num+'Div';
newdiv.setAttribute('id','ordenesbatalla');
newdiv.innerHTML = '<center><iframe src="http://www.erepublikar.net/wp-content/themes/Centum/orders/index_lite.php" width="720" height="160" frameborder="0" scrolling="no"></iframe></center>';
ni.appendChild(newdiv);
