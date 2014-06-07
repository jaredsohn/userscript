// ==UserScript==
// @run-at			document-end
// @name        	AutoSondeator
// @version			1.3
// @description 	Colaboracion con OGamator por sondeos. Automatico
// @updateURL 		http://userscripts.org/scripts/source/168919.meta.js
// @downloadURL 	https://userscripts.org/scripts/source/168919.user.js
// @include        	http://*es.ogame.gameforge.com/game/index.php?page=messages*
// @include        	http://*es.ogame.gameforge.com/game/index.php?page=showmessage*
// @icon			http://www.ogamator.com/Media/ojo.gif
// ==/UserScript==

var $;
var Resultado = "Sondeo no enviado. Error 1";
var IdEspia = "";
var universo = "";

(function(){
	try { $ = unsafeWindow.$; }
	catch(e) { $ = window.$; }
    
    IdEspia = $("meta[name='ogame-player-id']").attr("content");
    universo = document.URL.match(/s([0-9a-zA-Z]+)/)[0].replace("s","");	

	var img = "http://www.ogamator.com/Media/ojito12.gif";
	$('#101.msgNavi').append("<img class='OG' src='" + img + "' alt='OG' />");
    
	$(document).ajaxSuccess(function(e,xhr,settings)
	{
                if ($('form').attr('action').indexOf("page=messages&displayCategory=7") != -1 && $('form').attr('action').indexOf("page=messages&displayCategory=10") != -1) return;
		
		Rastrear();
	});	
})();

function Rastrear(){
	var fecha = "";
	var todo = "";
	var coordenadas = "";
	var cg = "";
	var cs = "";
	var co = "";
	var cl = "";
	var IdPadre = "";	

	$("table#mailz.list tr").each(function(){			
		if($(this).attr("id") != undefined)
		{
			IdPadre = "#" + $(this).attr("id");

			if($(this).attr("id").indexOf("spioDetails_") != -1 && $(IdPadre + " .aktiv.spy").html() != undefined)
			{														
				fecha = $(IdPadre + " .material.spy th.area").html().split("a las ")[1].split("<")[0];

				coordenadas = $(IdPadre + " .material.spy th.area a").html().split("[")[1].split("]")[0];	
				$(IdPadre + " .ResultadoOG").remove();	

				todo = "UNIVERSO="+universo + "&ID_ESPIA=" + IdEspia + "&FECHA=" + fecha + "&";
				$(IdPadre + " .spy.material  td.item").each(function(){
					var nombre = $(this).html();
					nombre = nombre.replace(/^\s+|\s+$/g,"");
					nombre = nombre.replace(/\:/g,"");
					var valor = $(this).next("td").html();
					valor = valor.replace(/^\s+|\s+$/g,"");
					valor = valor.replace(/\./g,"");
					
					if(nombre != "&nbsp;" && nombre.length > 2 ) todo = todo + nombre +"=" + valor + "&";
				});
				
				$(IdPadre + " .fleetdefbuildings.spy td.key").each(function(){
					var nombre = $(this).html();					
					nombre = nombre.replace(/^\s+|\s+$/g,"");
					nombre = nombre.replace(/\:/g,"");						
					var valor = $(this).next("td.value").html();
					valor = valor.replace(/^\s+|\s+$/g,"");
					valor = valor.replace(/\./g,"");
					if(nombre != "&nbsp;" && nombre.length > 2 ) todo = todo + nombre +"=" + valor + "&";
				});
				cg = coordenadas.split(":")[0];
				cs = coordenadas.split(":")[1];
				co = coordenadas.split(":")[2];

			
				if($(IdPadre + " .material.spy th.area").html().split("<figure")[1].split("title=")[1].split(">")[0].indexOf("Luna") > 0 ) 	cl = "1";
				else cl = "0";
				
				todo = todo + "G=" + cg + "&S=" + cs + "&O=" + co + "&L=" + cl;						

				SendDat(todo);
				$(IdPadre + " .spy.material  th.area").append("<div class='ResultadoOG' style='background:#440000;color:Orange;'>"+Resultado+"</div>");

			
				//Enlace a OGamator///////////////////////////
				var eData = {c: coordenadas, uogame: IdEspia, idOjo:"ojo_" + $(this).attr("id")};
			
				$(IdPadre + " .spy.material  th.area div.ResultadoOG").append(" <img id='" +  eData.idOjo + "' src='http://www.ogamator.com/Media/ojo.gif' alt='ogamator' />");
				$("#" + eData.idOjo).css({cursor: 'pointer'});						
				$("#" + eData.idOjo).click(function(){
					$(".frame").remove();
					$("<iframe />", {
						name: 	"InfoJugador",
						id:		"frInfoJug",
						src:	"http://www.ogamator.com/miniinfo.aspx?uni="+universo+"&c="+eData.c+"&u="+eData.uogame,
						style:	"overflow:hidden; top:100px; height:440px; width:200px; float:left",
						class: 	"frame"
					}).appendTo('#rechts');
				});		
			}
		}
	});
}

function SendDat(datos){
	var XMLHttpRequestObject=false;
	
	try 
	{
		// Creacion del objeto AJAX para navegadores no IE
		XMLHttpRequestObject=new ActiveXObject("Msxml2.XMLHTTP");
	} 
	catch(e)
	{
		try	
		{
			// Creacion del objeto AJAX para IE
			XMLHttpRequestObject=new ActiveXObject("Microsoft.XMLHTTP");
		} catch(e) {
			if (!XMLHttpRequestObject && typeof XMLHttpRequest!='undefined') XMLHttpRequestObject=new XMLHttpRequest();
		}
	}
	
	Resultado = "Sondeo no enviado. Error 2";
	
	var selected = datos;

	try 
	{
		if(XMLHttpRequestObject) 
		{
			Resultado = "Sondeo no enviado. Error 3";
			XMLHttpRequestObject.open("POST", "http://www.ogamator.com/colab.aspx", true);
			Resultado = "Sondeo no enviado. Error 4";
			XMLHttpRequestObject.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			Resultado = "Sondeo no enviado. Error 5";
			XMLHttpRequestObject.onreadystatechange = function()
			{
				Resultado = "Sondeo no enviado. Error 6";
				if (XMLHttpRequestObject.readyState == 4 &&	XMLHttpRequestObject.status == 200) {
					Resultado = "Sondeo no enviado. Error 7";
					document.getElementById('divDestino').innerHTML = XMLHttpRequestObject.responseText;
				}
			}
			XMLHttpRequestObject.send(selected);
			Resultado = "Sondeo enviado a OGamator";
		}
	}
	catch(e)
	{		
	}
}