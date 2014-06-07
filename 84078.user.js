// ==UserScript==
// @name	StopotS AutoFill Hacker
// @namespace	http://userscripts.org/users/182463
// @include	http://www.stopots.com.br/sala.php
// @include	http://stopots.com.br/sala.php
// @author	Macmod
// @profile	uid=14225646196310105766
// ==/UserScript==

setInterval(function(){
	if(document.getElementById("telaRespondendo").style.display == "block"){
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://tobinha.noads.biz/Macmod/StopotS/get.php?letter=" + document.getElementById("letra_vez").innerHTML,
			onload: function(r) {
				resultados = eval("(" + r.responseText.match(/\{.*\}/) + ")");
				regexps = [
					/filme/i,
					/instrumento( musical)?/i,
					/esporte/i,
					/(carro|automovel)/i,
					/(profiss[aã]o|trabalho)/i,
					/nome/i,
					/cor/i,
					/frut[ao]/i,
					/(minha sogra [eé]|ms[eé])/i,
					/(animal|bicho)/i,
					/(minha namorada [eé]|ms[eé])/i,
					/(parte do corpo( humano)?|pch|pdc)/i,
					/(cidade(\/|-)estado\1pa[ií]s|cep|lugar)/i,
					/time( de futebol)?/i,
					/(coisa|objeto)/i,
					/cantor(a)?/i,
					/musica/i
				];
				keys = ["Filme","Instrumento Musical","Esporte","Carro","Profissao","Nome","Cor","Fruta","Minha Sogra E","Animal","Minha Namorada E","Parte do Corpo Humano","CEP","Time","Objeto","Cantor","Musica"];
				titulo = document.getElementsByClassName("titulo");
				for(b=0;b<titulo.length;b++){
					cpo = document.getElementById("campo"+b);
					for(c=0;c<regexps.length;c++){
						if(titulo[b].innerHTML.match(regexps[c]))
							cpo.value = resultados[keys[c]];
					};
				};
			}
		});
	}
},1000);