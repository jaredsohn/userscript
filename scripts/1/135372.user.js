// ==UserScript==
// @name        Memeficador
// @namespace   openminded
// @description Put memes on your tumblr posts.
// @include     http://www.tumblr.com/inbox*
// @include     http://www.tumblr.com/*new/text*
// @include     http://www.tumblr.com/*new/photo*
// @include     http://www.tumblr.com/*new/quote*
// @include     http://www.tumblr.com/*new/link*
// @include     http://www.tumblr.com/*new/audio*
// @include     http://www.tumblr.com/*new/video*
// @include     http://www.tumblr.com/edit/*
// @include     http://www.tumblr.com/reblog/*
// @include 	http://www.tumblr.com/blog/*/messages*
// @author      Adrian Sanchez aka Openmindeo
// @version     1.0.2
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
 
//---UTIL
//*****
//OBTENIDO DE STACKOVERFLOW http://stackoverflow.com/questions/10937867/getting-content-from-tinymce-with-userscripts-in-chrome/10945308#10945308
//PARA HACERLO FUNCIONAR EN CHROME SIN NECESIDAD DE UNA EXTENSION APARTE
var bGreasemonkeyServiceDefined     = false;

try {
	if (typeof Components.interfaces.gmIGreasemonkeyService === "object") {
		bGreasemonkeyServiceDefined = true;
	}
}
catch (err) {
	//Ignore.
}
if ( typeof unsafeWindow === "undefined"  ||  ! bGreasemonkeyServiceDefined) {
	unsafeWindow    = ( function () {
		var dummyElem   = document.createElement('p');
		dummyElem.setAttribute ('onclick', 'return window;');
		return dummyElem.onclick ();
	} ) ();
}
//*****	
Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});
 
function borraElPrimero(array){
    if(array[0]=="")array.shift();
    return array;
}
//---FIN UTIL
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
function checkCookie()
{
      var update=getCookie("memeficacion_updateList");
      if (update==null || update==""){
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://openmindeo.comuv.com/memeList.php",
            onload: function(response) {
				var element = document.createElement("div");
				element.innerHTML = response.responseText;
                var textList = element.querySelector('div[id="list"]').textContent;
                localStorage.setItem("memeficacion_memeList",textList);
            }
        });
        setCookie("meme_updateList","si",1);
      }
}
//---FIN COOKIE
//*****
//---VERSION
function checkVersion(){
    var update=getCookie("memeficacion_updateScript");
    if (update==null || update==""){
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://userscripts.org/scripts/show/135372",
            onload: function(response) {
				var element = document.createElement("div");
				element.innerHTML = response.responseText;
                var version = element.querySelector('div[id="summary"]').getElementsByTagName('p')[1].textContent.replace(new RegExp( "Version:|\\n", "g" ), "");
                if(version !== "1.0.2"){
                    var resp = confirm(esEspanol?"Está disponible la verisón "+ version +" del script Memeficador, ¿Deseas actualizarlo?":"The version "+ version +" of Memeficador script is available, Do you want to update?");
                    if(resp)
                         window.open("http://userscripts.org/scripts/show/135372");
                    else
                        setCookie("memeficacion_updateScript","si",3);
                }
            }
        });
    }
}
//---FIN VERSION
//*****
//---INTERFACE
function crearEstilo(){
	//AGREGAR ESTILO
	var header = document.getElementsByTagName("head")[0];
	if (!header) { setTimeout(crearBoton,100); }
	var newCss = document.createElement("style");
	newCss.setAttribute("type","text/css");
	var innHTML = "#header #memeficator_button img {opacity: 0.8; width:24px; margin-top:8px; margin-left:10px;}";
	innHTML += "\n#header #memeficator_button img:hover {opacity: 1;cursor:pointer;}";
	newCss.innerHTML = innHTML;
	header.appendChild(newCss);
	
}

function crearBoton(){
    //BOTON
    var newDiv = document.createElement("div");
    newDiv.id="memeficator_button";
    newDiv.setAttribute("class","tab iconic");
    var unfButton = document.createElement("img");
    unfButton.setAttribute("src","http://media.tumblr.com/tumblr_m57zd3lIS61qzkqhi.png");
    unfButton.addEventListener("click", mostrarListadoMemes, false);
    newDiv.appendChild(unfButton);
    document.getElementById("user_tools").appendChild(newDiv);
}
 
function crearCaja(){
    var borde = document.createElement("div");
    borde.id="memeficacion_containerA";
    borde.setAttribute("style","position:absolute;float:right;opacity:0.9;z-index:100;display:none; background-color:#21364A; padding:8px; margin-left:225px; width:535px; height;10px; top:95px; -moz-border-radius:7px; -webkit-border-radius:7px;");
    var newDivA = document.createElement("div");
    newDivA.id="memeficacion_listA";
    newDivA.setAttribute("style","z-index:99;background-color:#F0F8FF;padding:6px;");
    var newTextA = document.createElement("div");
    newTextA.id="memeficacion_textA";
     
    var cerrar = document.createElement("a");
    cerrar.id="memeficacion_close";
    cerrar.setAttribute("href","#");
    cerrar.innerHTML="X";
    cerrar.setAttribute("style","display:none; text-decoration:none;font-weight:bold;margin-left:510px;");
    cerrar.setAttribute("onclick","document.getElementById(\"memeficacion_textA\").innerHTML=\"\";document.getElementById(\"memeficacion_containerA\").style.display=\"none\";document.getElementById(\"memeficacion_close\").style.display=\"block\"");
    newDivA.appendChild(cerrar);
    newDivA.appendChild(newTextA);
    borde.appendChild(newDivA);
    document.getElementById("container").appendChild(borde);
}
 
function cerrarListadoMemes(){
    document.getElementById("memeficacion_textA").innerHTML="";
    document.getElementById("memeficacion_containerA").style.display="none";
    document.getElementById("memeficacion_close").style.display="block";
}
 
function openListadoMemes(){
    document.getElementById("memeficacion_containerA").style.display="block";
    document.getElementById("memeficacion_close").style.display="none";
}
 
function mostrarListadoMemes(){
    cerrarListadoMemes();
    openListadoMemes();
    var memeList = localStorage["memeficacion_memeList"].split("|||");
    memeList = borraElPrimero(memeList);
    var styles = "float:left; width:32%; background-color:inherit; padding 50%;"
    var lista = document.getElementById("memeficacion_textA");
    var listaStr="<div>";
    listaStr+="<div align=\"center\" style=\"text-align:center; max-height:400px; overflow:auto; \" >";
    listaStr+="<div><div><h2><a href=\"http://openmindeo.tumblr.com\" target=\"_blank\">MEMEFICADOR</a></h2></div></div>";
    listaStr+="<div><div style=\"font-size:11px\">"+((esEspanol)?"Listado de palabras para usar los memes, al detectar alguna de estas palabras (incluyendo los dos puntos) serán reemplazadas por la imagen de sus respectivos memes. Este listado se actualizará automáticamente sin necesidad de actualizar el script. Puedes hacer clic en el nombre para obtener información sobre el meme, también puedes hacer clic en la imagen para verla más grande. ":"Wordlist for memes, by detecting any of these words (incluiding colon) it will be replaced by their meme picture. This list is automatically updated without needing update the script. You can click on the name for information about the meme, also you can click on the image to see it bigger.")+"</div></div>";
    listaStr+="<div style=\"font-weight:bold;\"><div style=\""+styles+" background-color:"+color+"\">"+((esEspanol)?"Nombre del meme":"Meme name")+"</div><div style=\""+styles+"\">"+((esEspanol)?"Palabra para usarlo":"Word to use it")+"</div><div style=\""+styles+"\">"+(esEspanol?"Imagen":"Picture")+"</div></div>";
    for(var k=0; k<memeList.length; k++){
        var memeInfo = memeList[k].split("&&");
        if(typeof memeInfo[1]!== "undefined"){
			var color=(k%2==0)?"#BAC4CF":"#F0F8FF";
			listaStr+="<div style=\"margin-bottom: 15px; padding: 10px; color: #0A416B; clear:both; background-color:"+color+"; width:100%; height:100px;\"><div style=\""+styles+"\"><a href=\""+memeInfo[0]+"\" target=\"_blank\">"+memeInfo[1]+"</a></div><div style=\""+styles+"\">"+memeInfo[2]+"</div><div style=\""+styles+" padding: 10px;\"><a href=\""+memeInfo[3]+"\" target=\"_blank\"><img src=\""+memeInfo[4]+"\" width=\"100px\" height=\"85px\"/></a></div></div>";
		}
    }
    listaStr+="</div></div>";
    lista.innerHTML += listaStr;
    document.getElementById("memeficacion_close").style.display="block";
}
//---FIN INTERFACE
//*****
//---EJECUCION
function reemplazarPalabras(){ //LA MAGIA O EL NÚCLEO DEL SCRIPT...
    var tm = (unsafeWindow.tinyMCE) ? unsafeWindow.tinyMCE : null;
    var tieneMce = tm!=null;
    var esUnTextarea = textEle?textEle.tagName === "textarea":null;
    var newContent;

    if(tieneMce || esUnTextarea){
        newContent = tieneMce?tm.activeEditor.getContent():textEle.innerHTML; //OBTENER EL CONTENIDO DEL EDITOR
        var memeList = localStorage["memeficacion_memeList"].split("|||");
        if(memeList!=null && memeList.length>0){
			memeList = borraElPrimero(memeList);
			for(var k=0; k<memeList.length; k++){
				var memeInfo = memeList[k].split("&&");
				if(typeof memeInfo[1]!== "undefined"){
					var imgSrc = "<img src=\""+memeInfo[3]+"\"/>";
					var word = memeInfo[2];
					newContent = newContent.replace(memeInfo[2],imgSrc);//REEMPLAZAR
				}
			}
			 
			//COLOCAR
			if(tieneMce){
				var content = tm.activeEditor.getContent();
				if (newContent != content) {
					var marker = tm.activeEditor.selection.getBookmark(2, true);
					tm.activeEditor.setContent(newContent);
					tm.activeEditor.selection.moveToBookmark(marker);  
			   }
			}
			if(esUnTextarea)
				textEle.innerHTML = newContent;
		}
    }
}
function elemClickeado(event){
    textEle = event.target;
}
function main(){
	crearEstilo();
	crearBoton();
	crearCaja();
    checkCookie();
    checkVersion();
    document.body.addEventListener("click", function(e){elemClickeado(e)}, false);
    setInterval(reemplazarPalabras,500);
}
//---FIN EJECUCION
var esEspanol = (navigator.language.indexOf("es")!=-1);
var textEle;
main();
