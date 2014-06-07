// ==UserScript==

// @name			Yandex PROmotion
// @namespace		yandexprom
// @description		Promote your web-sites in Yandex for free
// @include			http://*yandex.ru/yandsearch*
// @copyright		2011, Imperor [Roman Smirnov]
// @license			GNU GPL
// @version			0.1.1
// @author			Imperor (Roman Smirnov)

// @history			0.1.1: If URL contains just yandexpromo then it will promo last web-sites
// @history			0.1: Released

// ==/UserScript==

var webs;
var websStr;
var url=window.location;
var search=window.location.search;
var pageNum;
var found=false;
var favs;

// Google Chrome 
if(!GM_getValue) 
{
	function GM_getValue(key,defaultVal) 
	{
		var retValue = localStorage.getItem(key);
		if ( !retValue ) 
		{
			return defaultVal;
		}
		return retValue;
	}

	function GM_setValue(key,value) 
	{
		localStorage.setItem(key, value);
	}
		
	function GM_deleteValue(value) 
	{
		localStorage.removeItem(value);
	}
}

function init() {
	favs = GM_getValue('last_promo', 'none');
	bcl = document.getElementsByClassName('b-pager__current')[0];
	pageNum = bcl.innerHTML;
	if (checkURL() == 1) {
		askForWebs();
		initPromotion();
	}
	if (checkURL() == 2) {
		setWebs();
		initPromotion();
	}
	if (checkURL() == 4) {
		favWebs();
		initPromotion();
	}
	if (checkURL() == 0) {
		showPromoLink();
	}
}

function favWebs() {
	if (favs == 'none') return;
	webs = favs;
}

function showPromoLink() {
	und=document.getElementsByClassName('b-search__under')[0];
	prLink = document.createElement('a');
	prLink.href = search+'&yandexpromostart';
	prLink.innerHTML = 'Начать раскрутку';
	und.appendChild(prLink);
}

function setWebs() {
	webs = search.substr(search.indexOf('yandexpromo=')+12);
	websStr = webs;
}

function checkURL() {
	if (search.indexOf('yandexpromo=')>1) return 2;
	if (search.indexOf('yandexpromoconfig')>1) return 3;
	if (search.indexOf('yandexpromofound')>1) return 0;
	if (search.indexOf('yandexpromostart')>1) return 1;
	if (search.indexOf('yandexpromo')>1) return 4;
	return 0;
}

function askForWebs() {
	if (favs == 'none' || favs === undefined || favs === null) {
		webs=window.prompt('Введите адреса сайтов (через запятую), которые вы хотите раскрутить');
	} else {
		webs=window.prompt('Введите адреса сайтов (через запятую), которые вы хотите раскрутить', favs);
	}
	GM_setValue('last_promo', webs);
	websStr = webs;
}

function initPromotion() {
	if (webs.length<3) { askForWebs(); return initPromotion(); }
	webs = explode(',', webs);
	analizePage();
}

function isRight(href) {
	wl = webs.length;
	if (wl<1) return false;
	c = 0;
	while (c<wl) {
		if (href.indexOf(webs[c])>-1) return true;
		c++;
	}
	return false;
}

function nextPage() {
	if (pageNum<20 && found==false) {
		nextPage = document.getElementById('next_page');
		newLoc = nextPage.href + '&yandexpromo=' + websStr;
		window.location.href = newLoc;

	}
}

function analizePage() {
	sites = document.getElementsByClassName('b-serp-item__title-link');
	pos = document.getElementsByClassName('b-serp-item__number');
	sl = sites.length;
	cl = 0;
	while (cl<sl) {
		href = sites[cl].href;
		if (isRight(href)) {
			//window.location.search = search.substr(0,search.indexOf('&yandexpromo'));
			found=true;
			jakor = document.createElement('a');
			jakor.name = 'yandexpromofound';
			sites[cl].appendChild(jakor);
			sites[cl].style.backgroundColor = '#ffcc00';
			window.location.hash = 'yandexpromofound';
		}
		cl++;
	}
	nextPage();
}

function explode( delimiter, string ) {
	var emptyArray = { 0: '' };
	if ( arguments.length != 2
		|| typeof arguments[0] == 'undefined'
		|| typeof arguments[1] == 'undefined' )
	{
		return null;
	}
	if ( delimiter === ''
		|| delimiter === false
		|| delimiter === null )
	{
		return false;
	}
	if ( typeof delimiter == 'function'
		|| typeof delimiter == 'object'
		|| typeof string == 'function'
		|| typeof string == 'object' )
	{
		return emptyArray;
	}
	if ( delimiter === true ) {
		delimiter = '1';
	}
	return string.toString().split ( delimiter.toString() );
}


init();