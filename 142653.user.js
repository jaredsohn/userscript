// ==UserScript==
// @name           asanusta
// @namespace      asanusta
// @description    Tumblr üzerinde unfollow edenleri Gösterir-Shows who unfollowed you on Tumblr
// @include        http://www.tumblr.com/blog/*
// @author		  asanusta
// @version        2.0.0
// @require 	   http://sizzlemctwizzle.com/updater.php?id=112207&days=1
// ==/UserScript==

//***********************************************************************************      
//      This program is free software: you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation, either version 3 of the License, or
//      (at your option) any later version.
//
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//
//      You should have received a copy of the GNU General Public License
//      along with this program.  If not, see http://www.gnu.org/licenses/gpl-3.0.html
//***********************************************************************************

//--UTIL
Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

function getElementsByClass(clase){
	var elementos = new Array();
	var a=0;
	var htmlTags = new Array();
	var htmlTags= document.getElementsByTagName('*');
	for(var i=0; i<htmlTags.length; i++){
		if(htmlTags[i].className == clase){
			elementos[a] = htmlTags[i];
			a++;
		}
	}
	return elementos;
}
//FIN UTIL
//*****
//--AJAX
function ajax(url, id_contenedor, params, listado, contador, paginasTotales, tumblelog, tipoAxa, mostrar){
   var pagina_requerida = false;
    if (window.XMLHttpRequest){
        pagina_requerida = new XMLHttpRequest ();

		if(tipoAxa=="axa1"){
			pagina_requerida.onreadystatechange = function (){
				crearListadoDesdePagina(pagina_requerida, tumblelog, id_contenedor, listado, contador, paginasTotales, mostrar);
			}
		}else if(tipoAxa=="axa2"){
			pagina_requerida.onreadystatechange = function (){
				obtenerCantidadSeguidores(pagina_requerida, tumblelog, listado, mostrar);
			}
		}
		
		pagina_requerida.open('POST', url, true);
		pagina_requerida.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
		pagina_requerida.send(params);
		} 
    else{
		alert("NOMEGUSTAIE;");
	}
    
}

function crearListadoDesdePagina (pagina_requerida, tumblelog, id_contenedor, listado, contador, paginasTotales, mostrar){
    if (pagina_requerida.readyState == 4){
		if(pagina_requerida.status == 200 || window.location.href.indexOf ("http") == - 1){
			var div = document.createElement("div");
			div.innerHTML = pagina_requerida.responseText;
			listado = alimentarLista(div,listado);
			i++;
			var pageText = (esEspanol)?'<a title=\"Cantidad de páginas de seguidores revisadas\">Páginas revisadas</a>':'<a title=\"Number of followers pages revised\">Revised pages</a>';
			document.getElementById('pageCounter').innerHTML = '<center><b>'+pageText+':</b> '+i+'/'+paginasTotales+'</center>';
			if(i==paginasTotales){
				setListas(tumblelog, listado);
				if(mostrar)
					mostrarUnfollows(tumblelog);
				i=0;
			}
		}
	}
}

function obtenerCantidadSeguidores(pagina_requerida, tumblelog, listado, mostrar){
    if (pagina_requerida.readyState == 4){
		if(pagina_requerida.status == 200 || window.location.href.indexOf ("http") == - 1){
			var tempDiv = document.createElement("div");
			tempDiv.innerHTML = pagina_requerida.responseText;
			var head = tempDiv.getElementsByTagName("h1")[0].innerHTML.match("[0-9]+");
			crearLista(head, tumblelog, listado, mostrar);
		}
	}
}
//---FIN AJAX
//************
function crearBoton(){
	//AGREGAR ESTILO
	var header = document.getElementsByTagName("head")[0];
	if (!header) { return; }
	var newCss = document.createElement("style");
	newCss.setAttribute("type","text/css");
	var innHTML = "#header #unfollow_button img {opacity: 0.5; width:24px; margin-top:8px;}";
	innHTML += "\n#header #unfollow_button img:hover {opacity: 1;cursor:pointer;}";
	newCss.innerHTML = innHTML;
	header.appendChild(newCss);
	
	//BOTON
	var newDiv = document.createElement("div");
	newDiv.id="unfollow_button";
	newDiv.setAttribute("class","tab iconic");
	var unfButton = document.createElement("img");
	unfButton.setAttribute("src","http://media.tumblr.com/tumblr_ltol2vLsnl1qzkqhi.png");
	unfButton.addEventListener("click", buscarUnfollower, false);
	newDiv.appendChild(unfButton);
	document.getElementById("user_tools").appendChild(newDiv);
	
	
	var borde = document.createElement("div");
	borde.id="containerA";
	borde.setAttribute("style","position:absolute;float:right;opacity:0.9;z-index:100;display:none; background-color:#21364A; padding:8px; margin-left:225px; width:350px; top:75px; -moz-border-radius:7px; -webkit-border-radius:7px;");
	var newDivA = document.createElement("div");
	newDivA.id="listA";
	newDivA.setAttribute("style","z-index:99;background-color:#F0F8FF;padding:6px;");
	var newTextA = document.createElement("div");
	newTextA.id="textA";
	var pageCounter = document.createElement("div");
	pageCounter.id="pageCounter";
	
	var imgLoading = document.createElement("img");
	imgLoading.id="imgLoading";
	imgLoading.setAttribute("src","http://media.tumblr.com/tumblr_ltol2rpeAN1qzkqhi.gif");
	imgLoading.setAttribute("style","display:block;width:225px;margin-left:65px;");
	var cerrar = document.createElement("a");
	cerrar.id="close";
	cerrar.setAttribute("href","#");
	cerrar.innerHTML="X";
	cerrar.setAttribute("style","display:none; text-decoration:none;font-weight:bold;margin-left:325px;");
	cerrar.setAttribute("onclick","document.getElementById(\"textA\").innerHTML=\"\";document.getElementById(\"containerA\").style.display=\"none\";document.getElementById(\"imgLoading\").style.display=\"block\";document.getElementById(\"close\").style.display=\"block\"");
	newDivA.appendChild(cerrar);
	newDivA.appendChild(newTextA);
	newDivA.appendChild(pageCounter);
	newDivA.appendChild(imgLoading);
	borde.appendChild(newDivA);
	document.getElementById("container").appendChild(borde);

}

function cerrarListado(){
	document.getElementById("textA").innerHTML="";
	document.getElementById("containerA").style.display="none";
	document.getElementById("imgLoading").style.display="block";
	document.getElementById("close").style.display="block";
}

function openListado(){
	document.getElementById("containerA").style.display="block";
	document.getElementById("imgLoading").style.display="block";
	document.getElementById("close").style.display="none";
}

function crearDivDummy(){
	var newDiv = document.createElement("div");
	newDiv.id="nuevo";
	newDiv.setAttribute("style","display:none");
	document.getElementById("header").appendChild(newDiv);
	
	var div = document.createElement("div");
	div.setAttribute("class","post");
	document.getElementById("header").appendChild(div);
}

function getTumblelog(){
	return document.URL.split("/")[4].replace(/[#]/gi,"");
}

function getFollowerElement(claseABuscar, elementoABuscar){
	var elementosPorClase = new Array();
	var a=0;
	var htmlTags = new Array();
	var htmlTags= elementoABuscar.getElementsByTagName('*');
	for(var i=0; i<htmlTags.length; i++){
		if(htmlTags[i].id.indexOf(claseABuscar)!=-1){
			elementosPorClase[a] = htmlTags[i];
			a++;
		}
	}
	return elementosPorClase;
}

function obtenerListadoFollowers(){
	crearDivDummy();
	crearBoton();
	var tumblelog = getTumblelog();

	if(localStorage[tumblelog+"_followersList"]==null){
		
		openListado();
		var lista = document.getElementById("textA");
		if(esEspanol){
			var instruccion = "<table align=\"center\"style=\"text-align:justify\" width=\"300px\">";
			instruccion+="<tr><td><h2><a href=\"http://cokomik.tumblr.com\" target=\"_blank\" >SPYOLLOW</a></h2></td></tr>";
			instruccion+="<tr><td><p>No se ha detectado una ejecución anterior del SPYOLLOW desde este navegador para el tumblelog "+tumblelog;
			instruccion+=" por lo que se recopilara lista de followers actuales. Al concluir se cerrara este cuadro. Por favor espera...</p></td></tr>";
			instruccion+="</table>";			
			lista.innerHTML += instruccion;
		}else{
			var instruccion = "<table align=\"center\"style=\"text-align:justify\" width=\"300px\">";
			instruccion+="<tr><td><h2><a href=\"http://cokomik.tumblr.com\" target=\"_blank\" >SPYOLLOW</a></h2></td></tr>";
			instruccion+="<tr><td><p>Has not been detected a previous run of the SPYOLLOW from this browser and for the tumblelog "+tumblelog;
			instruccion+=" so it will collect the list of current followers. When is ready this box will be closed. Please Wait...</p></td></tr>";
			instruccion+="</table>";			
			lista.innerHTML += instruccion;
		}
		setTimeout(function(){
			var tumblelog = getTumblelog();
			ajax(blogUrl+tumblelog+"/followers/", null, null, new Array(), null, null, tumblelog, "axa2", false);
			cerrarListado();
		},8000);
		
		
	}
		

}

function crearLista(cantFollowers, tumblelog, listadoFollowers, mostrar){
	if(localStorage[tumblelog+"_cantFollowers"]==null)
		localStorage.setItem(tumblelog+"_cantFollowers",cantFollowers);
	else{
		localStorage.setItem(tumblelog+"_newFollowers",cantFollowers);
	}
	var paginaTotal = Math.ceil(cantFollowers/40);
	for(var i=0; i<paginaTotal; i++){
		ajax(blogUrl+tumblelog+"/followers/page/"+(i+1), "nuevo", null, listadoFollowers, i, paginaTotal, tumblelog, "axa1", mostrar); 
	}
}	

function setListas(tumblelog, listadoFollowers){
	if(localStorage[tumblelog+"_followersList"]==null)
		localStorage.setItem(tumblelog+"_followersList",listadoFollowers.unique().join("|||"));
	else
		localStorage.setItem(tumblelog+"_compareList",listadoFollowers.unique().join("|||"));
}

function mostrarUnfollows(tumblelog){
	var actualFollowers=localStorage[tumblelog+"_cantFollowers"];
	var nuevoFollowers=localStorage[tumblelog+"_newFollowers"];
	var viejoListado = localStorage[tumblelog+"_followersList"].split("|||");
	var nuevoListado = localStorage[tumblelog+"_compareList"].split("|||");
	var unfollowers = new Array();
	var c=0;
	for(var i=0; i<viejoListado.length; i++){
		var encontrado=false;
		for(var j=0; j<nuevoListado.length; j++){
			if(nuevoListado[j]==viejoListado[i]){
				encontrado=true;
				break;
			}
		}
		if(!encontrado){
			unfollowers[c]=viejoListado[i];
			c++;
		}
	}
	localStorage.setItem(tumblelog+"_followersList",nuevoListado.join("|||"));
	localStorage.setItem(tumblelog+"_cantFollowers",nuevoFollowers);
	var lista = document.getElementById("textA");
	var listaStr="";
	listaStr+="<table align=\"center\"style=\"text-align:center\" width=\"300px\">";
	listaStr+="<tr><td><h2>SPYOLLOW</h2></td></tr>";
	listaStr+="<tr><td>";
	listaStr+="<table align=\"center\"style=\"text-align:left\" width=\"300px\">";
	listaStr+=(esEspanol)?"<tr><td colspan=\"3\"><b>Estado Followers:</b></td></tr>":"<tr><td><b>Followers Stats<a href=\"http://cokomik.tumblr.com\">:</b></td></tr>";
	listaStr+="<tr><td></td>";
	listaStr+=(esEspanol)?"<td><b>Antes</b></td><td><b>Despues</td></tr>":"<td><b>Before</b></td><td><b>After</td></tr>";
	listaStr+=(esEspanol)?"<tr><td><a title=\"Es la cantidad de usuarios que muestra Tumblr\"><b>Todos: </a></b></td>":"<tr><td><a title=\"Number of users that shows Tumblr\"><b>All: </b></td>";
	listaStr+="<td>"+actualFollowers+"</td>";
	listaStr+="<td>"+nuevoFollowers+"</td></tr>";
	listaStr+=(esEspanol)?"<tr><td><b><a title=\"Cantidad de usuarios que no son spam, bots y que no están bloqueados\">No bloqueados:</a></b></td>":"<tr><td><a title=\"Number of users that no are spam, bots or aren't blocked.\"><b>Non-blocked:</a></b></td>";
	listaStr+="<td>"+viejoListado.length+"</td>";
	listaStr+="<td>"+nuevoListado.length+"</td></tr>";
	listaStr+="</table><hr/></td></tr>";
	for(var k=0; k<unfollowers.length; k++){
		var color=(k%2==0)?"#BAC4CF":"#F0F8FF";
		listaStr+="<tr><td style=\"background-color:"+color+"\"><a href=\"http://"+unfollowers[k]+".tumblr.com\" target=\"_blank\">"+unfollowers[k]+"</a></td></tr>";
	}
	listaStr+="</table>";
	document.getElementById("imgLoading").style.display="none";
	lista.innerHTML += listaStr;
	document.getElementById("close").style.display="block";
	actualFollowers=nuevoFollowers;
}

function alimentarLista(divHTML,listadoGuardar){
	var index = listadoGuardar.length;
	var paginaFollowers = getFollowerElement("follower_",divHTML);
	for(var i=0; i<paginaFollowers.length; i++){
		var url = paginaFollowers[i].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("a")[0].innerHTML.replace("<div class=\"hide_overflow\">","").replace("</div>","");
		listadoGuardar[index] = url;
		index++;
	}
	return listadoGuardar;
}


function buscarUnfollower(){
	cerrarListado();
	openListado();
	setTimeout(function(){
		var tumblelog = getTumblelog();
		ajax(blogUrl+tumblelog+"/followers/", null, null, new Array(), null, null, tumblelog, "axa2", true);
	},2000);
	
}

var blogUrl = "http://www.tumblr.com/blog/";
var i=0;
var esEspanol = (navigator.language.indexOf("es")!=-1);
if(document.URL.indexOf(blogUrl)!=-1){
	obtenerListadoFollowers();
}