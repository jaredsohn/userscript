// ==UserScript==
// @name           Ogame Redesing Clean & CC
// @namespace      Dark_eye
// @description    Limpia y tonifica
// @include        http://*ogame.*/game/index.php?page=*
// ==/UserScript==
var session = document.URL.match(/session=([0-9a-zA-Z]+)/)[0];

function loadobjs(){
if (!document.getElementById)
return
for (i=0; i<arguments.length; i++){
var file=arguments[i]
var fileref=""
if (file.indexOf(".js")!=-1){ //If object is a js file
fileref=document.createElement('script')
fileref.setAttribute("type","text/javascript");
fileref.setAttribute("src", file);
}
else if (file.indexOf(".css")!=-1){ //If object is a css file
fileref=document.createElement("link")
fileref.setAttribute("rel", "stylesheet");
fileref.setAttribute("type", "text/css");
fileref.setAttribute("href", file);
}
if (fileref!=""){
document.getElementsByTagName("head").item(0).appendChild(fileref)
}
}
}

function menu(nombre, url, imagen, dest, esp)
{
if (dest == null) {dest="_blank";}
if (esp=="cc") {
return 	'<li><span class="menu_icon"><img width="38" height="29" src="http://darkeye9.users.sf.net/dark-coding/icons/'+imagen+'"></span><a onclick="popupWindow(\'index.php?page=allianceBroadcast&'+session+'\',\'Notice\',\'no\',\'no\',\'0\',\'0\',\'no\',\'500\',\'200\',\'no\');" accesskey="" href="#" class="menubutton "><span class="textlabel">'+nombre+'</span></a></li>';
}else{
return 	'<li><span class="menu_icon"><img width="38" height="29" src="http://darkeye9.users.sf.net/dark-coding/icons/'+imagen+'"></span><a target="'+dest+'" accesskey="" href="'+url+'" class="menubutton "><span class="textlabel">'+nombre+'</span></a></li>';
}
}

function menu_s(nombre)
{
return 	'<li><span class="menu_icon"></span><a target="_self" accesskey="" href="#" class="menubutton "><span class="textlabel">'+nombre+'</span></a></li>';
}

function enviar(){
var httpRequest;
httpRequest = new XMLHttpRequest();

if (!httpRequest) {
            alert('No se puede crear una instancia de XMLHTTP');
            return false;
        }
        httpRequest.onreadystatechange = function() { alertContents(httpRequest); };
        httpRequest.open('POST', "index.php?page=allianceBroadcast&"+session, true);
		httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		var data = "empfaenger="+ escape(document.forms[0].elements[0].options[document.forms[0].elements[0].selectedIndex].value)+"&"+"text="+ escape(document.forms[0].elements[1].value);
		httpRequest.send(data);
}

if(document.URL.search("allianceBroadcast") != -1)
{
loadobjs('http://uni106.ogame.com.es/game/css/01style.css');
var links = document.getElementsByTagName('input');
	for (var i = 0; i < links.length; i++) {
		links[i].addEventListener("click", enviar, false); 
	}
}

    function alertContents(httpRequest) {

        if (httpRequest.readyState == 4) {
            if (httpRequest.status == 200) {
                if (httpRequest.responseText.indexOf("fadeBox") != -1) {alert("Mensaje enviado correctamente");}
            } else {
                alert('Error en el envio');
            }
        }

    }

	//Oficiales
	document.getElementById("info").removeChild(document.getElementById("officers"));

	
	//Links derecha
	var links = document.getElementsByTagName('li');
	for (var i = 0; i < links.length; i++) {
		if (links[i].innerHTML.indexOf("Casino") != -1 || links[i].innerHTML.indexOf("Mercader") != -1)
		{
		document.getElementById("menuTable").removeChild(links[i]);
		}
	}
	
	//Pie de pagina
	document.getElementById("siteFooter").innerHTML="<a href='http://darkeye9.users.sourceforge.net/'>Ogame Mod 0.1 By Dark_eye</a>";
	
	//link de notas de version
	document.getElementById("info").removeChild(document.getElementById("changelog_link"));
	
	//Tutorial
	document.getElementById("info").removeChild(document.getElementById("helper"));

	//Cambiar Imagen de cabecera
	loadobjs('http://darkeye9.users.sf.net/dark-coding/mod.css');

	//Añadir extra Links
	document.getElementById("menuTable").innerHTML=
	document.getElementById("menuTable").innerHTML+ 
	menu("Circular", "http://fornax.ogame.com.es/game/index.php?page=alliance&option=cc&"+session, "", "", "cc");
	