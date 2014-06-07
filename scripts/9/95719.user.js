// ==UserScript==
// @name           Link Returner
// @namespace      Link Returner
// @include        http://www.4shared.com/audio/*
// @author         Luis Felipe Zaguini Nunes Ferreira
// @orkutUID       14158628203739064351
// ==/UserScript==

if(confirm('Retornar link de download?')) {
	prompt('Link retornado com sucesso!', document.body.innerHTML.match(/file: "([^"]+)/)[1]);
}