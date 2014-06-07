// Ceci n'est pas vraiment un script Greasemonkey .

// ==UserScript==
// @name          Misc
// @namespace     D-
// @description   Diverses fonctions non classées
// @include       http://dummy/*
// ==/UserScript==

// TP1

/*
//!!!!!!!!!!!!!!!!!!!!!!
// HORS GM , fonctions de substitutions pour satisfaire javascript
function GM_log(str) {	print(str); } // DEBUG dans la console machin
function GM_setValue(str,val) { print('GM_setValue: '+str+'='+val ) };
function GM_getValue(str,val) { return val };
var unsafeWindow = {};
unsafeWindow.js={};
unsafeWindow.js.XmlHttp={};
//!!!!!!!!!!!!!!!!!!!!!
*/

// Divers issus de HMUpdater et autres

//
// Compatibilité Opera & cie
//
if( typeof(GM_getValue) == 'undefined' ) {
	function GM_getValue(name, defaultVal)
	{
		try {
			return (new RegExp('hmu_' + name + "=([^\\s;]+)", "g"))
				.test(document.cookie) ? unescape(RegExp.$1) : defaultVal;
		}
		catch(e) {
			return defaultVal;
		}
	}
	
	function GM_setValue(name, val)
	{
		var expire = new Date();
		expire.setTime(expire.getTime() + (365*24*60*60*1000));
		
		document.cookie =
			'hmu_' + name + '=' + escape(val) + ';' +
			'expires=' + expire.toGMTString() + ';' +
			'path=/';
	}
}

if( typeof(GM_xmlhttpRequest) == 'undefined' ) {
	function GM_xmlhttpRequest(xhr)
	{
		var data = (xhr.data != null) ?
			new XMLSerializer().serializeToString(xhr.data) : '';
		
		var img = document.createElement('img');
		img.addEventListener('load', function() {
			var code = this.width == 1 ? 'ok' : 'error';
			
			xhr.onload({
				status: 200,
				responseText: '<hordes><headers version="'+HMU_VERSION+'"/><error code="'+code+'"/></hordes>'
			});
		}, false);
		img.addEventListener('error', function() { xhr.onerror(); }, false);
		img.setAttribute('src', PROXY_URL+'?url='+escape(xhr.url)+'&data='+escape(data)+'&rand='+Math.random());
	}
}

if( typeof(window.wrappedJSObject) == 'undefined' ) {
	window.wrappedJSObject = window;
}

if( typeof("".trim) == 'undefined' ) {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	}
}

function GM_getArrayValue(name, login, defaultValue)
{
	var array = {};
	
	try {
		array = eval(GM_getValue(name, {}));
	}
	catch(e) {}
	
	return (login in array) ? array[login] : defaultValue;
}

function GM_setArrayValue(name, login, value)
{
	var array = {};
	
	try {
		array = eval(GM_getValue(name, {}));
	}
	catch(e) {}
	
	array[login] = value;
	
	var str = '';
	
	if( typeof(array.toSource) == 'undefined' ) {
		for( var index in array ) {
			if( typeof(array[index]) != 'string' && typeof(array[index]) != 'boolean' ) continue;
			
			str += ', ' + index + ': ' +
				(typeof(array[index]) == 'string' ? '"' + array[index] + '"' : array[index]);
		}
		
		str = '({' + str.substr(1, str.length) + '})';
	}
	else {
		str = array.toSource();
	}
	
	GM_setValue(name, str);
}

/*
if( typeof(unsafeWindow) == 'undefined' ) {
	var unsafeWindow = window;
}
*/
if( typeof(window.wrappedJSObject) == 'undefined' ) {
	window.wrappedJSObject = window;
}



///////////////////////////////////////////////
// Fonctions raccourcis, dgm/ piqué de HMUpdater
//
function $(id) { return document.getElementById(id); }

function $xpath(expression, contextNode, type)
{
	return (contextNode.nodeType == 9 ? contextNode : contextNode.ownerDocument)
		.evaluate(expression, contextNode, null, type, null);
}


