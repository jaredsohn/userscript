// ==UserScript==
// @name           BSKfilter
// @namespace      http://userscripts.org/users/
// @include        http://www.labsk.net/index.php?action=unread*
// @exclude 		http://www.labsk.net/index.php?action=unreadreplies
// ==/UserScript==

GM_registerMenuCommand('Resaltar mensajes de subforos',
 	 	setRegistroForosResaltados);
GM_registerMenuCommand('Borrar subforos resaltados',
 	 	clearRegistroForosResaltados);
GM_registerMenuCommand('Resaltar usuarios',
 	 	setRegistroUsuariosResaltados);
GM_registerMenuCommand('Borrar usuarios resaltados',
 	 	clearRegistroUsuariosResaltados);
GM_registerMenuCommand('Filtrar mensajes de subforos',
 	 	setRegistroForosFiltrados);
GM_registerMenuCommand('Borrar foros filtrados',
 	 	clearRegistroForosFiltrados);
GM_registerMenuCommand('Mostrar configuracion',
 	 	showRegistros);
GM_registerMenuCommand('Borrar TODA la configuracion',
 	 	clearTodo);

function showRegistros()
{
	salida1	=	GM_getValue('forosBorrar');	
	salida2 =	GM_getValue('forosResaltar');
	salida3 =	GM_getValue('usuariosResaltar');
	
	alert('Foros Filtrados: ' + salida1 + '\nForos marcados: ' + salida2 + '\nUsuarios marcados: ' + salida3);		
}

function clearTodo()
{	
	if (confirm('�Estas seguro de que deseas borrar\ntoda la configuracion previa de BSKfilter?'))
	{
		GM_setValue('forosBorrar','');	
		GM_setValue('forosResaltar','');
		GM_setValue('usuariosResaltar','');	
	}
}

function setRegistroForosFiltrados()
{
	var previo 	=	GM_getValue('forosBorrar','');
	var salida = prompt('Utiliza el siguiente formato:\nnum_foro_1 num_foro_2 num_foro_3',
						previo);
	if (salida != '' && salida != null) 
	{
		GM_setValue('forosBorrar', salida);
		GM_log('escrito de forosBorrar: ' + salida);
	}			
}

function clearRegistroForosFiltrados()
{
	GM_setValue('forosBorrar', '');
}
		
function setRegistroForosResaltados()
{
	var previo 	=	GM_getValue('forosResaltar','');
	var salida = prompt('Utiliza el siguiente formato:\n#RRGGBB num_foro_1 num_foro_2 #RRGGBB num_foro_3\nRR nivel de rojo, GG nivel verde, BB nivel azul (en hexadecimal)',
						previo);
	if (salida != '' && salida != null) 
	{
		GM_setValue('forosResaltar', salida);
		GM_log('escrito de forosResaltar: ' + salida);
	}			
}

function clearRegistroForosResaltados()
{
	GM_setValue('forosResaltar', '');
}

function setRegistroUsuariosResaltados()
{
	var previo 	=	GM_getValue('usuariosResaltar','');
	var salida = prompt('Utiliza el siguiente formato:\n#RRGGBB num_user_1 num_user_2 #RRGGBB num_user_3\nRR nivel de rojo, GG nivel verde, BB nivel azul (en hexadecimal)',
						previo);
	if (salida != '' && salida != null) 
	{
		GM_setValue('usuariosResaltar', salida);
		GM_log('escrito de usuariosResaltar: ' + salida);
	}			
}

function clearRegistroUsuariosResaltados()
{
	GM_setValue('usuariosResaltar', '');	
}

//GM_setValue('forosResaltar','#FF0000 18 91 #00FF00 16');
var i,j;
var thisLink;
var patronBusqueda = '';
var forosNoMostrar;
var forosResaltar;
var usuariosResaltar;


//LISTA DE FOROS A RESALTAR
var numForosResaltar = [];	//Primer indice, color, segundo indice, cada foro de ese color
var coloresForosResaltar = [];
cadenaForosResaltar	=	GM_getValue('forosResaltar');
if (cadenaForosResaltar!=undefined && cadenaForosResaltar!='')
{
	//var tam=0;
	var cadColores	=	cadenaForosResaltar.split('#');
	for (i=1; i < cadColores.length;i++)
	{
		GM_log('cadena:' + cadColores[i]);		
		var cadNumeros = cadColores[i].split(' ');
		coloresForosResaltar[i-1] = '#' + cadNumeros[0];
		numForosResaltar[i-1] = [];
		for (j=1;j < cadNumeros.length; j++)
		{	
			if (cadNumeros[j].length>0) numForosResaltar[i-1] = numForosResaltar[i-1].concat(cadNumeros[j]*1);
		}					
	}
}

//LISTA DE USUARIOS A RESALTAR
var numUsuariosResaltar = [];	//Primer indice, color, segundo indice, cada foro de ese color
var coloresUsuariosResaltar = [];
cadenaUsuariosResaltar	=	GM_getValue('usuariosResaltar');
if (cadenaUsuariosResaltar!=undefined && cadenaUsuariosResaltar!='')
{
	//var tam=0;
	var cadColores	=	cadenaUsuariosResaltar.split('#');
	for (i=1; i < cadColores.length;i++)
	{
		GM_log('cadena:' + cadColores[i]);		
		var cadNumeros = cadColores[i].split(' ');
		coloresUsuariosResaltar[i-1] = '#' + cadNumeros[0];
		numUsuariosResaltar[i-1] = [];
		for (j=1;j < cadNumeros.length; j++)
		{	
			if (cadNumeros[j].length>0) numUsuariosResaltar[i-1] = numUsuariosResaltar[i-1].concat(cadNumeros[j]*1);
		}					
	}
}

var numForosBorrar = [];	//75,22,116
cadenaForosBorrar	=	GM_getValue('forosBorrar');
if (cadenaForosBorrar!=undefined && cadenaForosBorrar!='')
{
	var cadNumeros = cadenaForosBorrar.split(' ');
	for (j=0;j < cadNumeros.length; j++)
	{	
		if (cadNumeros[j].length>0) numForosBorrar[j] = cadNumeros[j]*1;
	}	
}


for (var colores = 0; colores < coloresForosResaltar.length; colores++)
{
	patronBusqueda = '';
	for (i=0; i < numForosResaltar[colores].length; i++)
	{
		if (patronBusqueda.length > 0) patronBusqueda += '|';
		patronBusqueda += '//a[@href=\'http://www.labsk.net/index.php?board=' + numForosResaltar[colores][i] + '.0\']/parent::*/parent::*';
	}
	GM_log('busqueda a resaltar de color ' + coloresForosResaltar[colores] + ': '+ patronBusqueda);

	//Y ESTO ES PARA MARCAR DE MANERA ESPECIAL LOS MENSAJES DE LOS SUBFOROS MAS INTERESANTES PARA NOSOTROS (EN ESTE CASO EL 18)
	forosResaltar = document.evaluate(
		patronBusqueda,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (i = 0; i < forosResaltar.snapshotLength; i++) {
		thisLink = forosResaltar.snapshotItem(i);
		if (thisLink) {
			thisLink.style.backgroundColor = coloresForosResaltar[colores];
		}
	}
}


//RESALTAR USUARIOS
for (var colores = 0; colores < coloresUsuariosResaltar.length; colores++)
{
	patronBusqueda = '';
	for (i=0; i < numUsuariosResaltar[colores].length; i++)
	{
		if (patronBusqueda.length > 0) patronBusqueda += '|';
		patronBusqueda += '//a[@href=\'http://www.labsk.net/index.php?action=profile;u=' + numUsuariosResaltar[colores][i] + '\']/parent::*';
	}
	GM_log('busqueda a usuarios de color ' + coloresUsuariosResaltar[colores] + ': '+ patronBusqueda);

	//Y ESTO ES PARA MARCAR DE MANERA ESPECIAL LOS MENSAJES DE LOS SUBFOROS MAS INTERESANTES PARA NOSOTROS (EN ESTE CASO EL 18)
	usuariosResaltar = document.evaluate(
		patronBusqueda,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (i = 0; i < usuariosResaltar.snapshotLength; i++) {
		thisLink = usuariosResaltar.snapshotItem(i);
		if (thisLink) {
			thisLink.style.backgroundColor = coloresUsuariosResaltar[colores];
		}
	}
}


//BORRAR MENSAJES
//LOS MENSAJES PERTENECIENTES A LOS FOROS numForosBorrar DIRECTAMENTE NO APARECEN
patronBusqueda = '';
for (i=0; i < numForosBorrar.length; i++)
{
	if (patronBusqueda.length > 0) patronBusqueda += '|';
	patronBusqueda += '//a[@href=\'http://www.labsk.net/index.php?board=' + numForosBorrar[i] + '.0\']/parent::*/parent::*/parent::*';
}

GM_log('busqueda foros a filtrar: '+ patronBusqueda);
forosNoMostrar = document.evaluate(
    patronBusqueda,
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < forosNoMostrar.snapshotLength; i++) {
    thisLink = forosNoMostrar.snapshotItem(i);
   if (thisLink) {
    thisLink.parentNode.removeChild(thisLink);    
	}	
}

var locateInsertar = document.evaluate(
    '//td[@class=\'mirrortab_first\']',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
thisLink = locateInsertar.snapshotItem(0);
if (thisLink) {
	var mensaje	=	document.createElement('div');
	mensaje.innerHTML = '<div>Filtrados ' + forosNoMostrar.snapshotLength + ' asuntos</div>';
	thisLink.parentNode.insertBefore(mensaje, thisLink);
}	


