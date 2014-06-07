// ==UserScript==
// @name          Badoo con todos los criterios
// @description   En la busqueda se pueden usar todos los criterios
// @include        http://badoo.com/search/
// ==/UserScript==

/*
*
*Badoo con todos los criterios
*Version 0.1
*(C) 2008 Chucky
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html
*
*/

function quitarCriterios() {
	var tag=document.getElementsByTagName('H3')[0];
	var texto=tag.innerHTML;
	tag.innerHTML=texto+' <a href="#" style="color: red; font-weight: bolder; text-decoration: none;" onclick="Search.opened_limit=50; this.style.display=\'none\';return false;">+</a>';
	//Search.opened_limit=50;
}
 
 window.addEventListener('load', quitarCriterios, false);
