// ==UserScript==
// @name Message buttons
// @version 0.1
// @author gera_b
// @description Script adds some predefined message buttons to form
// @include http://fotomag.com.ua/admin/*
// @match http://fotomag.com.ua/admin/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js
// ==/UserScript==

// works only witha main order form
if(window.location.href.indexOf('orderid=') != -1 && window.location.href.indexOf('orders/details') != -1){

function setMessage(message){
	document.getElementsByName('_report_')[0].value = message;
}

var noAnswerM = 'Добрый день, . Мы не можем дозвониться к Вам по указанному телефону: . Если заказ еще актуален - свяжитесь с нами: 0-800-500-3-700   (044)49-24-555   (067)640-77-88   (056)756-91-91';
var abortNoAnswerM = 'Добрый день, . Вынуждены отменить Ваш заказ в связи с невозможностью дозвониться к Вам по указанному телефону: . Если заказ еще актуален - свяжитесь с нами: 0-800-500-3-700   (044)49-24-555   (067)640-77-88   (056)756-91-91';
var noItemM = 'Добрый день, . Вынуждены отменить Ваш заказ в связи с отсутствием товара на складе. Попробуйте, пожалуйста заказать похожую модель или попробуйте эту же через некоторое время. Просим прощения за доставленные неудобства.';

var noAnswer = document.createElement('input');
	noAnswer.setAttribute('type','button');
	noAnswer.setAttribute('value','noAnswer');
	noAnswer.setAttribute('id','noAnswer');
var abortNoAnswer = document.createElement('input');
	abortNoAnswer.setAttribute('type','button');
	abortNoAnswer.setAttribute('value','abortNoAnswer');
	abortNoAnswer.setAttribute('id','abortNoAnswer');
var noItem = document.createElement('input');
	noItem.setAttribute('type','button');
	noItem.setAttribute('value','noItem');
	noItem.setAttribute('id','noItem');	
var divButtons = document.createElement('div');
	divButtons.setAttribute('style','margin-left: auto; margin-right: auto;');
	divButtons.innerHTML = noAnswer.outerHTML + abortNoAnswer.outerHTML + noItem.outerHTML;
	
document.getElementsByName('_report_')[0].parentNode.appendChild(divButtons);

document.getElementById('noAnswer').addEventListener('click',function(){setMessage(noAnswerM)},false);
document.getElementById('abortNoAnswer').addEventListener('click',function(){setMessage(abortNoAnswerM)},false);
document.getElementById('noItem').addEventListener('click',function(){setMessage(noItemM)},false);
}