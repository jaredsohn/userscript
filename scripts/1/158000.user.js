// ==UserScript==
// @name           eRepublik Fast Messenger
// @namespace      eRepublik
// @description    Esta herramienta te permite enviar mensajes masivos de forma sencilla.
// @include        http://www.erepublik.com/es/main/messages-compose/*
// ==/UserScript==

var $;

function fastmm_setMessageDetails( subject, message )
{
	$("#citizen_subject").val(subject);
	$("#citizen_message").val(message);
}

function fastmm_setMessageDataToOptions()
{
	fastmm_setMessageDetails( GM_getValue( 'fastmm_title', '' ), GM_getValue( 'fastmm_message', '' ) );
}

function fastmm_SaveOptionItems( subject, message )
{
	setTimeout( function() {
		GM_setValue( 'fastmm_title', subject );
		GM_setValue( 'fastmm_message', message );
	}, 0 );
}

function fastmm_ClearMessage()
{
	fastmm_SaveOptionItems( '', '' );
	fastmm_setMessageDetails( '', '' );
}

function fastmm_SetMessageOptions()
{
	fastmm_SaveOptionItems( $("#citizen_subject").val(), $("#citizen_message").val() );
}

(function() {
	if( typeof( unsafeWindow.jQuery ) != 'undefined' ) {
		$ = unsafeWindow.jQuery;
		
		fastmm_setMessageDataToOptions();
		
		$(".msg_title_container").html( 
			"<div class=\"message_item_container form compose\"><div class=\"avatarholder\"><img width=\"35\" height=\"35\"/></div>" + 
			"<div class=\"message_container yellow\"><div class=\"coloured\">Pulsa sobre guardar para copiar el mensaje a la memoria. Pulsa sobre borrar para eliminar la memoria de mensajes.<br />" + 
			"<a href=\"javascript:;\" id=\"fastmmSave\" class=\"fluid_blue_light_medium\" style=\"margin:4px;\"><span class=\"bold\">Guardar</span></a>" +
			"<a href=\"javascript:;\" id=\"fastmmClear\" class=\"fluid_blue_light_medium\" style=\"margin:4px;\"><span class=\"bold\">Borrar</span></a>" +
			"</div></div></div><br />" );
		
		$("#fastmmSave").bind("click", fastmm_SetMessageOptions );
		$("#fastmmClear").bind("click", fastmm_ClearMessage );
	}
})();