// ==UserScript==
// @name           Kanalejana	
// @namespace      Kanalejana
// @description    Kanalejana	
// @author         Kanalejana
var SCRIPT_VERSION = ''+(<r><![CDATA[
// @version 0
]]></r>);
// @dateModify     18.0911
// @include        http://*.molehillempire.es/*
// ==/UserScript==

// ÑÐ·Ñ‹ÐºÐ¾Ð²Ñ‹Ðµ Ñ„Ñ€Ð°Ð·Ñ‹
var LNG_MARKET_DEL_FILTER = 'LNG_MARKET_DEL_FILTER';
var LNG_MARKET_BACK       = 'LNG_MARKET_BACK';
var LNG_MARKET_BUY        = 'LNG_MARKET_BUY';
var LNG_STATUS_MONEY      = 'LNG_STATUS_MONEY';
var LNG_STATUS_LEVEL      = 'LNG_STATUS_LEVEL';
var LNG_STATUS_SCORE      = 'LNG_STATUS_SCORE';
var LNG_QUEST             = 'LNG_QUEST';
var LNG_QUEST_NO          = 'LNG_QUEST_NO';
var LNG_BTN_HELP          = 'LNG_BTN_HELP';
var LNG_BTN_PLANT         = 'LNG_BTN_PLANT';
var LNG_BTN_WATER         = 'LNG_BTN_WATER';
var LNG_PROD_REST         = 'LNG_PROD_REST';
var LNG_WITH_PROD_IN_RACK = 'LNG_WITH_PROD_IN_RACK';
var LNG_BUY_IN_SHOP       = 'LNG_BUY_IN_SHOP';
var LNG_NEW_VERSION       = 'LNG_NEW_VERSION';
var LNG_PRODUCTS          = 'LNG_PRODUCTS';
var LNG_CLEAR             = 'LNG_CLEAR';

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

/** Ñ€Ð°Ð±Ð¾Ñ‚Ð° Ñ Ð³Ð»Ð¾Ð±Ð°Ð»ÑŒÐ½Ñ‹Ð¼Ð¸ Ð¿ÐµÑ€ÐµÐ¼ÐµÐ½Ð½Ñ‹Ð¼Ð¸ */
Settings =
{
	conv: function(str)
	{
		var f = '1234567890qweasdzxcrtyfghvbnuiojklmp_ Ð°Ð±Ð²Ð³Ð´ÐµÑ‘Ð¶Ð·Ð¸Ð¹ÐºÐ»Ð¼Ð½Ð¾Ð¿Ñ€ÑÑ‚ÑƒÑ„Ñ…Ñ†Ñ‡ÑˆÑ‰ÑŠÑ‹ÑŒÑÑŽÑ';
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

/** ÑƒÑÑ‚Ð°Ð½Ð¾Ð²ÐºÐ° ÑÑ‚Ð¸Ð»Ñ */
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
	else // style - ÑÑ‚Ñ€Ð¾ÐºÐ° CSS
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

/** wrapper Ð³Ð´Ðµ ÐµÑÑ‚ÑŒ ÑÑ‚Ð¾Ñ‚ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚ */
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

/** Ð´Ð¾ÑÑ‚ÑƒÐ¿ Ðº Ð¾Ð±ÑŠÐµÐºÑ‚Ð°Ð¼ Ð³Ð»Ð°Ð²Ð½Ð¾Ð¹ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹ */
function globObj(name)
{
	var obj = globWrap(name);
	if (obj == undefined) return undefined;
	eval('obj = obj.'+name);
	return obj;
}

/** ÑÐ¾Ð·Ð´Ð°Ð½Ð¸Ðµ Ð¾Ð±Ñ‹Ñ‡Ð½Ð¾Ð³Ð¾ Ñ…ÑÑˆÐ° Ð·Ð°Ð¿Ñ€Ð¾ÑÐ° Ð´Ð»Ñ Ajax */
function request(r)
{
	return {status: r.status, readyState: r.readyState,
		responseText: r.readyState == 4 ? r.responseText : 0};
}

// dollar.js 2.6
function $$(a,b,_){var i,j,k,h,l=document,m,e,n;if(typeof(a)!='string'){if(a)l=a;a=b;b=_};l=[l];a=a.split(' ');h=a.length;for(i=0;i<h;i++){m=[];for(j=0;j<l.length;j++){n=(/([#\.])?([\w-]+)([\.\[#])?([\w-]+)?/i).exec(a[i]);n[0]='';if('.checkbox.hidden.'.indexOf('.'+n[2]+'.')>=0)n[0]=n[2],n[2]='input';if(n[1]=='#')e=[l[j].getElementById(n[2])];else if(n[1]=='.')try{e=l[j].getElementsByClassName(n[2])}catch(e){e=_getElementsByClassName(l[j],n[2])}else try{e=l[j].getElementsByTagName(n[2])}catch(e){};for(k=0;k<e.length;k++)if(e[k]){if((n[3]=='.'&&e[k].className!=n[4])||(n[3]=='#'&&e[k].id!=n[4])||(n[3]=='['&&e[k].name!=n[4])||(n[0]&&e[k].type!=n[0]))continue;m.push(e[k]);if(i==h-1&&b!=undefined)b(e[k])}};l=[].concat(m)};return l};function $(c,d){var o,p,a,q=c||document,i;if(typeof(c)=='function')return $('',{onDOMContentLoaded:c});if(typeof(c)=='string'){if('.div.span.a.img.iframe.script.style.form.input.select.option.'.indexOf('.'+c+'.')!=-1){q=document.createElement(c);try{q.innerHTML=' '}catch(e){}}else if(c)q=document.getElementById(c);if(!q)return null}else if(c==undefined)q=document.body;if(d!=undefined){if(c=='style'){try{q.innerHTML=d}catch(e){q.setAttribute('type','text/css');q.styleSheet.cssText=d};return q};if(typeof(d)!='object')d={innerHTML:d};for(i in d)if(i=='style')style(q,d[i]);else if(i.indexOf('on')==0){try{q.addEventListener(i.replace(/^on/,''),d[i],false)}catch(e){q[i]=d[i]}}else q[i]=d[i]};return q};function _getElementsByClassName(f,g){var r=[],i,s;var t=new RegExp('\\b'+g+'\\b');var u=f.getElementsByTagName('*');for(i=0;i<u.length;i++){s=u[i].className;if(t.test(s))r.push(u[i])};return r}

/** Ð¿Ð¾Ð´Ð³Ñ€ÑƒÐ·ÐºÐ° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ† */
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

/** Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð²Ñ€ÐµÐ¼ÐµÐ½Ð¸ */
function formatTime(sec)
{
	var st = '', t, d = new Date();
	if (sec == undefined) sec = time();
	var days = Math.floor((sec - time()) / 3600 / 24);
	st += (days > 0) ? days + 'Ð´ ' : '';
	d.setTime(sec * 1000);
	t = d.getHours();   if (t < 10) t = '0'+t; st += t+':';
	t = d.getMinutes(); if (t < 10) t = '0'+t; st += t;
	return st;
}

/** Ð»Ð¾Ð³Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð´ÐµÐ¹ÑÑ‚Ð²Ð¸Ð¹ */
function log(x)
{
	var st, o;
	try { o = $('log'); if (!o) o = $$(parent.document, '#log')[0]; } catch(e) { return; }
	st = formatTime();
	if (o != null) st += ' ' + x;
	o.innerHTML = st;
}

/** Ñ‚ÐµÐºÑƒÑ‰ÐµÐµ Ð²Ñ€ÐµÐ¼Ñ Ð² ÑÐµÐºÑƒÐ½Ð´Ð°Ñ… */
function time() { return Math.round((new Date()).getTime() / 1000); }

/** Ð²Ñ‹Ð²Ð¾Ð´ Ð²Ñ€ÐµÐ¼ÐµÐ½Ð¸ Ð² ÑÑ‚Ñ€Ð¾ÐºÑƒ */
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

/** Ñ‚ÐµÐºÑƒÑ‰Ð¸Ð¹ ÑÐµÑ€Ð²ÐµÑ€ */
function getServer()
{
	var s = st = ''+document.domain;
	st = st.replace(/.*?(s(\d+))?(\.bg)?\..+\.(.+)/, '$4$3$2')
		.replace('com.', '').replace('com', 'en');
	if (st == 'ru' && s.indexOf('w4.') != -1) st = 'ru2';
	if (s == st) return '';
	return st;
}

/** Ð²ÐµÑ€ÑÐ¸Ñ ÑÐºÑ€Ð¸Ð¿Ñ‚Ð° */
function getVersion() { return SCRIPT_VERSION; }

/** Ð»Ð¾Ð³Ð¸Ð½ Ð¸Ð³Ñ€Ð¾ÐºÐ° */
function getPlayerLogin() { return $('username').innerHTML; }

/** ÐºÐ½Ð¾Ð¿ÐºÐ° - Ð´Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ Ð¾Ñ‚Ð·Ñ‹Ð² */
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

// ÑƒÐ±Ð¸Ñ€Ð°ÐµÐ¼ Ð¿Ñ€Ð°Ð²Ñ‹Ð¹ Ð±Ð°Ð½Ð½ÐµÑ€
style('banner_right', 'display: none');

// }}} COMMON

// POST Ð¿Ñ€Ð¾Ð´Ð°Ð¶Ð°
// http://s4.sadowajaimperija.ru/stadt/marktstand.php
// p_anzahl=400ÐºÐ¾Ð»-Ð²Ð¾&p_id=9Ð»ÑƒÐº&p_preis1=1Ñ†ÐµÐ½Ð°&p_preis2=48Ñ†ÐµÐ½Ð°&verkaufe_markt=%D0%9E.%D0%9A.

//----------------------------------------------------------------------------//
// ÐÐÐ¡Ð¢Ð ÐžÐ™ÐšÐ˜
var RENTAB_GOOD   = 22;   // Ð²Ñ‹ÑˆÐµ ÑÑ‚Ð¾Ð¹ Ñ€ÐµÐ½Ñ‚Ð°Ð±ÐµÐ»ÑŒÐ½Ð¾ÑÑ‚Ð¸ Ð¼Ð¾Ð¶Ð½Ð¾ Ð¸ Ð¿Ð¾ÑÐ°Ð´Ð¸Ñ‚ÑŒ
var RENTAB_BAD    = 20;   // Ð½Ð¸Ð¶Ðµ ÑÑ‚Ð¾Ð¹ Ñ€ÐµÐ½Ñ‚Ð°Ð±ÐµÐ»ÑŒÐ½Ð¾ÑÑ‚Ð¸ ÑÐ°Ð¶Ð°Ñ‚ÑŒ Ð½ÐµÐ²Ñ‹Ð³Ð¾Ð´Ð½Ð¾
var PRICE_UPTIME  = 3600; // Ð²Ñ€ÐµÐ¼Ñ Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ Ð² ÑÐµÐºÑƒÐ½Ð´Ð°Ñ…
var PRICE_PAUSE   = 10;   // Ð¿Ð°ÑƒÐ·Ð° Ð² ÑÐµÐºÑƒÐ½Ð´Ð°Ñ… Ð¼ÐµÐ¶Ð´Ñƒ Ð·Ð°Ð¿Ñ€Ð¾ÑÐ°Ð¼Ð¸
var AVG_COUNT     = 100;  // ÐºÐ¾Ð»-Ð²Ð¾ Ñ‚Ð¾Ð²Ð°Ñ€Ð° Ð´Ð»Ñ "ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»ÑŒÐ½Ð¾Ð¹ Ð·Ð°ÐºÑƒÐ¿ÐºÐ¸
var MARKET_UPTIME = 10;   // Ñ‡ÐµÑ€ÐµÐ· ÑÐºÐ¾Ð»ÑŒÐºÐ¾ ÑÐµÐºÑƒÐ½Ð´ Ð¾Ð±Ð½Ð¾Ð²Ð»ÑÑ‚ÑŒ Ð¼Ð°Ñ€ÐºÐµÑ‚

// Ñ†Ð²ÐµÑ‚Ð°
var CL_GOOD = '#F55';
var CL_BAD  = '#6c9f6c';

// Ð³Ð»Ð¾Ð±Ð°Ð»ÑŒÐ½Ñ‹Ð¹ Ð¼Ð°ÑÑÐ¸Ð² ÑÐµÐ¼ÑÐ½
var PRODUCTS = {};
var PL=0, PS=1, PSQ=2, PC=3, PT=4, PP=5, PN=6;
//                L  S SQ   C      T      P  N
// Ð¾Ð±Ð½Ð¾Ð²Ð»ÑÐµÐ¼ ÑÑ‚Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¸Ðµ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð¾ ÑÐµÐ¼ÐµÐ½Ð°Ñ…
PRODUCTS[71] = [ 23, 2, 4,  9,  9600,102.00, 'Ð°Ð¿ÐµÐ»ÑŒÑÐ¸Ð½'];
PRODUCTS[70] = [ 16, 2, 1,  3,  4800,  8.95, 'Ð±Ð°Ð·Ð¸Ð»Ð¸Ðº'];
PRODUCTS[ 7] = [  9, 2, 1,  5,  4800,  8.88, "Ð±Ð°ÐºÐ»Ð°Ð¶Ð°Ð½"];
PRODUCTS[33] = [  7, 2, 1,  4,  2000,  4.48, "Ð±Ñ€Ð¾ÐºÐºÐ¾Ð»Ð¸"];
PRODUCTS[15] = [  7, 2, 1,  5,  4000,  7.32, "Ð±Ð¾Ð»Ð³Ð°Ñ€ÑÐºÐ¸Ð¹ Ð¿ÐµÑ€ÐµÑ†"];
PRODUCTS[52] = [ 18, 4, 1,  6,   600,  1.90, "Ð²Ð°ÑÐ¸Ð»ÑŒÐºÐ¸"];
PRODUCTS[67] = [ 15, 1, 2,  2,  1200, 22.10, 'Ð²Ð¸Ð½Ð¾Ð³Ñ€Ð°Ð´'];
PRODUCTS[ 1] = [ 14, 1, 4, 18, 19200, 41.40, "Ð²Ð¸ÑˆÐ½Ñ"];
PRODUCTS[58] = [ 21, 4, 1,  4,   920,  3.00, "Ð³ÐµÑ€Ð±ÐµÑ€Ð°"];
PRODUCTS[19] = [ 16, 1, 4, 19, 33600, 68.40, "Ð³Ñ€ÐµÑ†ÐºÐ¸Ð¹ Ð¾Ñ€ÐµÑ…"];
PRODUCTS[21] = [ 14, 1, 4, 10, 12000, 46.80, "Ð³Ñ€ÑƒÑˆÐ°"];
PRODUCTS[ 8] = [ 11, 1, 1,  3,  4800, 30.00, "ÐµÐ¶ÐµÐ²Ð¸ÐºÐ°"];
PRODUCTS[16] = [  9, 2, 1,  4,  4800, 11.04, "ÐºÐ°Ð±Ð°Ñ‡Ð¾Ðº"];
PRODUCTS[72] = [ 23, 2, 4,  5,  2100, 45.66, 'ÐºÐ°ÐºÐ°Ð¾'];
PRODUCTS[49] = [  5, 4, 1,  4,   600,  1.80, "ÐºÐ°Ð»ÐµÐ½Ð´ÑƒÐ»Ð°"];
PRODUCTS[22] = [  6, 2, 1,  4,  1600,  3.60, "ÐºÐ°Ñ€Ñ‚Ð¾Ñ„ÐµÐ»ÑŒ"];
PRODUCTS[ 3] = [  3, 2, 1,  4,   200,  0.44, "ÐºÐ»ÑƒÐ±Ð½Ð¸ÐºÐ°"];
PRODUCTS[64] = [ 22, 1, 2,  2, 25000,137.50, "ÐºÐ¾Ñ„Ðµ"];
PRODUCTS[61] = [ 20, 1, 1,  6,  7200, 18.00, "ÐºÑ€Ð°ÑÐ½Ð¾ÐºÐ¾Ñ‡Ð°Ð½Ð½Ð°Ñ ÐºÐ°Ð¿ÑƒÑÑ‚Ð°"];
PRODUCTS[54] = [ 19, 4, 1,  5,   700,  2.40, "ÐºÑ€Ð¾ÐºÑƒÑÑ‹"];
PRODUCTS[59] = [ 21, 4, 2,  8, 12000, 66.60, "Ð»Ð°Ð²Ð°Ð½Ð´Ð°"];
PRODUCTS[51] = [ 17, 4, 1,  3,  1620,  8.00, "Ð»Ð¸Ð»Ð¸Ð¸"];
PRODUCTS[68] = [ 22, 2, 4,  4,  1600, 44.98, 'Ð»Ð¸Ð¼Ð¾Ð½'];
PRODUCTS[ 9] = [  4, 2, 1,  4,   800,  1.76, "Ð»ÑƒÐº"];
PRODUCTS[10] = [ 10, 1, 1,  5,  4800,  7.60, "Ð¼Ð°Ð»Ð¸Ð½Ð°"];
PRODUCTS[17] = [ 12, 1, 4, 10, 14400, 56.28, "Ð¼Ð¸Ñ€Ð°Ð±ÐµÐ»ÑŒ"];
PRODUCTS[ 6] = [  1, 2, 1,  2,    10,  0.06, "Ð¼Ð¾Ñ€ÐºÐ¾Ð²ÑŒ"];
PRODUCTS[12] = [  2, 2, 1,  4,    40,  0.14, "Ð¾Ð³ÑƒÑ€ÐµÑ†"];
PRODUCTS[55] = [ 19, 1, 4, 18, 24000, 78.00, "Ð¾Ð»Ð¸Ð²ÐºÐ¸"];
PRODUCTS[53] = [ 18, 4, 1,  6,  9600, 55.00, "Ð¾Ñ€Ñ…Ð¸Ð´ÐµÐ¸"];
PRODUCTS[48] = [  8, 4, 1,  3,   500,  1.50, "Ð¿Ð¾Ð´ÑÐ¾Ð»Ð½ÑƒÑ…Ð¸"];
PRODUCTS[ 5] = [  3, 2, 1,  4,   220,  0.50, "Ð¿Ð¾Ð¼Ð¸Ð´Ð¾Ñ€"];
PRODUCTS[14] = [  2, 2, 1,  3,    50,  0.22, "Ñ€ÐµÐ´Ð¸ÑÐºÐ°"];
PRODUCTS[50] = [ 12, 4, 1,  2,   700,  3.50, "Ñ€Ð¾Ð·Ñ‹"];
PRODUCTS[ 2] = [  1, 2, 1,  2,    14,  0.08, "ÑÐ°Ð»Ð°Ñ‚"];
PRODUCTS[13] = [ 15, 1, 4, 15, 24000, 62.40, "ÑÐ»Ð¸Ð²Ð°"];
PRODUCTS[11] = [ 11, 1, 1,  6,  3600,  5.75, "ÑÐ¼Ð¾Ñ€Ð¾Ð´Ð¸Ð½Ð°"];
PRODUCTS[20] = [  8, 2, 2,  5,  4200,  7.80, "ÑÐ¿Ð°Ñ€Ð¶Ð°"];
PRODUCTS[18] = [ 13, 2, 1,  6, 14400, 22.80, "Ñ‚Ñ‹ÐºÐ²Ð°"];
PRODUCTS[60] = [ 20, 4, 1,  5,   400,  4.00, "Ñ‚ÑŽÐ»ÑŒÐ¿Ð°Ð½"];
PRODUCTS[32] = [  5, 2, 1,  4,  1640,  3.78, "Ñ†Ð²ÐµÑ‚Ð½Ð°Ñ ÐºÐ°Ð¿ÑƒÑÑ‚Ð°"];
PRODUCTS[35] = [  6, 2, 1,  4,  2200,  5.10, "Ñ‡ÐµÑÐ½Ð¾Ðº"];
PRODUCTS[34] = [ 10, 2, 1,  6,  3200,  5.04, "Ñ‡ÐµÑ€Ð½Ð¸ÐºÐ°"];
PRODUCTS[69] = [ 17, 2, 2,  5,  4800, 32.49, 'ÑˆÐ°Ð¼Ð¿Ð¸Ð½ÑŒÐ¾Ð½'];
PRODUCTS[36] = [  4, 2, 1,  4,   920,  2.10, "ÑˆÐ¿Ð¸Ð½Ð°Ñ‚"];
PRODUCTS[ 4] = [ 13, 1, 4, 12,  9600, 30.96, "ÑÐ±Ð»Ð¾ÐºÐ¾"];
// Ð´ÐµÐºÐ¾Ñ€
PRODUCTS[102]= [ 1, 3, 4, 0, 1, 12000, "Ð‘Ð¾Ð»ÑŒÑˆÐ¸Ðµ Ð¿Ð¾Ð´Ð°Ñ€ÐºÐ¸"];
PRODUCTS[99] = [ 1, 3, 4, 0, 1, 12000, "Ð‘Ð¾Ð»ÑŒÑˆÐ¾Ð¹ Ñ€Ð¾Ð¶Ð´ÐµÑÑ‚Ð²ÐµÐ½ÑÐºÐ¸Ð¹ Ð²ÐµÐ½Ð¾Ðº"];
PRODUCTS[101]= [ 1, 3, 4, 0, 1, 12000, "ÐœÐ°Ð»ÐµÐ½ÑŒÐºÐ¸Ðµ Ð¿Ð¾Ð´Ð°Ñ€ÐºÐ¸"];
PRODUCTS[103]= [ 1, 3, 4, 0, 1, 12000, "ÐœÐ°Ð»ÐµÐ½ÑŒÐºÐ¸Ð¹ Ñ€Ð¾Ð¶Ð´ÐµÑÑ‚Ð²ÐµÐ½ÑÐºÐ¸Ð¹ Ð²ÐµÐ½Ð¾Ðº"];
PRODUCTS[100]= [ 1, 3, 4, 0, 1, 12000, "ÐžÐ¼ÐµÐ»Ð°"];
PRODUCTS[29] = [ 1, 3, 4, 0, 1, 12000, "Ð±ÐµÑÐµÐ´ÐºÐ° 1"];
PRODUCTS[30] = [ 1, 3, 4, 0, 1, 12000, "Ð±ÐµÑÐµÐ´ÐºÐ° 2"];
PRODUCTS[31] = [ 1, 3, 4, 0, 1, 12000, "Ð±ÐµÑÐµÐ´ÐºÐ° 3"];
PRODUCTS[44] = [ 1, 3, 1, 0, 1, 12000, "Ð³Ð½Ð¾Ð¼Ñ‹-ÑÐ°Ð´Ð¾Ð²Ð¾Ð´Ñ‹"];
PRODUCTS[63] = [ 1, 3, 2, 0, 1,600000, "Ð³Ð¾Ñ€ÐºÐ°"];
PRODUCTS[25] = [ 1, 3, 1, 0, 1,  6000, "Ð´ÐµÐºÐ¾Ñ€Ð°Ñ‚Ð¸Ð²Ð½Ñ‹Ðµ ÐºÐ°Ð¼Ð½Ð¸"];
PRODUCTS[47] = [ 1, 3, 1, 0, 1,  2000, "Ð´ÐµÑ€ÐµÐ²ÑÐ½Ð½Ñ‹Ðµ ÑˆÐ°Ñ€Ñ‹"];
PRODUCTS[26] = [ 1, 3, 1, 0, 1,  3000, "Ð´Ð¾Ñ€Ð¾Ð¶ÐºÐ° 1"];
PRODUCTS[27] = [ 1, 3, 1, 0, 1,  3000, "Ð´Ð¾Ñ€Ð¾Ð¶ÐºÐ° 2"];
PRODUCTS[28] = [ 1, 3, 1, 0, 1,  3000, "Ð´Ð¾Ñ€Ð¾Ð¶ÐºÐ° 3"];
PRODUCTS[46] = [ 1, 3, 1, 0, 1,  1500, "Ð´Ð¾Ñ€Ð¾Ð¶ÐºÐ° 4"];
PRODUCTS[93] = [ 1, 3, 1, 0, 1, 12000, "ÐºÐ°Ñ‡ÐµÐ»Ð¸"];
PRODUCTS[56] = [ 1, 3, 1, 0, 1, 12000, "ÐºÐ¾ÑÑ‚Ñ‘Ñ€"];
PRODUCTS[40] = [ 1, 3, 4, 0, 1, 94000, "ÐºÑ€ÑƒÐ³ ÐºÐ°Ð¼Ð½ÐµÐ¹"];
PRODUCTS[62] = [ 1, 3, 4, 0, 1, 12000, "Ð¿ÐµÑÐ¾Ñ‡Ð½Ð¸Ñ†Ð°"];
PRODUCTS[39] = [ 1, 3, 1, 0, 1, 12000, "Ð¿Ñ€ÑƒÐ´"];
PRODUCTS[57] = [ 1, 3, 1, 0, 1, 12000, "Ð¿ÑƒÐ³Ð°Ð»Ð¾"];
PRODUCTS[38] = [ 1, 3, 2, 0, 1, 24000, "ÑÐ°Ð´ ÐºÐ°Ð¼Ð½ÐµÐ¹"];
PRODUCTS[94] = [ 1, 3, 2, 0, 1, 24000, "ÑÐºÐ°Ð¼ÐµÐ¹ÐºÐ°"];
PRODUCTS[96] = [ 1, 3, 4, 0, 1, 46000, "ÑƒÐ³Ð¾Ð»Ð¾ÐºÐ´Ð»Ñ Ð±Ð°Ñ€Ð±ÐµÐºÑŽ"];
PRODUCTS[37] = [ 1, 3, 4, 0, 1, 46000, "ÑƒÐ³Ð¾Ð»Ð¾Ðº Ð¾Ñ‚Ð´Ñ‹Ñ…Ð°"];
PRODUCTS[23] = [ 1, 3, 1, 0, 1,  2499, "Ñ„Ð¾Ð½Ñ‚Ð°Ð½ 1"];
PRODUCTS[24] = [ 1, 3, 1, 0, 1,  1500, "Ñ„Ð¾Ð½Ñ‚Ð°Ð½ 2"];
PRODUCTS[95] = [ 1, 3, 1, 0, 1,  1500, "Ñ…Ð°Ð»Ñ„-Ð¿Ð°Ð¹Ð¿"];

try { w.PRODUCTS = PRODUCTS; } catch(e) {}

// Ð´Ð¾ÑÑ‚Ð¸Ð³Ð°ÐµÐ¼Ñ‹Ðµ ÑƒÑ€Ð¾Ð²Ð½Ð¸
var LEVELS = ['???'
,/* 1*/'Ð¡Ð°Ð»Ð°Ñ‚Ð¾Ð¼ÐµÑˆÐ°Ñ‚ÐµÐ»ÑŒ'
,/* 2*/'Ð“Ð¾Ñ€Ð¾ÑˆÐ¸Ð½Ð¾ÑÑ‡Ð¸Ñ‚Ð°Ñ‚ÐµÐ»ÑŒ'
,/* 3*/'ÐŸÐ¾Ð¼Ð¸Ð´Ð¾Ñ€Ð½Ñ‹Ð¹ Ð´Ð¸Ð»ÐµÑ€'
,/* 4*/'Ð›ÑƒÐºÐ¾Ð¼ÐµÑ‚Ð°Ñ‚ÐµÐ»ÑŒ'
,/* 5*/'Ð£Ñ€Ð¾Ð¶Ð°Ð¹Ð½Ð°ÐºÐ¾Ð¿Ð¸Ñ‚ÐµÐ»ÑŒ'
,/* 6*/'ÐšÐ°Ñ€Ñ‚Ð¾Ñ„ÐµÐ»ÐµÑ†Ñ†Ð¸Ð¾Ð½ÐµÑ€'
,/* 7*/'Ð—ÐµÐ»Ñ‘Ð½Ñ‹Ð¹ Ð¿Ñ€Ð¾Ð´Ð°Ð²ÐµÑ†'
,/* 8*/'ÐšÑ€Ð¾Ñ‚Ð¾Ð¾Ñ…Ð¾Ñ‚Ð½Ð¸Ðº'
,/* 9*/'ÐœÐµÐ»ÐºÐ¸Ð¹ Ð¾Ð³Ð¾Ñ€Ð¾Ð´Ð½Ð¸Ðº'
,/*10*/'Ð§ÐµÑ€Ð½Ð¸Ñ‡Ð½Ñ‹Ð¹ Ð±Ð°Ñ€Ð¾Ð½'
,/*11*/'Ð”Ð°Ñ‡Ð½Ð¸Ðº-ÑÐ°Ð´Ð¾Ð²Ð¾Ð´'
,/*12*/'ÐšÐ°Ð²Ð°Ð»ÐµÑ€ Ð¾Ñ€Ð´ÐµÐ½Ð° Ñ€Ð¾Ð·'
,/*13*/'ÐžÐ²Ð¾Ñ‰Ð½Ð¾Ð¹ Ð³ÑƒÑ€Ñƒ'
,/*14*/'Ð Ñ‹Ñ†Ð°Ñ€ÑŒ Ð²Ð¸ÑˆÐ½Ñ‘Ð²Ð¾Ð¹ ÐºÐ¾ÑÑ‚Ð¸'
,/*15*/'Ð¡Ð¸Ð½ÑŒÐ¾Ñ€ Ð—Ð°Ð±Ð¾Ñ€'
,/*16*/'Ð“Ñ€ÐµÑ†ÐºÐ¸Ð¹ ÑÑ‚Ñ€Ð°Ð¶'
,/*17*/'Ð Ð°ÑÑÐ°Ð´Ñ‡Ð¸Ðº Ð›Ð¸Ð»Ð¸Ð¹'
,/*18*/'ÐšÐ¾Ñ€Ð¾Ð»ÑŒ ÐžÑ€Ñ…Ð¸Ð´ÐµÐ¹'
,/*19*/'ÐšÑ€Ð¾ÐºÑƒÑÐ¿Ð¾ÐºÑƒÑ'
,/*20*/'Ð“Ñ€Ð¾Ð·Ð° ÑÐ¾Ñ€Ð½ÑÐºÐ¾Ð²'
,/*21*/'ÐšÐ¾Ñ€Ð½ÐµÐ²ÐµÐ´'
,/*22*/'Ð¡Ð°Ð´Ð¾Ð²Ñ‹Ð¹ Ð¸Ð¼Ð¿ÐµÑ€Ð°Ñ‚Ð¾Ñ€'
];

//----------------------------------------------------------------------------//
// Ð¾ÐºÑ€ÑƒÐ³Ð»ÐµÐ½Ð¸Ðµ
function round(x, s) { if (s == undefined) s = 0; var p = Math.pow(10, s);
    return Math.round(x * p) / p; }
// Ð¿Ð¾Ð¸ÑÐº ÐºÐ¾Ð´Ð° Ð¿Ð¾ Ð¸Ð¼ÐµÐ½Ð¸ ÑÐµÐ¼ÐµÑ‡ÐºÐ¸
var prodByName = {};

// ÑÐµÐ¼ÐµÑ‡ÐºÐ¾ Ð¿Ð¾ ÐºÐ¾Ð´Ñƒ Ð¸Ð»Ð¸ Ð½Ð°Ð·Ð²Ð°Ð½Ð¸ÑŽ
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

// Ñ€ÐµÐ½Ñ‚Ð°Ð±ÐµÐ»ÑŒÐ½Ð¾ÑÑ‚ÑŒ
function rentab(prod)
{
	var p;
	p = prod.numInHour * prod.p_market * 0.9; // Ð´Ð¾Ñ…Ð¾Ð´ Ð² Ñ‡Ð°Ñ
	p = p / 6;                                // Ð² 10 Ð¼Ð¸Ð½ÑƒÑ‚
	return Math.floor(p*10)/10;
}
// Ð²Ñ‹Ð³Ð¾Ð´Ð½Ð°Ñ Ñ†ÐµÐ½Ð° Ð´Ð»Ñ Ñ€Ñ‹Ð½ÐºÐ°
function goodPrice(prod)
{
	return Math.round(6 * RENTAB_GOOD / prod.numInHour / 0.9 * 100) / 100;
}

// ÑÐ¾Ñ€Ñ‚Ð¸Ñ€Ð¾Ð²ÐºÐ° Ð¿Ð¾Ð»ÐºÐ¸ Ð¿Ð¾ Ñ€ÐµÐ½Ñ‚Ð°Ð±ÐµÐ»ÑŒÐ½Ð¾ÑÑ‚Ð¸
function sortRack(id) // id - ÐºÐ°ÐºÐ°Ñ ÑÐµÐ¼ÐµÑ‡ÐºÐ° Ð±ÑƒÐ´ÐµÑ‚ Ð²ÑÐ¿Ð»Ñ‹Ð²Ð°Ñ‚ÑŒ
{
	return;
	var i, rack = globObj('rackElement');
	var sem = rack[id], newRack = {};
	for (i in rack)
	if (i != id)
	{
		// Ð²ÑÑ‚Ð°Ð²Ð»ÑÐµÐ¼ Ñ‚ÐµÐºÑƒÑ‰ÑƒÑŽ ÑÐµÐ¼ÐµÑ‡ÐºÑƒ Ð¿ÐµÑ€ÐµÐ´ Ñ‚ÐµÐ¼ ÐºÐ°Ðº Ð±ÑƒÐ´ÐµÑ‚ Ð¼ÐµÐ½ÑŒÑˆÐ°Ñ Ñ€ÐµÐ½Ñ‚Ð°Ð±ÐµÐ»ÑŒÐ½Ð¾ÑÑ‚ÑŒ
		if (rack[i].rentab <= rack[id].rentab)
			newRack[id] = rack[id];
		newRack[i]  = rack[i];
	}
	// Ð·Ð°Ð¼ÐµÐ½ÑÐµÐ¼ Ð¼Ð°ÑÑÐ¸Ð²
	globWrap('rackElement').rackElement = newRack;
}

// Ð·Ð°ÑÐ²ÐºÐ° Ð½Ð° Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ñ†ÐµÐ½Ñ‹
var g_checkPriceDelta = 0;
function checkPrice(prod)
{
	// Ð´Ð¾Ð±Ð°Ð²Ð»ÑÐµÐ¼ iframe, Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ Ð´Ð°Ð½Ð½Ñ‹Ðµ
	if (!$("myIframe"))
	{
		var f = document.createElement('iframe');
		f.setAttribute('id', 'myIframe');
		document.body.appendChild(f);
	}

	var i, d = (new Date()).getTime();
	if (Settings.load('marketi_'+prod.name, 0)*1000 < d)
	{   // Ð¿Ð¾Ð´Ð³Ñ€ÑƒÐ¶Ð°ÐµÐ¼ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ Ñ Ñ‚Ð¾Ð²Ð°Ñ€Ð¾Ð¼
		window.setTimeout(function(){
			$("myIframe").src =
				'/stadt/markt.php?order=p&v='+prod.id+'&filter=1';
		}, g_checkPriceDelta += PRICE_PAUSE*1000);
	}
}

/** Ð½Ð¾Ð¼ÐµÑ€ Ñ‚ÐµÐºÑƒÑ‰ÐµÐ³Ð¾ ÑÐ°Ð´Ð° */
function getGardenNumber()
{
	return parseInt($('garten_aktuell_nummer').innerHTML);
}

// ÑÑƒÐ¿ÐµÑ€Ñ€Ñ‹Ð½Ð¾Ðº
function superMarket()
{
	var i, st = '';
	var p, pr = prod();
	st += '<div style="float: left; width: 640px;">';
	st += '<table style="margin: 50px 60px 20px 50px">';
	// Ð·Ð°Ð³Ð¾Ð»Ð¾Ð²Ð¾Ðº
	st += '<tr>';
	st += '<td>ÐžÐ²Ð¾Ñ‰</td>';
	st += '<td align="center">ÐšÐ¾Ð»-Ð²Ð¾</td>';
	st += '<td align="center">Ð¦ÐµÐ½Ð°</td>';
	// Ð¿Ð¸ÑˆÐµÐ¼ ÑÐ¸Ð¼Ð¿Ð¾Ð²
	var pp, s = parent.window.wrappedJSObject.simps, pt, ptot;
	st += '<td>C</td>';
	for (pp in s)
	st += '<td>Ð¡'+s[pp].id+'</td>';
	st += '</tr>';
	for (p in pr)
	{
		st += '<tr>';
		st += '<td><a href="'+shop(pr[p].name)+'">'+pr[p].name+'</a></td>';
		st += '<td align="center">'+round(pr[p].number)+'</td>';
		st += '<td align="center">';
			st += '<a href="'+shop(pr[p].name, 1)+'" title="Ð Ñ‹Ð½Ð¾Ðº">'+pr[p].p_market+'</a> / ';
			st += '<a href="'+shop(pr[p].name, 2)+'" title="ÐœÐ°Ð³Ð°Ð·Ð¸Ð½">'+pr[p].p_shop+'</a>';
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
	// Ð°Ð²Ñ‚Ð¾Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ
	document.body.innerHTML = st;
		window.setTimeout(function(){ document.location = L; }, MARKET_UPTIME*1000);
	return 0;
}

// Ð¼ÐµÐ½ÑÐµÐ¼ ÑÑ‚Ñ€ÑƒÐºÑ‚ÑƒÑ€Ñƒ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð° Ð¾Ð²Ð¾Ñ‰Ð°
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
	// Ð²Ñ€ÐµÐ¼Ñ Ñ€Ð¾ÑÑ‚Ð°
	var t=PRODUCTS[i][PT]%100;
	t = ((PRODUCTS[i][PT] - t)/100*60 + t)*60000;
	PRODUCTS[i][PT] = t;
	if (typeof(rack[i].duration) == 'number')
		t = rack[i].duration;
	var hours = 0, ctime, day = 24*60*60*1000, tG = t;
	do {
		tG     = Math.round(tG * (1 - poliv)); // Ð¿Ð¾Ð»Ð¸Ð²Ð°ÐµÐ¼
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
	if (h > 24) s = s.replace(/:\d+ /, '') + ' ' + Math.floor(h/24)+'Ð´'+(h%24)+'Ñ‡';
	rack[i].hrs      = s;
	rack[i].p_shop   = PRODUCTS[i][PP]; // Ð¼Ð°Ð³Ð°Ð·Ð¸Ð½Ð½Ð°Ñ Ñ†ÐµÐ½Ð°
	rack[i].p_market = Settings.load(PRODUCTS[i][PN], 0) / 100; // Ñ†ÐµÐ½Ð° Ñ€Ñ‹Ð½ÐºÐ°
	rack[i].level    = PRODUCTS[i][PL];
	rack[i].need     = 0;
	rack[i].shop     = PRODUCTS[i][PS];
	if (rack[i].id == undefined)
	{
		if (rack[i].level <= level)
		rack[i].id     = i;              // ÐºÐ¾Ð´
		rack[i].size   = 1;              // Ñ€Ð°Ð·Ð¼ÐµÑ€ Ð½Ð° Ð¿Ð¾Ð»ÐºÐµ
		rack[i].rackid = 0;
		rack[i].y      = 1;
		rack[i].number = 0;
		rack[i].x      = PRODUCTS[i][PSQ]; // Ñ€Ð°Ð·Ð¼ÐµÑ€ Ð½Ð° Ð³Ñ€ÑÐ´ÐºÐµ
		if (rack[i].x == 4) rack[i].x = rack[i].y = 2;
		rack[i].crop   = PRODUCTS[i][PC]; // ÑÐºÐ¾Ð»ÑŒÐºÐ¾ Ð²Ñ‹Ñ€Ð°ÑÑ‚ÐµÑ‚
		rack[i].name   = PRODUCTS[i][PN]; // Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ðµ
	}
	t = rack[i].duration / 1000 / 60; // Ð²Ñ€ÐµÐ¼Ñ Ñ€Ð¾ÑÑ‚Ð° Ð² Ð¼Ð¸Ð½ÑƒÑ‚Ð°Ñ…
	m = (204-((rack[i].x==1)?0:12)) * (rack[i].crop-1) /
		rack[i].x / rack[i].y;        // ÑÐºÐ¾Ð»ÑŒÐºÐ¾ Ð²Ñ‹Ñ€Ð°ÑÑ‚ÐµÑ‚ Ð½Ð° Ð¿Ð¾Ð»Ðµ
	if (t)
	{
		rack[i].numInHour = 60 / t * m;   // ÑÑ‚Ð¾Ð»ÑŒÐºÐ¾ Ð²Ñ‹Ñ€Ð°ÑÑ‚Ð°ÐµÑ‚ Ð² Ñ‡Ð°Ñ
		rack[i].rentab = rentab(rack[i]); // Ñ€ÐµÐ½Ñ‚Ð°Ð±ÐµÐ»ÑŒÐ½Ð¾ÑÑ‚ÑŒ
		rack[i].p_good = goodPrice(rack[i]); // Ð²Ñ‹Ð³Ð¾Ð´Ð½Ð°Ñ Ñ†ÐµÐ½Ð°
		rack[i].points = PRODUCTS[i][PT]/60000*0.1*rack[i].x*rack[i].y; // ÐºÐ¾Ð»-Ð²Ð¾ Ð¾Ñ‡ÐºÐ¾Ð²
	}
}
// Ð¼ÐµÐ½ÑÐµÐ¼ Ð²Ð½ÑƒÑ‚Ñ€ÐµÐ½Ð½ÑŽÑŽ ÑÑ‚Ñ€ÑƒÐºÑ‚ÑƒÑ€Ñƒ ÐºÐ¾Ñ€Ð·Ð¸Ð½ÐºÐ¸
function modifyRack()
{
	return; //background-image: url("http://pics.wurzelimperium.de/pics/lager/glas1.gif"); background-position: 2px 0px;
	var i, r = globObj('rackElement'), rack=[];
	for (i in r) rack[i] = r[i];
	// Ð¿Ñ€Ð¾Ñ†ÐµÐ½Ñ‚ Ð¿Ð¾Ð»Ð¸Ð²Ð°
	var t, n, poliv = ''+globObj('selectMode');
	poliv = /(\d+)%/.exec(poliv); poliv = parseInt(poliv[1]) / 100;
	w.POLIV = poliv;
	for (i = 0; i < rack.length; i++)
		modifyRackElement(i);
	// ÑÐ¾Ñ€Ñ‚Ð¸Ñ€ÑƒÐµÐ¼ Ð¿Ð¾ Ñ€ÐµÐ½Ñ‚Ð°Ð±ÐµÐ»ÑŒÐ½Ð¾ÑÑ‚Ð¸
//	rack.sort(function(x,y){ return y.rentab - x.rentab; });
	// Ð¿Ñ€ÐµÐ¾Ð±Ñ€Ð°Ð·Ð¾Ð²Ñ‹Ð²Ð°ÐµÐ¼ Ð² Ñ…ÑÑˆ Ð´Ð»Ñ ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ñ Ð¸Ð½Ð´ÐµÐºÑÐ°Ð¼
	var j = 0, newRack = {t:0};
	for (i = 0; i < rack.length; i++)
	if (rack[i].id != undefined)
	{
//		rack[i].rackid = Math.floor(j++ / 20); // Ð½Ð¾Ð¼ÐµÑ€ Ð¿Ð¾Ð»ÐºÐ¸
		newRack[rack[i].id] = rack[i];
	}
	w.rackElement = newRack;
}


// ÑÑÑ‹Ð»ÐºÐ¸ Ð½Ð° Ñ€Ñ‹Ð½Ð¾Ðº Ð¸Ð»Ð¸ Ð² Ð¼Ð°Ð³Ð°Ð·Ð¸Ð½
function linkMarket(prod) { return '/stadt/markt.php?page=1&order=p&v='+prod.id+'&filter=1'; }
// ÑÑÑ‹Ð»ÐºÐ° Ð½Ð° Ð¼Ð°Ð³Ð°Ð·Ð¸Ð½
function linkShop(prod) { return '/stadt/shop.php?s='+prod.shop; }
// ÑÑÑ‹Ð»ÐºÐ° Ð³Ð´Ðµ Ð²Ñ‹Ð³Ð¾Ð´Ð½ÐµÐµ
function linkShopOrMarket(prod)
{ return prod.p_market < prod.p_shop ? linkMarket(prod) : linkShop(prod); }

// Ð¼ÐµÐ½ÑÐµÐ¼ Ð¾Ñ‚Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð¸Ðµ ÑÐµÐ¼ÑÐ½ Ð½Ð° Ð¿Ð¾Ð»ÐºÐµ
function modifyRackDesign()
{
	return;
	// ÑÑ‚Ñ€ÐµÐ»ÐºÐ¸
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
	// Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ ÐºÐ¾Ñ€Ð·Ð¸Ð½ÐºÐ¸
/*	w.updateRack_ = w.updateRack;
	w.updateRack = function(x)
	{
		// Ð½ÑƒÐ»Ð¸ Ð² ÐºÐ¾Ð»-Ð²Ðµ ÑƒÐ±Ð¸Ñ€Ð°ÐµÐ¼, Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð½Ðµ Ð¿Ñ€Ð¾Ð¿Ð°Ð´Ð°Ð»Ð¸ Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ‚Ñ‹
		var i, r = w.rackElement;
		for (i in r) if (r[i].number == 0 && r[i].shop != 3) r[i].number = 0.01;
		if (x == undefined)
			x = w._currRack;
		return w.updateRack_(x, true);
	}*/
	w.showRackElement_ = w.showRackElement;
	w.showRackElement  = function(a,s,q,e,b,m,p,o,c,l,f,n,r)
	{
		// ÑÐµÐ¼ÐµÑ‡ÐºÐ¾
		var prod = w.rackElement[a];
		// Ð²ÑÐ¿Ð»Ñ‹Ð²Ð°ÑŽÑ‰Ð°Ñ Ð¿Ð¾Ð´ÑÐºÐ°Ð·ÐºÐ°
		var txt='', title = '';
//		title = Math.round(prod.number)+', '+round(prod.p_market*0.9,2)+':'+prod.p_market+' ÑÐ¢'+
//			' ('+prod.p_shop+'->'+round(prod.p_good/1.1, 2)+':'+prod.p_good+'), '+prod.rentab;
		title = Math.round(prod.number)+', '+prod.p_market+' ÑÐ¢'+
			' ('+prod.p_shop+'), '+prod.rentab;
		var style = '', linkGood = linkMarket(prod);
		// Ñ€Ð°ÑÐºÑ€Ð°ÑˆÐ¸Ð²Ð°ÐµÐ¼ Ð½Ð°Ð´Ð¿Ð¸ÑÐ¸
		if ( prod.p_market >= prod.p_good) style = 'color: '+CL_GOOD+';';
		if ( prod.rentab   <= RENTAB_BAD)  style = 'color: '+CL_BAD+';';
		if (!prod.p_market)                style = 'color: #FFF;';
		if ( prod.p_market > prod.p_shop) { style += 'background:#AAF'; linkGood = linkShop(prod); }
		// Ð´Ð»Ñ ÐºÐ¾ÐºÐ¾ÑÐ¾Ð² Ð¸ Ð¿Ð°Ð»ÑŒÐ¼ Ð½Ðµ Ð´ÐµÐ¹ÑÑ‚Ð²ÑƒÐµÑ‚
		if (prod.id == w.KOKOS || prod.id == w.PALME) style = '';
		var oncl = "document.getElementById('shop').style.display='';"+
			"shopframe2.document.body.innerHTML = ''";
		style = 'onclick="'+oncl+'"style="font-size: 8px;'+style+'"'+
			'target="shopframe2" title="'+title+'"';
		// ÑÐ¾ÐºÑ€Ð°Ñ‰Ð°ÐµÐ¼ Ð±Ð¾Ð»ÑŒÑˆÐ¸Ðµ Ñ‡Ð¸ÑÐ»Ð°
		var mR = (m < 1000) ? Math.round(m) : Math.floor(m / 1000)+'Ðº';
		var need = (prod.need <= prod.number) ? 0 : prod.need - Math.round(prod.number);
		if ((''+mR).length < 3 || (''+need).length < 3)
		{ need = need+' '; mR = ' '+mR; }
		// Ð¾Ñ‚Ð¾Ð±Ñ€Ð°Ð¶Ð°ÐµÐ¼ ÑÑÑ‹Ð»ÐºÑƒ
		txt += '<a href="'+linkMarket(prod)+'"'+style+'>&nbsp;'+need+'</a>'+
			'<a    href="'+linkGood+'"'+style+'>/'+mR+'&nbsp;</a>';
		txt = '<small>' + txt + '</small>';
		w.showRackElement_(a,s,q,e,b,txt,p,o,c,l,f,n,r);
	}
//	w.updateRack();
}

// Ð¼ÐµÐ½ÑÐµÐ¼ Ð¾Ñ‚Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð¸Ðµ Ð¿Ð¾Ð´ÑÐºÐ°Ð·ÐºÐ¸ Ð¾Ñ‚ Ð³Ð½Ð¾Ð¼Ð¸ÐºÐ°
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

// Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ ÑÑ‚Ð°Ñ‚ÑƒÑÐ½Ð¾Ð¹ ÑÑ‚Ñ€Ð¾ÐºÐ¸
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
		p = 1000000; if (x >= p) return round(x / p, 2)+'Ðœ';
		p =    1000; if (x >= p) return round(x / p, 2)+'Ðš';
		return round(x, 2);
	}
	s.innerHTML = ', '+
		LNG_STATUS_MONEY+': ' + round2(money) +
		'+' + round2(onSemen)+
		'=' + round2(sost)   +', '+
		LNG_STATUS_LEVEL+': ' + globObj('LEVEL')+'/22, ' +
		LNG_STATUS_SCORE+': ' + round2(score) +
		'; <span id="log"></span>';
	// Ð½Ð¾Ð¼ÐµÑ€ ÑÐ°Ð´Ð°
	var NS = getGardenNumber();
	$('gardenNums').innerHTML = (
		' <a href="HREF1"STYLE> 1'+nextTime[1]+'</a>'+
		' <a href="HREF2"STYLE> 2'+nextTime[2]+'</a>'+
		' <a href="HREF3"STYLE> 3'+nextTime[3]+'</a>'+
		' <a href="HREF4"STYLE> 4'+nextTime[4]+'</a>').
		replace(/HREF/g,  '/garten_map.php?garden=').
		replace(/STYLE/g, 'target="garten"style="color: #FFFB48;text-decoration:none;"').
		replace(new RegExp('> ('+NS+'[^<]*)<'), '><b style="color: #FFF; border: 1px solid #FFF;">&nbsp;$1&nbsp;</b><');
}

/** Ð·Ð°ÑÐµÑÑ‚ÑŒ Ð²ÑÐµ Ð¿Ð¾Ð»Ðµ */
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

// Ð¼ÐµÐ½ÑÐµÐ¼ Ð¾Ñ‚Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð¸Ðµ Ð¾Ð±Ñ‰ÐµÐ³Ð¾ Ð¿Ð¾Ð»Ñ
function modifyMainPage()
{
	// Ð´Ð¾Ð¿Ð¾Ð»Ð½Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ðµ ÐºÐ½Ð¾Ð¿ÐºÐ¸
	var cl, s, st = '', div = document.createElement('DIV');
	s = 'style="display:inline-block;padding: 10px;background: #FFF;"';
	cl = SCRIPT_PAGE.replace(/[^/]+$/, 'help.html');
	st += '<a '+s+'href="'+cl+'" target="_blank">'+LNG_BTN_HELP+'</a> ';
	cl = 'return plantAllGarden();';
	st += '<a '+s+'href="#" onclick=\''+cl+'\'>'+LNG_BTN_PLANT+'</a> ';
	cl = 'selectMode(2,true,"selected");for(var i=1;i<205;i++)cache_me(i,0,""); setTimeout(findComplete, 2000); return false';
	st += '<a '+s+'href="#" onclick=\''+cl+'\'>'+LNG_BTN_WATER+'</a> ';
	// Ñ„Ñ€ÐµÐ¹Ð¼ Ñ Ñ€Ñ‹Ð½ÐºÐ¾Ð¼
	st += '<div name="shop" id="shop" style="position:absolute;z-index:20;width:640px;height:560px;left:300px;right:40px;top:135px;bottom:40px;display:none;">';
	st += '<iframe id="shopframe2" name="shopframe2" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>';
	st += '</div>';
	st += '<div style="display: none;" id="garten_aktuell_nummer"></div>';
	st += '<div style="display: none;" id="stadtlock"></div>';
	div.innerHTML = st;
	style(div, {position: 'absolute', top: '0px', left: 0, zIndex: 1000});
	$('garten_aktuell_nummer').id = 'gardenNums';
	document.body.appendChild(div);

	// Ñ€Ð°Ð·Ð¼ÐµÑ€ Ð¸Ð³Ñ€Ð¾Ð²Ð¾Ð³Ð¾ Ð¿Ð¾Ð»Ñ
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
			// Ð¿Ð¾Ð´ÑÐºÐ°Ð·ÐºÐ° Ð³Ð½Ð¾Ð¼Ð¸ÐºÐ°
			$('gpopDiv').style.top  = '150px';
			$('gpopDiv').style.left = '220px';
		} else // Ð´Ð»Ñ Ð¼Ð¸Ð½Ð¸Ð¼Ð°Ð»Ð¸ÑÑ‚Ð¸Ñ‡Ð½Ð¾Ð³Ð¾ Ð´Ð¸Ð·Ð°Ð¹Ð½Ð°
			$('contentwrapper').style.marginTop = -50-upsimT+'px';
		// Ð½Ðµ Ð²Ð¸Ð´Ð½Ð¾ ÐºÐ½Ð¾Ð¿ÐºÐ¸ Ð´Ð¾Ð³Ð¾Ð²Ð¾Ñ€Ð°
		if ($('vertraege').src.indexOf('_neu') != -1)
			$('vertraege').style.top = '38px';
	}
	// Ð²ÑÑ‚Ð°Ð²Ð»ÑÐµÐ¼ Ð½Ð¾Ð¼ÐµÑ€ Ð²ÐµÑ€ÑÐ¸Ð¸ Ð¸ Ð±Ñ‹ÑÑ‚Ñ€Ñ‹Ð¹ Ð¿ÐµÑ€ÐµÑ…Ð¾Ð´ Ð² Ð´Ñ€ÑƒÐ³Ð¸Ðµ Ð»Ð¾Ð³Ð¸Ð½Ñ‹
	var b = $('gardenNums').parentNode;
	b.innerHTML = '<b>'+SCRIPT_VERSION+'</b> '+getLoginList()+b.innerHTML.replace(/.+?</, '<');
	// Ð´Ð¾Ð¿Ð¾Ð»Ð½Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ð°Ñ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ Ð² ÑÑ‚Ð°Ñ‚ÑƒÑÐµ
	var s = document.createElement('SPAN');
	s.id = 'status';
	$('gardenNums').parentNode.appendChild(s);
	w.updatePlayerInfo_   = w.updatePlayerInfo;
	w.updatePlayerInfo    = function(e,a,c,h,b,f) { w.updatePlayerInfo_(e,a,c,h,b,f); updateStatus(); }
	w.stadt_hideAnimation = function() { }
	w.product = function(c,b,h,e,j,f,n,o,m,l,a)
	{ var rack = globObj('rackElement'); rack[c].number = h; return rack[c]; }
	// ÐºÐ¾Ð»-Ð²Ð¾ ÑÐµÐ¼ÐµÑ‡ÐµÐº Ð½Ð° Ð¿Ð¾Ð»ÐºÐµ
	s = document.createElement('SPAN');
	s.id = 'prodCount';
	style(s, 'color: #FFF;');
	$('lager_ttip').appendChild(s);
	// ÑÐ¾ÐºÑ€Ð°Ñ‰Ð°ÐµÐ¼ Ð½Ð°Ð´Ð¿Ð¸ÑÑŒ Ð¿Ñ€ÐµÐ¼Ð¸ÑƒÐ¼ Ð°ÐºÐºÐ°ÑƒÐ½Ñ‚Ð°
	if ($('premium'))
	{
		var p = $('premium');
		var c = $('coins').innerHTML;
		p = p.parentNode.firstChild;
		p.innerHTML = p.innerHTML.replace(/[^0-9]+([0-9.]+).+/, 'ÐŸÐ: $1 / '+c);
	}
}

// Ð¿Ð¾Ð¿Ñ€Ð°Ð²Ð»ÑÐµÐ¼ ÐºÐ½Ð¾Ð¿ÐºÑƒ Ð·Ð°ÐºÑ€Ñ‹Ñ‚ÑŒ
function modifyMarketClose()
{
	var i, st, btn = $$('.closeBtn'), div;
	if (btn[0])
	{
		div = $('div',
			'<img src="'+btn[0].src+'" class="closeBtn link2" onclick="closeMarketWindow()"">'
		);
		w.closeMarketWindow = function()
		{
			parent.document.getElementById('shop').style.display='none';
			parent.document.getElementById('stadtlock').style.display='none';
		}
		btn[0].parentNode.replaceChild(div, btn[0]);
	}
}

// Ñ‚ÐµÐºÑƒÑ‰Ð¸Ð¹ ÑƒÑ€Ð¾Ð²ÐµÐ½ÑŒ Ð¸Ð³Ñ€Ð¾ÐºÐ°
function grabUserLevel()
{
	var i, level = 0, str = $('level').innerHTML;
	str = str.split(','); str = str[0];
	for (i = 0; i < LEVELS.length; i++)
	if (LEVELS[i] == str) { level = i; break; }
	w.LEVEL = level;
}

// ÑÐ¾Ñ…Ñ€Ð°Ð½ÐµÐ½Ð¸Ðµ Ñ†ÐµÐ½Ñ‹ Ð½Ð° ÑÐµÑ€Ð²ÐµÑ€Ðµ
function savePriceOnServer(name, price)
{
	// Ð¿Ñ€Ð¾Ð²ÐµÑ€ÑÐµÐ¼ Ð¿Ð¾ÑÐ»ÐµÐ´Ð½ÐµÐµ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ðµ
	var lastUpdate = Settings.load(name+'_toSrv', 0);
	var curTime    = Math.round((new Date()).getTime() / 1000);
	if (lastUpdate + 10*60 > curTime) return; // Ñ‡Ð°ÑÑ‚Ð¾ Ð½Ðµ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÑÐµÐ¼

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
	d.src  = 'http://si.cupivan.ru/m/savePrice.php?'+st;
	document.body.appendChild(d);
}

/** ÐºÑƒÐ¿Ð¸Ñ‚ÑŒ Ð² Ð¼Ð°Ð³Ð°Ð·Ð¸Ð½Ðµ */
function buyInShop(pname, count)
{
	var p = prod(pname), st = 's='+p.shop+'&page=1&change_page_only=0';
	st += '&anzahl%5B0%5D='+count;
	st += '&preis%5B0%5D='+p.p_shop;
	st += '&produkt%5B0%5D='+p.id;
	ajax.load('/stadt/shop.php?s='+p.shop, st, function(x)
	{
		// Ð¾ÑˆÐ¸Ð±ÐºÐ° Ð¿Ñ€Ð¸ Ð·Ð°Ð³Ñ€ÑƒÐ·ÐºÐµ
		if (x.length < 10)
		{
			alert('ÐœÐ°Ð³Ð°Ð·Ð¸Ð½ Ð´Ð¾ÑÑ‚ÑƒÐ¿ÐµÐ½ Ñ‚Ð¾Ð»ÑŒÐºÐ¾ Ð¿Ð¾ ÑÑ€ÐµÐ´Ð°Ð¼ Ð¸ ÑÑƒÐ±Ð±Ð¾Ñ‚Ð°Ð¼!');
			return;
		}
		if (x.indexOf('ÐÐµÐ²Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ð¾ ÐºÑƒÐ¿Ð¸Ñ‚ÑŒ') != -1)
		{
			alert('ÐÐµÑ‚ ÑÐ²Ð¾Ð±Ð¾Ð´Ð½Ð¾Ð³Ð¾ Ð¼ÐµÑÑ‚Ð° Ð½Ð° ÑÑ‚ÐµÐ»Ð»Ð°Ð¶Ðµ');
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
/** Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð¸ÐºÐ¾Ð½ÐºÐ¸ */
function updateFavicon(isNew)
{
	// ÑÐ¾Ð·Ð´Ð°ÐµÐ¼ Ð¸ÐºÐ¾Ð½ÐºÑƒ
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

var nextTime = ['', '', '', '', '']; // Ð²Ñ€ÐµÐ¼ÐµÐ½Ð° Ð·Ð°Ñ…Ð¾Ð´Ð° Ð´Ð»Ñ ÐºÐ°Ð¶Ð´Ð¾Ð³Ð¾ Ð¸Ð· ÑÐ°Ð´Ð¾Ð²
/** Ð¿Ð¾Ð¸ÑÐº ÑÐ¾Ð·Ñ€ÐµÐ»Ñ‹Ñ… Ð¸ Ð½ÐµÐ¿Ð¾Ð»Ð¸Ñ‚Ñ‹Ñ… Ð¾Ð²Ð¾Ñ‰ÐµÐ¹ */
function findComplete()
{
	var i, L1, L2, f = w.garten.wrappedJSObject;
	var isIconBlink = 0;
	var tt1, tt2, min = -1, t = Math.round((new Date()).getTime() / 1000);
	t = 0 +
		w.Zeit.Client -
		w.Zeit.Verschiebung;
	L1 = L2 = 'Ð£';
	for (i = 1; i < f.garten_zeit.length; i++)
	{
		if (f.garten_kategorie[i] == 'z') continue; // Ð¿Ñ€Ð¾Ð¿ÑƒÑÐºÐ°ÐµÐ¼ Ð´ÐµÐºÐ¾Ñ€
		if (f.garten_kategorie[i] == 'u') continue; // Ð¿Ñ€Ð¾Ð¿ÑƒÑÐºÐ°ÐµÐ¼ ÐºÐ°Ð¼Ð½Ð¸
		// ÑƒÑ€Ð¾Ð¶Ð°Ð¹ ÑÐ¾Ð·Ñ€ÐµÐ»
		tt1 = f.garten_zeit[i] - t;
		if (tt1 < 0) isIconBlink++;
		else
		{
			if (min == -1 || tt1 < min) { L1 = 'Ð£'; min = tt1; }
			// Ð½Ð°Ð´Ð¾ Ð¿Ð¾Ð»Ð¸Ð²Ð°Ñ‚ÑŒ
			tt2 = f.garten_wasser[i] - t + 24*3600;
			if (tt2 < min) { L1 = 'ÐŸ'; min = tt2; }
			if (tt2 < 0) isIconBlink++;
		}
	}
	// Ð¿Ð¸ÑˆÐµÐ¼ Ð²Ñ€ÐµÐ¼Ñ ÑÐ»ÐµÐ´ÑƒÑŽÑ‰ÐµÐ³Ð¾ Ð·Ð°Ñ…Ð¾Ð´Ð° Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ
	nextTime[getGardenNumber()] = !min ? '' :
		'&nbsp;'+formatTime(time() + min) + L1 +
		(isIconBlink ? -isIconBlink : '');
	// Ð²Ñ‹Ð´ÐµÐ»ÑÐµÐ¼ Ñ‡Ñ‚Ð¾ Ð½ÑƒÐ¶Ð½Ð¾ Ð¿Ð¾Ð»Ð¸Ð²Ð°Ñ‚ÑŒ/ÑÐ¾Ð±Ð¸Ñ€Ð°Ñ‚ÑŒ
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

/** Ð¿ÐµÑ€ÐµÐ²Ð¾Ð´ ÑÐºÑ€Ð¸Ð¿Ñ‚Ð° Ð½Ð° Ð´Ñ€ÑƒÐ³Ð¸Ðµ ÑÐ·Ñ‹ÐºÐ¸ */
function chooseLanguage()
{
	try {
	switch (getServer().replace(/\d+/, ''))
	{
		case 'bg': // @translator nagets5879 <nagets5879@ya.ru>
			// Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ‚Ñ‹
				PRODUCTS[20][PN] = 'ÐÑÐ¿ÐµÑ€Ð¶Ð°';
				PRODUCTS[34][PN] = 'Ð‘Ð¾Ñ€Ð¾Ð²Ð¸Ð½ÐºÐ°';
				PRODUCTS[70][PN] = 'Ð‘Ð¾ÑÐ¸Ð»ÐµÐº';
				PRODUCTS[33][PN] = 'Ð‘Ñ€Ð¾ÐºÐ¾Ð»';
				PRODUCTS[58][PN] = 'Ð“ÐµÑ€Ð±ÐµÑ€';
				PRODUCTS[67][PN] = 'Ð“Ñ€Ð¾Ð·Ð´Ðµ';
				PRODUCTS[69][PN] = 'Ð“ÑŠÐ±Ð°';
				PRODUCTS[ 5][PN] = 'Ð”Ð¾Ð¼Ð°Ñ‚';
				PRODUCTS[17][PN] = 'Ð–ÑŠÐ»Ñ‚Ð° ÑÐ»Ð¸Ð²Ð°';
				PRODUCTS[72][PN] = 'ÐšÐ°ÐºÐ°Ð¾';
				PRODUCTS[22][PN] = 'ÐšÐ°Ñ€Ñ‚Ð¾Ñ„';
				PRODUCTS[32][PN] = 'ÐšÐ°Ñ€Ñ„Ð¸Ð¾Ð»';
				PRODUCTS[64][PN] = 'ÐšÐ°Ñ„Ðµ';
				PRODUCTS[12][PN] = 'ÐšÑ€Ð°ÑÑ‚Ð°Ð²Ð¸Ñ†Ð°';
				PRODUCTS[21][PN] = 'ÐšÑ€ÑƒÑˆÐ°';
				PRODUCTS[ 8][PN] = 'ÐšÑŠÐ¿Ð¸Ð½Ð°';
				PRODUCTS[59][PN] = 'Ð›Ð°Ð²Ð°Ð½Ð´ÑƒÐ»Ð°';
				PRODUCTS[60][PN] = 'Ð›Ð°Ð»Ðµ';
				PRODUCTS[51][PN] = 'Ð›Ð¸Ð»Ð¸Ñ';
				PRODUCTS[68][PN] = 'Ð›Ð¸Ð¼Ð¾Ð½';
				PRODUCTS[ 9][PN] = 'Ð›ÑƒÐº';
				PRODUCTS[10][PN] = 'ÐœÐ°Ð»Ð¸Ð½Ð°';
				PRODUCTS[ 2][PN] = 'ÐœÐ°Ñ€ÑƒÐ»Ñ';
				PRODUCTS[55][PN] = 'ÐœÐ°ÑÐ»Ð¸Ð½Ð°';
				PRODUCTS[52][PN] = 'ÐœÐµÑ‚Ð»Ð¸Ñ‡Ð¸Ð½Ð°';
				PRODUCTS[54][PN] = 'ÐœÐ¸Ð½Ð·ÑƒÑ…Ð°Ñ€';
				PRODUCTS[ 6][PN] = 'ÐœÐ¾Ñ€ÐºÐ¾Ð²';
				PRODUCTS[49][PN] = 'ÐÐµÐ²ÐµÐ½';
				PRODUCTS[19][PN] = 'ÐžÑ€ÐµÑ…';
				PRODUCTS[53][PN] = 'ÐžÑ€Ñ…Ð¸Ð´ÐµÑ';
				PRODUCTS[ 7][PN] = 'ÐŸÐ°Ñ‚Ð»Ð°Ð´Ð¶Ð°Ð½';
				PRODUCTS[71][PN] = 'ÐŸÐ¾Ñ€Ñ‚Ð¾ÐºÐ°Ð»';
				PRODUCTS[14][PN] = 'Ð ÐµÐ¿Ð¸Ñ‡ÐºÐ°';
				PRODUCTS[50][PN] = 'Ð Ð¾Ð·a';
				PRODUCTS[13][PN] = 'Ð¡Ð»Ð¸Ð²Ð°';
				PRODUCTS[48][PN] = 'Ð¡Ð»ÑŠÐ½Ñ‡Ð¾Ð³Ð»ÐµÐ´';
				PRODUCTS[36][PN] = 'Ð¡Ð¿Ð°Ð½Ð°Ðº';
				PRODUCTS[18][PN] = 'Ð¢Ð¸ÐºÐ²Ð°';
				PRODUCTS[16][PN] = 'Ð¢Ð¸ÐºÐ²Ð¸Ñ‡ÐºÐ°';
				PRODUCTS[61][PN] = 'Ð¦Ð²ÐµÑ‚Ð½Ð¾ Ð·ÐµÐ»Ðµ';
				PRODUCTS[11][PN] = 'Ð§ÐµÑ€Ð²ÐµÐ½ ÐºÐ°ÑÐ¸Ñ';
				PRODUCTS[ 1][PN] = 'Ð§ÐµÑ€ÐµÑˆÐ°';
				PRODUCTS[35][PN] = 'Ð§ÐµÑÑŠÐ½';
				PRODUCTS[15][PN] = 'Ð§ÑƒÑˆÐºÐ°';
				PRODUCTS[ 4][PN] = 'Ð¯Ð±ÑŠÐ»ÐºÐ°';
				PRODUCTS[ 3][PN] = 'Ð¯Ð³Ð¾Ð´Ð°';
			// Ð´ÐµÐºÐ¾Ñ€
				PRODUCTS[ 96][PN] = 'Ð‘Ð°Ñ€Ð±ÐµÐºÑŽ';
				PRODUCTS[102][PN] = 'Ð“Ð¾Ð»ÑÐ¼ Ð¿Ð¾Ð´Ð°Ñ€ÑŠÐº';
				PRODUCTS[ 99][PN] = 'Ð“Ð¾Ð»ÑÐ¼ ÑÐ²ÐµÑ‰Ð½Ð¸Ðº';
				PRODUCTS[ 44][PN] = 'Ð”ÐµÐº. Ð´Ð¶ÑƒÐ´Ð¶ÐµÑ‚Ð°';
				PRODUCTS[ 25][PN] = 'Ð”ÐµÐº. ÐºÐ°Ð¼ÑŠÑ‡Ðµ';
				PRODUCTS[ 38][PN] = 'Ð”Ð·ÐµÐ½ Ð³Ñ€Ð°Ð´Ð¸Ð½Ð°';
				PRODUCTS[ 47][PN] = 'Ð”ÑŠÑ€Ð²ÐµÐ½Ð° Ñ‚Ð¾Ð¿ÐºÐ°';
				PRODUCTS[ 39][PN] = 'Ð•Ð·ÐµÑ€Ñ†Ðµ';
				PRODUCTS[ 37][PN] = 'Ð—Ð¾Ð½Ð° Ð·Ð° ÑÐµÐ´ÐµÐ½Ðµ';
				PRODUCTS[ 23][PN] = 'Ð˜Ð·Ð²Ð¾Ñ€1';
				PRODUCTS[ 24][PN] = 'Ð˜Ð·Ð²Ð¾Ñ€2';
				PRODUCTS[100][PN] = 'Ð˜Ð¼ÐµÐ»';
				PRODUCTS[ 40][PN] = 'ÐšÑ€ÑŠÐ³ Ð¾Ñ‚ ÐºÐ°Ð¼ÑŠÐº';
				PRODUCTS[ 93][PN] = 'Ð›ÑŽÐ»ÐºÐ°';
				PRODUCTS[101][PN] = 'ÐœÐ°Ð»ÑŠÐº Ð¿Ð¾Ð´Ð°Ñ€ÑŠÐº';
				PRODUCTS[103][PN] = 'ÐœÐ°Ð»ÑŠÐº ÑÐ²ÐµÑ‰Ð½Ð¸Ðº';
				PRODUCTS[ 56][PN] = 'ÐžÐ³Ð½Ð¸Ñ‰Ðµ';
				PRODUCTS[ 94][PN] = 'ÐŸÐµÐ¹ÐºÐ°';
				PRODUCTS[ 57][PN] = 'ÐŸÐ»Ð°ÑˆÐ¸Ð»Ð¾';
				PRODUCTS[ 63][PN] = 'ÐŸÑŠÑ€Ð·Ð°Ð»ÐºÐ°';
				PRODUCTS[ 26][PN] = 'ÐŸÑŠÑ‚ÐµÐºÐ°1';
				PRODUCTS[ 27][PN] = 'ÐŸÑŠÑ‚ÐµÐºÐ°2';
				PRODUCTS[ 28][PN] = 'ÐŸÑŠÑ‚ÐµÐºÐ°3';
				PRODUCTS[ 46][PN] = 'ÐŸÑŠÑ‚ÐµÐºÐ°4';
				PRODUCTS[ 62][PN] = 'ÐŸÑÑÑŠÑ‡Ð½Ð¸Ðº';
				PRODUCTS[ 95][PN] = 'Ð¥Ð°Ð»Ñ„Ð¿Ð°Ð¹Ð¿';
				PRODUCTS[ 29][PN] = 'Ð§Ð°Ð´ÑŠÑ€1';
				PRODUCTS[ 30][PN] = 'Ð§Ð°Ð´ÑŠÑ€2';
				PRODUCTS[ 31][PN] = 'Ð§Ð°Ð´ÑŠÑ€3';
			// ÑƒÑ€Ð¾Ð²Ð½Ð¸
				LEVELS = ['???'
				,/* 1*/'Ð¡Ð°Ð»Ð°Ñ‚ÐºÐ¾'
				,/* 2*/'ÐŸÑ€Ð¾Ð´Ð°Ð²Ð°Ñ‡'
				,/* 3*/'Ð”Ð¾Ð¼Ð°Ñ‚Ð¸ÑÑ‚'
				,/* 4*/'Ð›ÑƒÑ‡ÐµÐ½ Ð³Ð¸Ð´'
				,/* 5*/'Ð–ÑŠÑ‚Ð²Ð°Ñ€'
				,/* 6*/'ÐšÐ°Ñ€Ñ‚Ð¾Ñ„Ð½Ð¸Ðº'
				,/* 7*/'ÐŸÐ»ÐµÐ²ÐµÐ»Ð¾Ð²'
				,/* 8*/'ÐšÑŠÑ€Ñ‚Ð¸Ñ†Ð¾Ð»Ð¾Ð²ÐµÑ†'
				,/* 9*/'Ð§Ð°ÑÑ‚Ð½Ð¸Ðº'
				,/*10*/'Ð‘Ð¾Ñ€Ð›Ð¾Ñ€Ð´'
				,/*11*/'ÐŸÐ»Ð°ÑˆÐ¸Ð»Ð¾'
				,/*12*/'Ð Ð¾Ð·ÐšÐ°Ð²Ð°Ð»ÐµÑ€'
				,/*13*/'Ð—ÐµÐ»ÐµÐ½ Ð³ÑƒÑ€Ñƒ'
				,/*14*/'Ð§ÐµÑ€ÐµÑˆÐºÐ¾'
				,/*15*/'Ð¦Ð²ÐµÑ‚Ð½Ð° Ñ„ÐµÑ'
				,/*16*/'Ð›ÐµÑˆÐ½Ð¸ÐºÐ¾Ñ‚Ñ€Ð¾ÑˆÐ°Ñ‡'
				,/*17*/'Ð¨ÐµÑ„ Ð½Ð° Ð»Ð¸Ð»Ð¸Ð¸Ñ‚Ðµ'
				,/*18*/'ÐžÑ€Ñ…Ð¸Ð´ÐµÐ¹Ð½Ð¸Ðº'
				,/*19*/'Ð¦Ð°Ñ€ ÐœÐ¸Ð½Ð·ÑƒÑ…Ð°Ñ€'
				,/*20*/'ÐŸÐ»ÐµÐ²ÐµÐ»Ð¾Ð±Ð¾Ñ€ÐµÑ†'
				,/*21*/'Ð¤Ð¾Ñ‚Ð¾ÑÐ¸Ð½Ñ‚ÐµÐ·Ð°'
				,/*22*/'Ð—ÐµÐ»ÐµÐ½ Ð˜Ð¼Ð¿ÐµÑ€Ð°Ñ‚Ð¾Ñ€']
			// Ñ„Ñ€Ð°Ð·Ñ‹
				LNG_MARKET_DEL_FILTER = 'Ð˜Ð·Ñ‚Ñ€Ð¸Ð¹ Ñ„Ð¸Ð»Ñ‚ÑŠÑ€';
				LNG_MARKET_BACK       = ' Ð½Ð°Ð·Ð°Ð´';
				LNG_MARKET_BUY        = 'Ð—Ð°ÐºÑƒÐ¿Ð¸|ÑÐºÑŠÐ¿Ð¾';
				LNG_STATUS_MONEY      = 'ÐŸÐ°Ñ€Ð¸';
				LNG_STATUS_LEVEL      = 'ÐÐ¸Ð²Ð¾';
				LNG_STATUS_SCORE      = 'Ð¢Ð¾Ñ‡ÐºÐ¸';
				LNG_QUEST             = 'ÐœÐ¸ÑÐ¸Ñ';
				LNG_QUEST_NO          = 'ÐÑÐ¼Ð° Ð¼Ð¸ÑÐ¸Ñ';
				LNG_BTN_HELP          = 'ÐŸÐ¾Ð¼Ð¾Ñ‰';
				LNG_BTN_PLANT         = 'ÐŸÐ¾ÑÐµÐ¹';
				LNG_BTN_WATER         = 'ÐŸÐ¾Ð»ÐµÐ¹';
				LNG_PROD_REST         = 'Ð¾ÑÑ‚.';
				LNG_WITH_PROD_IN_RACK = 'Ð¡ Ð¾Ð³Ð»ÐµÐ´ Ð½Ð° Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ‚Ð¸Ñ‚Ðµ Ð½Ð° Ñ€Ð°Ñ„Ñ‚Ð°';
				LNG_BUY_IN_SHOP       = 'ÐšÑƒÐ¿Ð¸ Ð² Ð¼Ð°Ð³Ð°Ð·Ð¸Ð½Ð°">[ ÐšÐ’Ðœ ]';
				LNG_NEW_VERSION       = 'ÐÐ¾Ð²Ð° Ð²ÐµÑ€ÑÐ¸Ñ Ð½Ð° ÑÐºÑ€Ð¸Ð¿Ñ‚Ð°. Ð˜ÑÐºÐ°Ñ‚Ðµ Ð»Ð¸ Ð´Ð° Ð¸Ð·Ñ‚ÐµÐ³Ð»Ð¸Ñ‚Ðµ?';
				LNG_PRODUCTS          = 'Products';
				LNG_CLEAR             = 'Clear';
			break;
		case 'de':
			// Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ‚Ñ‹
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
				PRODUCTS[18][PN] = 'KÃ¼rbis';
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
			// Ð´ÐµÐºÐ¾Ñ€
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
			// ÑƒÑ€Ð¾Ð²Ð½Ð¸
				LEVELS = ['???'
				,/* 1*/'Salatschleuderer'
				,/* 2*/'ErbsenzÃ¤hler'
				,/* 3*/'Tomatendealer'
				,/* 4*/'Zwiebeltreter'
				,/* 5*/'Erntehelfer'
				,/* 6*/'KartoffelschÃ¤ler'
				,/* 7*/'GrÃ¼nzeugvertreter'
				,/* 8*/'MaulwurfjÃ¤ger'
				,/* 9*/'KleingÃ¤rtner'
				,/*10*/'Blaubeerbaron'
				,/*11*/'Vogelscheucher'
				,/*12*/'Rosenkavalier'
				,/*13*/'GemÃ¼seguru'
				,/*14*/'Kirschkernspucker'
				,/*15*/'ZaunkÃ¶nig'
				,/*16*/'WalnusswÃ¤chter'
				,/*17*/'Lilienlobbyist'
				,/*18*/'OrchideenzÃ¼chter'
				,/*19*/'Krokuspokus'
				,/*20*/'Unkrautschreck'
				,/*21*/'Gerberagerber'
				,/*22*/'Wurzelimperator']
			// Ñ„Ñ€Ð°Ð·Ñ‹
				LNG_MARKET_DEL_FILTER = 'Filter lÃ¶schen';
				LNG_MARKET_BACK       = ' zurÃ¼ck';
				LNG_MARKET_BUY        = 'kaufen|zu teuer';
				LNG_STATUS_MONEY      = 'Bar';
				LNG_STATUS_LEVEL      = 'Level';
				LNG_STATUS_SCORE      = 'Punkte';
				LNG_QUEST             = 'Quest';
				LNG_QUEST_NO          = 'Keine quest';
				LNG_BTN_HELP          = 'Hilfe';
				LNG_BTN_PLANT         = 'Ernten';
				LNG_BTN_WATER         = 'WÃ¤ssern';
				LNG_PROD_REST         = 'Rest';
				LNG_WITH_PROD_IN_RACK = 'Basierte Produkte im Regal';
				LNG_BUY_IN_SHOP       = 'Kaufen Sie im Shop">[ KSS ]';
				LNG_NEW_VERSION       = 'VerÃ¶ffentlichte eine neue Version des Skripts. Aktualisieren mÃ¶chten?';
				LNG_PRODUCTS          = 'Products';
				LNG_CLEAR             = 'Clear';
			break;
		case 'es':
			// Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ‚Ñ‹
				PRODUCTS[55][PN] = 'Aceituna';
				PRODUCTS[52][PN] = 'Aciano';
				PRODUCTS[35][PN] = 'Ajo';
				PRODUCTS[34][PN] = 'ArÃ¡ndano';
				PRODUCTS[54][PN] = 'Azafran';
				PRODUCTS[ 7][PN] = 'Berenjena';
				PRODUCTS[33][PN] = 'BrÃ³coli';
				PRODUCTS[64][PN] = 'CafÃ©';
				PRODUCTS[16][PN] = 'CalabacÃ­n';
				PRODUCTS[18][PN] = 'Calabaza';
				PRODUCTS[49][PN] = 'CalÃ©ndula';
				PRODUCTS[ 9][PN] = 'Cebolla';
				PRODUCTS[ 1][PN] = 'Cereza';
				PRODUCTS[13][PN] = 'Ciruela';
				PRODUCTS[17][PN] = 'Ciruela amarilla';
				PRODUCTS[32][PN] = 'Coliflor';
				PRODUCTS[36][PN] = 'Espinaca';
				PRODUCTS[20][PN] = 'EspÃ¡rrago';
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
				PRODUCTS[53][PN] = 'OrquÃ­dea';
				PRODUCTS[22][PN] = 'Patata';
				PRODUCTS[12][PN] = 'Pepino';
				PRODUCTS[21][PN] = 'Pera';
				PRODUCTS[15][PN] = 'Pimiento';
				PRODUCTS[14][PN] = 'Rabanito';
				PRODUCTS[50][PN] = 'Rosa';
				PRODUCTS[ 5][PN] = 'Tomate';
				PRODUCTS[60][PN] = 'TulipÃ¡n';
				PRODUCTS[ 6][PN] = 'Zanahoria';
			// Ð´ÐµÐºÐ¾Ñ€
				PRODUCTS[37][PN] = 'Asientos';
				PRODUCTS[47][PN] = 'Bolas de madera';
				PRODUCTS[62][PN] = 'CajÃ³n de arena';
				PRODUCTS[26][PN] = 'Camino1';
				PRODUCTS[27][PN] = 'Camino2';
				PRODUCTS[28][PN] = 'Camino3';
				PRODUCTS[46][PN] = 'Camino4';
				PRODUCTS[40][PN] = 'CÃ­rculo de piedras';
				PRODUCTS[44][PN] = 'Enanito de adorno';
				PRODUCTS[57][PN] = 'EspantapÃ¡jaros';
				PRODUCTS[39][PN] = 'Estanque';
				PRODUCTS[56][PN] = 'Fogata';
				PRODUCTS[23][PN] = 'Fuente1';
				PRODUCTS[24][PN] = 'Fuente2';
				PRODUCTS[38][PN] = 'JardÃ­n zen';
				PRODUCTS[29][PN] = 'PabellÃ³n1';
				PRODUCTS[30][PN] = 'PabellÃ³n2';
				PRODUCTS[31][PN] = 'PabellÃ³n3';
				PRODUCTS[25][PN] = 'Piedras de adorno';
				PRODUCTS[63][PN] = 'TobogÃ¡n';
			// ÑƒÑ€Ð¾Ð²Ð½Ð¸
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
				,/*10*/'BarÃ³n de arÃ¡ndano'
				,/*11*/'EspantapÃ¡jaros'
				,/*12*/'Caballero de la rosa'
				,/*13*/'Guru verdulero'
				,/*14*/'Escupidor de cerezas'
				,/*15*/'Reyezuelo'
				,/*16*/'Vigilante de nueces'
				,/*17*/'Cabildero de lirios'
				,/*18*/'Cultivador de orquÃ­deas'
				,/*19*/'Loco de croco'
				,/*20*/'Vencedor de maleza'
				,/*21*/'Lavador de lavanda'
				,/*22*/'Emperador jardinero']
			// Ñ„Ñ€Ð°Ð·Ñ‹
				LNG_MARKET_DEL_FILTER = 'Eliminar';
				LNG_MARKET_BACK       = ' atrÃ¡s';
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
				LNG_BUY_IN_SHOP       = 'Comprar tienda">[ Ð¡T ]';
				LNG_NEW_VERSION       = 'Una nueva versiÃ³n del guiÃ³n. Si desea descargar?';
				LNG_PRODUCTS          = 'Products';
				LNG_CLEAR             = 'Clear';
			break;
		case 'hu':
			// Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ‚Ñ‹
				PRODUCTS[34][PN] = 'Ãfonya';
				PRODUCTS[ 4][PN] = 'Alma';
				PRODUCTS[52][PN] = 'BÃºzavirÃ¡g';
				PRODUCTS[33][PN] = 'Brokkoli';
				PRODUCTS[ 1][PN] = 'Cseresznye';
				PRODUCTS[16][PN] = 'CukkÃ­ni';
				PRODUCTS[19][PN] = 'DiÃ³';
				PRODUCTS[35][PN] = 'Fokhagyma';
				PRODUCTS[58][PN] = 'Gerbera';
				PRODUCTS[ 9][PN] = 'Hagyma';
				PRODUCTS[64][PN] = 'KÃ¡vÃ©';
				PRODUCTS[32][PN] = 'Karfiol';
				PRODUCTS[49][PN] = 'KÃ¶rÃ¶mvirÃ¡g';
				PRODUCTS[21][PN] = 'KÃ¶rte';
				PRODUCTS[22][PN] = 'Krumpli';
				PRODUCTS[59][PN] = 'Levendula';
				PRODUCTS[51][PN] = 'Liliom';
				PRODUCTS[10][PN] = 'MÃ¡lna';
				PRODUCTS[48][PN] = 'NapraforgÃ³';
				PRODUCTS[55][PN] = 'Oliva';
				PRODUCTS[53][PN] = 'Orchidea';
				PRODUCTS[ 7][PN] = 'PadlizsÃ¡n';
				PRODUCTS[15][PN] = 'Paprika';
				PRODUCTS[ 5][PN] = 'Paradicsom';
				PRODUCTS[50][PN] = 'RÃ³zsa';
				PRODUCTS[14][PN] = 'Retek';
				PRODUCTS[11][PN] = 'Ribizli';
				PRODUCTS[54][PN] = 'SÃ¡frÃ¡ny';
				PRODUCTS[ 6][PN] = 'SÃ¡rgarÃ©pa';
				PRODUCTS[17][PN] = 'SÃ¡rgaszilva';
				PRODUCTS[ 2][PN] = 'SalÃ¡ta';
				PRODUCTS[20][PN] = 'SpÃ¡rga';
				PRODUCTS[36][PN] = 'SpenÃ³t';
				PRODUCTS[ 3][PN] = 'SzamÃ³ca';
				PRODUCTS[ 8][PN] = 'Szeder';
				PRODUCTS[13][PN] = 'Szilva';
				PRODUCTS[18][PN] = 'TÃ¶k';
				PRODUCTS[60][PN] = 'TulipÃ¡n';
				PRODUCTS[12][PN] = 'Uborka';
				PRODUCTS[61][PN] = 'VÃ¶rÃ¶skÃ¡poszta';
			// Ð´ÐµÐºÐ¾Ñ€
				PRODUCTS[26][PN] = '1. szÃ¡mÃº jÃ¡rda';
				PRODUCTS[23][PN] = '1. szÃ¡mÃº kÃºt';
				PRODUCTS[29][PN] = '1. szÃ¡mÃº pavilon';
				PRODUCTS[27][PN] = '2. szÃ¡mÃº jÃ¡rda';
				PRODUCTS[24][PN] = '2. szÃ¡mÃº kÃºt';
				PRODUCTS[30][PN] = '2. szÃ¡mÃº pavilon';
				PRODUCTS[28][PN] = '3. szÃ¡mÃº jÃ¡rda';
				PRODUCTS[31][PN] = '3. szÃ¡mÃº pavilon';
				PRODUCTS[46][PN] = '4. szÃ¡mÃº jÃ¡rda';
				PRODUCTS[63][PN] = 'CsÃºszda';
				PRODUCTS[25][PN] = 'DÃ­szkÅ‘';
				PRODUCTS[47][PN] = 'FagolyÃ³';
				PRODUCTS[62][PN] = 'HomokozÃ³';
				PRODUCTS[40][PN] = 'KÅ‘kereszt';
				PRODUCTS[44][PN] = 'KertitÃ¶rpe';
				PRODUCTS[57][PN] = 'MadÃ¡rijesztÅ‘';
				PRODUCTS[39][PN] = 'TÃ³';
				PRODUCTS[56][PN] = 'TÅ±zrakÃ³hely';
				PRODUCTS[37][PN] = 'ÃœlÅ‘sarok';
				PRODUCTS[38][PN] = 'Zen-kert';
			// ÑƒÑ€Ð¾Ð²Ð½Ð¸
				LEVELS = ['???'
				,/* 1*/'SalÃ¡tadobÃ¡lÃ³'
				,/* 2*/'Retkesgazda'
				,/* 3*/'ParadicsomdÃ­ler'
				,/* 4*/'HagymataposÃ³'
				,/* 5*/'AratÃ³segÃ©d'
				,/* 6*/'KrumplihÃ¡mozÃ³'
				,/* 7*/'ZÃ¶ldsÃ©gÃ¼gynÃ¶k'
				,/* 8*/'VakondvadÃ¡sz'
				,/* 9*/'KiskertÃ©sz'
				,/*10*/'ÃfonyabÃ¡rÃ³'
				,/*11*/'MadÃ¡rijesztÅ‘'
				,/*12*/'RÃ³zsalovag'
				,/*13*/'ZÃ¶ldsÃ©gguru'
				,/*14*/'MeggymagkÃ¶pÅ‘'
				,/*15*/'KerÃ­tÃ©skirÃ¡ly'
				,/*16*/'DiÃ³csÅ‘sz'
				,/*17*/'Liliom-lobbista'
				,/*18*/'Orchideagazda'
				,/*19*/'SÃ¡frÃ¡nysÃ¡rkÃ¡ny'
				,/*20*/'Gyomok rÃ©me'
				,/*21*/'GerberatÃ­mÃ¡r'
				,/*22*/'KertkirÃ¡ly']
			// Ñ„Ñ€Ð°Ð·Ñ‹
				LNG_MARKET_DEL_FILTER = 'SzÅ±rÅ‘';
				LNG_MARKET_BACK       = ' vissza';
				LNG_MARKET_BUY        = 'vÃ¡sÃ¡rlÃ¡s|demansiado';
				LNG_STATUS_MONEY      = 'KÃ©szpÃ©nz';
				LNG_STATUS_LEVEL      = 'Szint';
				LNG_STATUS_SCORE      = 'PontszÃ¡m';
				LNG_QUEST             = 'Quest';
				LNG_QUEST_NO          = 'Keine quest';
				LNG_BTN_HELP          = 'SegÃ­tsÃ©g';
				LNG_BTN_PLANT         = 'ÃœltetÃ©s';
				LNG_BTN_WATER         = 'Pour';
				LNG_PROD_REST         = 'mÃ©rleg';
				LNG_WITH_PROD_IN_RACK = 'alapÃº termÃ©kek a polcokon';
				LNG_BUY_IN_SHOP       = 'buy vÃ¡r">[ BV ]';
				LNG_NEW_VERSION       = 'Az Ãºj vÃ¡ltozat a szkript. SzeretnÃ©nk letÃ¶lteni?';
				LNG_PRODUCTS          = 'TermÃ©kek';
				LNG_CLEAR             = 'Tiszta';
			break;
		case 'nl': // @translator Cocky Cwiek <cockycwiek@gmail.com>
			// Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ‚Ñ‹
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
				PRODUCTS[53][PN] = 'OrchideeÃ«n';
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
			// Ð´ÐµÐºÐ¾Ñ€
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
			// ÑƒÑ€Ð¾Ð²Ð½Ð¸
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
				,/*18*/'OrchideeÃ«n kweker'
				,/*19*/'Krokus pocus'
				,/*20*/'Onkruid verdelger'
				,/*21*/'Lavendel Tender'
				,/*22*/'Molehill Emperor']
			// Ñ„Ñ€Ð°Ð·Ñ‹
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
			// Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ‚Ñ‹
				PRODUCTS[34][PN] = 'Afine';
				PRODUCTS[52][PN] = 'AlbÃ£striÅ£Ã£';
				PRODUCTS[15][PN] = 'Ardei';
				PRODUCTS[20][PN] = 'Asparagus';
				PRODUCTS[54][PN] = 'BrÃ¢nduÅŸe';
				PRODUCTS[33][PN] = 'Broccoli';
				PRODUCTS[ 3][PN] = 'CÃ£pÅŸuni';
				PRODUCTS[64][PN] = 'Cafea';
				PRODUCTS[22][PN] = 'Cartofi';
				PRODUCTS[12][PN] = 'CastraveÅ£i';
				PRODUCTS[ 9][PN] = 'CeapÃ£';
				PRODUCTS[11][PN] = 'CoacÃ£ze RoÅŸii';
				PRODUCTS[32][PN] = 'ConopidÃ£';
				PRODUCTS[51][PN] = 'Crini';
				PRODUCTS[16][PN] = 'Dovlecel';
				PRODUCTS[18][PN] = 'Dovleci';
				PRODUCTS[48][PN] = 'Floarea-Soarelui';
				PRODUCTS[49][PN] = 'GÃ£lbenele';
				PRODUCTS[58][PN] = 'Gerbera';
				PRODUCTS[60][PN] = 'Lalele';
				PRODUCTS[59][PN] = 'LevÃ£nÅ£icÃ£';
				PRODUCTS[55][PN] = 'MÃ£sline';
				PRODUCTS[ 4][PN] = 'Mere';
				PRODUCTS[ 6][PN] = 'Morcovi';
				PRODUCTS[ 8][PN] = 'Mure';
				PRODUCTS[19][PN] = 'Nuci';
				PRODUCTS[53][PN] = 'Orhidee';
				PRODUCTS[21][PN] = 'Pere';
				PRODUCTS[13][PN] = 'Prune';
				PRODUCTS[17][PN] = 'Prune Galbene';
				PRODUCTS[14][PN] = 'Ridichi';
				PRODUCTS[ 5][PN] = 'RoÅŸii';
				PRODUCTS[ 2][PN] = 'SalatÃ£';
				PRODUCTS[36][PN] = 'Spanac';
				PRODUCTS[50][PN] = 'Trandafiri';
				PRODUCTS[35][PN] = 'Usturoi';
				PRODUCTS[61][PN] = 'VarzÃ£ RoÅŸie';
				PRODUCTS[ 1][PN] = 'ViÅŸine';
				PRODUCTS[ 7][PN] = 'Vinete';
				PRODUCTS[10][PN] = 'ZmeurÃ£';
			// Ð´ÐµÐºÐ¾Ñ€
				PRODUCTS[47][PN] = 'Bile din Lemn';
				PRODUCTS[40][PN] = 'Cerc de Pietre';
				PRODUCTS[62][PN] = 'Cutie cu Nisip';
				PRODUCTS[23][PN] = 'FÃ¢ntÃ¢nÃ£ 1';
				PRODUCTS[24][PN] = 'FÃ¢ntÃ¢nÃ£ 2';
				PRODUCTS[38][PN] = 'GrÃ£dinÃ£ Zen';
				PRODUCTS[56][PN] = 'GroapÃ£ pentru Foc';
				PRODUCTS[39][PN] = 'Lac';
				PRODUCTS[37][PN] = 'Loc de stat jos';
				PRODUCTS[29][PN] = 'Pavilion 1';
				PRODUCTS[30][PN] = 'Pavilion 2';
				PRODUCTS[31][PN] = 'Pavilion 3';
				PRODUCTS[25][PN] = 'Pietre decorative';
				PRODUCTS[44][PN] = 'Pitici de grÃ£dinÃ£';
				PRODUCTS[26][PN] = 'PotecÃ£ 1';
				PRODUCTS[27][PN] = 'PotecÃ£ 2';
				PRODUCTS[28][PN] = 'PotecÃ£ 3';
				PRODUCTS[46][PN] = 'PotecÃ£ 4';
				PRODUCTS[57][PN] = 'Sperietoare';
				PRODUCTS[63][PN] = 'Tobogan';
			// ÑƒÑ€Ð¾Ð²Ð½Ð¸
				LEVELS = ['???'
				,/* 1*/'Filator de SalatÃ£'
				,/* 2*/'SeminÅ£ar'
				,/* 3*/'Furnizor de RoÅŸii'
				,/* 4*/'Cojitor de CeapÃ£'
				,/* 5*/'Ajutor de RecoltÃ£'
				,/* 6*/'Cojitor de Cartofi'
				,/* 7*/'PieÅ£ar'
				,/* 8*/'VÃ¢nÃ£tor de CÃ¢rtiÅ£e'
				,/* 9*/'GrÄƒdinar Amator'
				,/*10*/'Baron al Afinelor'
				,/*11*/'Sperietoare'
				,/*12*/'Maestru Trandafir'
				,/*13*/'Guru Zarzavagiu'
				,/*14*/'CireÅŸar'
				,/*15*/'ZÃ¢na Florilor'
				,/*16*/'Paznicul Nucilor'
				,/*17*/'Procurator de Crini'
				,/*18*/'StÄƒpÃ¢nul Orhideelor'
				,/*19*/'FilatorMÃ£slinar GrÃ£dinar'
				,/*20*/'Profesionist'
				,/*21*/'LevÃ£nÅ£icar'
				,/*22*/'ÃŽmpÃ£rat Molehill'];
			// Ñ„Ñ€Ð°Ð·Ñ‹
				LNG_MARKET_DEL_FILTER = 'Âªterge filtrare';
				LNG_MARKET_BACK       = 'Ã®napoi';
				LNG_MARKET_BUY        = 'cumpÃ£rÃ£|prea scump';
				LNG_STATUS_MONEY      = 'Bani';
				LNG_STATUS_LEVEL      = 'Nivel';
				LNG_STATUS_SCORE      = 'Scor';
				LNG_QUEST             = 'CÄƒutare';
				LNG_QUEST_NO          = 'Nu quest';
				LNG_BTN_HELP          = 'Ajutor';
				LNG_BTN_PLANT         = 'PlantÄƒ';
				LNG_BTN_WATER         = 'Turna';
				LNG_PROD_REST         = 'opri.';
				LNG_WITH_PROD_IN_RACK = 'Produse pe bazÄƒ de raft';
				LNG_BUY_IN_SHOP       = 'CumpÄƒra Ã®n magazin">[ CiM ]';
				LNG_NEW_VERSION       = 'Disponibile Ã®n noua versiune. DoriÅ£i sÄƒ actualizaÅ£i script-ul?';
				LNG_PRODUCTS          = 'Produse';
				LNG_CLEAR             = 'Curat';
			break;
	}
	}
	catch(e) { alert('Translate error: ' + e); }
	// ÑÐµÐ¼ÐµÑ‡ÐºÐ¸ Ð¿Ð¾ Ð½Ð°Ð·Ð²Ð°Ð½Ð¸ÑŽ
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

/** Ñ‡Ð¸Ñ‚Ð°ÐµÐ¼ Ð½Ð¾Ð¼ÐµÑ€ Ð²Ñ‹Ð¿Ð¾Ð»Ð½ÐµÐ½Ð½Ð¾Ð³Ð¾ ÐºÐ²ÐµÑÑ‚Ð° Ð² Ð¿Ð¾Ñ‡Ñ‚Ðµ */
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

/** ÑÑ‚Ñ€Ð¾ÐºÐ° Ñ Ñ‚ÐµÐºÑƒÑ‰Ð¸Ð¼ ÐºÐ²ÐµÑÑ‚Ð¾Ð¼ */
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
	st = n ? i ? '<s>'+LNG_QUEST+' '+n+'</s> Ð¸Ð· 78': LNG_QUEST+' '+n+' Ð¸Ð· 78' : LNG_QUEST_NO;
	st = '<a href="#quest"onclick="return openQuest()"style="'+style1+'">'+st+'</a> ';
	st = '<a href="#quest'+(n+1)+'"onclick="return showQuestLine('+(n+1)+','+maxEnd+')"style="'+style1+'"> &uarr; </a> ' + st;
	st = '<a href="#quest'+(n-1)+'"onclick="return showQuestLine('+(n-1)+','+maxEnd+')"style="'+style1+'"> &darr; </a> ' + st;
	var i, p, s, q = [];
	// ÐºÐ²ÐµÑÑ‚Ñ‹ 1..10
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
	// ÐºÐ²ÐµÑÑ‚Ñ‹ 11..20
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
	// ÐºÐ²ÐµÑÑ‚Ñ‹ 21..30
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
	// ÐºÐ²ÐµÑÑ‚Ñ‹ 31..40
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
	// ÐºÐ²ÐµÑÑ‚Ñ‹ 41..50
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
	// ÐºÐ²ÐµÑÑ‚Ñ‹ 51..60
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
	// ÐºÐ²ÐµÑÑ‚Ñ‹ 61..70
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
	// ÐºÐ²ÐµÑÑ‚Ñ‹ 71..78
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

/** Ð±Ñ‹ÑÑ‚Ñ€Ñ‹Ð¹ Ð¿ÐµÑ€ÐµÐ·Ð°Ñ…Ð¾Ð´ Ð² Ð´Ñ€ÑƒÐ³Ð¾Ð¹ Ð°ÐºÐºÐ°ÑƒÐ½Ñ‚ */
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

/** ÑÐ¾Ñ…Ñ€Ð°Ð½ÐµÐ½Ð¸Ðµ Ð»Ð¾Ð³Ð¸Ð½Ð° */
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

/** select - ÑÐ¿Ð¸ÑÐ¾Ðº Ð»Ð¾Ð³Ð¸Ð½Ð¾Ð² */
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
// Ð¾Ð±Ñ€Ð°Ð±Ð¾Ñ‚Ñ‡Ð¸ÐºÐ¸ Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹
//----------------------------------------------------------------
var L=''+document.location;

// Ð²Ñ‹ÑÑ‚Ð°Ð²Ð»ÑÐµÐ¼ Ð½ÑƒÐ¶Ð½Ñ‹Ð¹ ÑÐ·Ñ‹Ðº
chooseLanguage();

// Ð³Ð»Ð°Ð²Ð½Ð°Ñ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° -> Ð¾Ñ‚Ð¾Ð±Ñ€Ð°Ð¶Ð°ÐµÐ¼ Ð´Ð¾Ð¿Ð¾Ð»Ð½Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ðµ ÐºÐ½Ð¾Ð¿ÐºÐ¸
if (L.indexOf('main.php?page=garden') != -1)
{
	// Ð¾Ñ‚Ð·Ñ‹Ð²Ñ‹
//	if (getServer().replace(/\d+/, '') == 'ru')
//		addCommentButton('si');

	// Ð°Ð²Ñ‚Ð¾Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ
	GMHelper.updateScript();
	// Ð¿Ð¾Ð»ÑƒÑ‡Ð°ÐµÐ¼ ÑƒÑ€Ð¾Ð²ÐµÐ½ÑŒ Ð¸Ð³Ñ€Ð¾ÐºÐ°
	grabUserLevel();

	// Ð·Ð°Ð¿Ð¾Ð¼Ð¸Ð½Ð°Ð½Ð¸Ðµ Ð»Ð¾Ð³Ð¸Ð½Ð°
	saveLogin();

	// Ð´Ð¾Ð±Ð°Ð²Ð»ÑÐµÐ¼ Ð´Ð¾Ð¿Ð¾Ð»Ð½Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ðµ Ð¿Ð¾Ð»Ñ Ð² ÑÐµÐ¼ÐµÐ½Ð°
//	modifyRack();

	// ÐºÐ¾Ñ€Ñ€ÐµÐºÑ‚Ð¸Ñ€ÑƒÐµÐ¼ Ð³Ð»Ð°Ð²Ð½ÑƒÑŽ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ
	modifyMainPage();

	// Ð¿Ð¾Ð´ÑÐºÐ°Ð·ÐºÐ° Ð³Ð½Ð¾Ð¼Ð¸ÐºÐ°
	modifyGnomeTooltip();

	// Ð¾Ñ‚Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð¸Ðµ ÑÐµÐ¼ÐµÑ‡ÐºÐ¸ Ð½Ð° Ð¿Ð¾Ð»ÐºÐµ
//	modifyRackDesign();

	// Ð²Ñ‹Ð²Ð¾Ð´Ð¸Ð¼ ÐºÐ²ÐµÑÑ‚
	showQuestLine();

	// Ð¾Ð±Ð½Ð¾Ð²Ð»ÑÐµÐ¼ Ñ†ÐµÐ½Ñ‹ Ð½Ð° Ñ‚Ð¾Ð²Ð°Ñ€Ñ‹
	var prod, r = globObj('rackElement');
	for (prod in r)
	if (r[prod].id != undefined)
		checkPrice(r[prod]);

	// Ð¿Ð¾Ð¸ÑÐº ÑÐ¾Ð·Ñ€ÐµÐ»Ñ‹Ñ… Ð¸Ð»Ð¸ Ð½ÐµÐ¿Ð¾Ð»Ð¸Ñ‚Ñ‹Ñ… Ð¾Ð²Ð¾Ñ‰ÐµÐ¹
	setInterval(findComplete, 10*1000);
	w.findComplete = findComplete;
} else

// Ð¿Ð¾Ð»Ðµ Ñ Ð³Ñ€ÑÐ´ÐºÐ°Ð¼Ð¸
if (L.indexOf('garten_map.php') != -1)
{
	parent.wrappedJSObject.findComplete();
} else

// Ð¾Ð±Ñ‰Ð¸Ð¹ ÑÐ¿Ð¸ÑÐ¾Ðº Ñ‚Ð¾Ð²Ð°Ñ€Ð¾Ð²
if (L.indexOf('markt.php?show=overview') != -1)
{
	modifyMarketClose();
	// Ð¿Ð¾Ð´ÑÐ²ÐµÑ‡Ð¸Ð²Ð°ÐµÐ¼ Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ñ‹Ðµ Ð¾Ð²Ð¾Ñ‰Ð¸ Ð½Ð° Ñ‚ÐµÐºÑƒÑ‰ÐµÐ¼ ÑƒÑ€Ð¾Ð²Ð½Ðµ
	var i, name, p, r, reg=/v=(\d+)/, links = document.getElementsByTagName('A');
	for (i = 0; i < links.length; i++)
	{
		r = reg.exec(links[i].href); p = prod(r[1]);
		// Ð¿Ñ€Ð¸Ð³Ð»ÑƒÑˆÐ°ÐµÐ¼ Ð½ÐµÐ´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ñ‹Ðµ
		if (p.id == undefined) links[i].style.color = CL_BAD;
		else
		{
			// Ð²Ñ‹Ð´ÐµÐ»ÑÐµÐ¼ Ð½ÑƒÐ¶Ð½Ñ‹Ðµ ÑÐ¸Ð¼Ð¿Ð¸ÐºÐ°Ð¼
			if (p.need > p.number) links[i].style.color = CL_GOOD;
			// Ð¿Ð¸ÑˆÐµÐ¼ ÑÐºÐ¾Ð»ÑŒÐºÐ¾ Ñƒ Ð½Ð°Ñ ÐµÑÑ‚ÑŒ
			name = p.name.replace('Ñ†Ð²ÐµÑ‚Ð½Ð°Ñ', '').replace('Ð±Ð¾Ð»Ð³Ð°Ñ€ÑÐºÐ¸Ð¹', '').
				replace('ÐºÑ€Ð°ÑÐ½Ð¾ÐºÐ¾Ñ‡Ð°Ð½Ð½Ð°Ñ', 'ÐºÑ€.');
			links[i].innerHTML = name+', '+p.need+' / '+Math.round(p.number);
		}
	}
} else

// Ð¼Ð°Ð³Ð°Ð·Ð¸Ð½
if (L.indexOf('shop.php') != -1)
{
	modifyMarketClose();
} else

// Ð¿Ñ€Ð¾Ð´Ð°Ð¶Ð° Ñ‚Ð¾Ð²Ð°Ñ€Ð°
if (L.indexOf('marktstand.php') != -1)
{
	modifyMarketClose();
	// Ð²Ñ‹Ð±Ñ€Ð°Ð»Ð¸ Ð¾Ð²Ð¾Ñ‰ Ð½Ð° Ð¿Ñ€Ð¾Ð´Ð°Ð¶Ñƒ
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
	// Ð²Ð°Ð»Ð¸Ð´Ð°Ñ†Ð¸Ñ Ð¿Ð¾Ð»ÐµÐ¹ Ð¸ Ñ€Ð°ÑÑ‡ÐµÑ‚ Ñ€ÐµÐ½Ñ‚Ð°Ð±ÐµÐ»ÑŒÐ½Ð¾ÑÑ‚Ð¸
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
		$('verkaufe_markt').value = 'Ð¿Ñ€Ð¾Ð´Ð°Ñ‚ÑŒ Ð·Ð° '+sum+' ['+rent+']';
	}
} else

// ÑÐ¿Ð¸ÑÐ¾Ðº Ñ‚Ð¾Ð²Ð°Ñ€Ð¾Ð² -> ÑÐ¾Ñ…Ñ€Ð°Ð½ÑÐµÐ¼ Ñ‚ÐµÐºÑƒÑ‰ÑƒÑŽ Ñ†ÐµÐ½Ñƒ Ñ€Ñ‹Ð½ÐºÐ°
if (L.indexOf('markt.php') != -1)
{
	modifyMarketClose();
	// Ð¾Ð±Ð½Ð¾Ð²Ð»ÑÐµÐ¼ Ñ‚ÐµÐºÑƒÑ‰ÑƒÑŽ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ ÐºÐ°Ð¶Ð´Ñ‹Ðµ MARKET_UPTIME ÑÐµÐºÑƒÐ½Ð´
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
	div.innerHTML = '<a href="'+link+'">ÐÐ²Ñ‚Ð¾Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ</a>'+
		'';//'<a href="'+link.replace('auto_refresh', 'super')+'">Ð¡ÑƒÐ¿ÐµÑ€Ñ€Ñ‹Ð½Ð¾Ðº</a>';

	// ÑÑƒÐ¿ÐµÑ€Ñ€Ñ‹Ð½Ð¾Ðº
	if (L.indexOf('super') != -1) superMarket();

	var price, pr, page = document.body.innerHTML;
	// ÐµÑÐ»Ð¸ Ð½Ð°Ñ…Ð¾Ð´Ð¸Ð¼ÑÑ Ð½Ð° Ð³Ð»Ð°Ð²Ð½Ð¾Ð¹ Ð¸Ð»Ð¸ Ð½Ðµ Ð¿ÐµÑ€Ð²Ð¾Ð¹ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ - Ñ†ÐµÐ½Ñ‹ Ð½Ðµ Ð°Ð½Ð°Ð»Ð¸Ð·Ð¸Ñ€ÑƒÐµÐ¼
	var grabPrice = 1;
	if (0
		|| page.indexOf(LNG_MARKET_DEL_FILTER) == -1
		|| page.indexOf(LNG_MARKET_BACK) != -1
	)
	grabPrice = 0;

	var regexp = new RegExp(
		'"r">([\\' + globObj('_CURRENCY_1000') + '\\d]+)<'+
		'[^Â¯]+?link2">([^<]+)<'+
		'[^Â¯]+?([\\' + globObj('_CURRENCY_1000') + '\\d]+' + globObj('_CURRENCY_SEP') + '\\d+) '+
		'[^<]+<[^Â¯]+?(' + LNG_MARKET_BUY + ')', 'g');

	// ÑÑ‡Ð¸Ñ‚Ð°ÐµÐ¼ ÐºÐ¾Ð»-Ð²Ð¾ Ð¸ ÑÑƒÐ¼Ð¼Ñƒ Ñ‚Ð¾Ð²Ð°Ñ€Ð¾Ð², Ð¿Ð¾ÐºÐ° ÐºÐ¾Ð»-Ð²Ð¾ Ð¼ÐµÐ½ÑŒÑˆÐµ AVG_COUNT
	var N = 0; // ÑÐºÐ¾Ð»ÑŒÐºÐ¾ Ñ‚Ð¾Ð²Ð°Ñ€Ð¾Ð² Ð¼Ð¾Ð¶Ð½Ð¾ ÐºÑƒÐ¿Ð¸Ñ‚ÑŒ Ð½Ð° ÑÑ‚Ñƒ ÑÑƒÐ¼Ð¼Ñƒ
	var P = 0; // Ñ‚ÐµÐºÑƒÑ‰Ð°Ñ ÑÑƒÐ¼Ð¼Ð° Ð¿Ð¾ÐºÑƒÐ¿ÐºÐ¸
	var pcount, pprice, pname;
	while (1)
	{
		pr = regexp.exec(page);
		if (!pr) break;
		pcount = parseInt(pr[1].replace(/\D/g, ''));
		pname  = pr[2].replace('&nbsp;',' ');
		pprice = parseFloat(pr[3].replace(globObj('_CURRENCY_1000'),'').replace(globObj('_CURRENCY_SEP'),'.'));
		// Ð¿Ñ€Ð¸Ð³Ð»ÑƒÑˆÐ°ÐµÐ¼ Ð´Ð¾Ñ€Ð¾Ð³Ð¸Ðµ Ñ†ÐµÐ½Ñ‹
		if (pprice > prod(pname).p_shop)
			page = page.replace(new RegExp('>'+pr[3]+' ([^<]+)<', 'g'),
			'><span style="color:'+CL_BAD+'">'+pr[3]+' $1</span><');
		// Ð²Ñ‹Ð´ÐµÐ»ÑÐµÐ¼ Ð²Ñ‹Ð³Ð¾Ð´Ð½Ñ‹Ðµ Ñ†ÐµÐ½Ñ‹
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
		// ÑÐ¾Ñ…Ñ€Ð°Ð½ÐµÐ½Ð¸Ðµ Ñ†ÐµÐ½Ñ‹ Ð½Ð° ÑÐµÑ€Ð²ÐµÑ€Ðµ
		savePriceOnServer(pname, pprice);
	}

	// ÐºÐ¾Ñ€Ñ€ÐµÐºÑ‚Ð¸Ñ€ÑƒÐµÐ¼ ÐºÐ¾Ð»-Ð²Ð¾ Ñ‚Ð¾Ð²Ð°Ñ€Ð°
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

// Ð¿Ñ€ÐµÐ´Ð»Ð¾Ð¶ÐµÐ½Ð¸Ðµ ÑÐ¸Ð¼Ð¿Ð¾Ð²
if (L.indexOf('verkauf.php') != -1)
{
	var page = document.body.innerHTML;
	var st = '', i, ost, r, nn, sum = 0, sum2 = 0, a, p, regexp = /(\d+)x ([^<]+)/g
	var prods = [], s, nA = 0, prod1, points = 0, cl, oncl, buy, st_bis = '';

	// Ñ„ÑƒÐ½ÐºÑ†Ð¸Ñ Ð·Ð°ÐºÑ€Ñ‹Ñ‚Ð¸Ñ Ð¾ÐºÐ½Ð° Ð¿Ñ€ÐµÐ´Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ ÑÐ¸Ð¼Ð¿Ð¾Ð²
	w.closePage = function()
	{
		parent.document.getElementById('einkaufszettel').style.display = "none";
		parent.document.getElementById("kunde").style.display="none";
		parent.kunde.location.href="about:blank";
	}
	// Ð¾Ð±Ñ€Ð°Ð±Ð¾Ñ‚Ñ‡Ð¸Ðº Ð¿Ð¾ÐºÑƒÐ¿ÐºÐ¸ Ð² Ð¼Ð°Ð³Ð°Ð·Ð¸Ð½Ðµ
	w.buyInShop = buyInShop;

	while ((a = regexp.exec(page)) != null)
	{
		prod1 = prod(a[2]);
		p     = prod1.p_market;
		points += Math.round(prod1.points*parseInt(a[1])*0.002);
		if (prod1.p_shop < p) p = prod1.p_shop;
		sum += s = round(parseInt(a[1])*p,2);
		prods.push(s);
		// ÑÑ‡Ð¸Ñ‚Ð°ÐµÐ¼ ÑÐºÐ¾Ð»ÑŒÐºÐ¾ Ð¾ÑÑ‚Ð°Ð½ÐµÑ‚ÑÑ
		nA = -prod1.need;
		ost = round(prod1.number - parseInt(a[1]));
		nA  = round(prod1.number + nA);
		if (ost < 0) sum2 += s2 = -ost*p; else s2 = 0;
		if (ost > 1000) ost = round(ost/1000)+'Ðº';
		nn = a[2].replace('Ñ†Ð²ÐµÑ‚Ð½Ð°Ñ', '').replace('Ð±Ð¾Ð»Ð³Ð°Ñ€ÑÐºÐ¸Ð¹', '');
		if (prod1.rentab >= RENTAB_GOOD) cl = 'color: '+CL_BAD;  else
		if (prod1.rentab <= RENTAB_BAD)  cl = 'color: '+CL_GOOD; else cl = '';
		oncl = "parent.document.getElementById('shop').style.display='';"+
			"parent.shopframe2.document.body.innerHTML = ''; closePage();";
		buy = ost < 0 ? ' <a href="#buy" onclick="return buyInShop(\''+a[2]+'\','+
			(-ost)+')" title="'+LNG_BUY_IN_SHOP+'</a>' : '';
		if (ost < 0) st_bis += 'buyInShop(\''+a[2]+'\','+(-ost)+');';
		page = page.replace(a[0], '<small> <b>'+a[1]+'x'+p+' '+nn+'</b>'+buy+'<br/>'+
			'['+LNG_PROD_REST+' '+ost+' ÑˆÑ‚, <a style="'+cl+'"href="'+linkShopOrMarket(prod(a[2]))+
			'"target="shopframe2"onclick="'+oncl+'"style.display=\'none\';">'+round(s2,2)+' ÑÐ¢</a>, _'+prods.length+'] </small>');
    }
	// Ñ€Ð°ÑÑÑ‡Ð¸Ñ‚Ñ‹Ð²Ð°ÐµÐ¼ Ð¿Ñ€Ð¾Ñ†ÐµÐ½Ñ‚Ñ‹
	for (i = 0; i < prods.length; i++)
		page = page.replace('_'+(i+1), (round(prods[i]/sum*1000)/10)+'%');

	sum *= 0.9; // ÐºÐ¾Ð¼Ð¸ÑÑÐ¸Ñ
	// Ð¸Ñ‰ÐµÐ¼ ÑÐºÐ¾Ð»ÑŒÐºÐ¾ Ð´ÐµÐ½ÐµÐ³ Ð´Ð°ÑÑ‚ ÑÐ¸Ð¼Ð¿
	regexp = new RegExp(':&nbsp;([' +
		globObj('_CURRENCY_1000') + '\\d]+' +
		globObj('_CURRENCY_SEP')  + '\\d+)');
	var simp = regexp.exec(page);
	simp = round(parseFloat(simp[1].replace(/[\. ]/,'').replace(',','.'), 2));
	var pr = round(simp - sum); // ÑÑ‡Ð¸Ñ‚Ð°ÐµÐ¼ Ð¿Ñ€Ð¸Ð±Ñ‹Ð»ÑŒ Ð¸Ð»Ð¸ ÑƒÐ±Ñ‹Ñ‚Ð¾Ðº
	var pr2= round(simp - sum2);
	pr2 = LNG_WITH_PROD_IN_RACK+': '+pr2+'('+round(pr2/simp*100)+'%)';
	page = page.replace(/>.+:&nbsp;([,. \d]+) (.+)</,
		'><small>'+round(simp)+'$2 = <span title="'+pr2+'">'+pr+'$2 ('+round(pr/simp*100)+'%)</span> +'+points+'</small><');
	document.body.innerHTML = page;

	// ÐºÐ¾Ñ€Ñ€ÐµÐºÑ‚Ð¸Ñ€ÑƒÐµÐ¼ ÑÐ¿Ð¸ÑÐ¾Ðº Ð·Ð°Ð¿Ñ€Ð¾ÑÐ¾Ð²
	document.body.childNodes[3].style.display = 'none';
	var i, l = document.body.childNodes.length;
	for (i=3; i < l - 4; i+=2)
		document.body.childNodes[i].style.top = (i-4)*20+'px';
	document.body.childNodes[i=l-4].style.top = '330px';
	document.body.childNodes[i=l-2].style.top = '350px';

	// Ð¾Ð±Ñ‰Ð°Ñ ÐºÐ½Ð¾Ð¿ÐºÐ° ÐšÐ’Ðœ
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

// Ð¾Ñ‡ÐµÑ€ÐµÐ´ÑŒ ÑÐ¸Ð¼Ð¿Ð¾Ð² - ÑÐ¼Ð¾Ñ‚Ñ€Ð¸Ð¼ Ñ‡Ñ‚Ð¾ Ñ…Ð¾Ñ‚ÑÑ‚ Ð¸ Ð¾Ð±Ð½Ð¾Ð²Ð»ÑÐµÐ¼ Ñ†ÐµÐ½Ñ‹
if (L.indexOf('verkauf_map.php') != -1)
{
	var st = '', i, a1, a2, p, k = globObj('kunden');
	var pr = {}, s = [], ss, j = 0, simpCount, simpOk;
	var r = globObj('rackElement');

	// Ð¾Ð±Ð½ÑƒÐ»ÑÐµÐ¼ Ð½ÑƒÐ¶Ð´Ñ‹
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
			// ÐµÑÐ»Ð¸ Ð² Ð¼Ð°Ð³Ð°Ð·Ð¸Ð½Ðµ Ð½ÐµÐ²Ñ‹Ð³Ð¾Ð´Ð½Ð¾ ÐºÑƒÐ¿Ð¸Ñ‚ÑŒ, ÑÐ¸Ð¼Ð¿Ð° Ð½Ðµ Ð¿Ð¾Ð¼ÐµÑ‡Ð°ÐµÐ¼
			simpCount -= r[a1[i]].number;
			if (simpCount < 0) simpCount = 0;
			if (simpCount > 0 &&
				((r[a1[i]].p_shop - r[a1[i]].p_market)*simpCount > 10))
				simpOk = 0;
		}
		s.push(ss);
		// Ð¿Ð¾Ð¼ÐµÑ‡Ð°ÐµÐ¼ Ð³Ð¾Ñ‚Ð¾Ð²Ð¾Ð³Ð¾ ÑÐ¸Ð¼Ð¿Ð°
		if ($(p) != undefined && simpOk)
			$(p).style.background = 'red';
	}
	// ÑÐ¾Ñ…Ñ€Ð°Ð½ÑÐµÐ¼ ÑÐ¾Ð²Ð¾ÐºÑƒÐ¿Ð½Ð¾Ðµ Ð¿Ñ€ÐµÐ´Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ ÑÐ¸Ð¼Ð¿Ð¾Ð²
	parent.window.wrappedJSObject.simps = s;
	parent.window.wrappedJSObject.updateRack();
	// Ð¼ÐµÐ½ÑÐµÐ¼ Ñ€Ð°Ð·Ð¼ÐµÑ€ Ð¸Ð³Ñ€Ð¾Ð²Ð¾Ð³Ð¾ Ð¿Ð¾Ð»Ñ
	if (parent.document.body.parentNode.clientHeight < 700)
	{
		$('kunden_all').style.position = 'absolute';
		$('kunden_all').style.top = '-50px';
		// ÑÐ¸Ð¼Ð¿Ñ‹
		var i = 0, e;
		for (i = 0; i < 20; i++)
		if ((e=$('blasei'+i)) != undefined)
		{
			e.style.top  = '47px';
			e.style.left = '50px';
		}
		// ÑÐ´Ð²Ð¸Ð³Ð°ÐµÐ¼ ÑÐ±Ð¾Ñ€Ñ‰Ð¸ÐºÐ° Ð²Ð¿Ñ€Ð°Ð²Ð¾
		$('helfer_all').childNodes[1].style.right = 0;
	}
} else

// Ð°Ð²Ñ‚Ð¾Ð·Ð°Ñ…Ð¾Ð´ Ð¿Ñ€Ð¸ Ð²Ñ‹Ð±Ñ€Ð¾ÑÐµ Ð¸Ð· Ð¸Ð³Ñ€Ñ‹
if (L.indexOf('login.php?logout') != -1)
{
	setTimeout("document.location = '/login.php'", 2000);
} else
if (L.indexOf('login.php') != -1)
{
	// ÑÐ¾Ñ…Ñ€Ð°Ð½ÑÐµÐ¼ Ð»Ð¾Ð³Ð¸Ð½/Ð¿Ð°Ñ€Ð¾Ð»ÑŒ Ð¿Ñ€Ð¸ Ð·Ð°Ñ…Ð¾Ð´Ðµ
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

	// Ð¿Ñ€Ð¾Ð±ÑƒÐµÐ¼ Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¾Ð¼ Ð·Ð°Ð¹Ñ‚Ð¸ Ð² Ð¸Ð³Ñ€Ñƒ
	if (Settings.load('!user', 0) != 0)
	{
		form[f_user].value = Settings.load('!user');
		form[f_pass].value = Settings.load('!pass');
		form[f_serv].value = Settings.load('!serv');
		setTimeout(function() { vld(); form.submit(); }, 13*1000);
	}
} else

// ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ Ð² Ð¿Ð¾Ñ‡Ñ‚Ðµ
if (L.indexOf('/nachrichten/') != -1)
{
	var text = document.body.innerHTML;
	var count = /(\d+) ÑˆÑ‚./.exec(text);
	if (!count) count = /(\d+)x/.exec(text);
	if (count != null)
	{
		var money = /([\d,.]+) ?ÑÐ¢/.exec(text);
		count = parseInt(count[1]);
		money = parseInt(money[1].replace(/[.,]/g, '')) / 100;
		var c = Math.round(money / count * 100) / 100;
		text = text.replace(/([\d,.]+ ?ÑÐ¢)/, '$1 (Ð¿Ð¾ <b>'+c+'ÑÐ¢</b> Ð·Ð° ÑˆÑ‚)');
		document.body.innerHTML = text;
	}
	parseCompletedQuest();
} else

// Ð·Ð°Ð¿Ð¾Ð¼Ð¸Ð½Ð°ÐµÐ¼ ÐºÐ²ÐµÑÑ‚
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

// ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ ÑÐºÑ€Ð¸Ð¿Ñ‚Ð°
if (L.indexOf('cupivan') != -1 && document.body)
{
	$('version').innerHTML = SCRIPT_VERSION;
}
