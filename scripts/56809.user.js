// ==UserScript==
// @name          IGN-Resize
// @namespace     http://userscripts.org/users/106260
// @description   http://userscripts.org/scripts/show/56809
// @version       0.2.3
// @date          2010-03-01
// @copyright     2009, La_Poigne
// @license       GPL 2 or later
// @include       http://geodesie.ign.fr/*
// @include       http://ancien-geodesie.ign.fr/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
//
// Changelog:
//
// 0.2.3  Changement d'adresse (ancien-geodesie)
// 0.2.2  Centre l'affichage sur l'applet java
// 0.2.1  Redimentionnement automatique
// 0.2.0  Détection automatique de la taille de fenêtre
// 0.1.0  Première version
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


resize();
//Redimentionnement automatique lors du changement de taille de la fenêtre
window.addEventListener("resize", resize, true);

function resize() {

  if (document.body)
   {
   var larg = (document.body.clientWidth);
   var haut = (document.body.clientHeight);
   }
  else
   {
   var larg = (window.innerWidth);
   var haut = (window.innerHeight);
   }

  var appletjava = document.getElementsByTagName("applet")[0];
  appletjava.width = larg - 20;
  appletjava.height = haut - 20;
  appletjava.setAttribute('id', 'Carte');
  //Aller à une ancre sans recharger la page
  self.location.hash = "#Carte";
}
