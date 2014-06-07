// ==UserScript==
// @name		Web videos BBcode
// @namespace		DJMeu
// @description		Script para poder obtener el BBcode de los vídeos de YouTube y Dailymotion fácilmente
// @include		http://www.youtube.com/watch?v=*
// @include		http://www.dailymotion.com/*
// @version		1.2
// ==/UserScript==

version='1.2';
scripturl='http://userscripts.org/scripts/source/54063.user.js';
scriptname="Web videos BBcode";
//-------------------------------------------------------------------------------------------//

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://userscripts.org/scripts/source/54063.meta.js',
	onload: function(resp) {
		resp.responseText.match(/@version\s+([\d.]+)/);
		updatedversion = RegExp.$1;
		if (version <= updatedversion){
			if (version != updatedversion){
				if (confirm("Se ha encontrado una nueva versi\u00f3n de "+scriptname+" (v" +updatedversion+ "). ¿Desea actualizar?")) {
					document.location.href = scripturl
				}
			}
		}
	}
});
//-------------------------------------------------------------------------------------------//

if(document.location.href.substring(0, 26) == "http://www.dailymotion.com"){
	inicio=document.location.href.indexOf('video')+6;
	video=document.location.href.substring(inicio,500);
	bbcode='[flash=425,344]http://www.dailymotion.com/swf/'+video+'[/flash]';

	caja=document.getElementsByClassName('dmco_text dmco_text_formatted background_5')[6];

	bbcodediv = document.createElement("div");
	bbcodediv.setAttribute("class","dmco_text dmco_text_formatted background_5");
	caja.parentNode.insertBefore(bbcodediv,caja);

	bbcodespan = document.createElement("span");
	bbcodespan.setAttribute("class","embed_span");
	bbcodespan.appendChild(document.createTextNode("BBcode:"));
	bbcodediv.appendChild(bbcodespan);

	bbcodefield = document.createElement("input");
	bbcodefield.setAttribute("type","text");
	bbcodefield.setAttribute("class","text embed_input");
	bbcodefield.setAttribute("readonly","readonly");
	bbcodefield.setAttribute("value",bbcode);
	bbcodefield.setAttribute("onclick","javascript:this.focus();this.select();");
	bbcodediv.appendChild(bbcodefield);
};


if(document.location.href.substring(0, 18) == "http://www.youtube"){
	video=document.location.href.substring(31,42);
	bbcode='[flash=425,344]http://www.youtube.com/v/'+video+'&hl=es&fs=1&[/flash]';

	bbcodediv=document.getElementById('watch-url-div');

	bbcodeForm = document.createElement("form");
	bbcodeForm.setAttribute("name","bbcodeForm");
	bbcodediv.appendChild(bbcodeForm);

	bbcodelabel = document.createElement("label");
	bbcodelabel.appendChild(document.createTextNode("BBcode"));
	bbcodelabel.setAttribute("for","bbcodefield");
	bbcodeForm.appendChild(bbcodelabel);

	bbcodefielddiv = document.createElement("div");
	bbcodefielddiv.setAttribute("class","clearL");
	bbcodeForm.appendChild(bbcodefielddiv);

	bbcodefield = document.createElement("input");
	bbcodefield.setAttribute("type","text");
	bbcodefield.setAttribute("id","bbcodefield");
	bbcodefield.setAttribute("name","bbcodefield");
	bbcodefield.setAttribute("readonly","readonly");
	bbcodefield.setAttribute("value",bbcode);
	bbcodefield.setAttribute("onclick","javascript:document.bbcodeForm.bbcodefield.focus();document.bbcodeForm.bbcodefield.select();");
	bbcodefielddiv.appendChild(bbcodefield);
};