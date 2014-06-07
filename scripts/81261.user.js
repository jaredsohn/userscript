// ==UserScript==
// @name           IggArtefactos
// @namespace      IggArtefactos
// @description    IggArtefactos
// @include        http://s*.travian.*/build.php?*id=*

// @include        http://s*.travian.*/build.php?*gid=27*
// ==/UserScript==




// HEcho por Xinocudeiro

var buttin = "function calc_dist(x_1,y_1,x_2,y_2){;var modulo_x = (parseInt(x_1)-parseInt(x_2));var modulo_y = (parseInt(y_1)-parseInt(y_2));modulo_x = Math.sqrt(modulo_x*modulo_x);modulo_y = Math.sqrt(modulo_y*modulo_y);if(modulo_x>=401){modulo_x=modulo_x-401};if(modulo_y>=401){modulo_y=modulo_y-401};var cuadrado_x = (modulo_x*modulo_x);var cuadrado_y = (modulo_y*modulo_y);var pitagoras = Math.round(Math.sqrt(cuadrado_x+cuadrado_y));return pitagoras;};var nio_x = document.getElementById(\'neo_x\').value;var nio_y = document.getElementById(\'neo_y\').value;var tabla = document.getElementById(\'show_artefacts\').getElementsByTagName(\'tbody\')[0];var cant = tabla.rows.length;for (ix=0;ix<cant;ix++){var selected = tabla.rows[ix];if(selected.cells[0].className != \'empty\'){;var server = \'http://\' + location.host + \'/karte.php?d=\';var link = ((selected.cells[2].childNodes[0].href).replace(server,\'\')).substr(0,6);var link_x= ((link % 801) - 401);var link_y = (400 - Math.floor(link / 801));var neodist = \'<br><font color=blue size=1><b>\'+calc_dist(link_x,link_y,nio_x,nio_y)+\'Casillas</b></font>\';tabla.rows[ix].cells[4].getElementsByTagName(\'label\')[0].innerHTML = neodist;}};"

var corr = 0;var coordx = '';var coordy = '';
function get_selected(){;// ##### Sacar_aldea_seleccionada ##### 
if (document.getElementById('vlist')) {
  var aldeaxx = document.getElementById('vlist').innerHTML
	var buzcado = / *dot hl*([^)]*)*cox*([^)]*)*\)/
  var arrancamoz = buzcado.exec(aldeaxx);
var zacar = arrancamoz[0];
var dondecox = zacar.indexOf('cox', 0)
var lascoordsx = zacar.substr(dondecox,10)
var lascoordsx2 = ((lascoordsx.replace('cox">(','')).replace('<','')).replace('/','')*1
var dondeyox = zacar.indexOf('coy', 0)
var lascoordsy = zacar.substr(dondeyox,12)
var lascoordsy2 = ((lascoordsy.replace('coy">','')).replace('<','')).replace(')','')*1
var coordactual = '[' + lascoordsx2 + '|' + lascoordsy2 + ']';
coordx = lascoordsx2;coordy = lascoordsy2;
} else {coordx = 0;coordy = 0;};//#####  Fin_de_sacar_aldea_seleccionada ##### 
}




function calc_dist(x_1,y_1,x_2,y_2){
	var modulo_x = (parseInt(x_1)-parseInt(x_2))
	var modulo_y = (parseInt(y_1)-parseInt(y_2))
		modulo_x = Math.sqrt(modulo_x*modulo_x)
		modulo_y = Math.sqrt(modulo_y*modulo_y)
			if(modulo_x>=401){modulo_x=modulo_x-401}
			if(modulo_y>=401){modulo_y=modulo_y-401}
		var cuadrado_x = (modulo_x*modulo_x)
		var cuadrado_y = (modulo_y*modulo_y)
	var pitagoras = Math.round(Math.sqrt(cuadrado_x+cuadrado_y))
return pitagoras}

if (location.href.match('s=')){
var dat= document.getElementById('build').className
if (dat=='gid27'){;// es_tesoro //


get_selected()

	var tablx = '<br><br><table id="Nueva_Z">'
	tablx += '<tr><td>1234567890<br>'
	tablx += 'X: <input type="text" value="0" id="neo_x" size="4">'
	tablx += 'Y: <input type="text" value="0" id="neo_y" size="4>'
	tablx += '<input type="submit" value="Buscar Cercania" onclick="'+buttin+'"><br>'
	tablx += '<input type="submit" value="Buscar Cercania" onclick="'+buttin+'">'
	tablx += '</tr></th>'
	tablx += '</table>'

	var div_menu = document.getElementById('textmenu')
	div_menu.innerHTML += tablx

	var tabla = document.getElementById('show_artefacts').getElementsByTagName('tbody')[0]
	var cant = tabla.rows.length
	var sum = 0
	var hiead = document.getElementById('show_artefacts').getElementsByTagName('thead')[0]

		hiead.rows[0].getElementsByTagName('th')[0].colSpan = "5";
			hiead.rows[1].insertCell(4).innerHTML += 'Pos'
			//hiead.rows[1].insertCell(5).innerHTML += 'Dist'

	for (ix=0;ix<cant;ix++){
		var selected = tabla.rows[ix];
		if(selected.cells[0].className != 'empty'){;// Solo para artefactos
			var server = 'http://' + location.host + '/karte.php?d='
			var link = ((selected.cells[2].childNodes[0].href).replace(server,'')).substr(0,6)
			var link_x= ((link % 801) - 401)
			var link_y = (400 - Math.floor(link / 801))
			var link_total = ''+link_x+'|'+link_y+'';

			var segundafila = '<br><b><font color="red" size="1">'+calc_dist(link_x,link_y,coordx,coordy)+' Casillas</b></font>'



			tabla.rows[ix].insertCell(4).innerHTML += '<a href="karte.php?z='+link+'"><font color="black">'+link_total+'</font></a>'+segundafila+'<label id="jaxxhs"></label>'
		} else {;// Cierro_2if
			tabla.rows[ix].insertCell(1)};//_PARA_DIVISOR!
	};//Cierro_for
}};//Fin de match S y tesoro