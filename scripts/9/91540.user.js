// ==UserScript==
// @name           Iberika Banco
// @namespace      iberika
// @description    Gestion bancaria para eRepublik
// @include        http://economy.erepublik.com/*/work/results
// ==/UserScript==

function str2xml(strXML) {
		var objDOMParser = new DOMParser() ;
		var objDoc = objDOMParser.parseFromString(strXML, "text/xml" ) ;
		return objDoc;
	}

function cargar_pagina(url_data, contenedor) {
GM_xmlhttpRequest({
    method: 'GET',
    url: url_data,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        var xmlcargado=str2xml(responseDetails.responseText);
		cia= xmlcargado.getElementsByTagName('employer')[0].getElementsByTagName('id')[0].childNodes[0].nodeValue;
		
		apiIBK= "http://www.iberika.com.es/datos.php";
		GM_xmlhttpRequest({
			method: 'GET',
			url: apiIBK+"?dia="+dia+"&cit="+cit+"&prod="+prod_total+"&cia="+cia,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				//alert (responseDetails.responseText);
				var todo = document.getElementById("content").innerHTML;
				var cabeza_mensaje = (todo.substring(0,todo.indexOf("id=\"charTooltipTdAlready\"")+53));
				var pie_mensaje = (todo.substring(todo.indexOf("<div class=\"cholder_4 work_results\">")));
				var mensaje = "</tr></table></div><div class=\"down\"></div><div class=\"up\"></div><div class=\"repeat\">"+responseDetails.responseText+"</div><div class=\"down\"></div></div><div class=\"clear\"></div>";
				document.getElementById("content").innerHTML = cabeza_mensaje + mensaje + pie_mensaje;
			}
		});
    }
});
}

var fecha = document.getElementById("clock").innerHTML;
var citizen = document.getElementById("menu2").innerHTML;
var content = document.getElementById("content").innerHTML;

var dia = (parseInt(fecha.substring(fecha.indexOf("<strong>")+8,fecha.indexOf("</strong>")).replace(",","")));
var cit = (parseInt(citizen.substring(citizen.indexOf("my-places/company/")+18,citizen.indexOf("nofollow")+7)));
var produccion = (content.substring(content.indexOf("class=\"productivity\""),content.indexOf("class=\"produced\"")));
var prod_total = parseInt(produccion.substring(produccion.indexOf("<big>")+5,produccion.indexOf("</big>")));
	
apixml= "http://api.erepublik.com/v2/feeds/citizens/"+cit;
cargar_pagina(apixml, document.getElementById("content"));