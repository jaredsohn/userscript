// ==UserScript==
// @name           AnTiPhishing
// @namespace      Juampi_92
// @description    Reemplaza el sistema Anti Phising de Taringa por uno más práctico
// @include        http://*taringa.net/posts/*
// @copyright      Copyright (c) 2011, Juampi_92
// @creator        Juampi_92 ® 2011
// @version        1.0.0
// ==/UserScript==
var LinksPermitidos = /megaupload\.com\.ar|comug\.com\.ar|gamerst\.com\.ar|twitter\.com|xat\.com|tinypaste\.com/;
var V5 = (document.cookie.indexOf("ImMachoMan") == '-1') ? true : false;
function SinIlinksTaringa(){
	if(V5){
		var linksT = document.getElementById("full-col").getElementsByTagName("a");
	}else{
		var linksT = unsafeWindow.$(".post-contenido a");
	}
	var totalinks = linksT.length;
	var itlink = "http://links.itaringa.net/out?";
	var itlinklargo = itlink.length;
	for (i=0; i<totalinks; i++) {
		var href = linksT[i].href;
		if(href.substr(0,itlinklargo) == itlink){
			linksT[i].href = href.substr(itlinklargo);
			unsafeWindow.$(linksT[i]).attr("afuera","si");
		}else{}
	 }
	 
	 unsafeWindow.$("a[afuera=si]").click(function(e){
		var URLinterna = this.href;
		var DirHref = URLinterna.toLowerCase().split('/');
		if( ! DirHref[2].match(LinksPermitidos)  ){
			e.preventDefault();
			if(V5){			
				unsafeWindow.$('<div><div>Deseas continuar a<br><b>'+URLinterna+'</a> ?</b><br><br><small>antiPhishing by Juampi_92</small></div>').dialog({																																		  			width: 400,
				modal: true,
				resizable: false,
				title: 'Estas saliendo de Taringa!',
				buttons: [
					{	text: 'Aceptar','class': 'ui-button-negative floatL',
						click: function () {
						window.open(URLinterna,'_blank');
						unsafeWindow.$(this).dialog('close');}
					},{
						text: 'Cancelar','class': 'floatR',click: function () {unsafeWindow.$(this).dialog('close');}
					}
					]
				});
			}else{
				unsafeWindow.mydialog.show();
				unsafeWindow.mydialog.title('Estas saliendo de Taringa!');
				unsafeWindow.mydialog.body('Deseas continuar a<br><b><u>'+URLinterna+'</u> ?</b><br><br><small>antiPhishing by Juampi_92</small>');
				unsafeWindow.mydialog.buttons(true, true, 'Aceptar', "window.open('"+URLinterna+"','_blank');mydialog.close();", true, false, true, 'Cancelar', 'close', true, true);
				unsafeWindow.mydialog.center();
			}
		}
	});
}
SinIlinksTaringa();