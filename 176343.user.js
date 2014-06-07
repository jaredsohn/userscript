// ==UserScript==
// @name       Netflix - Import Cookie Premium
// @author     FernandoXLR
// @version    1.0
// @description  Import Netflix Cookies
// @match      http*://*.netflix.com/*
// @copyright  2013+, You
// ==/UserScript==

function setCookie(key, valor) {
	var hoje = new Date();
	minute = 999 * 24 * 60; 
	var expira = new Date(hoje.getTime() + minute * 60 * 1000);
	var expira = expira.toGMTString();
    var domain2 = ';domain=.netflix.com';
	document.cookie = key + '=' + valor + ';expires=' + expira + domain2;
}

var msg = "Cole o conteúdo do arquivo do cookie nessa área de texto e clique no botão!";

function apply(){
	cont = $('#cookie_text').val();
	if (cont.length > 0){
		txt = cont.split('\n');
		lentxt = txt.length;

		for (i = 0; i < lentxt; i++){
			line = txt[i].split('\t');
			len = line.length;
			key = line[len-2];
			value = line[len-1];
			setCookie(key, value);
		}

		alert('Processo concluído, se não funcionou, tente outro cookie\n\n\t\t\tby FernandoXLR');
		location.href='https://movies.netflix.com/WiHome';
	} else alert(msg);
}

local = $('.form-container');
if ($(local)[0] == null) local = $('header:first').next();
if (location.href.indexOf('movies') == -1)
$(local).before('<div style="width: 310px; padding: 5px; border: #000 solid 3px; background-color: #FFF;"><span>'+msg+'</span><br><textarea id="cookie_text" style="width:300px; height: 400px;"></textarea><br><center><a href="#" onclick="return false;" style="color:#FFF; background-color: red;" id="cookie_login">Login com Cookie</a></center><br><span style="float: right;">by FernandoXLR</span><br></div>');
$('#cookie_login').bind('click', apply);

void(0);