// ==UserScript==
// @name	dealextreme, buyincoins, focalprice price autoconvert
// @namespace	http://userscripts.org/scripts/show/91177
// @version	1.5
// @include	http://www.dealextreme.com/*
// @include	http://www.buyincoins.com/*
// @include	http://www.focalprice.com/*
// ==/UserScript==

document.addEventListener('DOMContentLoaded',function(){
//================== service functions ====================
createCookie = function(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

readCookie = function(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

eraseCookie = function(name) {
	createCookie(name,"",-1);
}
//====================== main body ==================
var localValute = 'RUB'; // см. код на http://www.prime-tass.ru/currency/classifier.asp (RUB, UAH итд)
var localValuteName = '\u0440\u0443\u0431'; // сокращённое название валюты без точки

var priceofUSD = Number(readCookie("priceofUSD"));
//============= dollar rate from the above ^_^ ===============
dollarFromAbove = function(priceofUSD) {
// всплывающая менюшка с курсом доллара
if(window.parent.location==window.location && priceofUSD != 0 )
{
	var style = document.createElement('link');
	style.setAttribute('rel','stylesheet');
	style.setAttribute('type','text\/css');
	style.setAttribute('href','data:text\/css,'+escape(' \
		.ujs_price {\
			background: -o-skin("Label Valuable") top left;\
			height:21px;width:17px;\
			left:10px; top:10px; margin:0px; padding:0px;\
			position:fixed;\
			z-index:9999;\
			opacity:0.2;\
		}\
		.ujs_price strong {\
			display:block; width:210px; height:15px; position:relative;\
			left:20px;/ bottom:-5px;\
			text-shadow:1px 1px 0 rgba(0, 0, 0, 0.75); background-color:rgba(0, 0, 0, 0.8);\
			border-radius:3px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);\
			text-align: center; color: #fff;\
			opacity:0;\
		}\
		\
		.ujs_price:hover { opacity:0.6; }\
		.ujs_price:hover strong { opacity:1;}\
	'));
	var head = document.getElementsByTagName('head')[0]
	if( head )	head.appendChild(style);
	
	var	div = document.createElement("div");
	div.setAttribute("class", "ujs_price");
	var strong = document.createElement("strong");
	strong.setAttribute("class", "ujs_pricetext");
	strong.innerHTML = "1$ = "+priceofUSD.toFixed(2)+" "+localValuteName+". \u043d\u0430 "+readCookie("priceofUSDdate");
	div.appendChild(strong);
	document.body.appendChild(div);
}}
//===============================================

processPrices = function(priceofUSD)
{
	usd2rur = function(priceUSD) {
		var price = (priceUSD*priceofUSD).toFixed(2); //или .toString().split(".");
		return priceUSD+' ('+price+' '+localValuteName+'.) '; //или return priceUSD+' ('+price[0]+'\u0440.'+price[1]+'\u043a.'+') ';
	}
					
	if (!isNaN(priceofUSD) && priceofUSD != 0) {
		// выбираем контейнер с ценой
		//  (хотя желательно делать не абстрактный запрос как здесь, а искать конкретный блок с ценой)
		var prices=document.selectNodes('//*[(self::p or self::span or self::b or self::strong) and (contains(text(),"$") or contains(@class,"cred fb")) and not(@class="ujs_pricetext")]');
		// заменяем все циферки
		for (var i=0; i<prices.length; i++) 
			prices[i].innerHTML = prices[i].innerHTML.replace(/\d+\.\d+/g, usd2rur);
	}
}

if (isNaN(priceofUSD) || priceofUSD === 0) 
{
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	
	onSuccess = function() {
		window._alert = function(elem) {
			var obj = elem.content.ValCurs.Valute;
			var date = elem.content.ValCurs.Date;
			for (var i in obj) {
				if (obj[i].CharCode == 'USD') { //получаем котировку доллар/руб из списка
					priceofUSD = Number(obj[i].Value.replace(',','.')); //исправляем формат на числовой
					break;
				}
			}
			if (localValute != 'RUB') {
				for (var i in obj)  {
					if (obj[i].CharCode == localValute) { //получаем котировку валюта/руб из списка
						priceofUSD = priceofUSD * obj[i].Nominal / (Number(obj[i].Value.replace(',','.'))); //вычисляем стоимость доллара
						break;
					}
				}
			}
			createCookie("priceofUSD", priceofUSD, 1); //чтобы каждый раз не тащить базу котировок, пользуемся печеньками
			createCookie("priceofUSDdate", date, 1)
				
		}
		processPrices(priceofUSD);
		dollarFromAbove(priceofUSD);
	}
	
	script.onreadystatechange = function() { if (this.readyState === "loaded") onSuccess(); }
	script.onload= onSuccess();
	
	// получаем список котировок валют с сайта Центробанка России в виде JSON
	script.src= 'http://esrijson.appspot.com/xml2json?url=http%3A%2F%2Fwww.cbr.ru%2Fscripts%2FXML_daily.asp&callback=_alert&headers=false&f=pjson';
	head.appendChild(script);
}
else {
	processPrices(priceofUSD);
	dollarFromAbove(priceofUSD);
}
},false);