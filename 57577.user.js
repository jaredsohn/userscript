// ==UserScript==
// @name           Заголовок альянсового сообщения
// @autor          Oberon
// @email          damn_it@tiscali.it
// @namespace      Ikariam
// @description    В общих альянсовых сообщения меняет заголовок на часть сообщения (до сорока знаков)
// @include        http://*.ikariam.*/*view=diplomacyAdvisor*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==



var tabella = document.getElementById("messages").getElementsByTagName("table")[0];
var righe = tabella.getElementsByTagName("tr");
var title;
var test = "";

for (i in righe) {
	if (righe[i].id.indexOf("message")==0) {
		title = righe[i].getElementsByTagName("td")[3];
	}
	if (righe[i].id.indexOf("tbl_mail")==0) {
		testo = righe[i].getElementsByTagName("div")[0].innerHTML;
		if (testo.indexOf("<br") > 0) {
			newTitle = testo.substring(0, Math.min(testo.indexOf("<br"),35));
		} else {
			newTitle = testo.substring(0, Math.min(testo.length,35));
		}
		if (title.innerHTML.indexOf("-") > 0) {			
			title.innerHTML = newTitle;	
		}
	}
}