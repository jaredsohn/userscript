// ==UserScript==
// @name           4Shared Download sem espera!
// @namespace      http://userscripts.org/scripts/review/96189
// @author         Neto campos artur5@usa.com :-)
// @description    Script para baixar músicas e vídeos sem espera no www.4shared.com
// @include        http://www.4shared.com/audio/*
// ==/UserScript==

var redirect = false; //Defina como true para redireciona http://userscripts.org/scripts/show/96189
var file = unsafeWindow.options.file;
	
		if(redirect) {
				location.replace(file);
		}else{
				if(confirm("Salvar Link direto de download?")) {
					prompt("Link:",file ? file : "Erro ao obter o link!");
				}
		}
	

