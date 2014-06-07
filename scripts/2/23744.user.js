// ==UserScript==
// @name           BattleKnight Autologin
// @namespace      http://astarothsoftware.blogspot.com
// @include        http://www.battleknight.*/
// @include        http://www.battleknight.*/index.php
// @include        http://battleknight.*/
// @include        http://battleknight.*/index.php
// @include        http://s*.battleknight.*/
// @include        http://s*.battleknight.*/index.php

// ==/UserScript==




/****************************************************************
*																*
*			MultiLanguage AutoLogin For BattleKnight 			*
*			         tested in version: 0.42					*
*																*
*				   By: Astaroth       Version: 0.1				*
*																*
* -------------------------------------------------------------	*
*																*
*		Logueo Automatico para BattleKnight, Multi idioma		*
*				  probado en la version: 0.42					*
*																*
*				 Autor: Astaroth      Version: 0.1				*
*																*
****************************************************************/


//------------------------------------------------------------------------------------------------------------

// Version
version_scriptNum = 23744;
version_timestamp = 1205242022847;
scriptName = "BattleKnight Autologin";

// Cargo variables globales
form = document.getElementById("form");
user = form.elements[0];
pass = form.elements[1];
select = form.elements[2];
idioma = obtenerIdioma();
updateCheck(false);
window.addEventListener("load",doLogin(),false);


//Funciones
function doLogin(){
	pagina = identificarPagina();
	switch(pagina){
		case 0: paginaGeneral();
				break;
		case 1: paginaServidor();
				break;
	}
}

function paginaGeneral(){
	makeMenuToggle();
	user.focus();
	pass.focus();
	if(s != 0 && s <= select.length){
		url = "s" + s + ".battleknight." + idioma;
		select.value = url;
		if(user.value.length && pass.value.length){
			action = "http://" + url + "/bk_verify.php";
			form.setAttribute("action",action);
			form.submit();
		}else{
			setTimeout(doLogin,1000);
		}
	}
}

function paginaServidor(){
	user.focus();
	pass.focus();
	server = obtenerServidor();
	url = "s" + server + ".battleknight." + idioma;
	select.value = url;
	if(user.value.length && pass.value.length){
		action = "http://" + url + "/bk_verify.php";
		form.setAttribute("action",action);
		form.submit();
	}else
		setTimeout(doLogin,1000);
}

function identificarPagina() {
   if (/http\:\/\/bat/.test(location))
	   pagina = 0;
   else if (/http\:\/\/s[0-9]/.test(location)) 
		pagina = 1;
	else 
		pagina = 10;
   return pagina;
}

function obtenerIdioma(){
	idioma = /\.[a-z]{1,3}\//.exec(location);
	idioma = /[a-z]{1,3}/.exec(idioma);
	return idioma;
}

function obtenerServidor(){
	servidor = /[0-9]/.exec(location);
	return servidor;
}

function makeMenuToggle() {
	window["s"] = GM_getValue("s", 0);

	GM_registerMenuCommand(scriptName + " - Server 1 " + (window["s"] == 1? "*" : ""), function() {
		GM_setValue("s", 1);
		location.reload();
	});

	GM_registerMenuCommand(scriptName + " - Server 2 " + (window["s"] == 2 ? "*" : ""), function() {
		GM_setValue("s", 2);
		location.reload();
	});

	GM_registerMenuCommand(scriptName + " - Server 3 " + (window["s"] == 3 ? "*" : ""), function() {
		GM_setValue("s", 3);
		location.reload();
	});

	GM_registerMenuCommand(scriptName + " - Server 4 " + (window["s"] == 4 ? "*" : ""), function() {
		GM_setValue("s", 4);
		location.reload();
	});

	GM_registerMenuCommand(scriptName + " - Server 5 " + (window["s"] == 5 ? "*" : ""), function() {
		GM_setValue("s", 5);
		location.reload();
	});

	GM_registerMenuCommand(scriptName + " - Server 6 " + (window["s"] == 6 ? "*" : ""), function() {
		GM_setValue("s", 6);
		location.reload();
	});

	GM_registerMenuCommand(scriptName + " - Server 7 " + (window["s"] == 7 ? "*" : ""), function() {
		GM_setValue("s", 7);
		location.reload();
	});

	GM_registerMenuCommand(scriptName + " - Server 8 " + (window["s"] == 8 ? "*" : ""), function() {
		GM_setValue("s", 8);
		location.reload();
	});

	GM_registerMenuCommand(scriptName + " - Update Check", function() {updateCheck(true);});
}


// --------- UPDATE ---------

function updateCheck(forced)
{
	if ((forced) || (parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
	{
		try
		{
			GM_xmlhttpRequest(
			{
				method: "GET",
				url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),
				headers: {'Cache-Control': 'no-cache'},
				onload: function(xhrResponse)
				{
					GM_setValue("lastUpdate", new Date().getTime() + "");
					var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "");
					if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp)
					{
						if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?"))
							{GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}
					}
					else if (forced)
						{alert("No update is available for \"" + scriptName + "\"");}
				}
			});
		}
		catch (err)
		{
			if (forced)
				{alert("An error occurred while checking for updates:\n" + err);}
		}
	}
}
/*             Thanks to Jarett for the Update Script
			  http://userscripts.org/scripts/show/20145                   */