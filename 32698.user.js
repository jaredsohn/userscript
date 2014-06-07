// ==UserScript==
// @name          LiveSearchAlso
// @namespace     http://silinio.webhost.ru
// @description   "Искать в других поисковых системах" на live.com/msn.com как в Яндексе
// @include       http://search.msn.com
// @include       http://search.msn.com/*
// @include       http://*.search.msn.com/*
// @include       http://*.search.msn.com/results.aspx*
// @include       http://search.live.com
// @include       http://search.live.com/*
// @include       http://*.search.live.com/*
// @include       http://*.search.live.com/results.aspx*
// ==/UserScript==

function addContainer() {
	var tempObj = document.getElementById('sb_foot');
	var tempContainer = document.createElement('div');
	tempObj.parentNode.insertBefore(tempContainer, tempObj);

	tempContainer.id = 'searchAlso';
	tempContainer.style.marginBottom = '12px';
	tempContainer.style.background = 'none';
	tempContainer.style.textAlign = 'center';
	tempContainer.style.fontSize = '13px';
}

function addLinks() {
	var q = document.getElementsByName('q')[0].value;
	var seUrl = ['http://www.yandex.ru/yandsearch?text=' + encodeURIComponent(q),
				 'http://www.rambler.ru/srch?words=' + encodeURIComponent(q),
				 'http://www.google.ru/search?q=' + encodeURIComponent(q),
				 'http://ru.search.yahoo.com/bin/query?p=' + encodeURIComponent(q) + '&ei=UTF-8'];
	var seName = ['Яндекс',
				  'Rambler',
				  'Google',
				  'Yahoo'];

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
