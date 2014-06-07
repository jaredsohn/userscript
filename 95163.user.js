// ==UserScript==
// @name           porlaputeitor
// @author         ameboide
// @version        2011.02.06
// @namespace      http://userscripts.org/scripts/show/95163
// @description    agranda las imagenes al pasar por encima, deja avanzar por posts con el teclado, y carga la pagina siguiente con ajax
// @include        http://porlaputa.com/*
// ==/UserScript==

//saco el tuiters
var tuit = document.getElementById('twitter');
tuit.parentNode.removeChild(tuit);

//al mouseoverear las imgs con link a la img original, muestro la version grande
function mouseoverizar(elem){
	if(!elem) elem = document;
	var imgs = elem.querySelectorAll('.post.photo>a>img');
	for(var i=0;i<imgs.length;i++){
		var a = imgs[i].parentNode;
		var img = document.createElement('img');
		img.src = a.href;
		img.style.display = 'none';
		img.style.position = 'absolute';
		img.style.maxWidth = '100%';
		img.style.zIndex = '2323';
		a.appendChild(img);
		imgs[i].addEventListener('mouseover', imgGrande, true);
		img.addEventListener('mouseout', imgChica, true);
		var txt = a.parentNode.querySelector('p');
		if(txt) a.title = txt.textContent;
	}
}

var agrandada = null;

function imgGrande(evt){
	var a = evt.target.parentNode;
	var grande = a.childNodes[1];
	if(!grande.width) return;
	a.parentNode.style.height = (a.parentNode.offsetHeight-30)+'px';
	a.childNodes[0].style.display = 'none';
	grande.style.display = '';
	if(grande.offsetLeft + grande.offsetWidth > document.documentElement.clientWidth)
		grande.style.left = (document.documentElement.clientWidth - grande.offsetWidth)+'px'
	agrandada = a;
}

function imgChica(evt){
	var a = evt ? evt.target.parentNode : agrandada;
	if(!a) return;
	a.childNodes[0].style.display = '';
	a.childNodes[1].style.display = 'none';
	agrandada = null;
}

mouseoverizar();

//navegar los posts con las flechas izq/der
window.addEventListener('keydown', function(evt){
	var kc = evt.keyCode;
	if(kc==37) scrollear(-1); //izq: patras
	else if(kc==39) scrollear(1); //der: paelante
	else if(kc==190) cargarSgte(); //.: cargar otra pag
	else return;

	evt.stopPropagation();
	evt.preventDefault();
}, true);

var postActual = 0;

function scrollear(dp){
	var posts = document.querySelectorAll('.post');
	postActual+=dp;
	if(postActual<0 || postActual>=posts.length) postActual-=dp;
	else{
		imgChica();
		scroll(0, posts[postActual].offsetTop);
	}
}

//cargar la sgte pag cuando scrolleo cerca del final
var divcont = document.getElementById('content');
window.addEventListener('scroll', function(evt){
	var top = document.documentElement.scrollTop;
	if(!top) top = document.body.scrollTop;

	if(top && divcont.offsetTop+divcont.offsetHeight < top+4223) cargarSgte(true);
}, true);

var pagActual = document.location.href.match(/porlaputa.com\/page\/(\d+)/);
if(!pagActual) pagActual = 1;
else pagActual = Number(pagActual[1]);
var cargando = false;

function cargarSgte(esperar){
	if(cargando) return;
	cargando = true;
	pagActual++;

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if (xhr.readyState == 4){
			if(xhr.status == 200){
				var div = document.createElement('div');
				div.innerHTML = xhr.responseText;
				div.innerHTML = div.querySelector('#content').innerHTML;
				divcont.appendChild(div);
				mouseoverizar(div);

				//si se autollamo por scrolleo, espero un rato antes de reactivarlo pa q no se llame de nuevo mientras no se ha cargado nada
				if(esperar) setTimeout(function(){cargando = false;}, 2000);
				else cargando = false;
			}
			else{ //wtf?
				cargando = false;
				pagActual--;
			}
		}
	};
	xhr.open('GET', '/page/'+pagActual, true);
	xhr.send(null);
}
