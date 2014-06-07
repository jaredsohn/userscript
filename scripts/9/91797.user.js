// ==UserScript==
// @name           Goear Plus!
// @namespace      Juampi_Mix
// @description    Añade boton para descargar el tema de Goear.com, rediseña la pagina del reproductor y el popup, para que no carge publicidades.
// @include        http://www.goear.com/listen/*/*
// @include        http://goear.com/listen/*/*
// @include        http://www.goear.com/listenwin.php*
// @include        http://goear.com/listenwin.php*
// @version        1.2.2
// @svc:version    [1.2.2]
// @uso:script     91797
// @require  http://pathto/91797.js?id=usoCheckup&custom=yes
// @require  http://userscripts.org/scripts/source/82206.user.js
// usoCheckup grant permissions for Greasemonkey 1.x+
// @grant GM_getValue
// @grant GM_log
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// ==/UserScript==


function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start)> milliseconds){
			break;
		}
	}
}

function setError(data){
	var pop=document.location.href;
	var regex = new RegExp(/listenwin\.php/i);
	var icond="http://1.bp.blogspot.com/_hUzg9dqfJjM/TFMCBKF3RZI/AAAAAAAAAcA/5S0apGnVKIQ/s1600/glossy-error-icon.jpg";
    if (regex.test(pop)) {
		$('embed')
		.after('<div id="MD" class="tipos" style="padding:10px;color:red;"><img width="32" height="32" alt="" '+
		'src="'+ icond +'" align="middle"><b>'+data+'</b></div>');
	}else{
		$('#options')
			   .after('<div id="MD" class="tipos" style="padding:10px;color:red;"><img width="32" height="32" alt="" '+
		'src="'+ icond +'" align="middle"><b>'+data+'</b></div>');
	}
}

function getXML(id){
	var cache=new Date().getTime();
	var url="http://www.goear.com/externaltrackhost.php?f="+id+"&cb="+cache;
	$.ajax({
		type: "GET",
		url: url,
		dataType:"html",
		success: function(data) {
			// Obtenemos la Url verdadera del sonido
			var file=$("song:last-child",data).attr("path");
			if (file!=undefined){
				var pop=document.location.href;
				var regex = new RegExp(/listenwin\.php/i);
				var icond="http://sobraodeflow.com/Images/Descargar.gif";
				if (regex.test(pop)) {
					$('embed').after('<div id="MD" class="tipos" style="padding-right:10px;"><img width="250" height="80" alt="" '+'src="'+ icond +'" style="Float:center"><a href="'+ file +'?cb='+cache + '"><br /><b>Descargar Archivo / Download File</b><br /><span style="color:red">Click derecho y selecciona <b>Guardar enlace como...</b><br />Right click on link and select <b>Save link as...</b></span></a></p></div>');
				}else{
					$('#options').after('<div id="MD" class="tipos" style="padding-right:10px;"><img width="250" height="80" alt="" '+'src="'+ icond +'" style="Float:center"><a href="'+ file +'?cb='+cache + '"><br /><b>Descargar Archivo / Download File</b><br /><span style="color:red">Click derecho y selecciona <b>Guardar enlace como...</b><br />Right click on link and select <b>Save link as...</b></span></a></p></div>');
				}
			}else{
				setError("Imposible obtener enlace mp3:(Z13)");
			}
		},
		error: function(data,texto,tt){
			setError("Imposible crear enlace,invalid tracker:(Z12)");
		}
	});
}

$(document).ready(function(){
	//Necesitamos leer las url de Goear...
	var el=$("embed").attr("src");
	var regex = new RegExp(/^http:\/\/www.goear.com\/files\/localplayer.swf\?file\=(.+)$/i);
	if (regex.test(el)){
		// extraemos el enlace externo y bajamos el XML
		var Id=el.match(/localplayer.swf\?file\=(.+)$/i);
		if((Id!=null)){
			if ((Id.length==2)){
				// Pasamos la Id,para extraer el mp3 desde el XML
				getXML(Id[1]);
			}else{ setError("No fue posible extraer el enlace de descarga:(Z10/1)"); } 
		}else{setError("No fue posible extraer el enlace de descarga,null:(Z10/0)");}
	}else{
		setError("No fue posible encontrar el archivo flash:(Z11)");
	}// end regex test
});

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Actualizador ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
var SVC = {
	currentVersion: "1.2.2", 
	scriptName: "Goear Plus!", 
	scriptNum: 91797, 

	currentDate: null, userRequestCheck: null, timer: null,
	
	init: function () {
		SVC.currentDate = new Date();
		var cv = parseInt(/[1-9][\d]*/.exec(SVC.currentVersion.replace(/\D/g, "")));

		
		if (!GM_getValue("latest")) GM_setValue("latest", cv );
		if (!GM_getValue("notified")) GM_setValue("notified", false);
		if (!GM_getValue("lastChecked")) GM_setValue("lastChecked", (SVC.currentDate.getTime() - 1000*60*60*25) + "");
		
		
		if (GM_getValue("latest") < cv) {
			GM_setValue("latest", cv);
			GM_setValue("notified", false);
			GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
		}
	},
	verify: function () {
		SVC.userRequestCheck = false;
		var sp = SVC.currentDate.getTime() - parseInt(GM_getValue("lastChecked"));
		

		if (GM_getValue("notified") && (sp / (1000*60*60*24) > 14)) SVC.getInfo();
			

		if (!GM_getValue("notified") && ( sp / (1000*60*60*24) > 1 )) SVC.getInfo();
	},
	getInfo: function () {	
		var uso = 'http://userscripts.org';
		function retrieve(url, re, count) {
			SVC.xhr.get(url, function (status, text) {
				window.clearTimeout(SVC.timer);
				if (status == 404 && SVC.userRequestCheck) SVC.manualErrorMsg();
				if (status == 200) {
					if (re.test(text)) var uv = re.exec(text)[1];
					if (uv) SVC.compare(uv);
					if (!uv && count == 1) {
						retrieve(uso + '/scripts/show/' + SVC.scriptNum, /<h1.+>.+\s([^\s]+)<\/h1>/, 2);
					} else if (!uv && SVC.userRequestCheck) {
						SVC.manualErrorMsg();
					}
				}
			});
			SVC.timer = setTimeout(function () { 
				if (count == 1) retrieve(uso + '/scripts/show/' + SVC.scriptNum, /<h1.+>.+\s([^\s]+)<\/h1>/, 2);
				if (count == 2) SVC.manualErrorMsg();
			}, 2000);
		};
		retrieve(uso + '/scripts/source/' + SVC.scriptNum + '.meta.js', /@svc:version[\s]*\[(.+)\]/, 1);
	},
	xhr: {
		get: function (url, process) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				onload: function (res) { process(res.status, res.responseText); },
			});
		},
	},
	compare: function (version) {
			
						var updatedVersionInt = parseInt(/[1-9][\d]*/.exec(version.replace(/\D/g, "")));
			
			if (updatedVersionInt <= GM_getValue("latest")) {
				if (SVC.userRequestCheck) alert('Comprobacion Automatica Finalizada!\n\n\nUsted esta utilizando la version mas reciente del script \n\n~ ' + SVC.scriptName + ' ~ Version  instalada ' + SVC.currentVersion + '.\n\n  ');
				return;
			}
			
			GM_setValue("notified", true);
			GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
			
			if (SVC.userRequestCheck) {
			
				var reply = confirm('Comprobacion Automatica Finalizada!\n\n\nEl Script ~ ' + SVC.scriptName + ' ~ Actualizo su codigo a la version ' + version + '  \n\nSu version actualmente instalada es ' + SVC.currentVersion + '.\nQuieres Instalar esta nueva version? \n\n  ');
				
				if (reply) self.location.href= ("http://userscripts.org/scripts/source/" + SVC.scriptNum+'.user.js');
				
			} else {
			
				var reply = confirm('Atencion!!! Novedades sobre el Script \n\n ~ ' + SVC.scriptName + ' ~ \n\nEste Script actualizo su codigo a la version ' + version + ' \n\nSu version actualmente instalada es ' + SVC.currentVersion + '.\nQuieres Instalar esta nueva version? \n\n  ');
				
				if (reply) self.location.href= ("http://userscripts.org/scripts/source/" + SVC.scriptNum+'.user.js');
			
			}
		},
	versionInfo: {
		autoChecking: function () {
			SVC.init();
			SVC.verify();
		},
		manualChecking: function () {
			SVC.userRequestCheck = true;
			SVC.getInfo();
		},
	},
	manualErrorMsg: function () {
		var reply = confirm('Alerta!\n\n\nLa busqueda de actualizacion para ~ ' + SVC.scriptName + ' ~ no tubo Exito .\n\nIntentelo nuevamente mas tarde,  o visite ahora la pagina del script para comprobar si hay actualizaciones disponibles. /nPara su informacion, la version actualmente instalada es ' + SVC.currentVersion + '. \n\nQuieres visitar ahora la pagina del Script para comprobar alguna actualizacion?\n\n  ');
		if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
	},
};

GM_registerMenuCommand("Goear Plus! (Buscar Actualizacion)", SVC.versionInfo.manualChecking);
SVC.versionInfo.autoChecking();
