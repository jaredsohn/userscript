// ==UserScript==
// @name           Auto Molehillempire BETA
// @namespace      Molehillempire
// @autor          Rafa
// @dateModify     14.05.10
// @include        http://*.molehillempire.*/*
// ==/UserScript==

var SCRIPT_NAME    = '"Auto Molehillempire BETA"';
var SCRIPT_VERSION = '@version 0.0.1'.replace(/[^\d.]/g, '');
var SCRIPT_URL     = 'http://userscripts.org/scripts/source/76766.user.js';
var SCRIPT_PAGE    = 'http://userscripts.org/scripts/show/76766';

// TODO Poner retraso para evitar ser expulsado 
// ERROR no siempre funciona de riego botón 
// TODO Poner un cierto número de verduras 
// ERROR La siembra puede únicas células desocupados en el campo 
// TODO Número de estantes en el número de verduras / Decoración 
// Configuración de TODO (desactivación) 
// TODO Clasificación estantes: la rentabilidad, el tiempo, el número de 
// TODO reducir la necesidad de las ventas Simposio 
// TODO Contabilidad búsquedas en la lista de bienes necesarios

// frases del lenguaje
var LNG_MARKET_DEL_FILTER = 'Quitar el filtro';
var LNG_MARKET_BACK = ' atras';
var LNG_MARKET_VIEW_ONLY = 'Mostrar sólo productos';
var LNG_MARKET_BUY = 'Comprar caro';

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
			if (confirm('Nueva versión ' + SCRIPT_NAME + '. Desea descargarla?'))
			document.location = SCRIPT_PAGE + '?from=' + SCRIPT_VERSION + '&to=' + matches[1];
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

/** Trabajar con variables globales */
Settings =
{
	conv: function(str)
	{
		var f = '1234567890qweaszxcrtyfghvbnuiojklmp_ абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
		var t = '1234567890qweaszxcrtyfghvbnuiojklmp__abvgdeejziqklmnoprstufxc466_y_eua';
		var i, k = '';
		for (i = 0; i<str.length; i++)
			k += t.charAt(f.indexOf(str.charAt(i)));
		return k;
	},
	store: function(name, value, numDays)
	{
		return GM_setValue(this.conv(name), value);
	},
	load: function(name, defaultVal)
	{
		return GM_getValue(this.conv(name), defaultVal);
	}
};

/** Instalación de estilo */
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
	else // style - linea CSS
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

/** Contenedor donde existe este elemento */
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

/** El acceso a las instalaciones de la página principal */
function globObj(name)
{
	var obj = globWrap(name);
	if (obj == undefined) return undefined;
	eval('obj = obj.'+name);
	return obj;
}

/** Crear una consulta de hash para el Ajax */
function request(r)
{
	return {status: r.status, readyState: r.readyState, responseText: r.responseText}; 
}

/** Elemento de búsqueda / Instalación y remplazo de texto */
function $(id, txt)
{
	var pattern, pcre, st, obj;
	if (id == undefined) id = document.body;
	obj = typeof(id) == 'object' ? id : document.getElementById(id);
	if (!obj) obj = parent.document.getElementById(id);
	if (!obj) obj = parent.parent.document.getElementById(id);
	if (!obj) return null;
	if (txt == undefined) return obj;
	st = obj.innerHTML;
	if (typeof(txt) == 'string')
		st = txt;
	else
	for (pattern in txt)
	{
		pcre = (pattern.charAt(0) != '/') ? pattern : eval('('+pattern+')');
		st = st.replace(pcre, txt[pattern]);
	}
	obj.innerHTML = st;
}

/** Cargar la página */
var ajax = {
	ajax: null,
	load: function(url, post, handler)
	{
		if (this.ajax == null) this.ajax = new XMLHttpRequest();
		if (typeof(post) == 'function')
		{
			handler = post;
			post = undefined;
		}
		this.ajax.open(post != undefined ? 'POST' : 'GET', url);
		this.ajax.onreadystatechange = function()
		{
			if (handler != undefined && ajax.ajax.readyState == 4
				&& ajax.ajax.status == 200)
				handler(ajax.ajax.responseText);
		}
		if (post != undefined)
		this.ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		this.ajax.send(post != undefined ? post : null);
	}
};

/** Formato tiempo */
function formatTime(sec)
{
	var st = '', t, d = new Date();
	if (sec == undefined) sec = time();
	var days = Math.floor((sec - time()) / 3600 / 24);
	st += (days > 0) ? days + 'd ' : '';
	d.setTime(sec * 1000);
	t = d.getHours();   if (t < 10) t = '0'+t; st += t+':';
	t = d.getMinutes(); if (t < 10) t = '0'+t; st += t;
	return st;
}

/** Actividades de tala */
function log(x)
{
	var st, o;
	o = $('log'); if (!o) return;
	st = formatTime();
	if (o != null) st += ' ' + x;
	o.innerHTML = st;
}

/** Hora actual en segundos */
function time() { return Math.round((new Date()).getTime() / 1000); }

// убираем правый баннер
style('banner_right', 'display: none');

// }}} COMMON

// POST venta
// http://s4.sadowajaimperija.ru/stadt/marktstand.php
// p_anzahl=400кол-во&p_id=9лук&p_preis1=1цена&p_preis2=48цена&verkaufe_markt=%D0%9E.%D0%9A.

//----------------------------------------------------------------------------//
// PROGRAMACIÓN
var RENTAB_GOOD   = 22;   // Por encima del coste puede ser plantada
var RENTAB_BAD    = 20;   // Por debajo del coste no es rentable
var PRICE_UPTIME  = 3600; // Actualización de tiempo en segundos
var PRICE_PAUSE   = 10;   // Pausa en segundos entre peticiones
var AVG_COUNT     = 100;  // Recuento de mercancías para las "compras de prueba"
var MARKET_UPTIME = 10;   // Cuantos segundos para actualizar el mercado

// Color
var CL_GOOD = '#F55';
var CL_BAD  = '#6c9f6c';

// Red mundial de semillas
var PRODUCTS = {};
var PL=0, PS=1, PSQ=2, PC=3, PT=4, PP=5, PN=6;
// Actualización de los datos estaticos en la semillas
PRODUCTS[ 7] = [  9, 2, 1,  5,  4800,  8.88, "Berenjena"];
PRODUCTS[33] = [  7, 2, 1,  4,  2000,  4.48, "Brócoli"];
PRODUCTS[15] = [  7, 2, 1,  5,  4000,  7.32, "Pimienta búlgara"];
PRODUCTS[52] = [ 18, 4, 1,  6,   600,  1.90, "Acianos"];
PRODUCTS[ 1] = [ 14, 1, 4, 18, 19200, 41.40, "Cereza"];
PRODUCTS[58] = [ 21, 4, 1,  4,   920,  3.00, "Gerbera"];
PRODUCTS[19] = [ 16, 1, 4, 19, 33600, 68.40, "Nuez"];
PRODUCTS[21] = [ 14, 1, 4, 10, 12000, 46.80, "Pera"];
PRODUCTS[ 8] = [ 11, 1, 1,  3,  4800, 30.00, "Zarzamora"];
PRODUCTS[16] = [  9, 2, 1,  4,  4800, 11.04, "Calabacín"];
PRODUCTS[49] = [  5, 4, 1,  4,   600,  1.80, "Caléndula"];
PRODUCTS[22] = [  6, 2, 1,  4,  1600,  3.60, "Patata"];
PRODUCTS[ 3] = [  3, 2, 1,  4,   200,  0.44, "Fresa"];
PRODUCTS[61] = [ 20, 1, 1,  6,  7200, 18.00, "краснокочанная капуста"];
PRODUCTS[64] = [ 22, 1, 2,  2, 25000,137.50, "Café"];
PRODUCTS[54] = [ 19, 4, 1,  5,   700,  2.40, "Azafrán"];
PRODUCTS[59] = [ 21, 4, 2,  8, 12000, 66.60, "Lavanda"];
PRODUCTS[51] = [ 17, 4, 1,  3,  1620,  8.00, "Lirios"];
PRODUCTS[ 9] = [  4, 2, 1,  4,   800,  1.76, "Cebolla"];
PRODUCTS[10] = [ 10, 1, 1,  5,  4800,  7.60, "Frambuesa"];
PRODUCTS[17] = [ 12, 1, 4, 10, 14400, 56.28, "Mirabel"];
PRODUCTS[ 6] = [  1, 2, 1,  2,    10,  0.06, "Zanahorias"];
PRODUCTS[12] = [  2, 2, 1,  4,    40,  0.14, "Pepino"];
PRODUCTS[55] = [ 19, 1, 4, 18, 24000, 78.00, "Aceitunas"];
PRODUCTS[53] = [ 18, 4, 1,  6,  9600, 55.00, "Orquídeas"];
PRODUCTS[48] = [  8, 4, 1,  3,   500,  1.50, "Girasoles"];
PRODUCTS[ 5] = [  3, 2, 1,  4,   220,  0.50, "Tomate"];
PRODUCTS[14] = [  2, 2, 1,  3,    50,  0.22, "Rábano"];
PRODUCTS[50] = [ 12, 4, 1,  2,   700,  3.50, "Rosas"];
PRODUCTS[ 2] = [  1, 2, 1,  2,    14,  0.08, "Ensalada"];
PRODUCTS[13] = [ 15, 1, 4, 15, 24000, 62.40, "Ciruela"];
PRODUCTS[11] = [ 11, 1, 1,  6,  3600,  5.75, "Grosella"];
PRODUCTS[20] = [  8, 2, 2,  5,  4200,  7.80, "Espárragos"];
PRODUCTS[18] = [ 13, 2, 1,  6, 14400, 22.80, "Calabaza"];
PRODUCTS[60] = [ 20, 4, 1,  5,   400,  4.00, "Tulipán"];
PRODUCTS[32] = [  5, 2, 1,  4,  1640,  3.78, "Coliflor"];
PRODUCTS[35] = [  6, 2, 1,  4,  2200,  5.10, "Ajo"];
PRODUCTS[34] = [ 10, 2, 1,  6,  3200,  5.04, "Arándanos"];
PRODUCTS[36] = [  4, 2, 1,  4,   920,  2.10, "Espinacas"];
PRODUCTS[ 4] = [ 13, 1, 4, 12,  9600, 30.96, "Manzana"];
// Decoración
PRODUCTS[29] = [ 1, 3, 4, 0, 1, 12000, "Camino 1"];
PRODUCTS[30] = [ 1, 3, 4, 0, 1, 12000, "Camino 2"];
PRODUCTS[31] = [ 1, 3, 4, 0, 1, 12000, "Camino 3"];
PRODUCTS[44] = [ 1, 3, 1, 0, 1, 12000, "Gnomos-jardineros"];
PRODUCTS[63] = [ 1, 3, 2, 0, 1,600000, "Colina"];
PRODUCTS[25] = [ 1, 3, 1, 0, 1,  6000, "Piedras decorativas"];
PRODUCTS[26] = [ 1, 3, 1, 0, 1,  3000, "Pista 1"];
PRODUCTS[27] = [ 1, 3, 1, 0, 1,  3000, "Pista 2"];
PRODUCTS[28] = [ 1, 3, 1, 0, 1,  3000, "Pista 3"];
PRODUCTS[46] = [ 1, 3, 1, 0, 1,  1500, "Pista 4"];
PRODUCTS[56] = [ 1, 3, 1, 0, 1, 12000, "Hoguera"];
PRODUCTS[40] = [ 1, 3, 4, 0, 1, 94000, "Piedras círculo"];
PRODUCTS[62] = [ 1, 3, 4, 0, 1, 12000, "Arenero"];
PRODUCTS[39] = [ 1, 3, 1, 0, 1, 12000, "Estanque"];
PRODUCTS[57] = [ 1, 3, 1, 0, 1, 12000, "Espantapájaros"];
PRODUCTS[38] = [ 1, 3, 2, 0, 1, 24000, "Jardín rocoso"];
PRODUCTS[37] = [ 1, 3, 4, 0, 1, 46000, "Área de descanso"];
PRODUCTS[47] = [ 1, 3, 1, 0, 1,  2000, "Cuencos de madera"];
PRODUCTS[23] = [ 1, 3, 1, 0, 1,  2499, "Fuente 1"];
PRODUCTS[24] = [ 1, 3, 1, 0, 1,  1500, "Fuente 2"];

// Llega a
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
// Redondeo
function round(x, s) { if (s == undefined) s = 0; var p = Math.pow(10, s);
    return Math.round(x * p) / p; }
// Búsqueda de paquetes por semillas nombre
var prodByName = {};

// Semillas mediante código o denominación
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

// Rentabilidad
function rentab(prod)
{
	var p;
	p = prod.numInHour * prod.p_market * 0.9; // Los ingresos horas
	p = p / 6;                                //  10 minutos
	return Math.floor(p*10)/10;
}
// El mejor precio para el mercado
function goodPrice(prod)
{
	return Math.round(6 * RENTAB_GOOD / prod.numInHour / 0.9 * 100) / 100;
}

// Estanterías de clasificación en la rentabilidad
function sortRack(id) // id - Algunas semillas flotarán
{
	var i, rack = globObj('rackElement');
	var sem = rack[id], newRack = {};
	for (i in rack)
	if (i != id)
	{
		// Inserta la semilla de girasola actual antes de que usted tenga menos rendimiento
		if (rack[i].rentab <= rack[id].rentab)
			newRack[id] = rack[id];
		newRack[i]  = rack[i];
	}
	// Reemplazar matrix
	globWrap('rackElement').rackElement = newRack;
}

// Solocitud de renovación de los precios
var g_checkPriceDelta = 0;
function checkPrice(prod)
{
    // Añadir al iframe, para cargar los datos
    if (!$("myIframe"))
    {
        var f = document.createElement('iframe');
        f.setAttribute('id', 'myIframe');
        document.body.appendChild(f);
    }

    var i, d = (new Date()).getTime();
    if (Settings.load('marketi_'+prod.name, 0)*1000 < d)
    {   // Cargar la página con el producto
        window.setTimeout(function(){
            $("myIframe").src =
                '/stadt/markt.php?order=p&v='+prod.id+'&filter=1';
        }, g_checkPriceDelta += PRICE_PAUSE*1000);
    }
}

/** Número de la actual jardín */
function getGardenNumber()
{
	return parseInt($('garten_aktuell_nummer').innerHTML);
}

// Superrynok
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
			st += '<a href="'+shop(pr[p].name, 1)+'" title="Mercado">'+pr[p].p_market+'</a> / ';
			st += '<a href="'+shop(pr[p].name, 2)+'" title="Tienda">'+pr[p].p_shop+'</a>';
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
	// Autoupdate
	document.body.innerHTML = st;
		window.setTimeout(function(){ document.location = L; }, MARKET_UPTIME*1000);
	return 0;
}

// Cambiar la estructura del elemento vegetal
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
	// Tiempo de crecimiento
	var t=PRODUCTS[i][PT]%100;
	t = ((PRODUCTS[i][PT] - t)/100*60 + t)*60000;
	PRODUCTS[i][PT] = t;
	if (typeof(rack[i].duration) == 'number')
		t = rack[i].duration;
	var hours = 0, ctime, day = 24*60*60*1000, tG = t;
	do {
		tG     = Math.round(tG * (1 - poliv)); // Derramar
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
	rack[i].p_shop   = PRODUCTS[i][PP]; // Tienda precio
	rack[i].p_market = Settings.load(PRODUCTS[i][PN], 0) / 100; // Precio de mercado
	rack[i].level    = PRODUCTS[i][PL];
	rack[i].need     = 0;
	rack[i].shop     = PRODUCTS[i][PS];
	if (rack[i].id == undefined)
	{
		if (rack[i].level <= level)
		rack[i].id     = i;              // Código
		rack[i].size   = 1;              // Tamaño de la plataforma
		rack[i].rackid = 0;
		rack[i].y      = 1;
		rack[i].number = 0;
		rack[i].x      = PRODUCTS[i][PSQ]; // El tamaño de las camas
		if (rack[i].x == 4) rack[i].x = rack[i].y = 2;
		rack[i].crop   = PRODUCTS[i][PC]; // Cómo crecer
		rack[i].name   = PRODUCTS[i][PN]; // Nombre
	}
	t = rack[i].duration / 1000 / 60; // Tiempo de crecimiento en cuestión de minutos
	m = (204-((rack[i].x==1)?0:12)) * (rack[i].crop-1) /
		rack[i].x / rack[i].y;        // Cómo crecer en el campo
	if (t)
	{
		rack[i].numInHour = 60 / t * m;   // Muchas crecen por hora
		rack[i].rentab = rentab(rack[i]); // Rentabilidad
		rack[i].p_good = goodPrice(rack[i]); // Precio rentable
		rack[i].points = PRODUCTS[i][PT]/60000*0.1*rack[i].x*rack[i].y; // Puntos de conteo
	}
}
// Cambiando la estructura interna de la cesta
function modifyRack()
{
	var i, rack = globObj('rackElement');
	// процент полива
	var t, n, poliv = ''+globObj('selectMode');
	poliv = /(\d+)%/.exec(poliv); poliv = parseInt(poliv[1]) / 100;
	w.POLIV = poliv;
	for (i = 0; i < rack.length; i++)
		modifyRackElement(i);
	// Especie de función de los costes
	rack.sort(function(x,y){ return y.rentab - x.rentab; });
	// Convertir el hash para que coincida con los índices
	var j = 0, newRack = {t:0};
	for (i = 0; i < rack.length; i++)
	if (rack[i].id != undefined)
	{
		rack[i].rackid = Math.floor(j++ / 20); // Referencia plataforma
		newRack[rack[i].id] = rack[i];
	}
	w.rackElement = newRack;
}


// Referencia al mercado o tienda de la
function linkMarket(prod) { return '/stadt/markt.php?page=1&order=p&v='+prod.id+'&filter=1'; }
// Enlace a la tienda
function linkShop(prod) { return '/stadt/shop.php?s='+prod.shop; }
// Enlace cuando es rentable
function linkShopOrMarket(prod)
{ return prod.p_market < prod.p_shop ? linkMarket(prod) : linkShop(prod); }

// Cambiar pantalla de semillas en la plataforma
function modifyRackDesign()
{
	// Flecha
	w.changeRack = function(updown)
	{
		var cr = globObj('_currRack');
		cr = (2 + cr + updown) % 2;
		w.updateRack(cr);
		w._currRack = cr;
	}
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
	// Actualizar cesta
	w.updateRack_ = w.updateRack;
	w.updateRack = function(x)
	{
		// Ceros en la cuenta ve claro, no a desaparecer los productos
		var i, r = w.rackElement;
		for (i in r) if (r[i].number == 0 && r[i].shop != 3) r[i].number = 0.01;
		if (x == undefined)
			x = w._currRack;
		return w.updateRack_(x, true);
	}
	w.showRackElement_ = w.showRackElement;
	w.showRackElement  = function(a,s,q,e,b,m,p,o,c,l,f,n,r)
	{
		// Semilla
		var prod = w.rackElement[a];
		// Tooltip
		var txt='', title = '';
		title = Math.round(prod.number)+', '+round(prod.p_market*0.9,2)+':'+prod.p_market+' сТ'+
			' ('+prod.p_shop+'->'+round(prod.p_good/1.1, 2)+':'+prod.p_good+'), '+prod.rentab;
		var style = '', linkGood = linkMarket(prod);
		// Signos de pintura
		if ( prod.p_market >= prod.p_good) style = 'color: '+CL_GOOD+';';
		if ( prod.rentab   <= RENTAB_BAD)  style = 'color: '+CL_BAD+';';
		if (!prod.p_market)                style = 'color: #FFF;';
		if ( prod.p_market > prod.p_shop) { style += 'background:#AAF'; linkGood = linkShop(prod); }
		var oncl = "document.getElementById('shop').style.display='';"+
			"shopframe2.document.body.innerHTML = ''";
		style = 'onclick="'+oncl+'"style="font-size: 8px;'+style+'"'+
			'target="shopframe2" title="'+title+'"';
		// Reducir un gran número de
		var mR = (m < 1000) ? Math.round(m) : Math.floor(m / 1000)+'к';
		var need = (prod.need <= prod.number) ? 0 : prod.need - Math.round(prod.number);
		if ((''+mR).length < 3 || (''+need).length < 3)
		{ need = need+' '; mR = ' '+mR; }
		// Muestran enlaces
		txt += '<a href="'+linkMarket(prod)+'"'+style+'>&nbsp;'+need+'</a>'+
			'<a    href="'+linkGood+'"'+style+'>/'+mR+'&nbsp;</a>';
		txt = '<small>' + txt + '</small>';
		w.showRackElement_(a,s,q,e,b,txt,p,o,c,l,f,n,r);
	}
	w.updateRack();
}

// Cambiar las puntas del mapeo de enanos
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

// Actualización de la barra de estado
function updateStatus()
{
	var s = $('status');
	var money = parseFloat($('bar').innerHTML.
		replace(/[^\d\,]/g,'').replace(',','.'));
	var i, onSemen = 0, rack = globObj('rackElement');
	for (i in rack)
	if (rack[i].p_market)
		onSemen += rack[i].p_market * rack[i].number * 0.9;
	var sost = money + onSemen;
	var score = $('pkt').innerHTML.replace(/\./g, '');
	var round2 = function(x)
	{
		var p; x = parseFloat(x);
		p = 1000000; if (x >= p) return round(x / p, 2)+'М';
		p =    1000; if (x >= p) return round(x / p, 2)+'К';
		return round(x, 2);
	}
	var user = $('username').innerHTML;
	s.innerHTML = ', '+user+', '+
		'Dinero: '    +round2(money)  +
		'+'          +round2(onSemen)+
		'='          +round2(sost)   +', '+
		'Nivel: '  +globObj('LEVEL')+'/22, '+
		'Gafas: '     +round2(score)  +
		'; <span id="log"></span>';
	// Sala de jardín
	var NS = getGardenNumber();
	$('gardenNums').innerHTML = (
		' <a href="HREF1"STYLE> 1'+nextTime[1]+'</a>'+
		' <a href="HREF2"STYLE> 2'+nextTime[2]+'</a>'+
		' <a href="HREF3"STYLE> 3'+nextTime[3]+'</a>').
		replace(/HREF/g,  '/garten_map.php?garden=').
		replace(/STYLE/g, 'target="garten"style="color: #FFFB48;text-decoration:none;"').
		replace(new RegExp('> ('+NS+'[^<]+)<'), '><b style="color: #FFF; border: 1px solid #FFF;">&nbsp;$1&nbsp;</b><');
}

// Cambiar el mapa del campo general
function modifyMainPage()
{
	// Los botones adicionales
	var cl, s, st = '', div = document.createElement('DIV');
	s = 'style="display:inline-block;padding: 10px;background: #FFF;"';
	cl = SCRIPT_PAGE.replace(/[^/]+$/, 'help.html');
	st += '<a '+s+'href="'+cl+'" target="_blank">Ayuda</a> ';
	cl = 'selectMode(0,true,"selected");for(var i=1;i<205;i++)cache_me(i,0,"");return false';
	st += '<a '+s+'href="#" onclick=\''+cl+'\'>La siembra</a> ';
	cl = 'selectMode(2,true,"selected");for(var i=1;i<205;i++)cache_me(i,0,"");return false';
	st += '<a '+s+'href="#" onclick=\''+cl+'\'>Derramar</a> ';
	// Marco con el mercado
	st += '<div name="shop" id="shop" style="position:absolute;z-index:20;width:640px;height:560px;left:300px;right:40px;top:100px;bottom:40px;display:none;">';
	st += '<iframe id="shopframe2" name="shopframe2" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>';
	st += '</div>';
	st += '<div style="display: none;" id="garten_aktuell_nummer"></div>';
	st += '<div style="display: none;" id="stadtlock"></div>';
	div.innerHTML = st;
	style(div, {position: 'absolute', top: '0px', left: 0, zIndex: 1000});
	$('garten_aktuell_nummer').id = 'gardenNums';
	document.body.appendChild(div);

	// Tamaño del campo de juego
	if (document.body.parentNode.clientHeight < 700)
	{
		var upsimT = 0;
		if ($('upsimtoolbar'))
		{
			upsimT = parseInt($('upsimtoolbar').style.height);
			$('upsimtoolbar').style.display = 'none';
		}
		if ($('gpopDiv').style.top != '18px')
		{
			$('contentwrapper').style.marginTop = -200-upsimT+'px';
			// Consejo enana
			$('gpopDiv').style.top  = '150px';
			$('gpopDiv').style.left = '220px';
		} else // Para el diseño minimalista
			$('contentwrapper').style.marginTop = -70-upsimT+'px';
		// No encuentra el contrato de botones
		if ($('vertraege').src.indexOf('_neu') != -1)
			$('vertraege').style.top = '38px';
	}
	// Insertar el número de la versión
	var b = $('gardenNums').parentNode;
	b.innerHTML = '<b>' + SCRIPT_VERSION + '</b> ' + b.innerHTML;
	// Más de estádo
	var s = document.createElement('SPAN');
	s.id = 'status';
	$('gardenNums').parentNode.appendChild(s);
	w.updatePlayerInfo_   = w.updatePlayerInfo;
	w.updatePlayerInfo    = function(e,a,c,h,b,f) { w.updatePlayerInfo_(e,a,c,h,b,f); updateStatus(); }
	w.stadt_hideAnimation = function() { }
	w.product = function(c,b,h,e,j,f,n,o,m,l,a)
	{ var rack = globObj('rackElement'); rack[c].number = h; return rack[c]; }
	// La reducción de la prima de inscripción
	if ($('premium'))
	{
		var p = $('premium');
		var c = $('coins').innerHTML;
		p = p.parentNode.firstChild;
		p.innerHTML = p.innerHTML.replace(/[^0-9]+([0-9.]+).+/, 'PA: $1 / '+c);
	}
}

// Fijar nuestra botón para cerrar
function modifyMarketClose()
{
	var i, st, btn = document.getElementsByClassName('link2');
	for (i = 0; i < btn.length;i++)
	if (btn[i].innerHTML.indexOf('stadt_schliesseFrame') != -1) 
	{
		btn[i].innerHTML = '<img src="http://d3o68bgrbhx8hn.cloudfront.net/pics/close.jpg"'+
		'onclick="parent.document.getElementById(\'shop\').style.display=\'none\'"/>';
		break;
	}
}

// Nivel actual del jugador
function grabUserLevel()
{
	var i, level = 0, str = $('level').innerHTML;
	str = str.split(','); str = str[0];
	for (i = 0; i < LEVELS.length; i++)
	if (LEVELS[i] == str) { level = i; break; }
	w.LEVEL = level;
}

// Servidor actual
function getServer()
{
	var s = st = ''+document.location;
	st = st.replace(/.+s(\d+)\.([^\/]+).+/, '$2$1')
		.replace(/(.molehillempire.es|sadowajaimperija.)/, '')
		.replace('molehillempire.es','es');
	if (s == st) return 0;
	return st;
}

/** ID jugador */
function getPlayerLogin()
{
	var e = $('username');
	return e.innerHTML;
}

// Las tasas de retención del servidor
function savePriceOnServer(name, price)
{
	// Comprobar la última modificación
	var lastUpdate = Settings.load(name+'_toSrv', 0);
	var curTime    = Math.round((new Date()).getTime() / 1000);
	if (lastUpdate + 10*60 > curTime) return; // A menudo no envia

	Settings.store(name+'_toSrv', curTime); 
	var st = '', p, params = {
		'id':     prodByName[name],
		'server': getServer(),
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

/** Comparar en la tienda */
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
		parent.wrappedJSObject.rackElement[p.id].number += count;
		parent.wrappedJSObject.updateRack();
		document.location = document.location;
	});
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

var nextTime = ['', '', '', '']; // времена захода для каждого из садов
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
		case 'bg':
			// продукты
			PRODUCTS[ 1][PN] = 'Череша';
			PRODUCTS[ 2][PN] = 'Маруля';
			PRODUCTS[ 3][PN] = 'Ягода';
			PRODUCTS[ 4][PN] = 'Ябълка';
			PRODUCTS[ 5][PN] = 'Домат';
			PRODUCTS[ 6][PN] = 'Морков';
			PRODUCTS[ 7][PN] = 'Патладжан';
			PRODUCTS[ 8][PN] = 'Къпина';
			PRODUCTS[ 9][PN] = 'Лук';
			PRODUCTS[10][PN] = 'Малина';
			PRODUCTS[11][PN] = 'Червен касис';
			PRODUCTS[12][PN] = 'Краставица';
			PRODUCTS[13][PN] = 'Слива';
			PRODUCTS[14][PN] = 'Репичка';
			PRODUCTS[15][PN] = 'Чушка';
			PRODUCTS[16][PN] = 'Тиквичка';
			PRODUCTS[17][PN] = 'Жълта слива';
			PRODUCTS[18][PN] = 'Тиква';
			PRODUCTS[19][PN] = 'Орех';
			PRODUCTS[20][PN] = 'Аспержа';
			PRODUCTS[21][PN] = 'Круша';
			PRODUCTS[22][PN] = 'Картоф';
			PRODUCTS[32][PN] = 'Карфиол';
			PRODUCTS[33][PN] = 'Брокол';
			PRODUCTS[34][PN] = 'Боровинка';
			PRODUCTS[35][PN] = 'Чесън';
			PRODUCTS[36][PN] = 'Спанак';
			PRODUCTS[48][PN] = 'Слънчоглед';
			PRODUCTS[49][PN] = 'Невен';
			PRODUCTS[50][PN] = 'Розa';
			PRODUCTS[51][PN] = 'Лилия';
			PRODUCTS[52][PN] = 'Метличина';
			PRODUCTS[54][PN] = 'Минзухар';
			PRODUCTS[58][PN] = 'Гербер';
			PRODUCTS[59][PN] = 'Лавандула';
			PRODUCTS[60][PN] = 'Лале';
			PRODUCTS[64][PN] = 'Кафе';
			// декор
			PRODUCTS[29][PN] = "Чадър1";
			PRODUCTS[30][PN] = "Чадър2";
			PRODUCTS[31][PN] = "Чадър3";
			PRODUCTS[44][PN] = "Дек. джуджета";
			PRODUCTS[63][PN] = "Пързалка";
			PRODUCTS[25][PN] = "Дек. камъчета";
			PRODUCTS[26][PN] = "Пътека1";
			PRODUCTS[27][PN] = "Пътека2";
			PRODUCTS[28][PN] = "Пътека3";
			PRODUCTS[46][PN] = "Пътека4";
			PRODUCTS[56][PN] = "Огнище";
			PRODUCTS[40][PN] = "Кръг от камък";
			PRODUCTS[62][PN] = "Пясъчник";
			PRODUCTS[39][PN] = "Езерце";
			PRODUCTS[57][PN] = "Плашило";
			PRODUCTS[38][PN] = "Дзен градина";
			PRODUCTS[37][PN] = "Зона за седене";
			PRODUCTS[47][PN] = "Дървена топка";
			PRODUCTS[23][PN] = "Извор1";
			PRODUCTS[24][PN] = "Извор2";
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
			// рынок
			LNG_MARKET_DEL_FILTER = 'Изтрий филтър';
			LNG_MARKET_BACK       = ' назад';
			LNG_MARKET_VIEW_ONLY  = 'Покажи само';
			LNG_MARKET_BUY        = 'Закупи|скъпо';
			break;
	}
	// семечки по названию
	for (i in PRODUCTS) prodByName[PRODUCTS[i][PN]] = i;
}

w.openQuest = function()
{
	w.stadt = true;
	w.g("stadtframe").src = "/stadt/index.php?karte=1";
	w.g("garten_komplett").style.display = "none";
	w.g("stadt").style.display = "block";
	w.g("stadt").style.zIndex = "2";
	setTimeout('document.getElementById("stadtframe").contentDocument.getElementById("quest").style.display="block"', 2000);
	return false;
}

/** строка с текущим квестом */
function showQuestLine()
{
	var st, n, e = $('quest_line');
	if (!e)
	{
		e = document.createElement('DIV');
		e.id = 'quest_line';
		$('garten').appendChild(e);
	}
	n = Settings.load('quest'+getPlayerLogin(), 0);
	if (n == 0) return;
	var style1 = 'color:#FFF;font-weight: bold; text-decoration: none';
	st = '<a href="#quest"onclick="return openQuest()"style="'+style1+'">Квест '+n+' из 78</a> ';
	var i, p, s, q = [];
	// квесты
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
	q[14] = {35: 2010};
	q[29] = {11: 1800};
	q[32] = {17: 1100};
	q[33] = {2: 3500, 6:6000, 22:1800};
	q[34] = {18: 720};
	q[35] = {8: 500, 11:1000, 34:200};
	q[38] = {21: 1700};
	q[43] = {19: 1111, 48:555};
	if (q[n] != undefined)
	for (i in q[n])
	{
		p = prod(i);
		st += '<span class="stt'+i+'" style="margin: -3px 0 0 25px;"title="'+p.name+'"></span>';
		s = p.number >= q[n][i] ? 'text-decoration: line-through;' : '';
		st += '<span style="margin-left: 50px;'+s+'">'+q[n][i]+'</span>';
	}
	e.innerHTML = st;
	style(e, 'position: absolute; top: 0; background: #000; padding: 4px; '+style1);
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
	// автообновление
	GMHelper.updateScript();

	// получаем уровень игрока
	grabUserLevel();

	// добавляем дополнительные поля в семена
	modifyRack();

	// корректируем главную страницу
	modifyMainPage();

	// подсказка гномика
	modifyGnomeTooltip();

	// отображение семечки на полке
	modifyRackDesign();

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
	div.innerHTML = '<a href="'+link+'">Автообновление</a> - '+
		'';//'<a href="'+link.replace('auto_refresh', 'super')+'">Суперрынок</a>';

	// суперрынок
	if (L.indexOf('super') != -1) superMarket();

	var price, pr, page = document.body.innerHTML;
	// если находимся на главной или не первой странице - цены не анализируем
	var regexp = /Удалить фильтр/, grabPrice = 1;
	if (0
		|| page.indexOf(LNG_MARKET_DEL_FILTER) == -1
		|| page.indexOf(LNG_MARKET_BACK) != -1
	)
	grabPrice = 0;

	regexp = new RegExp('"right">(\\d+)[^!]+?'+LNG_MARKET_VIEW_ONLY+' ([^"]+)"[^!]+?([\\.\\d]+,\\d+) [^<]+<[^!]+?('+LNG_MARKET_BUY+')', 'g');
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
		sortRack(prodByName[pname]);
		var upd = globObj('updateRack'); upd();
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
	var prods = [], s, nA = 0, prod1, points = 0, cl, oncl, buy;

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
			(-ost)+')" title="Купить в магазине">[ КВМ ]</a>' : '';
		page = page.replace(a[0], '<small> <b>'+a[1]+'x'+p+' '+nn+'</b>'+buy+'<br/>'+
			'[ост. '+ost+' шт, <a style="'+cl+'"href="'+linkShopOrMarket(prod(a[2]))+
			'"target="shopframe2"onclick="'+oncl+'"style.display=\'none\';">'+round(s2,2)+' сТ</a>, _'+prods.length+'] </small>');
    }
	// рассчитываем проценты
	for (i = 0; i < prods.length; i++)
		page = page.replace('_'+(i+1), (round(prods[i]/sum*1000)/10)+'%');

	sum *= 0.9; // комиссия
	// ищем сколько денег даст симп
	regexp = /:&nbsp;([\.\d]+,\d+)/
	var simp = regexp.exec(page);
	simp = round(parseFloat(simp[1].replace('.','').replace(',','.')), 2);
	var pr = round(simp - sum); // считаем прибыль или убыток
	var pr2= round(simp - sum2);
	pr2 = 'С учетом продуктов на полке: '+pr2+'('+round(pr2/simp*100)+'%)';
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
} else

// очередь симпов - смотрим что хотят и обновляем цены
if (L.indexOf('verkauf_map.php') != -1)
{
	var st = '', i, a1, a2, p, k = globObj('kunden');
	var pr = {}, s = [], ss, j = 0, simpCount, simpNeedSum;
	var r = globObj('rackElement');

	// обнуляем нужды
	for (i = 1; i < 100; i++)
	if (r[i] != undefined) r[i].need = 0;

	for (p in k)
	if (p != 'contains')
	{
		a1 = k[p]['p_string'].split(':');
		a2 = k[p]['a_string'].split(':');
		ss = {id:j++}; simpNeedSum = 0;
		for (i = 0; i < a1.length; i++)
		{
			if (pr['_'+a1[i]] == undefined) pr['_'+a1[i]] = 0;
			simpCount = parseInt(a2[i]);
			r[a1[i]].need += simpCount;
			ss[a1[i]] = simpCount;
			// смотрим сколько нужно
			simpCount -= r[a1[i]].number;
			if (simpCount < 0) simpCount = 0;
			simpNeedSum += simpCount * r[a1[i]].p_market;
		}
		s.push(ss);
		// помечаем готового симпа
		if ($(p) != undefined && simpNeedSum < 50)
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
if (L.indexOf('www.sadowajaimperija') != -1)
{
	// сохраняем логин/пароль при заходе
	var form = $('form_login').wrappedJSObject;
	var vld = function(e) { setTimeout(function() {
		Settings.store('user', form.USR.value);
		Settings.store('pass', form.dummy.value);
		Settings.store('serv', form.server.value);
	}, 0) };
	$('form_login').addEventListener('submit', vld, false);

	// пробуем автоматом зайти в игру
	if (Settings.load('user', undefined) != undefined) {
	form.USR.value    = Settings.load('user');
	form.dummy.value  = Settings.load('pass');
	form.server.value = Settings.load('serv');
	setTimeout(function() { vld(); form.submit(); }, 13*1000);
	}
} else

// Auto mail
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
		text = text.replace(/([\d,.]+ ?сТ)/, '$1 (en <b>'+c+'сТ</b> por pieza)');
		document.body.innerHTML = text;
	}
} else

// Memorizar quest
if (L.indexOf('showquest.php') != -1)
{
	var n = 0;
	try { n = parseInt(document.forms[0].elements[0].value) + 1; } catch(e) {}
	Settings.store('quest'+getPlayerLogin(), n);
	showQuestLine();
} else

// Página de script de actualización
if (L.indexOf('cupivan') != -1 && document.body)
{
	$('version').innerHTML = SCRIPT_VERSION;
}

