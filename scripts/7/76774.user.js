// ==UserScript==
// @name           Molehill Empire
// @namespace      sadowajaimperija
// @description    Usefull script for game
// @author         CupIvan <mail@cupivan.ru>
var SCRIPT_VERSION = ''+(<r><![CDATA[
// @version 4.3.6.1
]]></r>);
// @dateModify     15.10.10
// @include        http://*.sadowajaimperija.ru/*
// @include        http://*.bg.molehillempire.com/*
// @include        http://*.molehillempire.com/*
// @include        http://*.wurzelimperium.de/*
// @include        http://*.molehillempire.es/*
// @include        http://*.kertbirodalom.hu/*
// @include        http://*.molehillempire.nl/*
// @include        http://*.molehillempire.ro/*
// @include        http://si.cupivan.ru/download.php*
// ==/UserScript==

var SCRIPT_VERSION = SCRIPT_VERSION.replace(/[^\d.]/g, '');
var SCRIPT_URL     = 'http://si.cupivan.ru/i/sadowajaimperija.user.js';
var SCRIPT_PAGE    = 'http://si.cupivan.ru/download.html';

// TODO Сажать с задержкой, чтобы не забанили
// BUG  Не всегда срабатывает кнопка полива
// TODO Сажать определенное кол-во овощей
// BUG  Сажать можно только в незанятых клетках на поле
// TODO Кол-во полок по числу овощей/декору
// TODO Настройки (отключение функций)
// TODO Сортировка полки: рентабельность, время, кол-во
// TODO Уменьшать need при продаже симпа
// TODO Учет квестов в списке нужных товаров

// языковые фразы
var LNG_MARKET_DEL_FILTER = 'Удалить фильтр';
var LNG_MARKET_BACK       = ' назад';
var LNG_MARKET_BUY        = 'купить|дорого|снят|снять';
var LNG_STATUS_MONEY      = 'Денег';
var LNG_STATUS_LEVEL      = 'Уровень';
var LNG_STATUS_SCORE      = 'Очки';
var LNG_QUEST             = 'Квест';
var LNG_QUEST_NO          = 'Квеста нет';
var LNG_BTN_HELP          = 'Помощь';
var LNG_BTN_PLANT         = 'Посадить';
var LNG_BTN_WATER         = 'Полить';
var LNG_PROD_REST         = 'ост.';
var LNG_WITH_PROD_IN_RACK = 'С учетом продуктов на полке';
var LNG_BUY_IN_SHOP       = 'Купить в магазине">[ КВМ ]';
var LNG_NEW_VERSION       = 'Доступна новая версия скрипта. Хотите скачать?';
var LNG_PRODUCTS          = 'Банок';
var LNG_CLEAR             = 'очистить';

// {{{ COMMON
/*
  This code is licenced under the GPL
  http://www.fsf.org/licensing/licenses/gpl.html
*/
var GMHelper =
{
	loaded  : typeof unsafeWindow != 'undefined',
	aWindow : typeof unsafeWindow == 'undefined' ? window : unsafeWindow,

	getValue : function(name, defaultValue)
	{
		if (this.loaded) { return GM_getValue(name, defaultValue); }
	},

	setValue : function(name, value)
	{
		if (this.loaded) { GM_setValue(name, value.toString()); }
	},

	getNamespace : function(aWindow, path)
	{
		var currentNamespace = aWindow;
		while(path.length > 0)
		{
			var nextNamespace = path.shift();
			if (typeof currentNamespace[nextNamespace] == 'undefined')
				currentNamespace = currentNamespace[nextNamespace] = {};
		}
		return currentNamespace;
	},

	updateScript : function()
	{
		var sender = this;
		if (this.loaded)
		{
			this.setValue('version', SCRIPT_VERSION);
			var now = Math.round((new Date()).getTime()/1000);
			var lastCheck = this.getValue('lastCheck', 0);
			if ((now - lastCheck) > 1*24*3600)
			{
				GM_xmlhttpRequest(
				{
					 method: 'GET',
					 url:     SCRIPT_URL,
					 headers:
					 {
						'User-Agent': navigator.userAgent,
						'Accept' : '*/*',
						'Range' : 'bytes=0-1000',
						'Cache-control' : 'no-cache',
						'Pragma' : 'no-cache'
					 },
					onload: function(response)
					{
//------------------/
if (response.status == 206)
{
	var matches = response.responseText.match(/@version\s+([\d.]+)/m);
	if (matches != null)
	{
		var currentVersion = sender.getValue('version', '0.0.1');
		if (currentVersion < matches[1])
		{
			if (confirm(LNG_NEW_VERSION))
			document.location = SCRIPT_PAGE +
				'?from='+SCRIPT_VERSION +
				'&to='+matches[1] +
				'&srv='+getServer();
		}
	}
}
//------------------\
					}
				});
				this.setValue('lastCheck', now);
			}
		}
	}
}

var w = window.wrappedJSObject;

/** работа с глобальными переменными */
Settings =
{
	conv: function(str)
	{
		var f = '1234567890qweasdzxcrtyfghvbnuiojklmp_ абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
		var t = '1234567890qweasdzxcrtyfghvbnuiojklmp__abvgdeejziqklmnoprstufxc466_y_eua';
		var i, k = '';
		str = str.toLowerCase();
		for (i = 0; i<str.length; i++)
			k += t.charAt(f.indexOf(str.charAt(i)));
		return k;
	},
	store: function(name, value, numDays)
	{
		if (name.charAt(0) == '!') {}
		else
		if (name.charAt(0) == '.')
			name += getServer() + getPlayerLogin();
		else
			name += getServer();
		name = this.conv(name);
		return GM_setValue(name, value);
	},
	load: function(name, defaultVal)
	{
		if (name.charAt(0) == '!') {}
		else
		if (name.charAt(0) == '.')
			name += getServer() + getPlayerLogin();
		else
			name += getServer();
		name = this.conv(name);
		return GM_getValue(name, defaultVal);
	}
};

/** установка стиля */
function style(x, style)
{
	var prop;
	if (typeof(x) == 'string') x = $(x);
	if (!x) return false;
	if (typeof(style) == 'object')
	for(prop in style)
	{
		prop.replace(/-(.)/g, function(_,x){ return x.toUpperCase(); });
		x.style[prop] = style[prop];
	}
	else // style - строка CSS
	{
		style = style.split(';');
		var i, prop, value;
		for (i = 0; i < style.length; i++)
		{
			prop  = style[i].split(':');
			if (prop.length != 2) continue;
			value = prop[1]; prop = prop[0];
			prop  = prop.replace(/ /g, '');
			prop  = prop.replace(/-(.)/g, function(_,x){ return x.toUpperCase(); });
			value = value.replace(/[ '"]/g, '');
			x.style[prop] = value;
		}
	}
}

/** wrapper где есть этот элемент */
function globWrap(name)
{
	var w, obj;

	w = window.wrappedJSObject; eval('obj = w.'+name);
	if (obj != undefined) return w;

	w = parent.window.wrappedJSObject; eval('obj = w.'+name);
	if (obj != undefined) return w;

	w = parent.parent.window.wrappedJSObject; eval('obj = w.'+name);
	if (obj != undefined) return w;
	return undefined;
}

/** доступ к объектам главной страницы */
function globObj(name)
{
	var obj = globWrap(name);
	if (obj == undefined) return undefined;
	eval('obj = obj.'+name);
	return obj;
}

/** создание обычного хэша запроса для Ajax */
function request(r)
{
	return {status: r.status, readyState: r.readyState,
		responseText: r.readyState == 4 ? r.responseText : 0};
}

// dollar.js 1.2
function $$(st,handler){var i,j,k,st_len,els=[document],els_,e;st=st.split(' ');st_len=st.length;for(i=0;i<st_len;i++){els_=[];for(j=0;j<els.length;j++){if(st[i][0]=='#')e=[els[j].getElementById(st[i].replace(/./,''))];else if(st[i][0]=='.')e=els[j].getElementsByClassName(st[i].replace(/./,''));else e=els[j].getElementsByTagName(st[i]);for(k=0;k<e.length;k++){els_.push(e[k]);if(i==st_len-1 && handler!=undefined)handler(e[k])}}els=[].concat(els_)};return els};function $(id,txt){var pattern,pcre,st,obj;if(id==undefined)id=document.body;if(typeof(id)=='string' && id.charAt(0)=='.')return document.getElementsByClassName(id.replace('.',''));obj=typeof(id)=='object'?id:document.getElementById(id);if(!obj)obj=parent.document.getElementById(id);if(!obj)obj=parent.parent.document.getElementById(id);if(!obj)return null;if(txt==undefined)return obj;st=obj.innerHTML;if(typeof(txt)=='string')st=txt;else for(pattern in txt){pcre=(pattern.charAt(0)!='/')?pattern:eval('('+pattern+')');st=st.replace(pcre,txt[pattern])};obj.innerHTML=st};if(!document.getElementsByClassName)document.getElementsByClassName=function(cl){var retnode=[];var myclass=new RegExp('\\b'+cl+'\\b');var elem=this.getElementsByTagName('*');for(var i=0;i<elem.length;i++){var classes=elem[i].className;if(myclass.test(classes))retnode.push(elem[i])};return retnode};

/** подгрузка страниц */
var ajax = {
	load: function(url, post, handler)
	{
		var ajax = new XMLHttpRequest();
		if (typeof(post) == 'function')
		{
			handler = post;
			post = undefined;
		}
		ajax.open(post != undefined ? 'POST' : 'GET', url);
		ajax.onreadystatechange = function()
		{
			if (handler != undefined && ajax.readyState == 4
				&& ajax.status == 200)
				handler(ajax.responseText);
		}
		if (post != undefined)
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		ajax.send(post != undefined ? post : null);
	}
};

/** форматирование времени */
function formatTime(sec)
{
	var st = '', t, d = new Date();
	if (sec == undefined) sec = time();
	var days = Math.floor((sec - time()) / 3600 / 24);
	st += (days > 0) ? days + 'д ' : '';
	d.setTime(sec * 1000);
	t = d.getHours();   if (t < 10) t = '0'+t; st += t+':';
	t = d.getMinutes(); if (t < 10) t = '0'+t; st += t;
	return st;
}

/** логирование действий */
function log(x)
{
	var st, o;
	o = $('log'); if (!o) return;
	st = formatTime();
	if (o != null) st += ' ' + x;
	o.innerHTML = st;
}

/** текущее время в секундах */
function time() { return Math.round((new Date()).getTime() / 1000); }

/** вывод времени в строку */
function date(format, timestamp)
{
	var st = format;
	var time = new Date();
	var _ = function(x) { return x < 10 ? '0' + x : x; }
	time.setTime(timestamp*1000 -
		(timestamp < 3600*99 ? 0 : time.getTimezoneOffset()*60000));
	var G = time.getUTCHours(),     H = _(G);
	var i = time.getUTCMinutes();   i = _(i);
	var s = time.getUTCSeconds();   s = _(s);
	var j = time.getUTCDate(),      d = _(j);
	var n = time.getUTCMonth() + 1, m = _(n);
	var Y = time.getUTCFullYear();
	var y = Y % 100;
	var a = 'GHisjdnmYy'.split('');
	for (_ = 0; _ < a.length; _++)
		st = st.replace(a[_], eval(a[_]));
	return st;
}

/** текущий сервер */
function getServer()
{
	var s = st = ''+document.domain;
	st = st.replace(/.*?(s(\d+))?(\.bg)?\..+\.(.+)/, '$4$3$2')
		.replace('com.', '').replace('com', 'en');
	if (st == 'ru' && s.indexOf('w4.') != -1) st = 'ru2';
	if (s == st) return '';
	return st;
}

/** версия скрипта */
function getVersion() { return SCRIPT_VERSION; }

/** логин игрока */
function getPlayerLogin() { return $('username').innerHTML; }

/** кнопка - добавить отзыв */
function addCommentButton(site)
{
	var div = document.createElement('DIV');
	div.innerHTML = ''+
		'<script src="http://cupivan.ru/todo/todo.js"></script>'+
		'<script>todo.init({'+
			'src:    "http://' + site + '.cupivan.ru/",'+
			'action: "http://cupivan.ru/todo/todo_html.php?site=' + site + '",'+
			'params: { u: "'+getPlayerLogin()+'", v: "'+getVersion()+'", srv: "'+getServer()+'" },'+
			'_:0});'+
		'</script>';
	document.body.appendChild(div);
}

// убираем правый баннер
style('banner_right', 'display: none');

// }}} COMMON

// POST продажа
// http://s4.sadowajaimperija.ru/stadt/marktstand.php
// p_anzahl=400кол-во&p_id=9лук&p_preis1=1цена&p_preis2=48цена&verkaufe_markt=%D0%9E.%D0%9A.

//----------------------------------------------------------------------------//
// НАСТРОЙКИ
var RENTAB_GOOD   = 22;   // выше этой рентабельности можно и посадить
var RENTAB_BAD    = 20;   // ниже этой рентабельности сажать невыгодно
var PRICE_UPTIME  = 3600; // время обновления в секундах
var PRICE_PAUSE   = 10;   // пауза в секундах между запросами
var AVG_COUNT     = 100;  // кол-во товара для "контрольной закупки
var MARKET_UPTIME = 10;   // через сколько секунд обновлять маркет

// цвета
var CL_GOOD = '#F55';
var CL_BAD  = '#6c9f6c';

// глобальный массив семян
var PRODUCTS = {};
var PL=0, PS=1, PSQ=2, PC=3, PT=4, PP=5, PN=6;
//                L  S SQ   C      T      P  N
// обновляем статические данные о семенах
PRODUCTS[71] = [ 23, 2, 4,  9,  9600,102.00, 'апельсин'];
PRODUCTS[70] = [ 16, 2, 1,  3,  4800,  8.95, 'базилик'];
PRODUCTS[ 7] = [  9, 2, 1,  5,  4800,  8.88, "баклажан"];
PRODUCTS[33] = [  7, 2, 1,  4,  2000,  4.48, "брокколи"];
PRODUCTS[15] = [  7, 2, 1,  5,  4000,  7.32, "болгарский перец"];
PRODUCTS[52] = [ 18, 4, 1,  6,   600,  1.90, "васильки"];
PRODUCTS[67] = [ 15, 1, 2,  2,  1200, 22.10, 'виноград'];
PRODUCTS[ 1] = [ 14, 1, 4, 18, 19200, 41.40, "вишня"];
PRODUCTS[58] = [ 21, 4, 1,  4,   920,  3.00, "гербера"];
PRODUCTS[19] = [ 16, 1, 4, 19, 33600, 68.40, "грецкий орех"];
PRODUCTS[21] = [ 14, 1, 4, 10, 12000, 46.80, "груша"];
PRODUCTS[ 8] = [ 11, 1, 1,  3,  4800, 30.00, "ежевика"];
PRODUCTS[16] = [  9, 2, 1,  4,  4800, 11.04, "кабачок"];
PRODUCTS[72] = [ 23, 2, 4,  5,  2100, 45.66, 'какао'];
PRODUCTS[49] = [  5, 4, 1,  4,   600,  1.80, "календула"];
PRODUCTS[22] = [  6, 2, 1,  4,  1600,  3.60, "картофель"];
PRODUCTS[ 3] = [  3, 2, 1,  4,   200,  0.44, "клубника"];
PRODUCTS[64] = [ 22, 1, 2,  2, 25000,137.50, "кофе"];
PRODUCTS[61] = [ 20, 1, 1,  6,  7200, 18.00, "краснокочанная капуста"];
PRODUCTS[54] = [ 19, 4, 1,  5,   700,  2.40, "крокусы"];
PRODUCTS[59] = [ 21, 4, 2,  8, 12000, 66.60, "лаванда"];
PRODUCTS[51] = [ 17, 4, 1,  3,  1620,  8.00, "лилии"];
PRODUCTS[68] = [ 22, 2, 4,  4,  1600, 44.98, 'лимон'];
PRODUCTS[ 9] = [  4, 2, 1,  4,   800,  1.76, "лук"];
PRODUCTS[10] = [ 10, 1, 1,  5,  4800,  7.60, "малина"];
PRODUCTS[17] = [ 12, 1, 4, 10, 14400, 56.28, "мирабель"];
PRODUCTS[ 6] = [  1, 2, 1,  2,    10,  0.06, "морковь"];
PRODUCTS[12] = [  2, 2, 1,  4,    40,  0.14, "огурец"];
PRODUCTS[55] = [ 19, 1, 4, 18, 24000, 78.00, "оливки"];
PRODUCTS[53] = [ 18, 4, 1,  6,  9600, 55.00, "орхидеи"];
PRODUCTS[48] = [  8, 4, 1,  3,   500,  1.50, "подсолнухи"];
PRODUCTS[ 5] = [  3, 2, 1,  4,   220,  0.50, "помидор"];
PRODUCTS[14] = [  2, 2, 1,  3,    50,  0.22, "редиска"];
PRODUCTS[50] = [ 12, 4, 1,  2,   700,  3.50, "розы"];
PRODUCTS[ 2] = [  1, 2, 1,  2,    14,  0.08, "салат"];
PRODUCTS[13] = [ 15, 1, 4, 15, 24000, 62.40, "слива"];
PRODUCTS[11] = [ 11, 1, 1,  6,  3600,  5.75, "смородина"];
PRODUCTS[20] = [  8, 2, 2,  5,  4200,  7.80, "спаржа"];
PRODUCTS[18] = [ 13, 2, 1,  6, 14400, 22.80, "тыква"];
PRODUCTS[60] = [ 20, 4, 1,  5,   400,  4.00, "тюльпан"];
PRODUCTS[32] = [  5, 2, 1,  4,  1640,  3.78, "цветная капуста"];
PRODUCTS[35] = [  6, 2, 1,  4,  2200,  5.10, "чеснок"];
PRODUCTS[34] = [ 10, 2, 1,  6,  3200,  5.04, "черника"];
PRODUCTS[69] = [ 17, 2, 2,  5,  4800, 32.49, 'шампиньон'];
PRODUCTS[36] = [  4, 2, 1,  4,   920,  2.10, "шпинат"];
PRODUCTS[ 4] = [ 13, 1, 4, 12,  9600, 30.96, "яблоко"];
// декор
PRODUCTS[29] = [ 1, 3, 4, 0, 1, 12000, "беседка 1"];
PRODUCTS[30] = [ 1, 3, 4, 0, 1, 12000, "беседка 2"];
PRODUCTS[31] = [ 1, 3, 4, 0, 1, 12000, "беседка 3"];
PRODUCTS[44] = [ 1, 3, 1, 0, 1, 12000, "гномы-садоводы"];
PRODUCTS[63] = [ 1, 3, 2, 0, 1,600000, "горка"];
PRODUCTS[25] = [ 1, 3, 1, 0, 1,  6000, "декоративные камни"];
PRODUCTS[26] = [ 1, 3, 1, 0, 1,  3000, "дорожка 1"];
PRODUCTS[27] = [ 1, 3, 1, 0, 1,  3000, "дорожка 2"];
PRODUCTS[28] = [ 1, 3, 1, 0, 1,  3000, "дорожка 3"];
PRODUCTS[46] = [ 1, 3, 1, 0, 1,  1500, "дорожка 4"];
PRODUCTS[56] = [ 1, 3, 1, 0, 1, 12000, "костёр"];
PRODUCTS[40] = [ 1, 3, 4, 0, 1, 94000, "круг камней"];
PRODUCTS[62] = [ 1, 3, 4, 0, 1, 12000, "песочница"];
PRODUCTS[39] = [ 1, 3, 1, 0, 1, 12000, "пруд"];
PRODUCTS[57] = [ 1, 3, 1, 0, 1, 12000, "пугало"];
PRODUCTS[38] = [ 1, 3, 2, 0, 1, 24000, "сад камней"];
PRODUCTS[37] = [ 1, 3, 4, 0, 1, 46000, "уголок отдыха"];
PRODUCTS[47] = [ 1, 3, 1, 0, 1,  2000, "деревянные шары"];
PRODUCTS[23] = [ 1, 3, 1, 0, 1,  2499, "фонтан 1"];
PRODUCTS[24] = [ 1, 3, 1, 0, 1,  1500, "фонтан 2"];
try { w.PRODUCTS = PRODUCTS; } catch(e) {}

// достигаемые уровни
var LEVELS = ['???'
,/* 1*/'Салатомешатель'
,/* 2*/'Горошиносчитатель'
,/* 3*/'Помидорный дилер'
,/* 4*/'Лукометатель'
,/* 5*/'Урожайнакопитель'
,/* 6*/'Картофелецционер'
,/* 7*/'Зелёный продавец'
,/* 8*/'Кротоохотник'
,/* 9*/'Мелкий огородник'
,/*10*/'Черничный барон'
,/*11*/'Дачник-садовод'
,/*12*/'Кавалер ордена роз'
,/*13*/'Овощной гуру'
,/*14*/'Рыцарь вишнёвой кости'
,/*15*/'Синьор Забор'
,/*16*/'Грецкий страж'
,/*17*/'Рассадчик Лилий'
,/*18*/'Король Орхидей'
,/*19*/'Крокуспокус'
,/*20*/'Гроза сорняков'
,/*21*/'Корневед'
,/*22*/'Садовый император'
];

//----------------------------------------------------------------------------//
// округление
function round(x, s) { if (s == undefined) s = 0; var p = Math.pow(10, s);
    return Math.round(x * p) / p; }
// поиск кода по имени семечки
var prodByName = {};

// семечко по коду или названию
function prod(x)
{
	var prod, t = [], r = globObj('rackElement');
	if (prodByName[x] != undefined) x = prodByName[x];
	if (r[x] != undefined)
	{
		if (r[x].p_market == undefined)
			modifyRackElement(x);
		return r[x];
	}
	if (x != undefined) return [];
	else
	for (prod in r)
	if (r[prod].id != undefined)
	{
		if (r[prod].p_market == undefined)
		modifyRackElement(prod);
		t.push(r[prod]);
	};
	return t;
}

// рентабельность
function rentab(prod)
{
	var p;
	p = prod.numInHour * prod.p_market * 0.9; // доход в час
	p = p / 6;                                // в 10 минут
	return Math.floor(p*10)/10;
}
// выгодная цена для рынка
function goodPrice(prod)
{
	return Math.round(6 * RENTAB_GOOD / prod.numInHour / 0.9 * 100) / 100;
}

// сортировка полки по рентабельности
function sortRack(id) // id - какая семечка будет всплывать
{
	return;
	var i, rack = globObj('rackElement');
	var sem = rack[id], newRack = {};
	for (i in rack)
	if (i != id)
	{
		// вставляем текущую семечку перед тем как будет меньшая рентабельность
		if (rack[i].rentab <= rack[id].rentab)
			newRack[id] = rack[id];
		newRack[i]  = rack[i];
	}
	// заменяем массив
	globWrap('rackElement').rackElement = newRack;
}

// заявка на обновление цены
var g_checkPriceDelta = 0;
function checkPrice(prod)
{
	// добавляем iframe, чтобы грузить данные
	if (!$("myIframe"))
	{
		var f = document.createElement('iframe');
		f.setAttribute('id', 'myIframe');
		document.body.appendChild(f);
	}

	var i, d = (new Date()).getTime();
	if (Settings.load('marketi_'+prod.name, 0)*1000 < d)
	{   // подгружаем страницу с товаром
		window.setTimeout(function(){
			$("myIframe").src =
				'/stadt/markt.php?order=p&v='+prod.id+'&filter=1';
		}, g_checkPriceDelta += PRICE_PAUSE*1000);
	}
}

/** номер текущего сада */
function getGardenNumber()
{
	return parseInt($('garten_aktuell_nummer').innerHTML);
}

// суперрынок
function superMarket()
{
	var i, st = '';
	var p, pr = prod();
	st += '<div style="float: left; width: 640px;">';
	st += '<table style="margin: 50px 60px 20px 50px">';
	// заголовок
	st += '<tr>';
	st += '<td>Овощ</td>';
	st += '<td align="center">Кол-во</td>';
	st += '<td align="center">Цена</td>';
	// пишем симпов
	var pp, s = parent.window.wrappedJSObject.simps, pt, ptot;
	st += '<td>C</td>';
	for (pp in s)
	st += '<td>С'+s[pp].id+'</td>';
	st += '</tr>';
	for (p in pr)
	{
		st += '<tr>';
		st += '<td><a href="'+shop(pr[p].name)+'">'+pr[p].name+'</a></td>';
		st += '<td align="center">'+round(pr[p].number)+'</td>';
		st += '<td align="center">';
			st += '<a href="'+shop(pr[p].name, 1)+'" title="Рынок">'+pr[p].p_market+'</a> / ';
			st += '<a href="'+shop(pr[p].name, 2)+'" title="Магазин">'+pr[p].p_shop+'</a>';
		st += '</td>';
		ptot = 0;
		st += '<td>_TOT_</td>';
		for (pp in s)
		{
			pt = s[pp][pr[p].id] ? s[pp][pr[p].id] : 0;
			ptot += pt;
			st += '<td>'+(pt?pt:'')+'</td>';
		}
		ptot = round(ptot - pr[p].number);
		if (ptot <= 0) ptot = '';
		st = st.replace('_TOT_', ptot);
		st += '</tr>';
	}
	st += '</table>';
	st += '</div>';
	// автообновление
	document.body.innerHTML = st;
		window.setTimeout(function(){ document.location = L; }, MARKET_UPTIME*1000);
	return 0;
}

// меняем структуру элемента овоща
function modifyRackElement(i)
{
	var rack  = globObj('rackElement');
	var poliv = globObj('POLIV');
	var level = globObj('LEVEL');

	rack[i].p_shop   = 0;
	rack[i].p_good   = 0;
	rack[i].p_market = 0;
	rack[i].need     = 0;
	rack[i].rentab   = 0;
	rack[i].level    = 0;
	rack[i].size     = 1;

	if (PRODUCTS[i] == undefined) return;
	// время роста
	var t=PRODUCTS[i][PT]%100;
	t = ((PRODUCTS[i][PT] - t)/100*60 + t)*60000;
	PRODUCTS[i][PT] = t;
	if (typeof(rack[i].duration) == 'number')
		t = rack[i].duration;
	var hours = 0, ctime, day = 24*60*60*1000, tG = t;
	do {
		tG     = Math.round(tG * (1 - poliv)); // поливаем
		ctime  = (tG < day) ? tG : day;
		hours += ctime;
		tG    -= ctime;
	} while (tG > 0);
	rack[i].duration = t = hours;
	t = Math.round(t / 1000);
	var s = t % 60; t = (t - s) / 60;
	var m = t % 60; t = (t - m) / 60;
	var h = t;
	s = (' '+h+'::'+m+'::'+s+' ').replace(/(\D)(\d\D)/g, '$10$2').replace(/::/g, ':');
	if (h > 24) s = s.replace(/:\d+ /, '') + ' ' + Math.floor(h/24)+'д'+(h%24)+'ч';
	rack[i].hrs      = s;
	rack[i].p_shop   = PRODUCTS[i][PP]; // магазинная цена
	rack[i].p_market = Settings.load(PRODUCTS[i][PN], 0) / 100; // цена рынка
	rack[i].level    = PRODUCTS[i][PL];
	rack[i].need     = 0;
	rack[i].shop     = PRODUCTS[i][PS];
	if (rack[i].id == undefined)
	{
		if (rack[i].level <= level)
		rack[i].id     = i;              // код
		rack[i].size   = 1;              // размер на полке
		rack[i].rackid = 0;
		rack[i].y      = 1;
		rack[i].number = 0;
		rack[i].x      = PRODUCTS[i][PSQ]; // размер на грядке
		if (rack[i].x == 4) rack[i].x = rack[i].y = 2;
		rack[i].crop   = PRODUCTS[i][PC]; // сколько вырастет
		rack[i].name   = PRODUCTS[i][PN]; // название
	}
	t = rack[i].duration / 1000 / 60; // время роста в минутах
	m = (204-((rack[i].x==1)?0:12)) * (rack[i].crop-1) /
		rack[i].x / rack[i].y;        // сколько вырастет на поле
	if (t)
	{
		rack[i].numInHour = 60 / t * m;   // столько вырастает в час
		rack[i].rentab = rentab(rack[i]); // рентабельность
		rack[i].p_good = goodPrice(rack[i]); // выгодная цена
		rack[i].points = PRODUCTS[i][PT]/60000*0.1*rack[i].x*rack[i].y; // кол-во очков
	}
}
// меняем внутреннюю структуру корзинки
function modifyRack()
{
	var i, r = globObj('rackElement'), rack=[];
	for (i in r) rack[i] = r[i];
	// процент полива
	var t, n, poliv = ''+globObj('selectMode');
	poliv = /(\d+)%/.exec(poliv); poliv = parseInt(poliv[1]) / 100;
	w.POLIV = poliv;
	for (i = 0; i < rack.length; i++)
		modifyRackElement(i);
	// сортируем по рентабельности
//	rack.sort(function(x,y){ return y.rentab - x.rentab; });
	// преобразовываем в хэш для соответствия индексам
	var j = 0, newRack = {t:0};
	for (i = 0; i < rack.length; i++)
	if (rack[i].id != undefined)
	{
//		rack[i].rackid = Math.floor(j++ / 20); // номер полки
		newRack[rack[i].id] = rack[i];
	}
	w.rackElement = newRack;
}


// ссылки на рынок или в магазин
function linkMarket(prod) { return '/stadt/markt.php?page=1&order=p&v='+prod.id+'&filter=1'; }
// ссылка на магазин
function linkShop(prod) { return '/stadt/shop.php?s='+prod.shop; }
// ссылка где выгоднее
function linkShopOrMarket(prod)
{ return prod.p_market < prod.p_shop ? linkMarket(prod) : linkShop(prod); }

// меняем отображение семян на полке
function modifyRackDesign()
{
	// стрелки
/*	w.changeRack = function(updown)
	{
		var cr = globObj('_currRack');
		cr = (2 + cr + updown) % 2;
		w.updateRack(cr);
		w._currRack = cr;
	}*/
	var st   = '';
	var url1 ='http://d3o68bgrbhx8hn.cloudfront.net/pics/lager/links_disabled.gif';
	var url2 ='http://d3o68bgrbhx8hn.cloudfront.net/pics/lager/rechts_disabled.gif';
	var cl   = ''+
		'onmouseover="this.src=this.src.replace(\'disabled\', \'still\')"'+
		'onmouseout ="this.src=this.src.replace(\'still\', \'disabled\')"'+
		'onclick="changeRack(';
	st += '<img style="float:left;"  src="'+url1+'"'+cl+' 1)" />';
	st += '<img style="float:right;" src="'+url2+'"'+cl+'-1)" />';
	$('regal_change').innerHTML = st;
	// обновление корзинки
/*	w.updateRack_ = w.updateRack;
	w.updateRack = function(x)
	{
		// нули в кол-ве убираем, чтобы не пропадали продукты
		var i, r = w.rackElement;
		for (i in r) if (r[i].number == 0 && r[i].shop != 3) r[i].number = 0.01;
		if (x == undefined)
			x = w._currRack;
		return w.updateRack_(x, true);
	}*/
	w.showRackElement_ = w.showRackElement;
	w.showRackElement  = function(a,s,q,e,b,m,p,o,c,l,f,n,r)
	{
		// семечко
		var prod = w.rackElement[a];
		// всплывающая подсказка
		var txt='', title = '';
//		title = Math.round(prod.number)+', '+round(prod.p_market*0.9,2)+':'+prod.p_market+' сТ'+
//			' ('+prod.p_shop+'->'+round(prod.p_good/1.1, 2)+':'+prod.p_good+'), '+prod.rentab;
		title = Math.round(prod.number)+', '+prod.p_market+' сТ'+
			' ('+prod.p_shop+'), '+prod.rentab;
		var style = '', linkGood = linkMarket(prod);
		// раскрашиваем надписи
		if ( prod.p_market >= prod.p_good) style = 'color: '+CL_GOOD+';';
		if ( prod.rentab   <= RENTAB_BAD)  style = 'color: '+CL_BAD+';';
		if (!prod.p_market)                style = 'color: #FFF;';
		if ( prod.p_market > prod.p_shop) { style += 'background:#AAF'; linkGood = linkShop(prod); }
		// для кокосов и пальм не действует
		if (prod.id == w.KOKOS || prod.id == w.PALME) style = '';
		var oncl = "document.getElementById('shop').style.display='';"+
			"shopframe2.document.body.innerHTML = ''";
		style = 'onclick="'+oncl+'"style="font-size: 8px;'+style+'"'+
			'target="shopframe2" title="'+title+'"';
		// сокращаем большие числа
		var mR = (m < 1000) ? Math.round(m) : Math.floor(m / 1000)+'к';
		var need = (prod.need <= prod.number) ? 0 : prod.need - Math.round(prod.number);
		if ((''+mR).length < 3 || (''+need).length < 3)
		{ need = need+' '; mR = ' '+mR; }
		// отображаем ссылку
		txt += '<a href="'+linkMarket(prod)+'"'+style+'>&nbsp;'+need+'</a>'+
			'<a    href="'+linkGood+'"'+style+'>/'+mR+'&nbsp;</a>';
		txt = '<small>' + txt + '</small>';
		w.showRackElement_(a,s,q,e,b,txt,p,o,c,l,f,n,r);
	}
//	w.updateRack();
}

// меняем отображение подсказки от гномика
function modifyGnomeTooltip()
{
	w.calcTime_ = w.calcTime;
	w.calcTime = function(j,c)
	{
		var t = w.calcTime_(j,c);
		t = formatTime(time()+t);
		$('gtt_zeit').innerHTML += ' ('+t+')';
	}
}

// обновление статусной строки
function updateStatus()
{
	var s = $('status');
	var money = parseFloat($('bar').innerHTML.
		replace(new RegExp('[' +
		globObj('_CURRENCY_1000') +
		globObj('_CURRENCY_SEP')  + ']','g'), '')) / 100;
	var i, N = 0, onSemen = 0, rack = globObj('rackElement');
	for (i in rack)
	{
		if (rack[i].p_market)
			onSemen += rack[i].p_market * rack[i].number * 0.9;
		if (rack[i].number > 0.9) N++;
	}
	$('prodCount', LNG_PRODUCTS+': '+N+' / 20');
	var sost = money + onSemen;
	var score = $('pkt').innerHTML.replace(/\./g, '');
	var round2 = function(x)
	{
		var p; x = parseFloat(x);
		p = 1000000; if (x >= p) return round(x / p, 2)+'М';
		p =    1000; if (x >= p) return round(x / p, 2)+'К';
		return round(x, 2);
	}
	s.innerHTML = ', '+
		LNG_STATUS_MONEY+': ' + round2(money) +
		'+' + round2(onSemen)+
		'=' + round2(sost)   +', '+
		LNG_STATUS_LEVEL+': ' + globObj('LEVEL')+'/22, ' +
		LNG_STATUS_SCORE+': ' + round2(score) +
		'; <span id="log"></span>';
	// номер сада
	var NS = getGardenNumber();
	$('gardenNums').innerHTML = (
		' <a href="HREF1"STYLE> 1'+nextTime[1]+'</a>'+
		' <a href="HREF2"STYLE> 2'+nextTime[2]+'</a>'+
		' <a href="HREF3"STYLE> 3'+nextTime[3]+'</a>'+
		' <a href="HREF4"STYLE> 4'+nextTime[4]+'</a>').
		replace(/HREF/g,  '/garten_map.php?garden=').
		replace(/STYLE/g, 'target="garten"style="color: #FFFB48;text-decoration:none;"').
		replace(new RegExp('> ('+NS+'[^<]+)<'), '><b style="color: #FFF; border: 1px solid #FFF;">&nbsp;$1&nbsp;</b><');
}

/** засеять все поле */
plantAllGarden = function()
{
	var i, j, N, sq = 1;
	sq *= w.rackElement[w.selected].x;
	sq *= w.rackElement[w.selected].y;
	w.selectMode(0, true, "selected");
	for (i = 1; i <= 12; i++)
	for (j = 1; j <= 17; j++)
	if ((j % 2 == 0) && (sq == 4 || sq == 2)) continue; else
	if ((i % 2 == 0) && (sq == 4           )) continue; else
	{
		N = (i - 1) * 17 + j;
		if (w.rackElement[w.selected].number)
			w.cache_me(N, 0, "");
	}
	setTimeout(w.findComplete, 2000);
	return false;
}
try { w.plantAllGarden = plantAllGarden; } catch(e) {}

// меняем отображение общего поля
function modifyMainPage()
{
	// дополнительные кнопки
	var cl, s, st = '', div = document.createElement('DIV');
	s = 'style="display:inline-block;padding: 10px;background: #FFF;"';
	cl = SCRIPT_PAGE.replace(/[^/]+$/, 'help.html');
	st += '<a '+s+'href="'+cl+'" target="_blank">'+LNG_BTN_HELP+'</a> ';
	cl = 'return plantAllGarden();';
	st += '<a '+s+'href="#" onclick=\''+cl+'\'>'+LNG_BTN_PLANT+'</a> ';
	cl = 'selectMode(2,true,"selected");for(var i=1;i<205;i++)cache_me(i,0,""); setTimeout(findComplete, 2000); return false';
	st += '<a '+s+'href="#" onclick=\''+cl+'\'>'+LNG_BTN_WATER+'</a> ';
	// фрейм с рынком
	st += '<div name="shop" id="shop" style="position:absolute;z-index:20;width:640px;height:560px;left:300px;right:40px;top:100px;bottom:40px;display:none;">';
	st += '<iframe id="shopframe2" name="shopframe2" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>';
	st += '</div>';
	st += '<div style="display: none;" id="garten_aktuell_nummer"></div>';
	st += '<div style="display: none;" id="stadtlock"></div>';
	div.innerHTML = st;
	style(div, {position: 'absolute', top: '0px', left: 0, zIndex: 1000});
	$('garten_aktuell_nummer').id = 'gardenNums';
	document.body.appendChild(div);

	// размер игрового поля
	if (document.body.parentNode.clientHeight < 700)
	{
		var upsimT = 0;
		if ($('uptoolbar'))
		{
			upsimT = parseInt($('uptoolbar').style.height);
			$('uptoolbar').style.display = 'none';
		}
		if ($('gpopDiv').style.top != '18px')
		{
			$('contentwrapper').style.marginTop = -170-upsimT+'px';
			// подсказка гномика
			$('gpopDiv').style.top  = '150px';
			$('gpopDiv').style.left = '220px';
		} else // для минималистичного дизайна
			$('contentwrapper').style.marginTop = -50-upsimT+'px';
		// не видно кнопки договора
		if ($('vertraege').src.indexOf('_neu') != -1)
			$('vertraege').style.top = '38px';
	}
	// вставляем номер версии и быстрый переход в другие логины
	var b = $('gardenNums').parentNode;
	b.innerHTML = '<b>'+SCRIPT_VERSION+'</b> '+getLoginList()+b.innerHTML.replace(/.+?</, '<');
	// дополнительная информация в статусе
	var s = document.createElement('SPAN');
	s.id = 'status';
	$('gardenNums').parentNode.appendChild(s);
	w.updatePlayerInfo_   = w.updatePlayerInfo;
	w.updatePlayerInfo    = function(e,a,c,h,b,f) { w.updatePlayerInfo_(e,a,c,h,b,f); updateStatus(); }
	w.stadt_hideAnimation = function() { }
	w.product = function(c,b,h,e,j,f,n,o,m,l,a)
	{ var rack = globObj('rackElement'); rack[c].number = h; return rack[c]; }
	// кол-во семечек на полке
	s = document.createElement('SPAN');
	s.id = 'prodCount';
	style(s, 'color: #FFF;');
	$('lager_ttip').appendChild(s);
	// сокращаем надпись премиум аккаунта
	if ($('premium'))
	{
		var p = $('premium');
		var c = $('coins').innerHTML;
		p = p.parentNode.firstChild;
		p.innerHTML = p.innerHTML.replace(/[^0-9]+([0-9.]+).+/, 'ПА: $1 / '+c);
	}
}

// поправляем кнопку закрыть
function modifyMarketClose()
{
	var i, st, btn = document.getElementsByClassName('link2');
	for (i = 0; i < btn.length;i++)
	if (btn[i].innerHTML.indexOf('stadt_schliesseFrame') != -1) 
	{
		btn[i].innerHTML = '<img src="http://d3o68bgrbhx8hn.cloudfront.net/pics/close.jpg"'+
		'onclick="'+
			'parent.document.getElementById(\'shop\').style.display=\'none\';'+
			'parent.document.getElementById(\'stadtlock\').style.display=\'none\';'+
		'"/>';
		break;
	}
}

// текущий уровень игрока
function grabUserLevel()
{
	var i, level = 0, str = $('level').innerHTML;
	str = str.split(','); str = str[0];
	for (i = 0; i < LEVELS.length; i++)
	if (LEVELS[i] == str) { level = i; break; }
	w.LEVEL = level;
}

// сохранение цены на сервере
function savePriceOnServer(name, price)
{
	// проверяем последнее изменение
	var lastUpdate = Settings.load(name+'_toSrv', 0);
	var curTime    = Math.round((new Date()).getTime() / 1000);
	if (lastUpdate + 10*60 > curTime) return; // часто не отправляем

	Settings.store(name+'_toSrv', curTime); 
	var st = '', p, params = {
		'id':     prodByName[name],
		'server': getServer(),
		'version':SCRIPT_VERSION,
		'player': parent.document.getElementById('username').innerHTML,
		'score':  parent.document.getElementById('pkt').innerHTML.replace(/\D/g, ''),
		'money':  parent.document.getElementById('bar').innerHTML.replace(/\D/g, ''),
		'name':   name,
		'price':  price / 100
	};
	for (p in params)
		st += (st==''?'':'&')+p+'='+params[p];
	var d = document.createElement('script');
	d.type = 'text/javascript';
	d.src  = 'http://cupivan.ru/sadowajaimperija/savePrice.php?'+st;
	document.body.appendChild(d);
}

/** купить в магазине */
function buyInShop(pname, count)
{
	var p = prod(pname), st = 's='+p.shop+'&page=1&change_page_only=0';
	st += '&anzahl%5B0%5D='+count;
	st += '&preis%5B0%5D='+p.p_shop;
	st += '&produkt%5B0%5D='+p.id;
	ajax.load('/stadt/shop.php?s='+p.shop, st, function(x)
	{
		// ошибка при загрузке
		if (x.length < 10)
		{
			alert('Магазин доступен только по средам и субботам!');
			return;
		}
		if (x.indexOf('Невозможно купить') != -1)
		{
			alert('Нет свободного места на стеллаже');
			return;
		}
//		parent.wrappedJSObject.rackElement[p.id].number += count;
//		parent.wrappedJSObject.updateRack();
		if (!--w.GR)
			document.location = document.location;
	});
	if (w.GR != undefined) w.GR = 0; w.GR++;
	return false;
}

var iconElement = null;
var lastIcon    = 0;
/** обновление иконки */
function updateFavicon(isNew)
{
	// создаем иконку
	if (iconElement == null)
	{
		iconElement      = document.createElement('link');
		iconElement.rel  = 'shortcut icon';
		iconElement.type = 'image/png';
		iconElement.href = '/favicon.ico'
		document.getElementsByTagName('head')[0].appendChild(iconElement);
	}
	if (isNew && lastIcon == 0)
	{
		iconElement.href = 'http://favicon.ru/favicon.ico';
		document.getElementsByTagName('head')[0].removeChild(iconElement);
		document.getElementsByTagName('head')[0].appendChild(iconElement);
		lastIcon = 1;
	} else
	if (isNew == 0 && lastIcon == 1)
	{
		iconElement.href = '/favicon.ico';
		document.getElementsByTagName('head')[0].removeChild(iconElement);
		document.getElementsByTagName('head')[0].appendChild(iconElement);
		lastIcon = 0;
	}
}

var nextTime = ['', '', '', '', '']; // времена захода для каждого из садов
/** поиск созрелых и неполитых овощей */
function findComplete()
{
	var i, L1, L2, f = w.garten;
	var isIconBlink = 0;
	var tt1, tt2, min = -1, t = Math.round((new Date()).getTime() / 1000);
	t = 0 +
		w.Zeit.Client -
		w.Zeit.Verschiebung;
	L1 = L2 = 'У';
	for (i = 1; i < f.garten_zeit.length; i++)
	{
		if (f.garten_kategorie[i] == 'z') continue; // пропускаем декор
		if (f.garten_kategorie[i] == 'u') continue; // пропускаем камни
		// урожай созрел
		tt1 = f.garten_zeit[i] - t;
		if (tt1 < 0) isIconBlink++;
		else
		{
			if (min == -1 || tt1 < min) { L1 = 'У'; min = tt1; }
			// надо поливать
			tt2 = f.garten_wasser[i] - t + 24*3600;
			if (tt2 < min) { L1 = 'П'; min = tt2; }
			if (tt2 < 0) isIconBlink++;
		}
	}
	// пишем время следующего захода на страницу
	nextTime[getGardenNumber()] = !min ? '' :
		'&nbsp;'+formatTime(time() + min) + L1 +
		(isIconBlink ? -isIconBlink : '');
	// выделяем что нужно поливать/собирать
	for (i = 1; i < f.garten_zeit.length; i++)
	if (f.garten_kategorie[i] != 'z')
	if (f.garten_kategorie[i] != 'u')
	if (f.garten_kategorie[i] == '')
		w.garten.document.getElementById('b'+i).style.border = '1px solid #000';
	else
	if (f.garten_zeit[i] < t)
		w.garten.document.getElementById('b'+i).style.border = '1px solid #0F0';
	else
	if (f.garten_zeit[i] - t < min + 60)
		w.garten.document.getElementById('b'+i).style.border = '1px solid #070';
	else
	if (f.garten_wasser[i] - t + 24*3600 < 0)
		w.garten.document.getElementById('b'+i).style.border = '1px solid #00F';
	else
	if (f.garten_wasser[i] - t + 24*3600 < min + 60)
		w.garten.document.getElementById('b'+i).style.border = '1px solid #005';
	else
		w.garten.document.getElementById('b'+i).style.border = '0';
	updateStatus();
	updateFavicon(isIconBlink);
}

/** перевод скрипта на другие языки */
function chooseLanguage()
{
	switch (getServer().replace(/\d+/, ''))
	{
		case 'bg': // @translator nagets5879 <nagets5879@ya.ru>
			// продукты
				PRODUCTS[20][PN] = 'Аспержа';
				PRODUCTS[34][PN] = 'Боровинка';
				PRODUCTS[33][PN] = 'Брокол';
				PRODUCTS[58][PN] = 'Гербер';
				PRODUCTS[ 5][PN] = 'Домат';
				PRODUCTS[17][PN] = 'Жълта слива';
				PRODUCTS[22][PN] = 'Картоф';
				PRODUCTS[32][PN] = 'Карфиол';
				PRODUCTS[64][PN] = 'Кафе';
				PRODUCTS[12][PN] = 'Краставица';
				PRODUCTS[21][PN] = 'Круша';
				PRODUCTS[ 8][PN] = 'Къпина';
				PRODUCTS[59][PN] = 'Лавандула';
				PRODUCTS[60][PN] = 'Лале';
				PRODUCTS[51][PN] = 'Лилия';
				PRODUCTS[ 9][PN] = 'Лук';
				PRODUCTS[10][PN] = 'Малина';
				PRODUCTS[ 2][PN] = 'Маруля';
				PRODUCTS[55][PN] = 'Маслина';
				PRODUCTS[52][PN] = 'Метличина';
				PRODUCTS[54][PN] = 'Минзухар';
				PRODUCTS[ 6][PN] = 'Морков';
				PRODUCTS[49][PN] = 'Невен';
				PRODUCTS[19][PN] = 'Орех';
				PRODUCTS[53][PN] = 'Орхидея';
				PRODUCTS[ 7][PN] = 'Патладжан';
				PRODUCTS[14][PN] = 'Репичка';
				PRODUCTS[50][PN] = 'Розa';
				PRODUCTS[13][PN] = 'Слива';
				PRODUCTS[48][PN] = 'Слънчоглед';
				PRODUCTS[36][PN] = 'Спанак';
				PRODUCTS[18][PN] = 'Тиква';
				PRODUCTS[16][PN] = 'Тиквичка';
				PRODUCTS[61][PN] = 'Цветно зеле';
				PRODUCTS[11][PN] = 'Червен касис';
				PRODUCTS[ 1][PN] = 'Череша';
				PRODUCTS[35][PN] = 'Чесън';
				PRODUCTS[15][PN] = 'Чушка';
				PRODUCTS[ 4][PN] = 'Ябълка';
				PRODUCTS[ 3][PN] = 'Ягода';
				PRODUCTS[41][PN] = 'Грозде';
				PRODUCTS[42][PN] = 'Босилек';
				PRODUCTS[45][PN] = 'Гъба';
				PRODUCTS[43][PN] = 'Лимон';
			// декор
				PRODUCTS[44][PN] = 'Дек. джуджета';
				PRODUCTS[25][PN] = 'Дек. камъчета';
				PRODUCTS[38][PN] = 'Дзен градина';
				PRODUCTS[47][PN] = 'Дървена топка';
				PRODUCTS[39][PN] = 'Езерце';
				PRODUCTS[37][PN] = 'Зона за седене';
				PRODUCTS[23][PN] = 'Извор1';
				PRODUCTS[24][PN] = 'Извор2';
				PRODUCTS[40][PN] = 'Кръг от камък';
				PRODUCTS[56][PN] = 'Огнище';
				PRODUCTS[57][PN] = 'Плашило';
				PRODUCTS[63][PN] = 'Пързалка';
				PRODUCTS[26][PN] = 'Пътека1';
				PRODUCTS[27][PN] = 'Пътека2';
				PRODUCTS[28][PN] = 'Пътека3';
				PRODUCTS[46][PN] = 'Пътека4';
				PRODUCTS[62][PN] = 'Пясъчник';
				PRODUCTS[29][PN] = 'Чадър1';
				PRODUCTS[30][PN] = 'Чадър2';
				PRODUCTS[31][PN] = 'Чадър3';
			// уровни
				LEVELS = ['???'
				,/* 1*/'Салатко'
				,/* 2*/'Продавач'
				,/* 3*/'Доматист'
				,/* 4*/'Лучен гид'
				,/* 5*/'Жътвар'
				,/* 6*/'Картофник'
				,/* 7*/'Плевелов'
				,/* 8*/'Къртицоловец'
				,/* 9*/'Частник'
				,/*10*/'БорЛорд'
				,/*11*/'Плашило'
				,/*12*/'РозКавалер'
				,/*13*/'Зелен гуру'
				,/*14*/'Черешко'
				,/*15*/'Цветна фея'
				,/*16*/'Лешникотрошач'
				,/*17*/'Шеф на лилиите'
				,/*18*/'Орхидейник'
				,/*19*/'Цар Минзухар'
				,/*20*/'Плевелоборец'
				,/*21*/'Фотосинтеза'
				,/*22*/'Зелен Император']
			// фразы
				LNG_MARKET_DEL_FILTER = 'Изтрий филтър';
				LNG_MARKET_BACK       = ' назад';
				LNG_MARKET_BUY        = 'Закупи|скъпо';
				LNG_STATUS_MONEY      = 'Пари';
				LNG_STATUS_LEVEL      = 'Ниво';
				LNG_STATUS_SCORE      = 'Точки';
				LNG_QUEST             = 'Мисия';
				LNG_QUEST_NO          = 'Няма мисия';
				LNG_BTN_HELP          = 'Помощ';
				LNG_BTN_PLANT         = 'Посей';
				LNG_BTN_WATER         = 'Полей';
				LNG_PROD_REST         = 'ост.';
				LNG_WITH_PROD_IN_RACK = 'С оглед на продуктите на рафта';
				LNG_BUY_IN_SHOP       = 'Купи в магазина">[ КВМ ]';
				LNG_NEW_VERSION       = 'Нова версия на скрипта. Искате ли да изтеглите?';
				LNG_PRODUCTS          = 'Products';
				LNG_CLEAR             = 'Clear';
			break;
		case 'de':
			// продукты
				PRODUCTS[ 4][PN] = 'Apfel';
				PRODUCTS[ 7][PN] = 'Aubergine';
				PRODUCTS[21][PN] = 'Birne';
				PRODUCTS[32][PN] = 'Blumenkohl';
				PRODUCTS[33][PN] = 'Brokkoli';
				PRODUCTS[ 8][PN] = 'Brombeere';
				PRODUCTS[ 3][PN] = 'Erdbeere';
				PRODUCTS[58][PN] = 'Gerbera';
				PRODUCTS[12][PN] = 'Gurke';
				PRODUCTS[34][PN] = 'Heidelbeere';
				PRODUCTS[10][PN] = 'Himbeere';
				PRODUCTS[11][PN] = 'Johannisbeere';
				PRODUCTS[64][PN] = 'Kaffee';
				PRODUCTS[ 6][PN] = 'Karotte';
				PRODUCTS[22][PN] = 'Kartoffel';
				PRODUCTS[ 1][PN] = 'Kirsche';
				PRODUCTS[35][PN] = 'Knoblauch';
				PRODUCTS[52][PN] = 'Kornblume';
				PRODUCTS[54][PN] = 'Krokus';
				PRODUCTS[18][PN] = 'Kürbis';
				PRODUCTS[59][PN] = 'Lavendel';
				PRODUCTS[51][PN] = 'Lilie';
				PRODUCTS[17][PN] = 'Mirabelle';
				PRODUCTS[55][PN] = 'Olive';
				PRODUCTS[53][PN] = 'Orchidee';
				PRODUCTS[15][PN] = 'Paprika';
				PRODUCTS[13][PN] = 'Pflaume';
				PRODUCTS[14][PN] = 'Radieschen';
				PRODUCTS[49][PN] = 'Ringelblume';
				PRODUCTS[50][PN] = 'Rose';
				PRODUCTS[61][PN] = 'Rotkohl';
				PRODUCTS[ 2][PN] = 'Salat';
				PRODUCTS[48][PN] = 'Sonnenblume';
				PRODUCTS[20][PN] = 'Spargel';
				PRODUCTS[36][PN] = 'Spinat';
				PRODUCTS[ 5][PN] = 'Tomate';
				PRODUCTS[60][PN] = 'Tulpe';
				PRODUCTS[19][PN] = 'Walnuss';
				PRODUCTS[16][PN] = 'Zucchini';
				PRODUCTS[ 9][PN] = 'Zwiebel';
			// декор
				PRODUCTS[23][PN] = 'Brunnen 1';
				PRODUCTS[24][PN] = 'Brunnen 2';
				PRODUCTS[25][PN] = 'Dekosteine';
				PRODUCTS[56][PN] = 'Feuerstelle';
				PRODUCTS[44][PN] = 'Gartenzwerge';
				PRODUCTS[26][PN] = 'Gehweg 1';
				PRODUCTS[27][PN] = 'Gehweg 2';
				PRODUCTS[28][PN] = 'Gehweg 3';
				PRODUCTS[46][PN] = 'Gehweg 4';
				PRODUCTS[47][PN] = 'Holzkugeln';
				PRODUCTS[29][PN] = 'Pavillon 1';
				PRODUCTS[30][PN] = 'Pavillon 2';
				PRODUCTS[31][PN] = 'Pavillon 3';
				PRODUCTS[63][PN] = 'Rutsche';
				PRODUCTS[62][PN] = 'Sandkasten';
				PRODUCTS[37][PN] = 'Sitzecke';
				PRODUCTS[40][PN] = 'Steinkreis';
				PRODUCTS[39][PN] = 'Teich';
				PRODUCTS[57][PN] = 'Vogelscheuche';
				PRODUCTS[38][PN] = 'Zengarten';
			// уровни
				LEVELS = ['???'
				,/* 1*/'Salatschleuderer'
				,/* 2*/'Erbsenzähler'
				,/* 3*/'Tomatendealer'
				,/* 4*/'Zwiebeltreter'
				,/* 5*/'Erntehelfer'
				,/* 6*/'Kartoffelschäler'
				,/* 7*/'Grünzeugvertreter'
				,/* 8*/'Maulwurfjäger'
				,/* 9*/'Kleingärtner'
				,/*10*/'Blaubeerbaron'
				,/*11*/'Vogelscheucher'
				,/*12*/'Rosenkavalier'
				,/*13*/'Gemüseguru'
				,/*14*/'Kirschkernspucker'
				,/*15*/'Zaunkönig'
				,/*16*/'Walnusswächter'
				,/*17*/'Lilienlobbyist'
				,/*18*/'Orchideenzüchter'
				,/*19*/'Krokuspokus'
				,/*20*/'Unkrautschreck'
				,/*21*/'Gerberagerber'
				,/*22*/'Wurzelimperator']
			// фразы
				LNG_MARKET_DEL_FILTER = 'Filter löschen';
				LNG_MARKET_BACK       = ' zurück';
				LNG_MARKET_BUY        = 'kaufen|zu teuer';
				LNG_STATUS_MONEY      = 'Bar';
				LNG_STATUS_LEVEL      = 'Level';
				LNG_STATUS_SCORE      = 'Punkte';
				LNG_QUEST             = 'Quest';
				LNG_QUEST_NO          = 'Keine quest';
				LNG_BTN_HELP          = 'Hilfe';
				LNG_BTN_PLANT         = 'Ernten';
				LNG_BTN_WATER         = 'Wässern';
				LNG_PROD_REST         = 'Rest';
				LNG_WITH_PROD_IN_RACK = 'Basierte Produkte im Regal';
				LNG_BUY_IN_SHOP       = 'Kaufen Sie im Shop">[ KSS ]';
				LNG_NEW_VERSION       = 'Veröffentlichte eine neue Version des Skripts. Aktualisieren möchten?';
				LNG_PRODUCTS          = 'Products';
				LNG_CLEAR             = 'Clear';
			break;
		case 'es':
			// продукты
				PRODUCTS[55][PN] = 'Aceituna';
				PRODUCTS[52][PN] = 'Aciano';
				PRODUCTS[35][PN] = 'Ajo';
				PRODUCTS[34][PN] = 'Arándano';
				PRODUCTS[54][PN] = 'Azafran';
				PRODUCTS[ 7][PN] = 'Berenjena';
				PRODUCTS[33][PN] = 'Brócoli';
				PRODUCTS[64][PN] = 'Café';
				PRODUCTS[16][PN] = 'Calabacín';
				PRODUCTS[18][PN] = 'Calabaza';
				PRODUCTS[49][PN] = 'Caléndula';
				PRODUCTS[ 9][PN] = 'Cebolla';
				PRODUCTS[ 1][PN] = 'Cereza';
				PRODUCTS[13][PN] = 'Ciruela';
				PRODUCTS[17][PN] = 'Ciruela amarilla';
				PRODUCTS[32][PN] = 'Coliflor';
				PRODUCTS[36][PN] = 'Espinaca';
				PRODUCTS[20][PN] = 'Espárrago';
				PRODUCTS[10][PN] = 'Frambuesa';
				PRODUCTS[ 3][PN] = 'Fresa';
				PRODUCTS[58][PN] = 'Gerbera';
				PRODUCTS[48][PN] = 'Girasol';
				PRODUCTS[11][PN] = 'Grosella';
				PRODUCTS[59][PN] = 'Lavanda';
				PRODUCTS[ 2][PN] = 'Lechuga';
				PRODUCTS[51][PN] = 'Lirio';
				PRODUCTS[61][PN] = 'Lombarda';
				PRODUCTS[ 4][PN] = 'Manzana';
				PRODUCTS[ 8][PN] = 'Mora';
				PRODUCTS[19][PN] = 'Nuez';
				PRODUCTS[53][PN] = 'Orquídea';
				PRODUCTS[22][PN] = 'Patata';
				PRODUCTS[12][PN] = 'Pepino';
				PRODUCTS[21][PN] = 'Pera';
				PRODUCTS[15][PN] = 'Pimiento';
				PRODUCTS[14][PN] = 'Rabanito';
				PRODUCTS[50][PN] = 'Rosa';
				PRODUCTS[ 5][PN] = 'Tomate';
				PRODUCTS[60][PN] = 'Tulipán';
				PRODUCTS[ 6][PN] = 'Zanahoria';
			// декор
				PRODUCTS[37][PN] = 'Asientos';
				PRODUCTS[47][PN] = 'Bolas de madera';
				PRODUCTS[62][PN] = 'Cajón de arena';
				PRODUCTS[26][PN] = 'Camino1';
				PRODUCTS[27][PN] = 'Camino2';
				PRODUCTS[28][PN] = 'Camino3';
				PRODUCTS[46][PN] = 'Camino4';
				PRODUCTS[40][PN] = 'Círculo de piedras';
				PRODUCTS[44][PN] = 'Enanito de adorno';
				PRODUCTS[57][PN] = 'Espantapájaros';
				PRODUCTS[39][PN] = 'Estanque';
				PRODUCTS[56][PN] = 'Fogata';
				PRODUCTS[23][PN] = 'Fuente1';
				PRODUCTS[24][PN] = 'Fuente2';
				PRODUCTS[38][PN] = 'Jardín zen';
				PRODUCTS[29][PN] = 'Pabellón1';
				PRODUCTS[30][PN] = 'Pabellón2';
				PRODUCTS[31][PN] = 'Pabellón3';
				PRODUCTS[25][PN] = 'Piedras de adorno';
				PRODUCTS[63][PN] = 'Tobogán';
			// уровни
				LEVELS = ['???'
				,/* 1*/'Lanzador de lechuga'
				,/* 2*/'Tiquismiquis'
				,/* 3*/'Traficante de tomates'
				,/* 4*/'Cortador de cebollas'
				,/* 5*/'Ayudante de cosecha'
				,/* 6*/'Pelapatatas'
				,/* 7*/'Asesor de verduras'
				,/* 8*/'Cazador de Topos'
				,/* 9*/'Jardinero aficionado'
				,/*10*/'Barón de arándano'
				,/*11*/'Espantapájaros'
				,/*12*/'Caballero de la rosa'
				,/*13*/'Guru verdulero'
				,/*14*/'Escupidor de cerezas'
				,/*15*/'Reyezuelo'
				,/*16*/'Vigilante de nueces'
				,/*17*/'Cabildero de lirios'
				,/*18*/'Cultivador de orquídeas'
				,/*19*/'Loco de croco'
				,/*20*/'Vencedor de maleza'
				,/*21*/'Lavador de lavanda'
				,/*22*/'Emperador jardinero']
			// фразы
				LNG_MARKET_DEL_FILTER = 'Eliminar';
				LNG_MARKET_BACK       = ' atrás';
				LNG_MARKET_BUY        = 'comprar|demansiado';
				LNG_STATUS_MONEY      = 'Dinero';
				LNG_STATUS_LEVEL      = 'Nivel';
				LNG_STATUS_SCORE      = 'Puntos';
				LNG_QUEST             = 'Quest';
				LNG_QUEST_NO          = 'Keine quest';
				LNG_BTN_HELP          = 'Ayuda';
				LNG_BTN_PLANT         = 'La siembra';
				LNG_BTN_WATER         = 'Derramar';
				LNG_PROD_REST         = 'Rest';
				LNG_WITH_PROD_IN_RACK = 'A la vista de los productos en la plataforma';
				LNG_BUY_IN_SHOP       = 'Comprar tienda">[ СT ]';
				LNG_NEW_VERSION       = 'Una nueva versión del guión. Si desea descargar?';
				LNG_PRODUCTS          = 'Products';
				LNG_CLEAR             = 'Clear';
			break;
		case 'hu':
			// продукты
				PRODUCTS[34][PN] = 'Áfonya';
				PRODUCTS[ 4][PN] = 'Alma';
				PRODUCTS[52][PN] = 'Búzavirág';
				PRODUCTS[33][PN] = 'Brokkoli';
				PRODUCTS[ 1][PN] = 'Cseresznye';
				PRODUCTS[16][PN] = 'Cukkíni';
				PRODUCTS[19][PN] = 'Dió';
				PRODUCTS[35][PN] = 'Fokhagyma';
				PRODUCTS[58][PN] = 'Gerbera';
				PRODUCTS[ 9][PN] = 'Hagyma';
				PRODUCTS[64][PN] = 'Kávé';
				PRODUCTS[32][PN] = 'Karfiol';
				PRODUCTS[49][PN] = 'Körömvirág';
				PRODUCTS[21][PN] = 'Körte';
				PRODUCTS[22][PN] = 'Krumpli';
				PRODUCTS[59][PN] = 'Levendula';
				PRODUCTS[51][PN] = 'Liliom';
				PRODUCTS[10][PN] = 'Málna';
				PRODUCTS[48][PN] = 'Napraforgó';
				PRODUCTS[55][PN] = 'Oliva';
				PRODUCTS[53][PN] = 'Orchidea';
				PRODUCTS[ 7][PN] = 'Padlizsán';
				PRODUCTS[15][PN] = 'Paprika';
				PRODUCTS[ 5][PN] = 'Paradicsom';
				PRODUCTS[50][PN] = 'Rózsa';
				PRODUCTS[14][PN] = 'Retek';
				PRODUCTS[11][PN] = 'Ribizli';
				PRODUCTS[54][PN] = 'Sáfrány';
				PRODUCTS[ 6][PN] = 'Sárgarépa';
				PRODUCTS[17][PN] = 'Sárgaszilva';
				PRODUCTS[ 2][PN] = 'Saláta';
				PRODUCTS[20][PN] = 'Spárga';
				PRODUCTS[36][PN] = 'Spenót';
				PRODUCTS[ 3][PN] = 'Szamóca';
				PRODUCTS[ 8][PN] = 'Szeder';
				PRODUCTS[13][PN] = 'Szilva';
				PRODUCTS[18][PN] = 'Tök';
				PRODUCTS[60][PN] = 'Tulipán';
				PRODUCTS[12][PN] = 'Uborka';
				PRODUCTS[61][PN] = 'Vöröskáposzta';
			// декор
				PRODUCTS[26][PN] = '1. számú járda';
				PRODUCTS[23][PN] = '1. számú kút';
				PRODUCTS[29][PN] = '1. számú pavilon';
				PRODUCTS[27][PN] = '2. számú járda';
				PRODUCTS[24][PN] = '2. számú kút';
				PRODUCTS[30][PN] = '2. számú pavilon';
				PRODUCTS[28][PN] = '3. számú járda';
				PRODUCTS[31][PN] = '3. számú pavilon';
				PRODUCTS[46][PN] = '4. számú járda';
				PRODUCTS[63][PN] = 'Csúszda';
				PRODUCTS[25][PN] = 'Díszkő';
				PRODUCTS[47][PN] = 'Fagolyó';
				PRODUCTS[62][PN] = 'Homokozó';
				PRODUCTS[40][PN] = 'Kőkereszt';
				PRODUCTS[44][PN] = 'Kertitörpe';
				PRODUCTS[57][PN] = 'Madárijesztő';
				PRODUCTS[39][PN] = 'Tó';
				PRODUCTS[56][PN] = 'Tűzrakóhely';
				PRODUCTS[37][PN] = 'Ülősarok';
				PRODUCTS[38][PN] = 'Zen-kert';
			// уровни
				LEVELS = ['???'
				,/* 1*/'Salátadobáló'
				,/* 2*/'Retkesgazda'
				,/* 3*/'Paradicsomdíler'
				,/* 4*/'Hagymataposó'
				,/* 5*/'Aratósegéd'
				,/* 6*/'Krumplihámozó'
				,/* 7*/'Zöldségügynök'
				,/* 8*/'Vakondvadász'
				,/* 9*/'Kiskertész'
				,/*10*/'Áfonyabáró'
				,/*11*/'Madárijesztő'
				,/*12*/'Rózsalovag'
				,/*13*/'Zöldségguru'
				,/*14*/'Meggymagköpő'
				,/*15*/'Kerítéskirály'
				,/*16*/'Diócsősz'
				,/*17*/'Liliom-lobbista'
				,/*18*/'Orchideagazda'
				,/*19*/'Sáfránysárkány'
				,/*20*/'Gyomok réme'
				,/*21*/'Gerberatímár'
				,/*22*/'Kertkirály']
			// фразы
				LNG_MARKET_DEL_FILTER = 'Szűrő';
				LNG_MARKET_BACK       = ' vissza';
				LNG_MARKET_BUY        = 'vásárlás|demansiado';
				LNG_STATUS_MONEY      = 'Készpénz';
				LNG_STATUS_LEVEL      = 'Szint';
				LNG_STATUS_SCORE      = 'Pontszám';
				LNG_QUEST             = 'Quest';
				LNG_QUEST_NO          = 'Keine quest';
				LNG_BTN_HELP          = 'Segítség';
				LNG_BTN_PLANT         = 'Ültetés';
				LNG_BTN_WATER         = 'Pour';
				LNG_PROD_REST         = 'mérleg';
				LNG_WITH_PROD_IN_RACK = 'alapú termékek a polcokon';
				LNG_BUY_IN_SHOP       = 'buy vár">[ BV ]';
				LNG_NEW_VERSION       = 'Az új változat a szkript. Szeretnénk letölteni?';
				LNG_PRODUCTS          = 'Termékek';
				LNG_CLEAR             = 'Tiszta';
			break;
		case 'nl': // @translator Cocky Cwiek <cockycwiek@gmail.com>
			// продукты
				PRODUCTS[22][PN] = 'Aardappelen';
				PRODUCTS[ 3][PN] = 'Aardbeien';
				PRODUCTS[ 4][PN] = 'Appel';
				PRODUCTS[20][PN] = 'Asperges';
				PRODUCTS[ 7][PN] = 'Aubergines';
				PRODUCTS[32][PN] = 'Bloemkool';
				PRODUCTS[34][PN] = 'Bosbes';
				PRODUCTS[ 8][PN] = 'Bramen';
				PRODUCTS[33][PN] = 'Broccoli';
				PRODUCTS[16][PN] = 'Courgette';
				PRODUCTS[10][PN] = 'Frambozen';
				PRODUCTS[58][PN] = 'Gerberas';
				PRODUCTS[49][PN] = 'Goudsbloem';
				PRODUCTS[ 1][PN] = 'Kersen';
				PRODUCTS[35][PN] = 'Knoflook';
				PRODUCTS[64][PN] = 'Koffie';
				PRODUCTS[12][PN] = 'Komkommers';
				PRODUCTS[52][PN] = 'Korenbloemen';
				PRODUCTS[54][PN] = 'Krokussen';
				PRODUCTS[59][PN] = 'Lavendel';
				PRODUCTS[51][PN] = 'Lelies';
				PRODUCTS[17][PN] = 'Mirabellen';
				PRODUCTS[55][PN] = 'Olijven';
				PRODUCTS[53][PN] = 'Orchideeën';
				PRODUCTS[15][PN] = 'Paprika';
				PRODUCTS[21][PN] = 'Peren';
				PRODUCTS[18][PN] = 'Pompoenen';
				PRODUCTS[13][PN] = 'Pruimen';
				PRODUCTS[14][PN] = 'Radijzen';
				PRODUCTS[11][PN] = 'Rode Aalbes';
				PRODUCTS[61][PN] = 'Rode kool';
				PRODUCTS[50][PN] = 'Rozen';
				PRODUCTS[ 2][PN] = 'Sla';
				PRODUCTS[36][PN] = 'Spinazie';
				PRODUCTS[ 5][PN] = 'Tomaten';
				PRODUCTS[60][PN] = 'Tulpen';
				PRODUCTS[ 9][PN] = 'Uien';
				PRODUCTS[19][PN] = 'Walnoten';
				PRODUCTS[ 6][PN] = 'Wortels';
				PRODUCTS[48][PN] = 'Zonnebloem';
			// декор
				PRODUCTS[37][PN] = 'Bankje';
				PRODUCTS[25][PN] = 'Decoratieve stenen';
				PRODUCTS[23][PN] = 'Fontein 1';
				PRODUCTS[24][PN] = 'Fontein 2';
				PRODUCTS[63][PN] = 'Glijbaan';
				PRODUCTS[47][PN] = 'Houten bal';
				PRODUCTS[56][PN] = 'Kampvuur';
				PRODUCTS[40][PN] = 'Stenen cirkel';
				PRODUCTS[29][PN] = 'Tuinhuisje 1';
				PRODUCTS[30][PN] = 'Tuinhuisje 2';
				PRODUCTS[31][PN] = 'Tuinhuisje 3';
				PRODUCTS[44][PN] = 'Tuinkabouters';
				PRODUCTS[39][PN] = 'Vijver';
				PRODUCTS[26][PN] = 'Voetpad 1';
				PRODUCTS[27][PN] = 'Voetpad 2';
				PRODUCTS[28][PN] = 'Voetpad 3';
				PRODUCTS[46][PN] = 'Voetpad 4';
				PRODUCTS[57][PN] = 'Vogelverschrikker';
				PRODUCTS[62][PN] = 'Zandbak';
				PRODUCTS[38][PN] = 'Zen-tuin';
			// уровни
				LEVELS = ['???'
				,/* 1*/'Salade draaier'
				,/* 2*/'Bonenplukker'
				,/* 3*/'Tomaten Teler'
				,/* 4*/'Uienplukker'
				,/* 5*/'Oogsthulp'
				,/* 6*/'Pieperrooier'
				,/* 7*/'Onkruidverkoper'
				,/* 8*/'Mollenjager'
				,/* 9*/'Perceelhouder'
				,/*10*/'Bosbes Baron'
				,/*11*/'Vogelverschrikker'
				,/*12*/'Rozenplukker'
				,/*13*/'Groenten Goeroe'
				,/*14*/'Kersenpit spuger'
				,/*15*/'Bloemenfee'
				,/*16*/'Notenkraker'
				,/*17*/'Lelie Lobbyist'
				,/*18*/'Orchideeën kweker'
				,/*19*/'Krokus pocus'
				,/*20*/'Onkruid verdelger'
				,/*21*/'Lavendel Tender'
				,/*22*/'Molehill Emperor']
			// фразы
				LNG_MARKET_DEL_FILTER = 'Verwijder filter';
				LNG_MARKET_BACK       = 'Terug';
				LNG_MARKET_BUY        = 'Kopen|Te duur';
				LNG_STATUS_MONEY      = 'Geld';
				LNG_STATUS_LEVEL      = 'Level';
				LNG_STATUS_SCORE      = 'Score';
				LNG_QUEST             = 'Quest';
				LNG_QUEST_NO          = 'Geen quest';
				LNG_BTN_HELP          = 'Hulp';
				LNG_BTN_PLANT         = 'Planten';
				LNG_BTN_WATER         = 'Water geven';
				LNG_PROD_REST         = 'Rest';
				LNG_WITH_PROD_IN_RACK = 'Bekijk Producten in kast';
				LNG_BUY_IN_SHOP       = 'Koop in de winkel">[ KIDW ]';
				LNG_NEW_VERSION       = 'Een nieuwe versie van het script is beschikbaar. Update uitvoeren?';
				LNG_PRODUCTS          = 'Producten';
				LNG_CLEAR             = 'Clear';
			break;
		case 'ro':
			// продукты
				PRODUCTS[34][PN] = 'Afine';
				PRODUCTS[52][PN] = 'Albãstriţã';
				PRODUCTS[15][PN] = 'Ardei';
				PRODUCTS[20][PN] = 'Asparagus';
				PRODUCTS[54][PN] = 'Brânduşe';
				PRODUCTS[33][PN] = 'Broccoli';
				PRODUCTS[ 3][PN] = 'Cãpşuni';
				PRODUCTS[64][PN] = 'Cafea';
				PRODUCTS[22][PN] = 'Cartofi';
				PRODUCTS[12][PN] = 'Castraveţi';
				PRODUCTS[ 9][PN] = 'Ceapã';
				PRODUCTS[11][PN] = 'Coacãze Roşii';
				PRODUCTS[32][PN] = 'Conopidã';
				PRODUCTS[51][PN] = 'Crini';
				PRODUCTS[16][PN] = 'Dovlecel';
				PRODUCTS[18][PN] = 'Dovleci';
				PRODUCTS[48][PN] = 'Floarea-Soarelui';
				PRODUCTS[49][PN] = 'Gãlbenele';
				PRODUCTS[58][PN] = 'Gerbera';
				PRODUCTS[60][PN] = 'Lalele';
				PRODUCTS[59][PN] = 'Levãnţicã';
				PRODUCTS[55][PN] = 'Mãsline';
				PRODUCTS[ 4][PN] = 'Mere';
				PRODUCTS[ 6][PN] = 'Morcovi';
				PRODUCTS[ 8][PN] = 'Mure';
				PRODUCTS[19][PN] = 'Nuci';
				PRODUCTS[53][PN] = 'Orhidee';
				PRODUCTS[21][PN] = 'Pere';
				PRODUCTS[13][PN] = 'Prune';
				PRODUCTS[17][PN] = 'Prune Galbene';
				PRODUCTS[14][PN] = 'Ridichi';
				PRODUCTS[ 5][PN] = 'Roşii';
				PRODUCTS[ 2][PN] = 'Salatã';
				PRODUCTS[36][PN] = 'Spanac';
				PRODUCTS[50][PN] = 'Trandafiri';
				PRODUCTS[35][PN] = 'Usturoi';
				PRODUCTS[61][PN] = 'Varzã Roşie';
				PRODUCTS[ 1][PN] = 'Vişine';
				PRODUCTS[ 7][PN] = 'Vinete';
				PRODUCTS[10][PN] = 'Zmeurã';
			// декор
				PRODUCTS[47][PN] = 'Bile din Lemn';
				PRODUCTS[40][PN] = 'Cerc de Pietre';
				PRODUCTS[62][PN] = 'Cutie cu Nisip';
				PRODUCTS[23][PN] = 'Fântânã 1';
				PRODUCTS[24][PN] = 'Fântânã 2';
				PRODUCTS[38][PN] = 'Grãdinã Zen';
				PRODUCTS[56][PN] = 'Groapã pentru Foc';
				PRODUCTS[39][PN] = 'Lac';
				PRODUCTS[37][PN] = 'Loc de stat jos';
				PRODUCTS[29][PN] = 'Pavilion 1';
				PRODUCTS[30][PN] = 'Pavilion 2';
				PRODUCTS[31][PN] = 'Pavilion 3';
				PRODUCTS[25][PN] = 'Pietre decorative';
				PRODUCTS[44][PN] = 'Pitici de grãdinã';
				PRODUCTS[26][PN] = 'Potecã 1';
				PRODUCTS[27][PN] = 'Potecã 2';
				PRODUCTS[28][PN] = 'Potecã 3';
				PRODUCTS[46][PN] = 'Potecã 4';
				PRODUCTS[57][PN] = 'Sperietoare';
				PRODUCTS[63][PN] = 'Tobogan';
			// уровни
				LEVELS = ['???'
				,/* 1*/'Filator de Salatã'
				,/* 2*/'Seminţar'
				,/* 3*/'Furnizor de Roşii'
				,/* 4*/'Cojitor de Ceapã'
				,/* 5*/'Ajutor de Recoltã'
				,/* 6*/'Cojitor de Cartofi'
				,/* 7*/'Pieţar'
				,/* 8*/'Vânãtor de Cârtiţe'
				,/* 9*/'Grădinar Amator'
				,/*10*/'Baron al Afinelor'
				,/*11*/'Sperietoare'
				,/*12*/'Maestru Trandafir'
				,/*13*/'Guru Zarzavagiu'
				,/*14*/'Cireşar'
				,/*15*/'Zâna Florilor'
				,/*16*/'Paznicul Nucilor'
				,/*17*/'Procurator de Crini'
				,/*18*/'Stăpânul Orhideelor'
				,/*19*/'FilatorMãslinar Grãdinar'
				,/*20*/'Profesionist'
				,/*21*/'Levãnţicar'
				,/*22*/'Împãrat Molehill'];
			// фразы
				LNG_MARKET_DEL_FILTER = 'ªterge filtrare';
				LNG_MARKET_BACK       = 'înapoi';
				LNG_MARKET_BUY        = 'cumpãrã|prea scump';
				LNG_STATUS_MONEY      = 'Bani';
				LNG_STATUS_LEVEL      = 'Nivel';
				LNG_STATUS_SCORE      = 'Scor';
				LNG_QUEST             = 'Căutare';
				LNG_QUEST_NO          = 'Nu quest';
				LNG_BTN_HELP          = 'Ajutor';
				LNG_BTN_PLANT         = 'Plantă';
				LNG_BTN_WATER         = 'Turna';
				LNG_PROD_REST         = 'opri.';
				LNG_WITH_PROD_IN_RACK = 'Produse pe bază de raft';
				LNG_BUY_IN_SHOP       = 'Cumpăra în magazin">[ CiM ]';
				LNG_NEW_VERSION       = 'Disponibile în noua versiune. Doriţi să actualizaţi script-ul?';
				LNG_PRODUCTS          = 'Produse';
				LNG_CLEAR             = 'Curat';
			break;
	}
	// семечки по названию
	for (i in PRODUCTS) prodByName[PRODUCTS[i][PN]] = i;
}

openQuest = function()
{
	w.stadt = true;
	w.g("stadtframe").src = "/stadt/index.php?karte=1";
	w.g("garten_komplett").style.display = "none";
	w.g("stadt").style.display = "block";
	w.g("stadt").style.zIndex = "2";
	setTimeout('document.getElementById("stadtframe").contentDocument.getElementById("quest").style.display="block"', 2000);
	return false;
}
try {w.openQuest = openQuest; } catch(e) {}

/** читаем номер выполненного квеста в почте */
function parseCompletedQuest()
{
	var numEnd, numEndCur, st = document.body.innerHTML;
	numEndCur = Settings.load('.quest', 0);
	st = /#(\d+)/.exec(st);
	if (st == null) return;
	numEnd = parseInt(st[1]);
	if (numEnd <= numEndCur) return;
	Settings.store('.quest', numEnd);
	Settings.store('.quend', 1);
	showQuestLine();
}

/** строка с текущим квестом */
function showQuestLine(x, maxEnd)
{
	var st, n, i, notCompl = 0, e = $('quest_line');
	if (!e)
	{
		e = document.createElement('DIV');
		e.id = 'quest_line';
		$('garten').appendChild(e);
	}
	n = Settings.load('.quest', 0);
	i = Settings.load('.quend', 0);
	if (x != undefined)
	if (x < 1 || x > 78) return false;
	else n = x;
	if (maxEnd != undefined) i = n <= maxEnd; else maxEnd = n;
	var style1 = 'color:#FFF;font-weight: bold; text-decoration: none;';
	st = n ? i ? '<s>'+LNG_QUEST+' '+n+'</s> из 78': LNG_QUEST+' '+n+' из 78' : LNG_QUEST_NO;
	st = '<a href="#quest"onclick="return openQuest()"style="'+style1+'">'+st+'</a> ';
	st = '<a href="#quest'+(n+1)+'"onclick="return showQuestLine('+(n+1)+','+maxEnd+')"style="'+style1+'"> &uarr; </a> ' + st;
	st = '<a href="#quest'+(n-1)+'"onclick="return showQuestLine('+(n-1)+','+maxEnd+')"style="'+style1+'"> &darr; </a> ' + st;
	var i, p, s, q = [];
	// квесты 1..10
		q[ 1] = {2:  1000};
		q[ 2] = {6:  2400};
		q[ 3] = {12: 1800};
		q[ 4] = {6:  702, 3:520, 14:500};
		q[ 5] = {5:  3000};
		q[ 6] = {22: 1100};
		q[ 7] = {36: 5000};
		q[ 8] = {49: 1500};
		q[ 9] = {5:  1600};
		q[10] = {22: 300, 9:2400, 14:500, 12:600};
	// квесты 11..20
		q[11] = {5:  3000, 9:600};
		q[12] = {22: 1500};
		q[13] = {32: 900, 36:900, 2:900};
		q[14] = {35: 2010};
		q[15] = {48: 3000};
		q[16] = {22: 2000};
		q[17] = {3:  4400};
		q[18] = {15: 1430};
		q[19] = {20: 900};
		q[20] = {6:  1600, 32:1600, 22:1000, 33:1600};
	// квесты 21..30
		q[21] = {15: 500, 2:2000, 36:1100};
		q[22] = {50: 1200};
		q[23] = {7:  1900, 12:2000};
		q[24] = {20: 1300};
		q[25] = {16: 2100};
		q[26] = {5:  1000, 15:2000, 9:600, 2:1400};
		q[27] = {8:  1200};
		q[28] = {16: 1000, 12:2200};
		q[29] = {11: 2800};
		q[30] = {48: 1100, 49:1200, 50:1000};
	// квесты 31..40
		q[31] = {10: 1000, 8:1200, 6:830};
		q[32] = {17: 1100};
		q[33] = {2:  3500, 6:6000, 22:1800};
		q[34] = {18: 720};
		q[35] = {8:  500, 11:1000, 34:200};
		q[36] = {49: 1000, 48:800, 50:800, 32:1000};
		q[37] = {37: 1};
		q[38] = {21: 1700};
		q[39] = {14: 2300, 15:1000, 12:2000, 33:1400};
		q[40] = {13: 888};
	// квесты 41..50
		q[41] = {34: 2000, 3:3000, 11:1500, 8:500};
		q[42] = {1: 1400};
		q[43] = {19: 1111, 48:555};
		q[44] = {32: 2500, 22:3000, 20:2000, 9:3500};
		q[45] = {4: 4000};
		q[46] = {28: 4};
		q[47] = {13: 3333, 19:666};
		q[48] = {18: 1000, 22:2000, 48:3000};
		q[49] = {52: 6000, 49:5000, 51:2000};
		q[50] = {1: 3500};
	// квесты 51..60
		q[51] = {19: 2200, 55: 500, 48: 500};
		q[52] = {51: 2000, 53: 1000, 50: 3000};
		q[53] = {5: 8000, 15: 4000, 9: 2000, 55: 800};
		q[54] = {11: 7500, 6: 5000, 19: 500};
		q[55] = {55: 5555};
		q[56] = {60: 8500};
		q[57] = {36: 3500, 6: 2000, 33: 2700};
		q[58] = {30: 1};
		q[59] = {33: 4000, 32: 4000, 20: 4000};
		q[60] = {54: 12500};
	// квесты 61..70
		q[61] = {39: 1};
		q[62] = {19: 2350, 13: 1000, 61: 800};
		q[63] = {18: 1700, 20: 1400, 4: 600, 1: 600};
		q[64] = {9: 900, 8: 1400, 61: 1200, 6: 7000};
		q[65] = {59: 3400, 55: 7500};
		q[66] = {59: 750, 12: 1300, 6: 4000};
		q[67] = {49: 10};
		q[68] = {6: 10000, 5: 5000, 2: 20000};
		q[69] = {5: 25000};
		q[70] = {5: 6000, 2: 12000, 6: 18000};
	// квесты 71..78
		q[71] = {38: 1};
		q[72] = {50: 4000, 58: 2500, 59: 1250};
		q[73] = {34: 4700, 8: 2400, 13: 900};
		q[74] = {56: 1};
		q[75] = {59: 1100, 49: 1100, 35: 900};
		q[76] = {58: 4500, 51: 5300};
		q[77] = {22: 6000, 4: 2000, 32: 500};
		q[78] = {6: 12000, 19: 6000};

	var rack = w.rackElement;
	if (rack == undefined)
		rack = parent.parent.wrappedJSObject.rackElement;
	if (q[n] != undefined)
	for (i in q[n])
	{
		p = rack[i];
		if (!p) { p = {number: 0, name:''}; notCompl = 1; }
		st += '<span class="stt'+i+'" style="margin: -3px 0 0 25px;"title="'+p.name+'"></span>';
		s = p.number >= q[n][i] ? 'text-decoration: line-through;' : '';
		st += '<span style="margin-left: 50px;'+s+'">'+q[n][i]+'</span>';
	}
	e.innerHTML = st;
	style(e, 'position: absolute; top: 0; background: #000; padding: 4px; '+style1+(notCompl?'color: #333;':''));
	return false;
}
try { w.showQuestLine = showQuestLine; } catch(e) {}

/** быстрый перезаход в другой аккаунт */
function relogin(x) { setTimeout(function()
{
	if (x == -2) return;
	if (x == -1)
	{
			Settings.store('!login', '');
			document.location = document.location;
		return;
	}
	var u = Settings.load('!login', '').split('_,_');
	u = u[x].split('=')[1].split('|');
	var p, s, d, fu, u;
	Settings.store('!pass',   p  = u[0]);
	Settings.store('!serv',   s  = u[1]);
	Settings.store('!domain', d  = u[2]);
	Settings.store('!f_user', fu = u[3]);
	Settings.store('!user',   u  = u[4]);

	var i, f = document.createElement('FORM');
	f.method = 'POST';
	f.action = 'http://'+d+'/serverwahl_login.php';
	i = document.createElement('INPUT');
	i.name = fu;       i.value = u; f.appendChild(i);
	i = document.createElement('INPUT');
	i.name = 'dummy';  i.value = p; f.appendChild(i);
	i = document.createElement('INPUT');
	i.name = 'server'; i.value = s; f.appendChild(i);
	i = document.createElement('INPUT');
	i.name = 'submitlogin'; i.value = ''; f.appendChild(i);
	document.body.appendChild(f);
	f.submit();
}, 0)}
try { w.relogin = relogin; } catch(e) {}

/** сохранение логина */
function saveLogin()
{
	var st = Settings.load('!login', '');
	var srv= getServer();
	var u  = Settings.load('!user');
	var p  = Settings.load('!pass');
	var s  = Settings.load('!serv');
	var d  = Settings.load('!domain');
	var fu = Settings.load('!f_user');
	if (st.indexOf(srv+' '+u) != -1)
		st = st.replace(new RegExp(srv+' '+u+'=.+?_,_'), '');
	st += srv+' '+u+'='+p+'|'+s+'|'+d+'|'+fu+'|'+u+'_,_';
	Settings.store('!login', st);
}

/** select - список логинов */
function getLoginList()
{
	var st = '', u, s;
	var lgn = Settings.load('!user', '');
	var srv = Settings.load('!serv', '');
	u = Settings.load('!login', '').split('_,_');
	for (i = 0; i < u.length; i++)
	if (u[i] != '')
	{
		s = (u[i].indexOf(lgn) == -1 && u[i].indexOf(srv) != -1) ?
			'' : '" selected="selected';
		st += '<option value="'+i+s+'">'+u[i].split('=')[0]+'</option>';
	}
		st += '<option value="-2"></option>';
		st += '<option value="-1">'+LNG_CLEAR+'</option>';
	st = '<select onchange="relogin(this.value)">'+st+'</select>';
	return st;
}

//----------------------------------------------------------------
// обработчики на страницы
//----------------------------------------------------------------
var L=''+document.location;

// выставляем нужный язык
chooseLanguage();

// главная страница -> отображаем дополнительные кнопки
if (L.indexOf('main.php?page=garden') != -1)
{
	// отзывы
	if (getServer().replace(/\d+/, '') == 'ru')
		addCommentButton('si');
	// автообновление
	GMHelper.updateScript();

	// получаем уровень игрока
	grabUserLevel();

	// запоминание логина
	saveLogin();

	// добавляем дополнительные поля в семена
//	modifyRack();

	// корректируем главную страницу
	modifyMainPage();

	// подсказка гномика
	modifyGnomeTooltip();

	// отображение семечки на полке
//	modifyRackDesign();

	// выводим квест
	showQuestLine();

	// обновляем цены на товары
	var prod, r = globObj('rackElement');
	for (prod in r)
	if (r[prod].id != undefined)
		checkPrice(r[prod]);

	// поиск созрелых или неполитых овощей
	setInterval(findComplete, 10*1000);
	w.findComplete = findComplete;
} else

// поле с грядками
if (L.indexOf('garten_map.php') != -1)
{
	parent.wrappedJSObject.findComplete();
} else

// общий список товаров
if (L.indexOf('markt.php?show=overview') != -1)
{
	modifyMarketClose();
	// подсвечиваем доступные овощи на текущем уровне
	var i, name, p, r, reg=/v=(\d+)/, links = document.getElementsByTagName('A');
	for (i = 0; i < links.length; i++)
	{
		r = reg.exec(links[i].href); p = prod(r[1]);
		// приглушаем недоступные
		if (p.id == undefined) links[i].style.color = CL_BAD;
		else
		{
			// выделяем нужные симпикам
			if (p.need > p.number) links[i].style.color = CL_GOOD;
			// пишем сколько у нас есть
			name = p.name.replace('цветная', '').replace('болгарский', '').
				replace('краснокочанная', 'кр.');
			links[i].innerHTML = name+', '+p.need+' / '+Math.round(p.number);
		}
	}
} else

// магазин
if (L.indexOf('shop.php') != -1)
{
	modifyMarketClose();
} else

// продажа товара
if (L.indexOf('marktstand.php') != -1)
{
	modifyMarketClose();
	// выбрали овощ на продажу
	w.zeigePreisschild_ = w.zeigePreisschild;
	w.zeigePreisschild = function(x)
	{
		w.zeigePreisschild_(x);
		var p = prod($('chosenobj').value.replace(/\D/g, ''));
		var sum = p.p_market;
		if (p.p_good > sum) sum = p.p_good;
		sum *= 100;
		$('produkt_anzahl').value = 200;
		$('produkt_preis1').value = Math.floor(sum / 100);
		$('produkt_preis2').value = sum % 100;
	}
	// валидация полей и расчет рентабельности
	w.checkInput_ = w.checkInput;
	w.checkInput  = function(x, y, z) {
		w.checkInput_(x, y, z);
		var sum	 = parseFloat(
			$('produkt_preis1').value + '.' +
			$('produkt_preis2').value);
		var p = prod($('chosenobj').value.replace(/\D/g, ''));
		var pp = {p_market:sum, numInHour:p.numInHour};
		var rent = rentab(pp);
		var n = parseInt($('produkt_anzahl').value);
		sum = Math.round(n * sum * 0.9);
		$('verkaufe_markt').value = 'продать за '+sum+' ['+rent+']';
	}
} else

// список товаров -> сохраняем текущую цену рынка
if (L.indexOf('markt.php') != -1)
{
	modifyMarketClose();
	// обновляем текущую страницу каждые MARKET_UPTIME секунд
	var div  = document.createElement('DIV');
	var link = L+'&auto_refresh';
	link = link.replace('php&', 'php?');
	style(div, {position:'absolute',left:0,top:0,background:'#000',padding:'10px'});
	document.body.appendChild(div);
	if (L.indexOf('auto_refresh') != -1)
	{
		link = L.replace('auto_refresh', '');
		style(div, {background: '#F00'});
		window.setTimeout(function(){
		document.location = document.location; }, MARKET_UPTIME*1000);
	}
	link = link.replace(/&super/g,'');
	div.innerHTML = '<a href="'+link+'">Автообновление</a>'+
		'';//'<a href="'+link.replace('auto_refresh', 'super')+'">Суперрынок</a>';

	// суперрынок
	if (L.indexOf('super') != -1) superMarket();

	var price, pr, page = document.body.innerHTML;
	// если находимся на главной или не первой странице - цены не анализируем
	var grabPrice = 1;
	if (0
		|| page.indexOf(LNG_MARKET_DEL_FILTER) == -1
		|| page.indexOf(LNG_MARKET_BACK) != -1
	)
	grabPrice = 0;

	var regexp = new RegExp('"right">(\\d+)<[^!]+?link2">([^<]+)<[^!]+?([\\' +
		globObj('_CURRENCY_1000') + '\\d]+' + globObj('_CURRENCY_SEP') + '\\d+) '+
		'[^<]+<[^!]+?('  + LNG_MARKET_BUY + ')', 'g');

	// считаем кол-во и сумму товаров, пока кол-во меньше AVG_COUNT
	var N = 0; // сколько товаров можно купить на эту сумму
	var P = 0; // текущая сумма покупки
	var pcount, pprice, pname;
	while (1)
	{
		pr = regexp.exec(page);
		if (!pr) break;
		pcount = parseInt(pr[1]);
		pname  = pr[2].replace('&nbsp;',' ');
		pprice = parseFloat(pr[3].replace('.','').replace(',','.'));
		// приглушаем дорогие цены
		if (pprice > prod(pname).p_shop)
			page = page.replace(new RegExp('>'+pr[3]+' ([^<]+)<', 'g'),
			'><span style="color:'+CL_BAD+'">'+pr[3]+' $1</span><');
		// выделяем выгодные цены
		else if (pprice < prod(pname).p_market)
			page = page.replace(new RegExp('>'+pr[3]+' ([^<]+)<', 'g'),
			'><span style="color:'+CL_GOOD+'">'+pr[3]+' $1</span><');
		if (N < AVG_COUNT)
		{
			if (N + pcount >= AVG_COUNT) pcount = AVG_COUNT-N;
			N += pcount * grabPrice;
			P += pcount * pprice;
		}
	}
	document.body.innerHTML = page;

	if (N)
	{
		pprice = round(P / N * 100);
		Settings.store(pname, pprice);
		Settings.store('marketi_'+pname,
			round((new Date()).getTime()/1000 + PRICE_UPTIME));
		var r = globObj('rackElement');
		r[prodByName[pname]].p_market = pprice / 100;
		r[prodByName[pname]].rentab   = rentab(r[prodByName[pname]]);
//		sortRack(prodByName[pname]);
//		var upd = globObj('updateRack'); upd();
		log(pname+'='+(pprice/100));
		// сохранение цены на сервере
		savePriceOnServer(pname, pprice);
	}

	// корректируем кол-во товара
	var i, f = document.getElementsByTagName('form');
	var p = prod(pname).need - Math.round(prod(pname).number);
	if (p > 0)
	for (i = 0; i < f.length; i++)
	if (f[i].name == 'form_buy_now')
	{
		f = f[i].getElementsByTagName('input');
		for (i = 0; i < f.length; i++)
		if (f[i].name == 'buy_menge' && p != undefined)
		if (parseInt(f[i].value) > p)
			f[i].value = p;
		break;
	}
} else

// предложение симпов
if (L.indexOf('verkauf.php') != -1)
{
	var page = document.body.innerHTML;
	var st = '', i, ost, r, nn, sum = 0, sum2 = 0, a, p, regexp = /(\d+)x ([^<]+)/g
	var prods = [], s, nA = 0, prod1, points = 0, cl, oncl, buy, st_bis = '';

	// функция закрытия окна предложения симпов
	w.closePage = function()
	{
		parent.document.getElementById('einkaufszettel').style.display = "none";
		parent.document.getElementById("kunde").style.display="none";
		parent.kunde.location.href="about:blank";
	}
	// обработчик покупки в магазине
	w.buyInShop = buyInShop;

	while ((a = regexp.exec(page)) != null)
	{
		prod1 = prod(a[2]);
		p     = prod1.p_market;
		points += Math.round(prod1.points*parseInt(a[1])*0.002);
		if (prod1.p_shop < p) p = prod1.p_shop;
		sum += s = round(parseInt(a[1])*p,2);
		prods.push(s);
		// считаем сколько останется
		nA = -prod1.need;
		ost = round(prod1.number - parseInt(a[1]));
		nA  = round(prod1.number + nA);
		if (ost < 0) sum2 += s2 = -ost*p; else s2 = 0;
		if (ost > 1000) ost = round(ost/1000)+'к';
		nn = a[2].replace('цветная', '').replace('болгарский', '');
		if (prod1.rentab >= RENTAB_GOOD) cl = 'color: '+CL_BAD;  else
		if (prod1.rentab <= RENTAB_BAD)  cl = 'color: '+CL_GOOD; else cl = '';
		oncl = "parent.document.getElementById('shop').style.display='';"+
			"parent.shopframe2.document.body.innerHTML = ''; closePage();";
		buy = ost < 0 ? ' <a href="#buy" onclick="return buyInShop(\''+a[2]+'\','+
			(-ost)+')" title="'+LNG_BUY_IN_SHOP+'</a>' : '';
		if (ost < 0) st_bis += 'buyInShop(\''+a[2]+'\','+(-ost)+');';
		page = page.replace(a[0], '<small> <b>'+a[1]+'x'+p+' '+nn+'</b>'+buy+'<br/>'+
			'['+LNG_PROD_REST+' '+ost+' шт, <a style="'+cl+'"href="'+linkShopOrMarket(prod(a[2]))+
			'"target="shopframe2"onclick="'+oncl+'"style.display=\'none\';">'+round(s2,2)+' сТ</a>, _'+prods.length+'] </small>');
    }
	// рассчитываем проценты
	for (i = 0; i < prods.length; i++)
		page = page.replace('_'+(i+1), (round(prods[i]/sum*1000)/10)+'%');

	sum *= 0.9; // комиссия
	// ищем сколько денег даст симп
	regexp = new RegExp(':&nbsp;([' +
		globObj('_CURRENCY_1000') + '\\d]+' +
		globObj('_CURRENCY_SEP')  + '\\d+)');
	var simp = regexp.exec(page);
	simp = round(parseFloat(simp[1].replace(/[\. ]/,'').replace(',','.'), 2));
	var pr = round(simp - sum); // считаем прибыль или убыток
	var pr2= round(simp - sum2);
	pr2 = LNG_WITH_PROD_IN_RACK+': '+pr2+'('+round(pr2/simp*100)+'%)';
	page = page.replace(/>.+:&nbsp;([,. \d]+) (.+)</,
		'><small>'+round(simp)+'$2 = <span title="'+pr2+'">'+pr+'$2 ('+round(pr/simp*100)+'%)</span> +'+points+'</small><');
	document.body.innerHTML = page;

	// корректируем список запросов
	document.body.childNodes[3].style.display = 'none';
	var i, l = document.body.childNodes.length;
	for (i=3; i < l - 4; i+=2)
		document.body.childNodes[i].style.top = (i-4)*20+'px';
	document.body.childNodes[i=l-4].style.top = '330px';
	document.body.childNodes[i=l-2].style.top = '350px';

	// общая кнопка КВМ
	var b = document.createElement('input');
	b.className = 'msg_input_link';
	b.value     = LNG_BUY_IN_SHOP.replace(/.+>/, '');
	b.type      = 'button';
	style(b, 'width: 80px; margin-right: 10px');
	b.addEventListener('click',
		function() { style(this, 'display: none'); eval(st_bis); }, false);
	if (st_bis != '')
	document.getElementsByTagName('span')[1].appendChild(b);

	var d = $$('div');
	style(d[0], 'display: none');
	style(d[1], 'top: 45px');
} else

// очередь симпов - смотрим что хотят и обновляем цены
if (L.indexOf('verkauf_map.php') != -1)
{
	var st = '', i, a1, a2, p, k = globObj('kunden');
	var pr = {}, s = [], ss, j = 0, simpCount, simpOk;
	var r = globObj('rackElement');

	// обнуляем нужды
	for (i = 1; i < 100; i++)
	if (r[i] != undefined) r[i].need = 0;

	for (p in k)
	if (p != 'contains')
	{
		a1 = k[p]['p_string'].split(':');
		a2 = k[p]['a_string'].split(':');
		ss = {id:j++}; simpOk = 1;
		for (i = 0; i < a1.length; i++)
		{
			if (pr['_'+a1[i]] == undefined) pr['_'+a1[i]] = 0;
			simpCount = parseInt(a2[i]);
			r[a1[i]].need += simpCount;
			ss[a1[i]] = simpCount;
			// если в магазине невыгодно купить, симпа не помечаем
			simpCount -= r[a1[i]].number;
			if (simpCount < 0) simpCount = 0;
			if (simpCount > 0 &&
				((r[a1[i]].p_shop - r[a1[i]].p_market)*simpCount > 10))
				simpOk = 0;
		}
		s.push(ss);
		// помечаем готового симпа
		if ($(p) != undefined && simpOk)
			$(p).style.background = 'red';
	}
	// сохраняем совокупное предложения симпов
	parent.window.wrappedJSObject.simps = s;
	parent.window.wrappedJSObject.updateRack();
	// меняем размер игрового поля
	if (parent.document.body.parentNode.clientHeight < 700)
	{
		$('kunden_all').style.position = 'absolute';
		$('kunden_all').style.top = '-50px';
		// симпы
		var i = 0, e;
		for (i = 0; i < 20; i++)
		if ((e=$('blasei'+i)) != undefined)
		{
			e.style.top  = '47px';
			e.style.left = '50px';
		}
		// сдвигаем сборщика вправо
		$('helfer_all').childNodes[1].style.right = 0;
	}
} else

// автозаход при выбросе из игры
if (L.indexOf('login.php?logout') != -1)
{
	setTimeout("document.location = '/login.php'", 2000);
} else
if (L.indexOf('login.php') != -1)
{
	// сохраняем логин/пароль при заходе
	var form = $('form_login').wrappedJSObject;
	var f_serv = 'server', f_pass = 'dummy';
	var f_user = (form.USR == undefined) ? 'login' : 'USR';
	var vld = function(e) { setTimeout(function() {
		Settings.store('!user', form[f_user].value);
		Settings.store('!pass', form[f_pass].value);
		Settings.store('!serv', form[f_serv].value);
		Settings.store('!domain',  document.domain);
		Settings.store('!f_user',  f_user);
	}, 0); };
	$('form_login').addEventListener('submit', vld, false);

	// пробуем автоматом зайти в игру
	if (Settings.load('!user', 0) != 0)
	{
		form[f_user].value = Settings.load('!user');
		form[f_pass].value = Settings.load('!pass');
		form[f_serv].value = Settings.load('!serv');
		setTimeout(function() { vld(); form.submit(); }, 13*1000);
	}
} else

// сообщения в почте
if (L.indexOf('/nachrichten/') != -1)
{
	var text = document.body.innerHTML;
	var count = /(\d+) шт./.exec(text);
	if (!count) count = /(\d+)x/.exec(text);
	if (count != null)
	{
		var money = /([\d,.]+) ?сТ/.exec(text);
		count = parseInt(count[1]);
		money = parseInt(money[1].replace(/[.,]/g, '')) / 100;
		var c = Math.round(money / count * 100) / 100;
		text = text.replace(/([\d,.]+ ?сТ)/, '$1 (по <b>'+c+'сТ</b> за шт)');
		document.body.innerHTML = text;
	}
	parseCompletedQuest();
} else

// запоминаем квест
if (L.indexOf('showquest.php') != -1)
{
	var n = 0, isEnd = 0;
	try
	{
		n = parseInt(document.forms[0].elements[0].value) + 1;
		Settings.store('.quest', n);
	} catch(e) { isEnd = 1; }
	Settings.store('.quend', isEnd);
	showQuestLine();
} else

// страница обновления скрипта
if (L.indexOf('cupivan') != -1 && document.body)
{
	$('version').innerHTML = SCRIPT_VERSION;
}

