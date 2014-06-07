// ==UserScript==
// @name           Ugascript_beta
// @namespace      darknick91@yahoo.es
// @description    Script de mejora del juego ugamela
// @include        http://ugamela.com/games/*
// @include        http://matsusoft.com.ar/games/*
// @author		   darknick
// ==/UserScript==

/****************************************************************
 * El escript contiene partes del codigo fuente de Ugamela
 * Ugamela is under Proprietary license
 * Copyright 2008 by German Perugorria perberos@gmail.com All Rights Reserved
 * 
 * Las ideas y el codigo del script pertenecen a la comunidad.
 * Gracias Nemestic por tu idea para simular defensas 
 * Gracias Nemestic por tu idea para mostrar tiempos de construccion en tiempo real
*****************************************************************/


// GENERALES - TIEMPO
function toNum(str) {
	str = nop(str);
	return parseInt(str.replace(/[^0-9\\]/g,''));
}

function formatNmb(nNmb){
	if(!isNaN(nNmb)) {nNmb = parseInt(nNmb); } else { nNmb = 0; }
	nNmb = String(nNmb);
	nNmb = nop(nNmb);
    var sRes = "";
    for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++)
     sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;
    return sRes;
} 
   
function anti_time(str)
{
	var d = 0;
	var h = 0;
	var m = 0;
	var s = 0;
	var dl = str.indexOf('d');
	var hl = str.indexOf('h');
	var ml = str.indexOf('m');
	var sl = str.indexOf('s');
	if (dl != -1) {
		d = toNum(str.substring(0,dl));
	} else if (hl != -1) {
		h = toNum(str.substring(0,hl));
	} else if (ml != -1) {
		m = toNum(str.substring(0,ml));
	} else if (sl != -1) {
		s = toNum(str);
	}
	if (hl != -1) {
		h = toNum(str.substring(dl,hl));
	} else if (ml != -1) {
		m = toNum(str.substring(dl,ml));
	} else if (sl != -1) {
		s = toNum(str);
	}
	if (ml != -1) {
		m = toNum(str.substring(hl,ml));
	} else if (sl != -1) {
		s = toNum(str);
	}
	if (sl != -1) {
		s = toNum(str.substring(ml,sl));
	}
	s = s + m*60 + h*3600 + d*86400;
	return s;
	
	
}

function pretty_time(seconds)
// Funcion obtenida del codigo fuente de ugamela 
{
	day = Math.floor(seconds / (24 * 3600));
	hs = Math.floor(seconds / 3600 % 24);
	min = Math.floor(seconds / 60 % 60);
	seg = Math.floor(seconds / 1 % 60);

	var time = new Array(3);//la entrada del time
	time[0] = day;
	time[1] = hs;
	time[2] = min;
	time[3] = seg;
	return time;
}

function topretty_time(seconds)
{
	var time = pretty_time(seconds);
	var timestr = '';
	if (time[0] != 0) { timestr += time[0] + 'd ';}
	if (time[1] != 0) { timestr += time[1] + 'h ';}
	if (time[2] != 0) { timestr += time[2] + 'm ';}	
	if (time[3] != 0) { timestr += time[3] + 's';}	
	return timestr;
}	
	
function col_time(seconds)
{
	var time = pretty_time(seconds);
	var timestr = '';
	if (time[0] != 0) { timestr += time[0] + 'd ';}
	if (time[1] != 0) { timestr += time[1] + 'h ';}
	if (time[2] != 0) { timestr += time[2] + 'm ';}	

	// Ponemos color segun las horas
	time[0] = parseInt(time[0]);
	if (time[0] <= 0) { color = 'red';
	} else { color = '';} 
	if (time[0] >= 1) { color = 'yellow';}
	if (time[0] >= 2) { color = 'green';}
	
	timestr = '<font class='+color+'>'+timestr+'</font>';
	return timestr;
}

function nop(str)
{
	str = String(str);
	while (str.indexOf('.') != -1) {
		str = str.replace(".","");
	}
	return str;
}

function full_time(capa, recu, produ)
{
	//esto es cuanto le quedan a los almaces
	var left = capa - recu;
	var time = left / produ;
	//convertimos la produccion por horas en produccion por segundo
	time = time * 3600
	time = col_time(time);
	return time;
}
// COOKIES - OPCIONES

function newCheckbox(name,value,id)
{

	var checkbox = document.createElement('input');
	checkbox.setAttribute('type','checkbox')
	checkbox.setAttribute('name',name);
	checkbox.setAttribute('id',id);
	if (value != 0) {checkbox.setAttribute('checked', true);}
	return checkbox;
}


function newCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function delCookie(name) {
	newCookie(name,"",-1);
}

function sendConfig() {
	//Tomamos los valores del formulario y creamos el array que mandaremos en el cookie
	var galletita = new Array; 
	var checkbox = '';
	for (var i=0;i<opcionesid.length;i++) {
		var checkbox = document.getElementById(opcionesid[i]);
		if (checkbox.checked) 
		{
			galletita[i] =1;
		} else
		{
			galletita[i] =0;
		}
	}
	galletita = galletita.join("");
	newCookie('config',galletita,2)
	alert('Configuracion guardada');
	
}

function clearConfig() {
	delCookie('config')
	alert('Eliminada configuracion')
}
// VISOR VIRTUAL
function esconderCol(col) {
	var fila;
	var filas = tabla.getElementsByTagName('tr');
	col++;
	if (esconder[col]) {
		eval("mifila_texto"+(col-1)+".setAttribute('src','?mode=game-res&gif=collapse');");
		for (var i=0;i<filas.length;i++) {
			fila = filas[i];
			if (fila.innerHTML.indexOf('td') == -1 || fila.innerHTML.indexOf('?mode=game-virtual') != -1) {
				if (fila.innerHTML.indexOf('colspan') == -1) {
					//fila.getElementsByTagName('th')[col].innerHTML = backu.getElementsByTagName('th')[col].innerHTML;
					fila.getElementsByTagName('th')[col].innerHTML = escondidos[col][i];
				} else {
					//fila.getElementsByTagName('th')[col-1].innerHTML = backu.getElementsByTagName('th')[col-1].innerHTML;
					fila.getElementsByTagName('th')[col-1].innerHTML = escondidos[col][i];
				}
			}
		}
	} else {
		eval("mifila_texto"+(col-1)+".setAttribute('src','?mode=game-res&gif=expand');");
		for (var i=2;i<filas.length;i++) {
			fila = filas[i];
			if (fila.innerHTML.indexOf('td') == -1 || fila.innerHTML.indexOf('?mode=game-virtual') != -1) {
				if (fila.innerHTML.indexOf('colspan') == -1) {
					escondidos[col][i] = fila.getElementsByTagName('th')[col].innerHTML;
					//fila.getElementsByTagName('th')[col].setAttribute('style','visibility: hidden; opacity: 0; display: none;');
					fila.getElementsByTagName('th')[col].innerHTML = '';
				} else {
					escondidos[col][i] = fila.getElementsByTagName('th')[col-1].innerHTML;
					//fila.getElementsByTagName('th')[col-1].setAttribute('style','visibility: hidden; opacity: 0; display: none;');
					fila.getElementsByTagName('th')[col-1].innerHTML = '';
				}
			}	
		}
	}
	esconder[col] = ! esconder[col];
	var tr = content.getElementsByTagName('tr');
	// Calculamos los totales
	for (var i = 7; i < tr.length; i++) {
		var parcial = 0;
		var temp = '';
		var th = tr[i].getElementsByTagName('th');
		if (i< 11) { k=1;} else {k = 2;}
		k = 1;
		if (tr[i].innerHTML.indexOf('colspan') == -1) { k=2;} 
		for (var j = k; j < th.length; j++) {
			// Tomamos los datos
			if (th[j].innerHTML != '' && th[j].innerHTML.indexOf('-') == -1) {
				if (th[j].innerHTML.indexOf("<span class") != -1) {
					temp = toNum(nop(th[j].getElementsByTagName('span')[0].innerHTML));
				} else if (th[j].innerHTML.indexOf("href=") != -1) {
					temp = toNum(nop(th[j].getElementsByTagName('a')[0].innerHTML));
				} else if (j != th.length - 1 ) {
					temp = toNum(nop(th[j].innerHTML));
				}
				parcial += temp;
				temp = 0;
			}

			// Totales
			if (j == th.length -1 && th[j].innerHTML != '' && th[j].innerHTML != '-') {
				if (th[j].innerHTML.indexOf('b') != -1) {
					th[j].getElementsByTagName('b')[0].innerHTML = formatNmb(parcial)
				} else {
					th[j].innerHTML = formatNmb(parcial);
				}
			}
		}		
		//if(!confirm('seguir?')) { break;}
	}
	return null;
}
// PUERTO ESTELAR 
function fleetCap(id, num)
{
	switch(id)
	{
	case 202:
		return 5000 * num;
		break;
	case 203:
		return 25000 * num;
		break;
	case 204:
		return 50 * num;
		break;
	case 205:
		return 100 * num;
		break;
	case 206:
		return 400 * num;
		break;
	case 207:
		return 1500 * num;
		break;
	case 210:
		return 2 * num;
		break;
	case 209:
		return 20000 * num;
		break;
	case 211:
		return 500 * num;
		break;
	case 213:
		return 2000 * num;
		break;
	case 215:
		return 750 * num;
		break;
	case 216:
		return 5 * num;
		break;
	case 219:
		return 1000 * num;
		break;
	case 220:
		return 100 * num;
		break;
	case 214:
		return 1000000 * num;
		break;
	default:
		return 0;
	}
}

function fleetParcial() {
	//Hacemos el calculo
	var parcial = 0;
	var j = 0;
	for (var i=8; i < th.length-3;i+=5) {
		if (th[i].innerHTML.indexOf('input') != -1) {
			j = th[i].getElementsByTagName('input')[0].attributes;
			j = j.getNamedItem('name').value;
			j = toNum(j);
			parcial += fleetCap(j,th[i].getElementsByTagName('input')[0].value);
		}
	}
	parcial = formatNmb(parcial.toString());
	document.getElementById('cantidad').innerHTML = parcial;	
}
// CONSTRUCCIONES
function produccion(id, lvl) {
	temp = 0;
	tmax = 27;
	var energyteclvl = 10;
	switch(id)
	{
	case 1:
		return parseInt(150 * lvl *  Math.pow(1.1, lvl));
		break;
	case 2:
		return parseInt(100 * lvl *  Math.pow(1.1, lvl));
		break;
	case 3:
		return parseInt(50 * lvl *  Math.pow(1.1, lvl) * (-0.002 * tmax + 1.28));
		break;
	case 4:
		return parseInt(100 * lvl *  Math.pow(1.08, lvl));
		break;
	case 12:
		return parseInt(30 * lvl *  Math.pow(1.05 + energyteclvl * 0.01, lvl));
		break;
	case 22: case 23: case 24:
		return parseInt(150000 *  Math.pow(1.5, lvl));
		break;
	default:
		return null;
	}
}

function costeEdificio(id, lvl)
{
	var coste = new Array();
	lvl--;
	switch(id)
	{
	case 1:
		coste[0] = 60 * Math.pow(1.5,lvl);
		coste[1] = 15 * Math.pow(1.5,lvl);
		coste[2] = 0;
		break;
	case 2:
		coste[0] = 46* Math.pow(1.6,lvl);
		coste[1] = 24* Math.pow(1.6,lvl);
		coste[2] = 0;
		break;
	case 3:
		coste[0] = 225* Math.pow(1.5,lvl);
		coste[1] = 75* Math.pow(1.5,lvl);
		coste[2] = 0;
		break;
	case 4:
		coste[0] = 75* Math.pow(1.5,lvl);
		coste[1] = 30* Math.pow(1.5,lvl);
		coste[2] = 0;
		break;
	case 12:
		coste[0] = 900* Math.pow(1.8,lvl);
		coste[1] = 360* Math.pow(1.8,lvl);
		coste[2] = 180* Math.pow(1.8,lvl);
		break;
	case 14:
		coste[0] = 400* Math.pow(2,lvl);
		coste[1] = 120* Math.pow(2,lvl);
		coste[2] = 200* Math.pow(2,lvl);
		break;
	case 15:
		coste[0] = 1000000* Math.pow(2,lvl);
		coste[1] = 500000* Math.pow(2,lvl);
		coste[2] = 100000* Math.pow(2,lvl);
		break;
	case 21:
		coste[0] = 400* Math.pow(2,lvl);
		coste[1] = 200* Math.pow(2,lvl);
		coste[2] = 100* Math.pow(2,lvl);
		break;
	case 22:
		coste[0] = 2000* Math.pow(2,lvl);
		coste[1] = 0;
		coste[2] = 0;
		break;
	case 23:
		coste[0] = 2000* Math.pow(2,lvl);
		coste[1] = 1000* Math.pow(2,lvl);
		coste[2] = 0;
		break;
	case 24:
		coste[0] = 2000* Math.pow(2,lvl);
		coste[1] = 2000* Math.pow(2,lvl);
		coste[2] = 0;
		break;
	case 31:
		coste[0] = 200* Math.pow(2,lvl);
		coste[1] = 400* Math.pow(2,lvl);
		coste[2] = 200* Math.pow(2,lvl);
		break;
	case 33:
		coste[0] = 0;
		coste[1] = 50000* Math.pow(2,lvl);
		coste[2] = 1000000* Math.pow(2,lvl);
		coste[3] = 0;
		break;
	case 34:
		coste[0] = 20000* Math.pow(2,lvl);
		coste[1] = 40000* Math.pow(2,lvl);
		coste[2] = 0;
		break;
	case 24:
		coste[0] = 2000* Math.pow(2,lvl);
		coste[1] = 2000* Math.pow(2,lvl);
		coste[2] = 0;
		break;
	case 44:
		coste[0] = 20000* Math.pow(2,lvl);
		coste[1] = 20000* Math.pow(2,lvl);
		coste[2] = 1000* Math.pow(2,lvl);
		break;
	}

	lvl++;
	for (var i = 0; i < coste.length; i++) {
		coste[i] = parseInt(coste[i]);
	}
	return coste;
		
	
}		
	
function esperaEdificio(id, lvl)
{
	var coste = new Array();
	var seg = new Array();
	var temp = '';
	var i = 1;
	//obtenemos el coste
	coste[0] = costeEdificio(id,lvl)[0];
	coste[1] = costeEdificio(id,lvl)[1];
	//Calculamos el tiempo
	seg[0] = 3600 * (coste[0]-rec[0]) / prod[0] 
	seg[1] = 3600 * (coste[1]-rec[1]) / prod[1]
	//alert('titanio ' + 'Coste:' + coste[0] + 'recursos:' + rec[0] + 'produccion: ' + prod[0]);
	//alert('silicio ' + 'Coste:' + coste[1] + 'recursos:' + rec[1] + 'produccion: ' + prod[1]);
	if (seg[0] > seg[1])
	{
		i = 0;
	} 
	seg[2] = seg[i]
	
	if (seg[2] < 0)
	{
		return '';
	} else {
		temp = col_time(seg[2]);
		if (temp.indexOf('red') != -1) {
			temp = temp.replace('red','green');
		} else {
			temp = temp.replace('green', 'red');
		}
		if (cap[i] < coste[i]) { temp += ' </t><t title="Tendras que subir los depósitos">*';}
		return temp;
	}
	
}


function sumaTiempos() {
	var parcial = 0;
	var j = 0;
	var temp = '';
	var input = new Array();
	for (var i = 0; i < time.length; i++)
	{
		if (input2[i].innerHTML.indexOf('input') != -1) {
				input[i] = parseInt(input2[i].getElementsByTagName('input')[2].value);
			
			if (isNaN(input[i])) { input[i] = 0; }
			parcial += parseInt(input[i]) * parseInt(time[i]);
			temp = topretty_time(parseInt(input[i]) * time[i]);
			if (temp == '') { temp = '0s'; }
			document.getElementById(id[i]).innerHTML = temp;
		}
	}
	temp = topretty_time(parcial);
	if (temp == '') { temp = '0s'; }
	document.getElementById('texto').innerHTML = temp + ' ';	
	
}

/*********************************
 *  Recuperacion de la config
*********************************/
//Se lee el cookie cada vez.
if (readCookie('config') != null) {
	var configuracion = readCookie('config');

} else { //Configuracion predeterminada
	var configuracion = '1111';
// produccion, vvirtual,defensa, construcciones
}
configuracion.split("");


/*********************************
 * Generales
*********************************/
if (top.location.href.indexOf("?mode=game") != -1 || top.location.href.indexOf('?option') != -1|| top.location.href.indexOf('?mode=fleet') != -1) { 
	//ID que se repiten
	if (document.getElementById("body").innerHTML.indexOf('<div id="topnav">') != -1) { //Si estamos en multiverso
		var content = document.getElementById("content");
		var topnav  = document.getElementById("topnav");
		var todown  = document.getElementById("todown");
	} else { //perbverso
		var topnav =  document.getElementsByTagName("td")[1];
		var content = document.getElementById("ads_foot").previousSibling;
		var todown = ''; //no hace falta (aun)
	}

	/*********************************
	 * Recursos
	*********************************/
	//Obtenemos los recursos actuales del planeta
	var span  = topnav.getElementsByTagName("span"); 
	var rec = new Array(2);
	for (var i=0;i<3;i++) {
		rec[i] = parseInt(nop(span[i].innerHTML));
	}
	delete span;
}

/*********************************
 * DESCRIPCIONES
*********************************/
/*
if (top.location.href.indexOf("?mode=info&id") != -1) {
//Capacidades de los depositos
	if (top.location.href.indexOf("id=22") != -1 || top.location.href.indexOf("id=23") != -1 || top.location.href.indexOf("id=24") != -1) {
		//Aqui algun dia habra algo
		
		
	}
}
*/

/*********************************
 * CONSTRUCCIONES
*********************************/
if (top.location.href.indexOf("buildings") != -1 && configuracion[1] == 1) {
			
	//Tabla principal
	var tabla = content.getElementsByTagName("tbody")
	//Miramos si se esta construyendo algo
	if (tabla.length > 1) {
		tabla2 = tabla[1];
	} else {
		tabla2 = tabla[0];
	}
	var th = tabla2.getElementsByTagName('th');
	var td = tabla2.getElementsByTagName('td');
	var tr = tabla2.getElementsByTagName('tr');
	

	td[0].setAttribute('colspan',4);
	//Objetivo: los datos
	var lvl  = new Array();
	var  id  = new Array();
	var lvls = new Array();
	var temp = '';
	var prod = new Array();
	var cap  = new Array();
	//Todo este feo codigo extrae id y nivel:
	var k = 0;
	var j = 0;
	var l = 0;
	var m = 1;
	for (var i=1;i<=th.length; i += 3)
	{
		j = th[i].innerHTML.lastIndexOf('nivel') + 4;
		l = th[i].innerHTML.lastIndexOf(')');
		if (th[i].innerHTML.lastIndexOf('nivel') == -1) { 
			temp = 0;
		} else {
			temp = th[i].innerHTML.substring(j,l).replace(/[^0-9\\]/g,''); 
			if (th[i].innerHTML.lastIndexOf(' ') != j+1) 
			{ 
				temp = parseInt(temp.substr(temp.length - 1)) + parseInt(temp.substr(0,temp.length -1));
			}
			temp = parseInt(temp);
		}
		
		lvl[k] = temp;
		j = th[i].innerHTML.lastIndexOf('info&id');
		l = th[i].innerHTML.lastIndexOf('</a>');
		temp = parseInt(th[i].innerHTML.substring(j,l).replace(/[^0-9\\]/g,''));
		id[k] = temp;
		
		// Añadimos datos
		if (id[k] < 3 ) { //|| id[k] == 4
			if(id[k] == 1) {prod[0] = produccion(id[k],lvl[k]);}
			if(id[k] == 2) {prod[1] = produccion(id[k],lvl[k]);}
			td[k+1].innerHTML += '<span><i>Produccion a este nivel: </i>' + formatNmb(produccion(id[k],lvl[k])) + ' <i>En el siguiente:</i> '+ formatNmb(produccion(id[k],lvl[k]+1)) + 
			'<span class="green"> (' + formatNmb(produccion(id[k],lvl[k]+1)-produccion(id[k],lvl[k])) + ')</span>' + '</span>'; 
		}
			
		if (id[k] > 21 && id[k] < 25) {
			if(id[k] == 22) {cap[0] = produccion(id[k],lvl[k]);}
			if(id[k] == 23) {cap[1] = produccion(id[k],lvl[k]);}
			if(id[k] == 24) {cap[2] = produccion(id[k],lvl[k]);}
			td[k+1].innerHTML += '<span><i>Capacidad a este nivel: </i>' + formatNmb(produccion(id[k],lvl[k])/1000) + 'k <i>En el siguiente:</i> '+ formatNmb(produccion(id[k],lvl[k]+1)/1000) + 
			'k<span class="green"> (' + formatNmb((produccion(id[k],lvl[k]+1)-produccion(id[k],lvl[k]))/1000) + 'k)</span>' + '</span>'; 
			if (id[k] != 24) {td[k+1].innerHTML += '<br><span> Se llena en: ' + full_time(cap[id[k]-22],rec[id[k]-22],prod[id[k]-22]) + '</span>';}
		}
		k++
	}
	for (var k = 0 ; k < td.length -1; k++)
	{
		td[k+1].innerHTML += '<div align="right"><t title="Tiempo restante para poder construir el edificio con la produccion actual">'+ esperaEdificio(id[k],lvl[k]+1) + '</t></div>';
	}
	tabla2.innerHTML += '<tr> <td class= "b" colspan = 4><b>Nota sobre el script:</b>Los tiempos solo tienen en cuenta la produccion de titanio y silicio.</td></tr>'; 
}

/*********************************
 * VISOR VIRTUAL
*********************************/

if (top.location.href.indexOf("?mode=game-virtual") != -1 && configuracion[0] == 1) {
	//vamos a poner el enlace que esconde
	var mifila_texto = document.createTextNode('bu');
	var esconder = new Array;
	var escondidos = new Array;
	var tabla = content.getElementsByTagName("table")[0];
	tabla.innerHTML.replace(/width="75"/g,'width="50"');
	var mifila = tabla.insertRow(1);
	var filas = tabla.getElementsByTagName('tr');
	var backup = tabla.getElementsByTagName('tr');
	var filas2 = filas[2];
	var fila = filas2.getElementsByTagName('th');
	//a.setAttribute('href', '');
	mifila.setAttribute('colspan', fila.length);
	mifila.setAttribute('class', 'c');
	mifila.setAttribute('id', 'estanoseborra');
	for (var i = 0; i < fila.length; i++) {
		esconder[i] = false;
		eval("var micelda"+i+" = mifila.insertCell("+i+");");
		eval("var mifila_texto"+i+" = document.createElement('img');");
		eval("mifila_texto"+i+".setAttribute('class','img_res');");
		eval("mifila_texto"+i+".setAttribute('alt','');");
		eval("mifila_texto"+i+".setAttribute('src','?mode=game-res&gif=collapse');");
		eval("micelda"+i+".setAttribute('class','c');");
		eval("var escondido"+i+"=new Array()");
		eval("escondidos.push(escondido"+i+");");
		if (i == 0) {
			eval("micelda"+i+".innerHTML = 'Ocultar / Mostrar columnas'");
			eval("micelda"+i+".setAttribute('colspan','2');");			
		} else if (i == fila.length - 1) {
			eval("micelda"+i+".setAttribute('colspan','2');");
		}else {
			eval("micelda"+i+".appendChild(mifila_texto"+i+");");
			eval("var a"+i+" = document.createElement('a');");
			// Añadimos el array que guarda los datos de la columna
			eval("micelda"+i+".addEventListener('click', function(){esconderCol("+i+");}, true);");
		}
	}
}

/*********************************
 * PRODUCCION 
*********************************/

if (top.location.href.indexOf("?mode=game-resources") != -1 && configuracion[2] == 1) {
	//Obtenemos la produccion y capacidad de cada cosa
	var tabla = content.getElementsByTagName("table")[1];
	//var tbody = tabla.getElementsByTagName("tbody")[0];
	var tr = tabla.getElementsByTagName("tr");
	var span  = tabla.getElementsByTagName("span");
	var cap   = new Array(2);
	var prod  = new Array(2);
	var minutotal = new Array(2);
	//En cap almacenamos los datos de las capacidades
	//En prod almacenamos los datos de la produccion
	for (var i=0;i<3;i++){
		cap[i]   = parseInt(parseFloat(span[i+4].innerHTML) * 1e6);
		prod[i]  = parseInt(nop(span[i+8].innerHTML));
		minutotal[i] = parseInt(cap[i] *60 / prod[i]);
	}
	delete tabla;
	delete tbody;

	//Accedemos a la tabla de produccion extendida
	var tabla = content.getElementsByTagName("table")[3];
	//var tbody = tabla.getElementsByTagName("tbody")[0];
	var filas = tabla.getElementsByTagName("tr");
	var filatit = filas[0].getElementsByTagName("td");
	var col = new Array(document.createElement("th"),document.createElement("th"),document.createElement("th"));
	//Modificamos el titulo
	filatit[0].setAttribute("colspan",4);
	//Agregamos col
	for (var i=0;i<3;i++) {
		col[i].innerHTML = full_time(cap[i],rec[i],prod[i]);
		filas[i+1].appendChild(col[i]);
	}
}

/*********************************
 * HANGAR
*********************************/
if (top.location.href.indexOf("?mode=game-hangar") != -1 && configuracion[3] == 1) {

	//Tabla principal
	var tabla = content.getElementsByTagName("tbody");
	//Miramos si se esta construyendo algo
	var i = 0
	if (tabla.length > 1) 
	{
		i = 1;
	} 
	var tnaves = tabla[i];
	var th = tabla[i].getElementsByTagName('th');
	var td = tabla[i].getElementsByTagName('td');
	var tr = tabla[i].getElementsByTagName('tr');
	var input = tabla[i].getElementsByTagName('input');
	
	
	var input2 = new Array;		
	var id = new Array();
	var num = new Array();
	var time = new Array();
	var temp = '';
	var temp2 = '';
	//Todo este feo codigo extrae id y numero:
	var j = 0;
	var k = 0;
	var l = 0;
	var a = '';
	for (var i=1;i<=th.length;i += 2)
	{
		j = th[i].innerHTML.indexOf('">');
		temp = th[i].innerHTML.substring(0,j).replace(/[^0-9\\]/g,'');
		id[k] = parseInt(temp);
		
		j = th[i].innerHTML.indexOf('</a>');
		l = th[i].innerHTML.lastIndexOf(' ');
		if (l == th[i].innerHTML.lastIndexOf('d') + 1) { l = th[i].innerHTML.lastIndexOf(')');}
		temp = parseInt(th[i].innerHTML.substring(j,l).replace(/[^0-9\\]/g,''));
		if (isNaN(temp)) { num[k] = 0; 
		} else { num[k] = temp; 
		}
		
		//Sacamos el tiempo
		j = tr[i+1].innerHTML.lastIndexOf('Tiempo de produccion:');
		l = tr[i+1].innerHTML.lastIndexOf('<div ');
		temp = tr[i+1].innerHTML.substring(j,l).replace('Tiempo de produccion: </span>','');
		time[k] = anti_time(temp);
		
		// Coste
		
		// Ponemos lo del tiempo total
		var texto = document.createElement('span');
		td[i+1].insertBefore(texto, td[i+1].lastChild);
		texto.innerHTML = '<b> Tiempo total: </b>' + '<text id="'+id[k]+'"> 0s </text>';
		//Añadimos el evento al formulario
		if (td[i].innerHTML.indexOf('input') != -1) {
			td[i].getElementsByTagName('input')[2].addEventListener('keyup',function(){sumaTiempos();},true);
			td[i].getElementsByTagName('input')[0].addEventListener('click',function(){sumaTiempos();},true);
			td[i].getElementsByTagName('input')[1].addEventListener('click',function(){sumaTiempos();},true);
			td[i].getElementsByTagName('input')[3].addEventListener('click',function(){sumaTiempos();},true);
			td[i].getElementsByTagName('input')[4].addEventListener('click',function(){sumaTiempos();},true);
		}
		input2[k] = td[i];
		k++
	}
	td[td.length-2].getElementsByTagName('input')[0].addEventListener('mouseout',function(){sumaTiempos();},true);
	// Añadimos donde aparecerá el tiempo
	var texto = document.createElement('span');
	texto.setAttribute('align','left');
	td[td.length-2].insertBefore(texto, td[td.length-2].firstChild);
	texto.innerHTML = '<b> Tiempo total: </b>' + '<text id="texto"> 0s </text>';
	//Formamos la url con los datos obtenidos
	var url =top.location.href.replace("?mode=game-defense","?mode=fleet-sim&data=|");
	for (i=0;i < id.length;i++) {
		url += 'b'+id[i]+':'+num[i]+'|';
	}
}
/*********************************
 * PUERTO ESTELAR
*********************************/
if (top.location.href.indexOf("?mode=fleet") != -1 && configuracion[4] == 1) {
	//Tabla principal
	var tabla = content.getElementsByTagName("tbody");
	//Miramos si se esta construyendo algo

	var i = tabla.length - 1;
	var tnaves = content.getElementsByTagName('form')[0].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];

	var th = tnaves.getElementsByTagName('th');
	var td = tnaves.getElementsByTagName('td');
	var tr = tnaves.getElementsByTagName('tr');
	var input = tnaves.getElementsByTagName('input');
	if (td[0].innerHTML.indexOf("elegir naves") != -1)
	{
		var fleetid = new Array();
		var fleetnum = new Array();
		var temp = '';
		//Todo este feo codigo extrae id y numero:
		var j = 0;
		var k = 0;
		var l = 0;
		var a = '';
		for (var i=5;i<=th.length-4;i += 5)
		{
			j = th[i].innerHTML.indexOf('">');
			temp = th[i].innerHTML.substring(0,j).replace(/[^0-9\\]/g,'');
			fleetid[k] = parseInt(temp);
		
			
			temp = parseInt(nop(th[i+1].innerHTML));
			fleetnum[k] = temp;

			if (th[i+3].innerHTML.indexOf('input') != -1) {
				th[i+3].getElementsByTagName('input')[0].addEventListener('keyup',function(){fleetParcial();},true);
				a = th[i+3].getElementsByTagName('a');
				for(var m = 0; m < a.length; m++) {
					a[m].addEventListener('click',function(){fleetParcial();},true);
				}
			}
			k++
		}
		//Le ponemos el evento a los enlaces de todas y ninguna
		
		th[th.length-3].getElementsByTagName('a')[0].addEventListener('click',function(){fleetParcial();},true);
		th[th.length-2].getElementsByTagName('a')[0].addEventListener('click',function(){fleetParcial();},true);
		
		//Agregaremos la fila con los datos
		var fila = document.createElement("tr");
		var dentrofila = document.createElement("td");
		fila.appendChild(dentrofila);
		
		tnaves.insertBefore(fila,tr[tr.length-2]);
		fila.setAttribute('height',20);
		dentrofila.setAttribute('colspan',5);
		dentrofila.setAttribute('class','b');
		//calculamos la capacidad total
		var captotal = 0;
		var capparcial = 0;
		for (var i = 0; i <= fleetid.length;i++) 
		{
			captotal += fleetCap(fleetid[i],fleetnum[i]);
		}
		
		captotal = formatNmb(captotal.toString());

		dentrofila.innerHTML = '<b>Capacidad total: </b>' + captotal+ ' <b>Seleccionada: </br>' + '<text id="cantidad">nada</text>';	
	}
}
/*********************************
 * PROTECCION PLANETARIA
*********************************/
if (top.location.href.indexOf("?mode=game-defense") != -1 && configuracion[5] == 1) {

	//Tabla principal
	var tabla = content.getElementsByTagName("tbody");
	//Miramos si se esta construyendo algo
	var i = 0
	if (tabla.length > 1) 
	{
		i = 1;
	} 
	var tnaves = tabla[i];
	var th = tabla[i].getElementsByTagName('th');
	var td = tabla[i].getElementsByTagName('td');
	var tr = tabla[i].getElementsByTagName('tr');
	var input = tabla[i].getElementsByTagName('input');
	
	
	var input2 = new Array;		
	var id = new Array();
	var num = new Array();
	var time = new Array();
	var temp = '';
	var temp2 = '';
	//Todo este feo codigo extrae id y numero:
	var j = 0;
	var k = 0;
	var l = 0;
	var a = '';
	for (var i=1;i<=th.length;i += 2)
	{
		j = th[i].innerHTML.indexOf('">');
		temp = th[i].innerHTML.substring(0,j).replace(/[^0-9\\]/g,'');
		id[k] = parseInt(temp);
		j = th[i].innerHTML.indexOf('</a>');
		l = th[i].innerHTML.lastIndexOf(' ');
		if (l == th[i].innerHTML.lastIndexOf('d') + 1) { l = th[i].innerHTML.lastIndexOf(')');}
		temp = parseInt(th[i].innerHTML.substring(j,l).replace(/[^0-9\\]/g,''));
		if (isNaN(temp)) { num[k] = 0; 
		} else { num[k] = temp; 
		}

		//Sacamos el tiempo
		j = tr[i+1].innerHTML.lastIndexOf('Tiempo de produccion:');
		l = tr[i+1].innerHTML.lastIndexOf('<div ');
		temp = tr[i+1].innerHTML.substring(j,l).replace('Tiempo de produccion: </span>','');
		time[k] = anti_time(temp);
		// Ponemos lo del tiempo total
		var texto = document.createElement('span');
		td[i+1].insertBefore(texto, td[i+1].lastChild);
		texto.innerHTML = '<b> Tiempo total: </b>' + '<text id="'+id[k]+'"> 0s </text>';
		
		//Añadimos el evento al formulario
		if (td[i].innerHTML.indexOf('input') != -1) {
			td[i].getElementsByTagName('input')[2].addEventListener('keyup',function(){sumaTiempos();},true);
			td[i].getElementsByTagName('input')[0].addEventListener('click',function(){sumaTiempos();},true);
			td[i].getElementsByTagName('input')[1].addEventListener('click',function(){sumaTiempos();},true);
			td[i].getElementsByTagName('input')[3].addEventListener('click',function(){sumaTiempos();},true);
			td[i].getElementsByTagName('input')[4].addEventListener('click',function(){sumaTiempos();},true);
		}
		input2[k] = td[i];
		
		k++
	}
	td[td.length-2].getElementsByTagName('input')[0].addEventListener('mouseout',function(){sumaTiempos();},true);
	// Añadimos donde aparecerá el tiempo
	var texto = document.createElement('span');
	texto.setAttribute('align','left');
	td[td.length-2].insertBefore(texto, td[td.length-2].firstChild);
	texto.innerHTML = '<b> Tiempo total: </b>' + '<text id="texto"> 0s </text>';
	
	//Formamos la url con los datos obtenidos
	var url =top.location.href.replace("?mode=game-defense","?mode=fleet-sim&data=|");
	for (i=0;i < id.length;i++) {
		url += 'b'+id[i]+':'+num[i]+'|';
	}
	//Creamos el enlace
	var a = document.createElement("a");
	var newText = document.createTextNode("Simular");
	var salto = document.createElement("div");
	a.setAttribute('href',url);
	a.setAttribute('target','_blank')
	a.appendChild(newText);
	salto.appendChild(a);

	//Colocamos el enlace
	var titulo = td[0];
	titulo.innerHTML += " - " + salto.innerHTML;
}
/*********************************
 * MENSAJES
*********************************/
if (top.location.href.indexOf("?mode=messages") != -1) {

	//Tabla principal
	var tabla = content.getElementsByTagName("tbody")[0];
	//Miramos si se esta construyendo algo
	var th = tabla.getElementsByTagName('th');
	var td = tabla.getElementsByTagName('td');
	var tr = tabla.getElementsByTagName('tr');
	
}


/*********************************
 * OPCIONES
*********************************/
if (top.location.href.indexOf("settings") != -1) {
	var tabla = content.getElementsByTagName("table")[0];
	tabla.setAttribute('width','600');
	//content.getElementsByTagName('form')[0].setAttribute('name','formulario')
	// A por lo desconocido
	// Esta variable regula si estamos en opciones o no
	var enopciones = new Boolean();

	// Lo primero es añadir el "Enlace" al menu
	var a = document.createElement("a");
	var newText = document.createTextNode("Script");
	a.setAttribute('href','?mode=game-settings&section=script');
	a.appendChild(newText);
	a.parentNode;

	//Colocamos el enlace
	var titulo = tabla.getElementsByTagName('th')[0];
	titulo.innerHTML += " - ";
	titulo.appendChild(a);
}
//El menu cambia
if (top.location.href.indexOf("&section=script") != -1) {
	//Modificamos el codigo
	var opciones = new Array('visor virtual', 'construcciones','produccion','hangar','puerto estelar','proteccion planeta');
	var opcionesid = new Array('vvirtual', 'construcciones', 'produccion','hangar','puerto','defensa');
	tabla.innerHTML = '<tbody><tr><td class="c" colspan="2">Opciones del script</td></tr><tr><th colspan="2"><a href="?option=settings&amp;section=user">Datos de usuario</a> - <a href="?option=settings&amp;section=general">Ajustes generales</a> - <a href="?option=settings&amp;section=galaxy">Opciones de visión de Galaxia</a> - <a href="?option=settings&amp;section=misc">Miscelaneas</a> - <a href="?option=settings&amp;section=script" class="orange">Script</a></th></tr><tr><td height="5" class="c" colspan="2"></td></tr>'
	for (var i = 0; i < opcionesid.length; i++) {
		var checkbox = new Array();
		var opcion = opciones[i];
		var descripcion = 'Activar o desactivar cambios en '+opciones[i];
		var caja = newCheckbox(opcionesid[i],configuracion[i], opcionesid[i]);
		tabla.innerHTML +='<tr><td class="b"><b>'+opcion+'</b><br><small>'+descripcion+'</small></td><th id="form'+i+'"></th></tr>'
		document.getElementById('form'+i).appendChild(caja);
	}
	tabla.innerHTML +='<tr><td class="b" colspan="2"><b>Aviso:</b> Para poder guardar estas opciones se emplean <a href="http://es.wikipedia.org/wiki/Cookie">cookies</a>. Estas son generadas por el script, no hay ningún peligro ;). Si las borras pierdes la configuracion, la proxima vez que lo inicies estará como tras instalar. <br>No recomiendo emplear este menu hasta que el script incluya mas funcionalidades. <br> Se trata de algo que sera util mas adelante</tr>'
	tabla.innerHTML +='<tr><td align="right" class="c" colspan="2"><input id="clear" type="button" value="Restablecer / Limpiar cookies" ><input id="boton" type="button" value="Guardar configuracion" ></td></tr>'
	tabla.innerHTML += '<tr><td colspan="2"><b>Estas opciones afectan solo al script, no tienen ninguna relacion con Ugamela</b></td></tr></tbody>'	
	var boton = document.getElementById('boton');
	var boton2 = document.getElementById('clear');
	boton.addEventListener("click", function(){sendConfig();}, true);
	boton2.addEventListener("click", function(){clearConfig();}, true);
}
