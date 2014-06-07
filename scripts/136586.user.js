// ==UserScript==
// @name           BRChan - Alteracoes no modo de resposta - Board e OP no titulo da pagina
// @namespace      http://*brchan.org
// @include        http://*brchan.org/*/res/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

(function() {
var coisas = document.getElementById("postform").childNodes;
var board,thread;
board = thread = "";
for(var i = 0; i < coisas.length; i++) {
	if(coisas[i].name == "board") {
		board = coisas[i].value;
	}
	if(coisas[i].name == "replythread") {
		thread = coisas[i].value;
	}
}
var texto = board + " - " + thread;
document.title = texto;
}).call(this);
