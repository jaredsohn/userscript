// ==UserScript==
// @version		1.09
// @author		TheBronx
// @date		2011-06-27
// @name		vBulletinHunter
// @namespace	vBulletinHunter
// @description	Script para foros vBulletin
// @include		http://*.htcmania.com/*
// @include		http://*.forocoches.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

/**
* Fase Beta
*/

var version = '1.09';
var busqueda = 'samsung galaxy, galaxy';
var hilos; //hilos en seguimiento

/*
para ir al final de un hilo:
&page=999#lastpost
*/

window.addEventListener('load',main,true);

function main() {
	initialize();
	search();
}

function initialize() {
	//cargamos opciones
	loadOptions();
	//metemos estilos
    addStyles();
	//cuadro de busqueda
	addSearchBox();
	//cargamos hilos en seguimiento
	loadThreads();
}

function search() {
	//borramos hilos resaltados previamente
	clearThreads();
	//buscamos
	findThreads();
	//resaltamos
	highlightThreads();
}

function findThreads() {
	hilos = new Array();
	//buscamos hilos con las palabras clave
	//guardamos los hilos en la variable global "hilos"
	//un hilo consta de ID, url base, last post date y un boolean para ignorar
	$('#threadslist tr td').each( function() {
		var title = $(this).attr('id');
		if ( title != undefined && title.indexOf('td_threadtitle')>=0 ) {
			//hemos encontrado un td titulo, buscamos el enlace
			$(this).find('a').each( function() {
				var a = $(this);
				var id = a.attr('id');
				if (id!=undefined && id.indexOf('thread_title')>=0) {
					var hilo = {};
					//por fin tenemos lo que buscabamos, un link de un hilo
					//tomamos el id, el enlace base, titulo y el last post
					hilo.id = a.attr('id').replace("thread_title_","");
					hilo.href = a.attr('href');
					hilo.title = a.html();
					hilo.lastPost = getLastPostDate(a);
					hilo.ignore = false;
					hilos.push( hilo );
				}
			});
		}
	});
	
	//ahora tenemos todos los hilos de la pagina, ¿cuáles nos interesan?
	var palabras = busqueda.split(",");
	for (var i=0; i<palabras.length; i++) {
		palabras[i] = palabras[i].trim().toLowerCase();
	}
	var titulo, mola=false, elegidos = new Array();
	for (var i=0; i<hilos.length; i++) {
		titulo = hilos[i].title.toLowerCase();
		 mola=false;
		for(var j=0; j<palabras.length; j++) {
			if (titulo.indexOf(palabras[j])>=0) { //TODO buscar la palabra con espacios o fin de linea antes/despues
				mola = true;
				break;
			}
		}
		if (mola) {
			elegidos.push(hilos[i]);
		}
	}
	hilos = elegidos;
}

function getLastPostDate(a) {
	//nos pasan el link de un hilo, tenemos que encontrar el date del last post
	$(a).parents('tr').find('div.smallfont').each( function() {
		//hay varios smallfont, q dentro tienen un span.time
		//el que nos interesa es el que tiene los dos links (uno al last post y otro a su autor)
		if ( $(this).find('a').length==2 ) {
			//este es el <a> que nos interesa
			var contenido = $(this).html();
			//al contenido le quitamos lo que viene tras el br
			contenido = contenido.substring( 0, contenido.indexOf('<br') ).trim();
			//ahora tenemos algo tal que asi:
			//"Hoy <span class="time">11:59:23</span>"
			//"Ayer <span class="time">20:33:02</span>"
			//"25/06/12 <span class="time">23:46:25</span>"
			var d = new Date();
			contenido = contenido.replace("Hoy", d.getDate()+"/"+(d.getMonth()+1)+"/"+(d.getFullYear()-2000));
			contenido = contenido.replace("Ayer", (d.getDate()-1)+"/"+(d.getMonth()+1)+"/"+(d.getFullYear()-2000));
			contenido = contenido.replace(/<.*?>/g,""); //quitamos el span
			//ahora, el parse a date
			var partes = contenido.split(" ");
			var partes1 = partes[0].split("/");
			d.setDate( partes1[0] ); //dia
			d.setMonth( partes1[1]-1 ); //mes
			d.setFullYear( parseInt(partes1[2])+2000 ); //año
			var partes2 = partes[1].split(":");
			d.setHours( partes2[0] ); //horas
			d.setMinutes( partes2[1] ); //minutos
			d.setSeconds( partes2[2] ); //segundos
			return d;
		}
	});
}

function highlightThreads() {
	//ocultamos todos
	$('#threadslist tr').addClass('vbh-noencontrado');
	//ahora los que interesan
	var tr;
	for (var i=0; i<hilos.length; i++) {
		//a resaltar
		$('#threadslist #td_threadtitle_'+hilos[i].id).each( function() {
			tr = $(this).parents('tr');
			tr.removeClass('vbh-noencontrado');
			tr.addClass('vbh-encontrado');
			//miramos si el last post es reciente
			//TODO
		});
	}
}

function clearThreads() {
	//retiramos los estilos de aquellos hilos modificados
	//fuera .vbh-encontrado, .vbh-noencontrado, .vbh-mensajes y .vbh-nuevo
	$('#threadslist tr').removeClass('vbh-noencontrado vbh-encontrado vbh-mensajes vbh-nuevo');
}

function addStyles() {
	GM_addStyle('.vbh-encontrado { opacity:1; }'+ //hilo interesante
	'.vbh-noencontrado { opacity:0.3; }'+ //hilos que no interesan
	'.vbh-mensajes { background-color:rgba(255,180,0,0.3); font-weight:bold; } .vbh-mensajes td { background-color:transparent !important;} '+ //encontrado y con mensajes nuevos
	'.vbh-nuevo { background-color:rgba(0,255,0,0.3); font-weight:bold; } .vbh-nuevo td { background-color:transparent !important;} '+
	'#search-box { padding:6px; font-size:0.9em;}'); //encontrado por primera vez!
}

function loadOptions() {
	//cargamos la ultima busqueda
	busqueda = GM_getValue(document.domain+"-search", "samsung galaxy");
}
function saveOptions() {
	//guardamos la ultima busqueda
	GM_setValue(document.domain+'-search', busqueda);
}

function loadThreads() {
	//cargamos los hilos guardados y su "last post date"
	hilos = new Array();
	hilos = JSON.parse( GM_getValue(document.domain+"-threads", "[]") );
	//habria que limpiar los hilos cuyo last post pase de un mes atras
}

function saveThreads() {
	//guardamos los hilos en seguimiento para este dominio
	GM_setValue(document.domain+'-threads', JSON.stringify(hilos));
}

//inserta la capa de links a la derecha
function addSearchBox() {
	var str = '<div id="search-box"><h3>Buscar</h3><br/></div>';
	$('#threadslist').before(str);
	
	//edit links
	$('#search-box h3').after('vBulletin Hunter - <input class="vBulletinHunter-keys" type="text" value="'+busqueda+'"><input class="vBulletinHunter-search" type="button" value="Buscar"><input class="vBulletinHunter-clear" type="button" value="Borrar Busquedas">');
	$('#search-box input.vBulletinHunter-search').click(function() {
		busqueda = $('input.vBulletinHunter-keys').val();
		saveOptions(); //guardamos la busqueda
		search();
	});
	
	$('#search-box input.vBulletinHunter-clear').click(function() {
		//borramos los hilos en seguimiento
		hilos = new Array();
		saveThreads();
		clearThreads();
	});
}