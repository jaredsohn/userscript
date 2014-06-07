// ==UserScript==
// @name          SchülerVZ  Werbung weg
// @description   Versteckt die nervige Werbung auf Schülervz
// @version       1.0
// @author        Samuel Essig
// @namespace     afflatus-arts.com
// @homepage      http://afflatus-arts.com
// @copyright     2010, Afflatus-Arts.com
// @license       No distribution!
// @include       http://*.schuelervz.net*
// ==/UserScript==


var GridWrapper = document.getElementById('Grid-Wrapper').cloneNode(false);
var GridPage = document.getElementById('Grid-Page').cloneNode(true);

var body = document.createElement('body');
body.setAttribute('style','background-color:White; height: 1032px; ');
body.setAttribute('class','pvz  gecko gecko19');

var p = document.body.parentNode;
p.removeChild(document.body);

GridWrapper.appendChild(GridPage);
body.appendChild(GridWrapper);
p.appendChild(body);

window.setTimeout(function() {
  var body = document.body;
  body.setAttribute('style','background-color:White; height: 1032px; ');
  body.setAttribute('class','pvz  gecko gecko19');
  },1000);