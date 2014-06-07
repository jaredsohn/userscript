// ==UserScript==
// @name          JujuMF
// @include       http://www.toolzzz.fr/multiflood.php*
// @author        Juju31
// @description   Amméliorations pour toolzzz
// @contributors  Juju31
// @version       1.0
// ==/UserScript==

var button = document.forms[0].elements['envoi'];
var td = button.parentElement;
button.remove();
var newButton = document.createElement('BUTTON');
newButton.setAttribute('type','submit');
newButton.setAttribute('name','envoi');
newButton.setAttribute('value','Calculer');
td.appendChild(newButton);
newButton.innerHTML = "Calculer Toto";