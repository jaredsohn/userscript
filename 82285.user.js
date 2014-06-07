// ==UserScript==
// @name           Sistema de denuncias WTF
// @namespace      Taringa
// @description    Sistema de denuncias para la comunidad wtf de taringa desarrollado por Matías Cumillanca (@matthiuleon y otras cuentas (?) y diseñado por Agustin Barrientos (@Eucodance)
// @include        http://www.taringa.net/comunidades/whatthefuck/*
// ==/UserScript==
var $ = unsafeWindow.$; var jQuery = $;
user = $('.navitem.username a').html();
id = window.location.href.split('/')[5];
if (user != 'undefined'){
if (/[0-9]/.test(id)){
$('#menu .clearfix .tabs li:last').after('<li id="denuncia_publica"><a>Denunciar</a></li>');
$('#action-dialogs').after('<div id="dialogo_denuncias" style="display:none;">Contanos, '+user+', la causa de la denuncia:</div>');
$('#denuncia_publica').click(function(){
	$('#dialogo_denuncias').dialog({
		title: 'Denunciar tema',
			width: 500,
			resizable: false,
			buttons: [
				{
					text: "Enviar denuncia",
					'class': 'ui-button-positive box-shadow-soft floatL',
					click: function() {
						alert('denunciado');
					}
				},
				{
					text: "Cancelar",
					'class': 'unfollow-button-text floatR',
					click: function() {
						$(this).dialog("close");
					}
				}
			]
	});
})
}else{
	if (id == 'denuncia_enviada'){
		$('#alertmsg h1').html('Gracias!');
		$('#alertmsg input').hide();
		$('#alertmsg p').html('La denuncia fue enviada '+user+'<br><br><br> <input role="button" type="button" onclick="location.href=\'http://www.taringa.net/comunidades/whatthefuck/\'" title="Volver a la comu" value="Volver a la comu" class="ui-btn mBtn btnOk ui-button ui-widget ui-state-default ui-corner-all">');
	}
}
}else{
are = $('.usernameMenu .username').html();
if (are != 'undefined'){
if (/[0-9]/.test(id)){
	$('.floatL.tabsMenu.clearbeta li:last').after('<li id="denuncia_publica"><a>Denunciar</a></li>')
	$('#denuncia_publica').click(function(){
		$('#mydialog').html('<div id="dialog"><div id="title">Denunciar tema</div><div id="cuerpo"><div id="procesando"><div id="mensaje"></div></div><div id="modalBody">Contanos, '+are+', la causa de la denuncia:</div><div id="buttons"><input type="button" value="Enviar denuncia" style="display:inline-block" class="mBtn btnOk"> <input type="button" onclick="mydialog.close()" value="Cancelar" style="display:inline-block" class="mBtn btnCancel"></div></div></div>');
		$('#mask').css({'width':$(document).width(),'height':$(document).height(),'display':'block'});
		$('#mydialog #dialog').css('position', 'fixed');
		$('#mydialog #dialog').fadeIn('fast');
		if($('#mydialog #dialog').height() > $(window).height()-60)
		$('#mydialog #dialog').css({'position':'absolute', 'top':20});
	else
		$('#mydialog #dialog').css('top', $(window).height()/2-$('#mydialog #dialog').height()/2);
	$('#mydialog #dialog').css('left', $(window).width()/2-$('#mydialog #dialog').width()/2);
	})
}else{
	if (id == 'denuncia_enviada'){
		$('.box_txt.show_error').html('Gracias!');
		$('.box_cuerpo').html('La denuncia fue enviada '+are+'<br><br><br> <input type="button" onclick="location.href=\'http://www.taringa.net/comunidades/whatthefuck/\'" title="Volver a la comu" value="Volver a la comu" style="font-size:13px" class="mBtn btnOk">');
	}
}
}
}