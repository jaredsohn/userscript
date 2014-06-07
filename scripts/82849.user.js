// ==UserScript==
// @SourceCode	   http://penarrota.homelinux.org/erepublik/spammwars.user.js
// @name           SpammWars
// @author	   eCitizen T4d3o
// @namespace      a
// @description    Spammeo del Partido
// @include        http://www.erepublik.com/*/messages/compose/*
// @include        http://www.erepublik.com/*/badges
// @require	   http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

var currURL = location.href;
var arrURL = currURL.split('/');
BASE_URL = arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/';
var subURL = currURL.substr(BASE_URL.length);

function Config(){
	$("ul.tabs").append('<li><a id="spammwars" href="#"><span>Spamm Wars</span></a></li>');
	$("a#spammwars").click(function() { addSWSettings() });
}

function addSWSettings(){
	$("div.bordersep").hide();
	$("div.holder").hide();
	$("a.on").removeClass('on');
	$("a#spammwars").addClass('on');

	var htmlSettings = '';

	htmlSettings = '<div class="bordersep">';
	htmlSettings += '<INPUT TYPE="checkbox" id="activo"> Activo'
	htmlSettings += '</div>';
	htmlSettings += '<div class="bordersep">';
	htmlSettings += '<input class="text padded" type="text" id="asunto" value="" />';
	htmlSettings += '<br>';
	htmlSettings += '<textarea class="textarea padded" id="mensaje"></textarea>';
	htmlSettings += '<br>';
	htmlSettings += '<input type="button" id="save" value="Guardar">';
	htmlSettings += '</div>';
	$("ul.tabs").after(htmlSettings);
	$("#save").click(function() { saveSettings() });
	
	try {
		//Carga los valores guardados
		$("#activo").attr('checked',GM_getValue('activo'));
		$("#asunto").attr('value',GM_getValue('asunto'));
		$("#mensaje").val(GM_getValue('mensaje'));
	}
	catch(err) {
		alert(err);
	}
}

function saveSettings(){
	GM_setValue("activo",$("#activo").attr('checked'));
	GM_setValue("asunto",$("#asunto").attr('value'));
	GM_setValue("mensaje",$("#mensaje").val());
}

if (subURL.substr(3, 6) == 'badges'){
	Config();
}

if (subURL.substr(3, 8) == 'messages'){

	if(GM_getValue('activo')){
		var iAsunto = document.getElementById('message_subject');
		var iMensaje = document.getElementById('message_body');

		iAsunto.value = GM_getValue('asunto');
		iMensaje.value = GM_getValue('mensaje');
	}
}
