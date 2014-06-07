// Mejor CTP Uniandes
// version 1.1
// 2013-01-25
// Copyright (c) 2013, Jorge Palacio
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Mejor CTP Uniandes", and click Uninstall.
//
// --------------------------------------------------------------------
//
// This script transforms Google Search results evil redirect to take 
// place on left click only, so that you can copy the site URL with a 
// right click or avoid the redirect totally with a middle click.
//
// An option is provided to completely remove the redirect setting true
// the removeRedirectCompletely variable (see source code).
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          	Mejor CTP Uniandes
// @namespace     	http://www.bitajor.com
// @version       	1.0
// @copyright     	2013, Jorge Palacio
// @description  	script que cambia los enlaces de las oportunidades en la página del CTP para poder abrirlas en nuevas pestañas o ventanas.
// @include       	http://ctp.uniandes.edu.co/*
// @include       	https://ctp.uniandes.edu.co/*
// @grant       	GM_xmlhttpRequest
// ==/UserScript==


var prmstr = window.location.search.substr(1);
var prmarr = prmstr.split ("&");
var params = {};

for ( var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}

if( typeof params.oportunidad === "undefined"){
	//no es oportunidad
	
	var allLinks = document.getElementsByTagName('a');
	for (var i = 0; i < allLinks.length; i++) {
		var regex=/javascript\:formSubmit\(/g;
		if ( 
			allLinks[i].href != '' 
			&& regex.test(allLinks[i].href) 
		) { 
			var laoportunidad=allLinks[i].href.split(",")[1];
			laoportunidad = laoportunidad.replace(/'/g, '');
			allLinks[i].href = 'https://ctp.uniandes.edu.co/_joomla/index.php?option=com_content&view=section&id=5&Itemid=378&oportunidad='+laoportunidad;
		}
	}
	
}
else{
	if( params.Itemid!='' && params.Itemid==378){		
		document.body.innerHTML = '<center>Oportunidad: '+params.oportunidad+'<br/><img src="http://www.roundtripbook.com/images/preloader_transparent.gif"/></center>';
		
		
		GM_xmlhttpRequest({
			method: "POST",
			url: "https://ctp.uniandes.edu.co/_joomla/index.php?option=com_content&view=section&id=5&Itemid=378",
			data: "oportunidad="+params.oportunidad+"&servicio=2",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) {
				document.body.innerHTML = "";
            	document.write(response.responseText);
			},
			onerror:function(reponse) {
				alert('error: '+response);
			}
		});
		
	}
}