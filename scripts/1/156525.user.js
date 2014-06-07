// ==UserScript==
// @name           Self Imóveis - aluguel + condomínio + iptu/12
// @namespace      Self Imóveis
// @description    Self Imóveis - Soma os valores do aluguel, condomínio e IPTU e o exibe abaixo do valor do aluguel. O valor do IPTU é divido por 12 antes de ser somado.
// @include        http://selfimoveis.i.wsrun.net/*
// @grant		   none
// @match          http://selfimoveis.i.wsrun.net/*
// @match          http://selfimoveis.i.wsrun.net/*
// @icon           http://www.selfadm.com.br/images/marca-self.png
// @version        1.1
// @encoding       UTF-8
// @require       http://selfimoveis.i.wsrun.net/imoveis/js/jquery.min.js
// ==/UserScript==

function extractValue(text) {
	var myRegexp = /\D*(\d*\.?\d*,\d*).*/g;
	var val = myRegexp.exec(text)[1];

	return Number(val.replace('.', '').replace(',', '.'));
}

function sumValues(aluguel, condominio, iptuMensal) {
	return Number(aluguel + condominio + iptuMensal).toFixed(2);
}

function addValueToHtml(value) {
	var newElement = $('#valorimovel').clone();
        var color;
        if(Number(value) > 1950) {
              color = 'red';
        }

        if(Number(value) <= 1950) {
              color = 'green';
        }
        
        if(Number(value) < 1400) {
              color = 'yellow';
        }
        
	newElement.css('background', color);
	newElement.html('R$ ' + value);
	$('#topoimovel').append(newElement);
}

var condominio;
var iptuAnual;
$.each($('.dadosimovel tr td'), function() { 
	if('Valor do Condomínio' == $(this).html()) {
		condominio = extractValue($(this).next().html());
	}

	if('Valor IPTU' == $(this).html()) {
		iptuAnual = extractValue($(this).next().html());
	}
});

var aluguel = extractValue($('#valorimovel').html());
var sum = sumValues(aluguel, condominio, iptuAnual/12);

addValueToHtml(sum);