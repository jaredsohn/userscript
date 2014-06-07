// ==UserScript==
// @name           Gladiatus Game
// @namespace      game_glad
// @description    Pulsanti preferiti nel Game
// @include        http://s7.gladiatus.it/game/index.php?mod=*
// @require		http://code.jquery.com/jquery-latest.js
// ==/UserScript==


//Variabili
var url = $(location).attr('href');
var classe ='<style type="text/css"> \n' +
'#text_custom{margin: 75pt 0pt 0px 60px;} \n' +
'#text_custom a {color:#fff;}' ;
var begin_message = "http://s7.gladiatus.it/game/index.php?mod=messages&submod=messageNew&profileName=";

//Creiamo l'array lista membri
lista_membri = new Array ("gogeta2001","stiffmeinster");

// Funzioni
function css(){
	$("head").append(classe);
	}
function trova_hash()
{

	var indice = url.indexOf("sh");
	var sh = url.substring(indice);
	return sh;
	}

function Msg_Corp(){	
$('<span><a href="index.php?mod=guild_main&submod=admin_mail&' + trova_hash() + '"class="messaggio">Msg Corp</a></span>').appendTo('#header_game');
}

function List_Membri(){
$('#header_game').append('<div id="text_custom"></div>');

for (membro in lista_membri) {  
$('#text_custom').append('<span><a href="'+ begin_message + lista_membri[membro] + '&' +trova_hash() +'">' + lista_membri[membro] +'</a></span>');

}
}

css();
Msg_Corp();
List_Membri();
