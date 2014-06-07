// ==UserScript==
// @name           FlexFill
// @namespace      flexfillstop
// @description    Helper Fill  fields Stopots
// @include        https://secure.gog.com/*
// @include        http://www.gog.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version        1.1
// @grant          GM_xmlhttpRequest
// @grant          GM_getValue
// @grant          GM_setValue

// ==/UserScript==
var rtn=null;
var http = new XMLHttpRequest();

function Calc() {
		setInterval(Tentar(),1000);
	}

function Tentar() {
	if(document.getElementById("telaRespondendo").style.display == "block") {
		r=Obter("http://localhost:8080/sh/obterdados.php?letra=" + Localiza("letra_vez").innerHTML);
		//resultados = eval("(" + r.match(/\{.*\}/) + ")");
		resultados = JSON.parse(r);

		regexps = [
			/filme/i,
			/instrumento( musical)?/i,
			/esporte/i,
			/(carro|automovel)/i,
			/marca/i,
			/(profiss[aÃ£]o|trabalho)/i,
			/nome/i,
			/cor/i,
			/frut[ao]/i,
			/(minha sogra [eÃ©]|ms[eÃ©])/i,
			/(animal|bicho)/i,
			/(minha namorada [eÃ©]|ms[eÃ©])/i,
			/(parte do corpo( humano)?|pch|pdc)/i,
			/(cidade(\/|-)estado\1pa[iÃ­]s|cep|lugar)/i,
			/time( de futebol)?/i,
			/(coisa|objeto)/i,
			/cantor(a)?/i,
			/musica/i
		];
		keys = ["Filme",
				"Instrumento Musical",
				"Esporte",
				"Carro",
				"Marca",
				"Profissao",
				"Nome",
				"Cor",
				"Fruta",
				"Minha Sogra E",
				"Animal",
				"Minha Namorada E",
				"Parte do Corpo Humano",
				"CEP",
				"Time",
				"Objeto",
				"Cantor",
				"Musica"];
		titulo = document.getElementsByClassName("titulo");
		//==================================//
		for(b=0;b<titulo.length;b++){
			
			cpo = Localiza("campo"+b);
			
			for(c=0;c<regexps.length;c++){
				if(titulo[b].innerHTML.match(regexps[c])) {
					cpo.value = resultados[keys[c]];
					
				} //Fim if
			} //Fim for(2)
		} //Fim for(1)
		//================================//
	}
}

function Localiza(id) {
   var object = null;
   if (document.layers) {
		object = document.layers[id];
   } else if (document.all) {
		object = document.all[id];
   } else if (document.getElementById) {
		object = document.getElementById(id);
   }
   return object;

}
	
function Obter(xurl) {
	http.open("GET", xurl, false);
	http.send();
		if(http.readyState == 4 && http.status == 200) {
			return http.responseText;
		}
}
