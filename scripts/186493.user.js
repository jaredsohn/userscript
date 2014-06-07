// ==UserScript==
// @name           Spam automatico T! por ravenos para forobeta
// @namespace      ravenos
// @author         Shout
// @description    Spam automatico por MP a Taringa! Cuando ya no te pida captcha, envia mensajes cada 10 segundos a los usuarios, sin repetirlos
// @include        http://*taringa.net/*
// @include        http://*www.taringa.net/*
// ==/UserScript==
var $ = unsafeWindow.jQuery, localStorage = unsafeWindow.localStorage;
var storage = {
	get: function(){
		var x = $.parseJSON(localStorage['spammed_nicks']);
		return x[val] || undefined;
	},
	set: function(what, val){
		var x = localStorage['spammed_nicks'] ? $.parseJSON(localStorage['spammed_nicks']) : {};
		x[what] = val;
		localStorage['spammed_nicks'] = JSON.stringify(x);
		return this;
	}
}
localStorage['last_mp'] = localStorage['last_mp'] || time();
var SPAM;
unsafeWindow.SPAM = SPAM = {
	deleteUser: function(t){
		t = $(t);
		var nick = $.trim(t.text());
		storage.set(nick.toLowerCase(), "false");
		t.animate({ opacity: .4 }, 500).removeAttr('onclick').attr('onclick', 'SPAM.addUser($(this).text(), this);return false;');
	},
	showSpammedUsers: function(){
		$('<div class="box"><div class="title clearfix"><h2>Lista negra</h2></div><div id="SPAM-spammed-users"></div></div>').insertAfter('#sidebar > .box:first');
		var html = [], x = $.parseJSON(localStorage['spammed_nicks']);
		for(var i in x){
			if(x[i] == 'false') continue;
			html.push('<a href="#" onclick="SPAM.deleteUser(this);return false;">' + i + '</a>');
		}
		$('#SPAM-spammed-users').html(html.join(', '));
		$('<div class="box"><div class="title clearfix"><h2>Agregar a la lista negra</h2></div><div id="SPAM-add-user">Esto sirve para insertar un usuario al cual NO enviar MPs, como por ejemplo un moderador, as&iacute; se evitan suspensiones tempranas <img src="http://o1.t26.net/images/smiles/grn.gif" /><br /><input type="text" placeholder="Nick del usuario" class="ui-corner-all form-input-text box-shadow-soft" id="SPAM-new-user-input" style="width:200px;margin-bottom:10px" /> <a class="ui-btn ui-button-positive" onclick="SPAM.addUser($(\'#SPAM-new-user-input\').val());return false;"><span class="ui-button-text">Agregar</span></a></div></div>').insertAfter('#SPAM-spammed-users');
		$('<div class="box"><div class="title clearfix"><h2>Cambiar BBCode</h2></div><div><textarea id="SPAM-new-bbcode" style="margin-bottom:10px;width:230px" class="ui-corner-all form-input-text box-shadow-soft"></textarea><br /><a class="ui-btn ui-button-positive" onclick="localStorage[\'bbcode_spam\']=$(\'#SPAM-new-bbcode\').val();$(\'#nbody_fastreply\').val($(\'#SPAM-new-bbcode\').val());$(\'#SPAM-new-bbcode\').val(\'\');mydialog.alert(\'BBCode actualizado\', \'Ok\')"><span class="ui-button-text">Actualizar</span></a></div></div>').insertAfter('#SPAM-spammed-users');
		$('#nbody_fastreply').val(localStorage['bbcode_spam']);
	},
	addUser: function(u, t){
		if(!u) return false;
		if(t){ $(t).animate({ opacity: 1 }); }
		$('#SPAM-new-user-input').val('');
		if(storage.get(u.toLowerCase())){
			alert('Ese usuario ya se encuentra en la lista negra');
			return false;
		}
		storage.set(u.toLowerCase(), "true");
		if(!t){
			$('<a href="#" id="SPAM-new-user-a" onclick="SPAM.deleteUser(this);return false;"></a>').appendTo('#SPAM-spammed-users'); // # c0ded by S h o u t
			$('#SPAM-new-user-a').removeAttr('id').text(u);
		}
	}
};
function time(){ return Math.round((new Date()).getTime() / 1000); }
$(document).ready(function(){
	if(location.hash == '#new-message-success'){
		location.href = '/';
		return false;
	}
	if(/^\/(index\.php)?$/.test(location.pathname)){
		$('#lastCommentsBox-data > .list-element > .subinfo > a, #topsUserBox > div.list > .list-element > .highlight-data > .clearfix > a').each(function(){
			var nick = $.trim($(this).text());
			if(storage.get(nick.toLowerCase()) == 'true') return true;
			storage.set(nick.toLowerCase(), "true");
			location.href = '/mensajes/a/' + nick;
			return false;
		});
	}else if(/^\/mensajes\/(a\/(.+)|redactar\/?)$/.test(location.pathname)){
		SPAM.showSpammedUsers();
		$('#new-message-to').blur(function(){
			if(storage.get($(this).val().toLowerCase())){
				$(this).css('box-shadow', '0 0 3px #f00');
				$('#new-message-to-name').html('<strong>ATENCI&Oacute;N:</strong> ya hab&iacute;as enviado un MP a este usuario antes o est&aacute; en la lista negra'); // por Igorlomas		}else{
				$('#new-message-to-name').html('');
			}
		});
		if(parseInt(localStorage['last_mp']) <= (time() - 10)){
			localStorage['last_mp'] = time();
			if(localStorage['bbcode_spam']){
				storage.set($('#new-message-to').val().toLowerCase(), 'true');
				$('#fastreply-button-text').click();
			}else{
				alert('Tienes que especificar un BBCode a enviar.');
			}
		}else{
			var nm = time() - parseInt(localStorage['last_mp']);
			$('#mynewMessage-text-box > .error').html('Mensaje siguiente en <strong>' + nm + '</strong> segundos');
			setTimeout(function(){
				$('#fastreply-button-text').click();
			}, nm * 10);
		}
	}
});