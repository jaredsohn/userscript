// ==UserScript==
// @name		eSic
// @version		0.02
// @description	eRepublik Spanish Information Channel
// @author		eCitizen AnHeLLiDo
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// @include		http://ww*.erepublik.com*
// ==/UserScript==

var host="http://comunicacion.appburgos.com/";
var scriptUrl="http://userscripts.org/scripts/source/57525.user.js";
var scriptVersion="0.02";

var contenedor="<div id='shouts' class='box'><div class='title'><h1><span>Comunicaci&oacute;n Espa&ntilde;ola</span></h1></div><ul class='tabs'><li id='boetab'><a class='on' href='#'><span>Boletines</span></a></li><li id='artitab'><a href='#'><span>Art&iacute;culos</span></a></li><li id='ordentab' class='last'><a href='#'><span>&Oacute;rdenes</span></a></li><li id='about' class='last'><a href='#'><span>eSic</span></a></li></ul></div><div id='shout_tabs' class='core'><div class='post largepadded'><div class='holder' style='float:left; position:relative;'></div></div></div></div>";
var cargando="<div align='center' style='text-align: center; margin-left: auto; maring-right: auto;'><img src='"+host+"loader-blue.gif'></div>";

var newVersionDialog="<div id='nvdialog' title='Nueva versi&oacute;n disponible'><p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 7px 20px 0;'></span><strong>eSic</strong> ha encontrado una nueva versi&oacute;n disponible. &iquest;Deseas actualizar a esta nueva versi&oacute;n?</p></div>";

var variable=new Array();
variable["about"]=0;
variable["articulo"]=0;
variable["orden"]=0;
variable["boletines"]=0;

function lanzar(file, obj){
	if(variable[obj]==0){
		$("#contenedor .holder").html(cargando);
		GM_xmlhttpRequest({
			method: 'GET',
			url: host+file,
			onload: function(respuesta){
				$("#contenedor .holder").html(respuesta.responseText);
				variable[obj]=respuesta.responseText;
			}
		});	
	}else{
		$("#contenedor .holder").html(variable[obj]);
	}
}

if($(".column:last").find("#contenedor").size() < 1){
	//Evitamos doble carga de contenedor (Como sucede con eR Plus xDD)
	$(".column:last").prepend("<div id='contenedor'></div>");
}
$("#contenedor").html(contenedor);

lanzar("info_reader.php?tipo=2", "boletines");
agregarEstilos();
agregarEventos();

versionTest();

function agregarEstilos(){
	$("#contenedor a span:not(:last)").css("width","80px");
	$("#contenedor #about span").css({"width":"50px","paddingLeft":"5px"});	
}

function agregarEventos(){
	$("#artitab a").click(function(){
			lanzar("info_reader.php?tipo=1", "articulo");
			$("#contenedor a.on").removeClass("on");
			$("#artitab a").addClass("on");			
			return false;								   
	});
	$("#boetab a").click(function(){
			lanzar("info_reader.php?tipo=2", "boletines");
			$("#contenedor a.on").removeClass("on");
			$("#boetab a").addClass("on");			
			return false;								   
	});
	$("#ordentab a").click(function(){
			lanzar("info_reader.php?tipo=3", "orden");
			$("#contenedor a.on").removeClass("on");
			$("#ordentab a").addClass("on");			
			return false;								   
	});
	$("#about a").click(function(){	
			lanzar("about.html", "about");	
			$("#contenedor a.on").removeClass("on");
			$("#about a").addClass("on");			
			return false;								   
	});
}

function versionTest(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: host+"vtest.php",
		onload: function(respuesta){			
			var version=respuesta.responseText.split(", ");
			if(version[0]!="" && version[0]>scriptVersion){
				newVersion(version[0], version[1]);
			}
		}
	});
}

function newVersion(v, critica){
	if(critica=="false"){
		if(confirm("eSic (Comunicaci\u00f3n Espa\u00f1ola) encontr\u00f3 una nueva versi\u00f3n  \n \n Deseas actualizar ahora?")){
			window.location=scriptUrl;
		}
	}else{
		alert("eSic (Comunicaci\u00f3n Espa\u00f1ola) encontr\u00f3 una nueva versi\u00f3n. Pluse Aceptar para actualizar");
		window.location=scriptUrl;
	}		
}
