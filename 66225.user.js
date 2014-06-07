// ==UserScript==
// @name          cadastre-impression-echelle-libre
// @namespace     http://userscripts.org/users/106260
// @description   http://userscripts.org/scripts/show/66225
// @version       0.1.2
// @date          2010-04-12
// @copyright     2009, vince
// @license       GPL 2 or later
// @include       http://www.cadastre.gouv.fr/scpc/afficherCarte*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
//
// Changelog:
//
// 0.1.0 Première version
// 0.1.1 Modification @include
// 0.1.2 Resize auto au chargement dans un onglet
//
// -----------------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// -----------------------------------------------------------------------------


//window.addEventListener("click", script, true);
window.addEventListener("mousemove", script, true);
//resizeButton();


//resize auto après 2 seconde
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.innerHTML = "setTimeout( 'redimensionnerCarto()', 2000);\n";
document.body.appendChild(newScript);


function script() {
  var menu = document.getElementById("content");
  //menu.onclick = "if(window.myMenu) test();";
  var formImp = document.getElementById("tool_avances_impression_scale");
  var formFree = document.getElementById("tool_avances_impression_scalefree");
  if(formImp){
    if(formFree == null){
      var newLabel = document.createElement('label');
      newLabel.setAttribute('for', "tool_avances_impression_scalefree");
      var newContent = "Saisie libre de l'échelle : 1/";
      newLabel.innerHTML = newContent;

      var newInput = document.createElement('input');
      newInput.id = 'tool_avances_impression_scalefree';
      newInput.className = 'inputtext moyen';
      newInput.name = 'scalefree';
      newInput.setAttribute('onblur', "EventsDispatcher.setKeyDispatchEnabled(true);");
      newInput.setAttribute('onfocus', "EventsDispatcher.setKeyDispatchEnabled(false);");
      newInput.setAttribute('onchange', "if(InterfaceAPI.checkNumericRangeValue(this,100,40000)){carte.getWorker().setEchelleFreeKO(false);carte.getWorker().setEchelle(this.value);dgebId('tool_avances_impression_scale').disabled= true;}else{carte.getWorker().setEchelleFreeKO(this.value!='');dgebId('tool_avances_impression_scale').onchange();}");
      newInput.setAttribute('onkeydown', "if(event.keyCode==13 && InterfaceAPI.checkNumericRangeValue(this,100,40000)){carte.getWorker().setEchelleFreeKO(false);carte.getWorker().setEchelle(this.value);dgebId('tool_avances_impression_scale').disabled= true;}else{carte.getWorker().setEchelleFreeKO(this.value!='');dgebId('tool_avances_impression_scale').onchange();}");
      newInput.setAttribute('onkeyup', "");
      newInput.setAttribute('onkeypress', "");
      newInput.setAttribute('value', "");

      var father = getParent(formImp,'p');
      father.appendChild(newLabel);
      father.appendChild(newInput);
    }
  }

}

//add resize button
function resizeButton() {
 var liens = document.getElementById("liens_carte");
 var newLi = document.createElement('li');
 var newImg = document.createElement('img');
 newImg.setAttribute('alt', "Resize");
 newImg.setAttribute('src', "img/carto/picto_reduc.gif");
 var newBut = document.createElement('a');
 newBut.setAttribute('title', "Resize");
 newBut.setAttribute('onclick', "redimensionnerCarto();");
 newBut.appendChild(newImg);
 newLi.appendChild(newBut);
 liens.appendChild(newLi);
}

function getParent(element, parentTagName) {
//Thanks mumuri http://forum.topflood.com/flood-site/getparent-javascript-3842.html
//alert(element.tagName);
if ( ! element )
return null;
else if ( element.nodeType == 1 && element.tagName.toLowerCase() == parentTagName.toLowerCase() )
return element;
else
return getParent(element.parentNode, parentTagName);
}

