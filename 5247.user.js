// ==UserScript==
// @name Ogame: Opciones menu izquierdo
// @author Editado por Lord Mokuba
// @description cosas para el menu de ogame
// @include http://ogame*.de/game/leftmenu.php*
// ==/UserScript==

(function(){

var reg = /session=([a-z0-9]+)/;
var resultado = reg.exec(document.body.innerHTML);
var sesion=resultado[0];

	// ** Centrado.
var center = document.createElement('center');

	// ** Formulario.
var formulario = document.createElement('form');
formulario.setAttribute("action","suche.php?"+sesion);
formulario.setAttribute("target","Hauptframe");
formulario.setAttribute("method","post");

	// ** Input Text de la busqueda.
var texto = document.createElement('input');
texto.setAttribute("type","text");
texto.setAttribute("name","searchtext");
texto.setAttribute("style","width:62px;");


	// ** boton de "Buscar"	
var boton = document.createElement('input');
boton.setAttribute("type","submit");
boton.setAttribute("value","Buscar");

	// ** Selector.
var oSelect = document.createElement('select');
oSelect.setAttribute("name","type");
oSelect.setAttribute("style", "width:115px;" );

var oOption = document.createElement("option");
oOption.text = "Nombre del jugador";
oOption.setAttribute("value", "playername" );
oSelect.appendChild(oOption);
//oSelect.add(oOption);

var oOption = document.createElement("option");
oOption.text = "Nombre del planeta";
oOption.setAttribute("value", "planetname" );
oSelect.appendChild(oOption);
//oSelect.add(oOption);

var oOption = document.createElement("option");
oOption.text = "Etiqueta de la alianza";
oOption.setAttribute("value", "allytag" );
oSelect.appendChild(oOption);
//oSelect.add(oOption);

	function BuscarTabla() {
	var trs = document.getElementsByTagName('tr');
	var tabla = document.createElement('table');
	
		for (var i = 0; i < trs.length; i++) {
		
			if(trs[i].innerHTML.indexOf("Hangar") != -1){
				tabla = trs[i].parentNode;
//				alert(tabla);
				break;
			}
		}
		
		return tabla;
	}

	// Crear la tabla.
//var tabla = document.createElement('table');
var tabla = BuscarTabla();
//tabla.setAttribute("width", "110");
//tabla.setAttribute("cellspacing", "0");
//tabla.setAttribute("cellpadding", "0");

var tr = document.createElement('tr');
var td = document.createElement('td');
td.setAttribute("nowrap", "nowrap");

td.appendChild(texto);
td.appendChild(boton);
tr.appendChild(td);
tabla.appendChild(tr);


var tr = document.createElement('tr');
var td = document.createElement('td');
td.appendChild(oSelect);
tr.appendChild(td);
tabla.appendChild(tr);
//center.appendChild(tabla);

formulario.appendChild(texto);
formulario.appendChild(boton);
formulario.appendChild(oSelect);
//center.appendChild(formulario);
tabla.appendChild(formulario);
//document.body.appendChild(center);

//document.body.innerHTML += '<a href="http://ogame443.de/game/allianzen.php?'+sesion+'&a=4&sort1=3&sort2=0" target="Hauptframe">Miembros</a>';

})();