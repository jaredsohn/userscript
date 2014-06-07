// ==UserScript==
// @name           ZAP - aluguel + condomínio
// @namespace      ZAP
// @description    ZAP - Soma os valores do aluguel e do condomínio e o exibe abaixo do valor do aluguel.
// @include        http://www.zap.com.br/*
// @grant		   none
// @match          http://www.zap.com.br/*
// @match          http://www.zap.com.br/*
// @icon           
// @version        0.1
// @encoding       UTF-8
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function getRentValue() {
	return new Number($('.pricePayment').text().split(' ')[1].replace(".", ""))
} 

function getCondominiumValue() {
	var condominio = $('#ctl00_ContentPlaceHolder1_resumo_liCondominio > .featureValue').text()
	condominio = '' == condominio ? 0 : condominio.split(' ')[1].replace('.', '')
	return new Number(condominio)	
}

function addTotalToHtml(total) {
	var a = $('#ctl00_ContentPlaceHolder1_resumo_divAluguel').clone()
	a.find(".labelItem").html("Valor do<br>aluguel + cond")
	a.find('.pricePayment').html('R$ '+ total)
	a.find('.pricePayment').attr('style', 'background:yellow')
	$('.displayPrice').append(a)
}

var total = getRentValue() + getCondominiumValue()

addTotalToHtml(total)
