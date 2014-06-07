// ==UserScript==
// @name       Prueba BBLOG
// @namespace  http://battlelog.battlefield.com/bf4/es/emblem/edit/personal/
// @version    0.1
// @description  test
// @match      http://battlelog.battlefield.com/bf4/es/emblem/edit/personal/
// @copyright  2012+, You
// ==/UserScript==





/* buscar = "<div class="action action-lock" data-bind-layer-action="lock">L</div>\n</div>";

if((buscar.test(document.getElementById("emblem-edit-layers").innerHTML)) == true)
{
	alert("FUNCIONA");
} */

//document.getElementById("bblog-emblem-options").getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName('div')[1];







var bloque = document.createElement("div");

bloque.appendChild(document.createElement("layer"));

bloque.childNodes[0].appendChild(document.createTextNode("SizeX"));

bloque.appendChild(document.createElement("input"));

bloque.childNodes[1].setAttribute("type", "text");
bloque.childNodes[1].setAttribute("data-key", "width");
bloque.childNodes[1].setAttribute("size", "6");

alert(document.getElementById("bblog-emblem-options").childNodes.item(1).value);

var antes = document.getElementById("bblog-emblem-options").childNodes.item(1).getElementsByTagName("div")[2];

document.getElementById("bblog-emblem-options").childNodes[1].insertBefore(bloque, antes);






/* <div>
	<layer>ScaleX</layer>
	<input type="text" data-key="scaleX" size="6">
</div> */





document.getElementById("emblem-edit-layers").innerHTML = "<div><font color=\"red\"> 1 </font></div>" + document.getElementById("emblem-edit-layers").innerHTML;