// ==UserScript==
// @name           minionemanga
// @author         ameboide
// @version        091129
// @namespace      http://userscripts.org/scripts/show/59846
// @description    shows only the image and the chapter/page selectors. works via ajax and preloads the next page
// @include        http://*onemanga.com/*
// ==/UserScript==//

var nuevos = document.body.innerHTML.match(/manga\/new\.gif/g);
if(nuevos && nuevos.length == 1){
	var url = document.body.innerHTML.match(/href="(.+?)".+?manga\/new\.gif/)[1];

	var x = new XMLHttpRequest();
	x.onreadystatechange=function(){
		if (x.readyState == 4 && x.status == 200){
			document.location.href = 'http://www.onemanga.com'+x.responseText.match(/<a href="(.+)">Begin reading/i)[1];
		}
	};
	x.open('GET', url, true);
	x.send(null);
}

if(document.location.href.match(/onemanga.com\/[^\/]+\/[^\/]+\/?$/))
	document.location.href = 'http://www.onemanga.com'+document.body.innerHTML.match(/<a href="(.+)">Begin reading/i)[1];

var idxArrays= new Array(); //indices de los extremos de los arrays
idxArrays[-1] = idxArrays[1] = 0;

var imagen = new Array(); //[-1]=back, [1]=next
var titulo = new Array(); //titulo de la pagina[i]
var link = new Array(); //[-2]=prefetcheable back, [-1]=back, [0]=actual, [1]=next, [2]=prefetcheable next
var pagSel = new Array(); //contenido del select para cambiar pag, q cambia cuando cambio de capitulo

var sel = get('id_chapter_1');
if(sel){
	try{
		setear(document.body.parentNode.innerHTML, 0); //seteo el contenido de la pag inicial

		document.body.innerHTML = '<div style="text-align:center;color:#fff"><img id="imagen"/><br/>' +
			sel.parentNode.innerHTML + '</div>';

		get('btn-next-1').id = 'btn1';
		get('btn-back-1').id = 'btn-1';

		window.addEventListener('keydown', tecla, true);
		setEvt('id_chapter_1', 'change', selcap);
		setEvt('id_page_select', 'change', selpag);
		setEvt('btn1', 'click', btnnext);
		setEvt('btn-1', 'click', btnback);
		setEvt('imagen', 'click', btnnext);

		cambiaPag(0);
		prefetch(1);
		prefetch(-1);
	}
	catch(e){ alert(e); }
}

function get(id){
	return document.getElementById(id);
}

function setEvt(id, evt, fun){
	get(id).addEventListener(evt, fun, true);
}

//setea la imagen y el link como vars globales para actualizar
function setear(html, dir){
	try{
		imagen[dir] = html.match(/<div class="one-page">(.|\n)+? src="(.+?)"/)[2];
		if(dir) link[2*dir] = dir > 0 ? html.match(/var next = '(.+?)'/)[1] : html.match(/var back = '(.+?)'/)[1];
		else{
			link[1] = html.match(/var next = '(.+?)'/)[1];
			link[0] = document.location.href;
			try{link[-1] = html.match(/var back = '(.+?)'/)[1];}catch(e){link[-1]=null;}
		}
		pagSel[dir] = html.match(/id_page_select.+?>((.|\n)+?)<\/select>/)[1];
		try{ titulo[dir] = html.match(/<title>(.+?)<\/title>/)[1]; }
		catch(e){ titulo[dir] = link[dir]; }
		
		idxArrays[dir] = dir;
	}
	catch(e){ imagen[dir] = null; }
}

//muestra la imagen q viene en esta direccion y prefetchea el link futuro
function cambiaPag(dir){
	if(dir && get('btn' + dir).disabled) return;
	if(!imagen[dir]){
		document.location.href = link[dir];
		return;
	}

	document.title = titulo[dir];
	get('imagen').src = imagen[dir];
	scroll(0, 0);

	if(dir){
		setCol(-dir, '#cec');
		get('btn' + (-dir)).disabled = false;
		//shifteo los arrays
		idxArrays[-1]-=dir;
		idxArrays[1]-=dir;
		var i = idxArrays[-dir];
		for(link[i-dir] = link[i]; i != idxArrays[dir]+dir; i += dir){
			link[i] = link[i+dir];
			imagen[i] = imagen[i+dir];
			titulo[i] = titulo[i+dir];
			pagSel[i] = pagSel[i+dir];
		}
		link[i] = link[i+dir];
	}

	//selecciona el capitulo/pagina de los selects
	var capPag = link[0].match(/\/([^\/]+)\/([^\/]+)\/?$/);
	var cap = capPag[1];
	var pag = capPag[2];
	get('id_page_select').innerHTML = pagSel[0];
	get('id_page_select').value = pag;
	var opciones = get('id_chapter_1').innerHTML;
	var op = '<option value="';
	opciones = opciones.substr(opciones.indexOf(op + cap + '/') + op.length);
	get('id_chapter_1').value = opciones.substr(0, opciones.indexOf('"'));

	//prefetcheo la pag q viene en esta direccion
	if(dir) prefetch(dir);
}

function prefetch(dir){
	if(idxArrays[-1] && idxArrays[1] || !link[dir]) return;

	setCol(dir, '#eee'); //boton gris mientras no ha loadeado
	get('btn1').disabled = get('btn-1').disabled = true;

	var xmlhttp = new XMLHttpRequest();
	if (xmlhttp!=null)
	{
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				setear(xmlhttp.responseText, dir);
				var img = new Image();
				img.src = imagen[dir];

				get('btn1').disabled = get('btn-1').disabled = false;
				setCol(dir, '#eec'); //boton amarillo mientras prefetchea

				img.addEventListener('load' , function(){setCol(dir, '#cec');}, true); //ok, boton verde
				img.addEventListener('error', function(){setCol(dir, '#ecc');}, true); //nok, boton rojo
				img.addEventListener('abort', function(){setCol(dir, '#ecc');}, true); //:clon
			}
		};
		xmlhttp.open('GET', link[dir], true);
		xmlhttp.send(null);
	}
}

//setea el color del boton correspondiente a una direccion
function setCol(dir, col){
	get('btn' + dir).style.backgroundColor = col;
}

//izq/der cambia de pag, excepto con ctrl apretado q scrollea para el lado
function tecla(evt){
	if(evt.keyCode == 39){ //->
		if(!evt.ctrlKey) cambiaPag(1);
		else scroll(document.documentElement.scrollLeft + 50, document.documentElement.scrollTop);
	}
	else if(evt.keyCode == 37){ //<-
		if(!evt.ctrlKey) cambiaPag(-1);
		else scroll(document.documentElement.scrollLeft - 50, document.documentElement.scrollTop);
	}
	else if(evt.keyCode == 116){ //F5
		document.location.href = link[0];
		alert('reloadeando'); //para frenar el reloadeo y q se haga despues del redirect
	}
	else if(evt.keyCode == 220) //º
		document.location.href = link[0];
	else return;
	evt.stopPropagation();
}

function btnnext(evt){
	cambiaPag(1);
	evt.stopPropagation();
}

function btnback(evt){
	cambiaPag(-1);
	evt.stopPropagation();
}

function selcap(evt){
	document.location.href = link[0].match(/^(.+\/)[^\/]+\/[^\/]+\/?$/)[1] +
		get('id_chapter_1').value;
}

function selpag(evt){
	document.location.href = link[0].match(/^(.+\/[^\/]+\/)[^\/]+\/?$/)[1] +
		get('id_page_select').value;
}