// ==UserScript==
// @name           UnfollowHater
// @namespace      openminded
// @description    Shows who unfollowed you on Tumblr
// @include        http://www.tumblr.com/blog/*
// @author		   Adrian Sanchez aka Openmindeo
// @version        1.0.9
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

function borraElPrimero(array){
	if(array[0]=="")array.shift();
	return array;
}
//FIN UTIL
//*****
//*****
//---COOKIE
function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var object = {val: value, time: exdate.getTime()}
    localStorage.setItem(c_name, JSON.stringify(object));
}
function getCookie(c_name)
{
    var object = JSON.parse(localStorage.getItem(c_name));
    if(object != null){
		var dateString = object.time;
		var now = new Date().getTime();
		if (parseInt(dateString)>parseInt(now))
			return object.val;
	}
    return null;
}
//---FIN COOKIE
//*****
//---VERSION
function checkVersion(){
    var update=getCookie("unfollowHater_updateScript");
    if (update==null || update==""){
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://userscripts.org/scripts/show/112207",
            onload: function(response) {
				var element = document.createElement("div");
				var scriptName ="Unfollow Hater";
				element.innerHTML = response.responseText;
                var version = element.querySelector('div[id="summary"]').getElementsByTagName('p')[1].textContent.replace(new RegExp( "Version:|\\n", "g" ), "");
                console.info(version);
                if(version !== "1.0.9"){
                    var resp = confirm(esEspanol?"Está disponible la verisón "+ version +" del script "+scriptName+", ¿Deseas actualizarlo?":"The version "+ version +" of "+scriptName+" script is available, Do you want to update?");
                    if(resp)
                         window.open("http://userscripts.org/scripts/show/112207");
                    else
                        setCookie("unfollowHater_updateScript","si",3);
                }
            }
        });
    }
}
//---FIN VERSION
//*****
//--AJAX
function ajax(url, iddiv, listado, contador, paginasTotales, tumblelog, tipoAxa){
	GM_xmlhttpRequest({
	  method: "GET",
	  url: url,
	  onerror: function(response) {
		crearBotonError(response.status);
	  },
	  onload: function(response) {
		console.log(url);
		if(tipoAxa=="axa1"){
			crearListadoDesdePagina(response, tumblelog, iddiv, listado, contador, paginasTotales);
		}else if(tipoAxa=="axa2"){
			obtenerCantidadSeguidores(response, tumblelog, listado);
		}
	  }
  });
}

function crearListadoDesdePagina (response, tumblelog, iddiv, listado, contador, paginasTotales){
	if(!error){
		var div = document.createElement("div");
		div.innerHTML = response.responseText;
		listado = alimentarLista(div,listado);
		i++;
		document.getElementById('pageCounter').innerHTML = i+"/"+paginasTotales;
		var userTools = document.getElementById("user_tools");
		if(i==1)
			userTools.style.width=(parseInt(userTools.offsetWidth)+32)+"px";
		if(i==paginasTotales){
			i=0;
			setListas(tumblelog, listado);
			realizarComparacion(tumblelog);
			crearBoton();
			cerrarListado();
			if(virgen)
				window.location = document.URL;
		}
	}
}

function obtenerCantidadSeguidores(response, tumblelog, listado){
		var tempDiv = document.createElement("div");
		tempDiv.innerHTML = response.responseText;
		var head = tempDiv.getElementsByTagName("h1")[0].innerHTML;
		head = head.replace(/\,/g,'');
		head = head.replace(/\./g,'');
		head = head.replace(/\ /g,'');
		head = head.match("[0-9]+");		
		crearLista(head, tumblelog, listado);
		cerrarListado();
}

//---FIN AJAX
//************
function crearNotificador(unfollowers){
	if(unfollowers>0){
		var divNotif = document.createElement("div");
		divNotif.id='unfollow_notif';
		divNotif.setAttribute("style","left:10px; width:"+(unfollowers.length*2)+"px;");
		divNotif.setAttribute("class","tab_notice");
		var notifValue = document.createElement("span");
		notifValue.setAttribute("class","tab_notice_value");
		notifValue.innerHTML = unfollowers;
		divNotif.appendChild(notifValue);
		var nipple = document.createElement("span");
		nipple.setAttribute("class","tab_notice_nipple");
		divNotif.appendChild(nipple);
		document.getElementById("unfollow_button").appendChild(divNotif);
	}
}

function crearEstilo(){
	//AGREGAR ESTILO
	var header = document.getElementsByTagName("head")[0];
	if (!header) { setTimeout(crearBoton,100); }
	var newCss = document.createElement("style");
	newCss.setAttribute("type","text/css");
	var innHTML = "#header #unfollow_button img {opacity: 0.5; width:24px; margin-top:8px; margin-left:10px;}";
	innHTML += "\n#header #unfollow_button img:hover {opacity: 1;cursor:pointer;}";
	innHTML += "#header #error_button img {opacity: 0.7; width:24px; margin-top:8px;; margin-left:10px;}";
	innHTML += "\n#header #error_button img:hover {opacity: 1;cursor:pointer;}";
	newCss.innerHTML = innHTML;
	header.appendChild(newCss);
}

function crearBoton(){
	//BOTON
	var newDiv = document.createElement("div");
	newDiv.id="unfollow_button";
	newDiv.setAttribute("class","tab iconic");
	var unfButton = document.createElement("img");
	unfButton.setAttribute("src","http://media.tumblr.com/tumblr_ltol2vLsnl1qzkqhi.png");
	unfButton.addEventListener("click", mostrarUnfollows, false);
	newDiv.appendChild(unfButton);
	
	document.getElementById('pageCounter').parentNode.style.display="none";
	document.getElementById('pageCounter').innerHTML="";
	var userTools = document.getElementById("user_tools");
	userTools.appendChild(newDiv);
	if(localStorage[getTumblelog()+"_unfollowersList"]!=null){
		var unfollowers = localStorage[getTumblelog()+"_unfollowersList"].split("|||");
		unfollowers = borraElPrimero(unfollowers);
		crearNotificador(unfollowers.length);
	}
}

function crearBotonError(statusCode){
	error = true;
	if(document.getElementById("error_button")==null){
		var errDiv = document.createElement("div");
		errDiv.id="error_button";
		errDiv.setAttribute("class","tab iconic");
		var errButton = document.createElement("img");
		errButton.setAttribute("src","http://media.tumblr.com/tumblr_luxy5iWv8H1qzkqhi.png");
		errButton.addEventListener("click", function(event){mostrarError(statusCode);}, false);
		errDiv.appendChild(errButton);
		document.getElementById('pageCounter').innerHTML="";
		document.getElementById("user_tools").appendChild(errDiv);
		
	}
}

function crearCaja(){

	var newDiv = document.createElement("div");
	newDiv.setAttribute("class","tab iconic");
	var pageCounter = document.createElement("span");
	pageCounter.id="pageCounter";
	pageCounter.setAttribute("title",(esEspanol)?"Páginas Revisadas":"Revised Pages");
	newDiv.appendChild(pageCounter);
	var userTools = document.getElementById("user_tools");
	userTools.appendChild(newDiv);
	
	var borde = document.createElement("div");
	borde.id="containerA";
	borde.setAttribute("style","position:absolute;float:right;opacity:0.9;z-index:100;display:none; background-color:#21364A; padding:8px; margin-left:225px; width:350px; top:95px; -moz-border-radius:7px; -webkit-border-radius:7px;");
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

function cerrarNotif(){
	if(document.getElementById("unfollow_notif")!=null)
		document.getElementById("unfollow_notif").style.display="none";
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
	crearEstilo();
	crearDivDummy();
	crearCaja();
	var tumblelog = getTumblelog();
	if(virgen){
		openListado();
		var lista = document.getElementById("textA");
		var instruccion = "";
		instruccion = "<table align=\"center\" style=\"text-align:justify\" width=\"300px\">";
		instruccion+="<tr><td align=\"center\"><h2><a href=\"http://openmindeo.tumblr.com\" target=\"_blank\">UNFOLLOW HATER</a></h2></td></tr>";
		if(esEspanol){
			instruccion+="<tr><td align=\"center\"><p>No se ha detectado una ejecución anterior del Unfollow Hater desde este navegador para el tumblelog "+tumblelog;
			instruccion+=" por lo que se recopilara lista de followers actuales. Al concluir se refrescará esta página. Por favor espera...</p></td></tr>";
		}else{
			instruccion+="<tr><td align=\"center\"><p>Has not been detected a previous run of the Unfollow Hater from this browser and for the tumblelog "+tumblelog;
			instruccion+=" so it will collect the list of current followers. When is ready this page will be refreshed. Please Wait...</p></td></tr>";	
		}
		instruccion+="</table>";			
		lista.innerHTML += instruccion;
		localStorage.setItem(tumblelog+"_unfollowersList","");
	}
	buscarUnfollower();
		

}

function crearLista(cantFollowers, tumblelog, listadoFollowers){
	var follperpage = 40;
	if(localStorage[tumblelog+"_cantFollowers"]==null)
		localStorage.setItem(tumblelog+"_cantFollowers",cantFollowers);
	else{
		localStorage.setItem(tumblelog+"_newFollowers",cantFollowers);
	}
	var paginaTotal = Math.ceil(cantFollowers/follperpage);
	if(paginaTotal == 0)
		paginaTotal = 1;
	for(var i=0; i<paginaTotal; i++){
		ajax(blogUrl+tumblelog+"/followers/page/"+(i+1), "nuevo", listadoFollowers, i+1, paginaTotal, tumblelog, "axa1"); 
	}
}	

function setListas(tumblelog, listadoFollowers){
	var size = listadoFollowers.length;
	if(localStorage[tumblelog+"_followersList"]==null){
		localStorage.setItem(tumblelog+"_followersList",listadoFollowers.unique().join("|||"));
	}else{
		localStorage.setItem(tumblelog+"_compareList",listadoFollowers.unique().join("|||"));
	}
}

function realizarComparacion(tumblelog){
	var unfollowers = new Array();
	var viejoListado = localStorage[tumblelog+"_followersList"].split("|||");
	if(localStorage[tumblelog+"_compareList"]!=null){
		var nuevoListado = localStorage[tumblelog+"_compareList"].split("|||");
		localStorage.setItem(tumblelog+"_cantFollowersList",viejoListado.length);
		localStorage.setItem(tumblelog+"_cantCompareList",nuevoListado.length);
		
		if(localStorage[tumblelog+"_unfollowersList"]!=null)
			unfollowers=localStorage[tumblelog+"_unfollowersList"].split("|||");
		var c=unfollowers.length;
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
		unfollowers = borraElPrimero(unfollowers);
		localStorage.setItem(tumblelog+"_followersList",nuevoListado.join("|||"));
		localStorage.setItem(tumblelog+"_unfollowersList",unfollowers.unique().join("|||"));
	}
	return unfollowers.length;
	
}

function guardarTotalUnfollowers(tumblelog){
	var unfollowers = new Array();
	var allUnfollowers = new Array();
	var actualFollowers = new Array();
	if(localStorage[tumblelog+"_followersList"]!=null)
		actualFollowers = localStorage[tumblelog+"_followersList"].split("|||");
	if(localStorage[tumblelog+"_unfollowersList"]!=null)
		unfollowers=localStorage[tumblelog+"_unfollowersList"].split("|||");
	if(localStorage[tumblelog+"_allUnfollowersList"]!=null)
		allUnfollowers=localStorage[tumblelog+"_allUnfollowersList"].split("|||");
	
	for(var i=0; i<actualFollowers.length; i++){
		for(var j=0; j<allUnfollowers.length; j++){
			if(allUnfollowers[j]==actualFollowers[i]){
				allUnfollowers.splice(j,1);
			}
		}
	}
	var c=allUnfollowers.length;
	for(var i=0; i<unfollowers.length; i++){
		var encontrado=false;
		for(var j=0; j<allUnfollowers.length; j++){
			if(allUnfollowers[j]==unfollowers[i]){
				encontrado=true;
				break;
			}
		}
		if(!encontrado){
			allUnfollowers[c]=unfollowers[i];
			c++;
		}
	}
		
	allUnfollowers = borraElPrimero(allUnfollowers);
	localStorage.setItem(tumblelog+"_followersList",actualFollowers.join("|||"));
	localStorage.setItem(tumblelog+"_allUnfollowersList",allUnfollowers.join("|||"));
}

function mostrarUnfollows(){
	cerrarListado();
	cerrarNotif();
	openListado();
	var tumblelog = getTumblelog();
	var actualFollowers=localStorage[tumblelog+"_cantFollowers"];
	var nuevoFollowers=localStorage[tumblelog+"_newFollowers"];
	if(!localStorage[tumblelog+"_allUnfollowersList"])
		localStorage.setItem(tumblelog+"_allUnfollowersList","")
	var oldUnfollowers = localStorage[tumblelog+"_allUnfollowersList"].split("|||");
	var unfollowers = localStorage[tumblelog+"_unfollowersList"].split("|||");
	unfollowers = borraElPrimero(unfollowers);
	localStorage.setItem(tumblelog+"_cantFollowers",nuevoFollowers);
	var cantViejoListado = localStorage[tumblelog+"_cantFollowersList"];
	var cantNuevoListado = localStorage[tumblelog+"_cantCompareList"];
	var lista = document.getElementById("textA");
	var listaStr="";
	listaStr+="<table align=\"center\"style=\"text-align:center; max-height:600px; overflow:auto;\" width=\"300px\">";
	listaStr+="<tr><td><h2><a href=\"http://openmindeo.tumblr.com\" target=\"_blank\">UNFOLLOW HATER</a></h2></td></tr>";
	listaStr+="<tr><td>";
	listaStr+="<table align=\"center\"style=\"text-align:left; max-height:200px; overflow:auto;\" width=\"300px\">";
	listaStr+=(esEspanol)?"<tr><td colspan=\"3\"><b>Estado Followers:</b></td></tr>":"<tr><td><b>Followers Stats:</b></td></tr>";
	listaStr+="<tr><td></td>";
	listaStr+=(esEspanol)?"<tr><td><a title=\"Es la cantidad de usuarios que muestra Tumblr\"><b>Todos: </a></b></td>":"<tr><td><a title=\"Number of users that shows Tumblr\"><b>All: </b></td>";
	listaStr+="<td>"+nuevoFollowers+"</td></tr>";
	listaStr+=(esEspanol)?"<tr><td><b><a title=\"Cantidad de usuarios que no son spam, bots y que no están bloqueados\">No bloqueados:</a></b></td>":"<tr><td><a title=\"Number of users that aren't spam, bots or blocked.\"><b>Non-blocked:</a></b></td>";
	listaStr+="<td>"+cantNuevoListado+"</td></tr>";
	listaStr+="</table><hr/></td></tr>";
	listaStr+="<tr><td><b>Total "+(esEspanol?"Nuevos":"New")+" Unfollowers: </b>"+unfollowers.length+"</td></tr>";
	if(unfollowers.length>0)
		listaStr+="<tr><td style=\"font-size:11px\">"+((esEspanol)?"Estos blogs han dejado de seguirte, cambiaron su nombre, borraron su cuenta, fueron marcados como bloqueados o spam (por Tumblr) o simplemente dejaron de aparecer en la lista de followers y puede que aún te sigan: ":"These blogs have ceased to follow you, are renamed, deleted their account, have been blocked, marked as spam (by Tumblr) or simply they don't appear in your followers list anymore but maybe they still following you.")+"</td></tr>";
	for(var k=0; k<unfollowers.length; k++){
		var color=(k%2==0)?"#BAC4CF":"#F0F8FF";
		listaStr+="<tr><td style=\"text-align:center; background-color:"+color+"\"><a href=\"http://"+unfollowers[k]+".tumblr.com\" target=\"_blank\">"+unfollowers[k]+"</a></td></tr>";
	}
	listaStr+="</table>";
	if(oldUnfollowers.length>0){
		listaStr+="<div width=\"300px\">";
		listaStr+="<div onclick=\"if(document.getElementById('oldUnfollowers').style.display=='block'){document.getElementById('oldUnfollowers').style.display='none';}else{document.getElementById('oldUnfollowers').style.display='block';}\" style=\"background-color:#C0D7F0; width:100%; cursor: pointer; text-align:center;\" align=\"center\"><b>"+(esEspanol?"Antiguos Unfollowers":"Old Unfollowers")+"</b></div>";
		listaStr+="<table id=\"oldUnfollowers\" align=\"center\" width=\"300px\" style=\"text-align:center; background-color:#C0D7F0; display: none; max-height:200px; overflow:auto;\">";	
		listaStr+="<tr><td width=\"300px\"><b>Total: </b>"+oldUnfollowers.length+"</td></tr>";
		for(var k=0; k<oldUnfollowers.length; k++){
			var color=(k%2==0)?"#BAC4CF":"#F0F8FF";
			listaStr+="<tr><td width=\"300px\" style=\"background-color:"+color+"\"><a href=\"http://"+oldUnfollowers[k]+".tumblr.com\" target=\"_blank\">"+oldUnfollowers[k]+"</a></td></tr>";
		}
	}
	listaStr+="</table></div>";
	document.getElementById("imgLoading").style.display="none";
	lista.innerHTML += listaStr;
	document.getElementById("close").style.display="block";
	guardarTotalUnfollowers(tumblelog);
	localStorage.setItem(tumblelog+"_unfollowersList","");
}

function mostrarError(statusCode){
	openListado();
	document.getElementById("imgLoading").style.display="none";
	var cuadro = document.getElementById("textA");
	cuadro.innerHTML="";
	var instruccion="";
	instruccion += "<table align=\"center\" style=\"text-align:justify\" width=\"300px\">";
	instruccion+="<tr><td align=\"center\"><h2><a href=\"http://openmindeo.tumblr.com\" target=\"_blank\">UNFOLLOW HATER</a></h2></td></tr>";
	var intStatusCode = parseInt(statusCode);
	if(esEspanol){
		if(intStatusCode>=400 && intStatusCode<500){
			instruccion+="<tr><td><p><b>Error "+statusCode+".</b><br/>Error del script al intentar realizar la búsqueda, por favor envíame un <a href=\"http://openmindeo.tumblr.com/submit\">submit</a> con un screenshot de esta pantalla.</p></td></tr>";
		}else if(intStatusCode>=500 && intStatusCode<600){
			instruccion+="<tr><td><p><b>Error "+statusCode+".</b><br/>Error del servidor de tumblr al intentar realizar la búsqueda, el servidor no está aceptando las peticiones del script. Por favor intenta más tarde cuando el servicio de Tumblr funcione con normalidad.</p></td></tr>";
		}else if(intStatusCode==999 || !intStatusCode){
			instruccion+="<tr><td><p><b>Error.</b><br/>Tiempo agotado para la solicitud (conexión muy lenta), no se pudo obtener el listado de followers, refresca e intenta nuevamente.</p></td></tr>";
		}
	}else{
		if(intStatusCode>=400 && intStatusCode<500){
			instruccion+="<tr><td><p><b>Error "+statusCode+".</b><br/>Script error while sending request to tumblr, please send me a screenshot with this message to my <a href=\"http://openmindeo.tumblr.com/submit\">Submit</a></p></td></tr>";
		}else if(intStatusCode>=500 && intStatusCode<600){
			instruccion+="<tr><td><p><b>Error "+statusCode+".</b><br/>Tumblr's server error while sending request to Tumblr, the server is not accepting the script'ss requests. Please try again later when the Tumblr service will operate normally.</p></td></tr>";
		}else if(intStatusCode==999 || !intStatusCode){
			instruccion+="<tr><td><p><b>Error.</b><br/>Timeout for the request (too slow connection), failed to get the list of followers, refresh and try again.</p></td></tr>";
		}
	}
	instruccion+="</table>";			
	cuadro.innerHTML += instruccion;
	document.getElementById("close").style.display="block";
	
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
	i=0;
	setTimeout(function(){
		var tumblelog = getTumblelog();
		ajax(blogUrl+tumblelog+"/followers/", null, new Array(), null, null, tumblelog, "axa2");
	},2000);
}

var error = false;
var virgen = (localStorage[getTumblelog()+"_followersList"]==null);
var blogUrl = "http://www.tumblr.com/blog/";
var i=0;
var esEspanol = (navigator.language.indexOf("es")!=-1);
checkVersion();
if(document.URL.indexOf(blogUrl)!=-1){
	obtenerListadoFollowers();
}
