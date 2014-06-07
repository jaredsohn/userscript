// ==UserScript==
// @name          GoogleSearchAlso
// @namespace     http://promo-mediasite.ru
// @description   «Искать в других поисковых системах» как в Яндексе
// @include       http://*.google.com/search*
// @include       http://google.com/search*
// @include       http://*.google.ru/search*
// @include       http://google.ru/search*
// @include       http://*.google.com.ua/search*
// @include       http://google.com.ua/search*
// ==/UserScript==

function addContainer() {
	var tempObj = document.getElementById('res').nextSibling.nextSibling.nextSibling.nextSibling;
	var tempContainer = document.createElement('div');
	tempObj.parentNode.insertBefore(tempContainer, tempObj);

	tempContainer.id = 'searchAlso';
	tempContainer.style.marginTop = '10px';
	tempContainer.style.background = 'none';
	tempContainer.style.textAlign = 'center';
	tempContainer.style.fontSize = '12px';
}

function addLinks() {
	var q = document.getElementsByName('q')[0].value;
	var seUrl = ['http://www.yandex.ru/yandsearch?text=' + encodeURIComponent(q),
				 'http://search.msn.com/results.aspx?q=' + encodeURIComponent(q),
				 'http://ru.search.yahoo.com/bin/query?p=' + encodeURIComponent(q) + '&ei=UTF-8',
				 'http://www.rambler.ru/srch?words=' + encodeURIComponent(q)];
	var seName = ['Яндекс',
				  'MSN',
				  'Yahoo',
				  'Rambler'];

	var tempText = '';

	for(var i in seUrl) {
		tempText += '<a href="' + seUrl[i] + '" target="_blank">' + seName[i] + '</a>';
		if(i < seUrl.length - 1) tempText += '&nbsp;·&nbsp;';
	}

	var searchAlso = document.getElementById('searchAlso');
	searchAlso.innerHTML = 'Искать в других поисковых системах: ' + tempText;
}

addContainer();
addLinks();