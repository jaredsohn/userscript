// ==UserScript==
// @name           AllFactory
// @namespace      Tamozhnya1
// @description    All Factory In One Page
// @include        http://*.heroeswm.*/map.php*
// @include        http://173.231.37.114/map.php*
// @include        http://178.248.235.15/map.php*
// @include        http://*герои.рф/map.php*
// ==/UserScript==

// Получаем координаты
var a = document.querySelectorAll("a[href^='map.php']");
for(var i = 0; i < a.length; i++) {
	var x = getVarValueFromURL("cx", a[i].href);
	if(x == null) {
		continue;
	}
	var y = getVarValueFromURL("cy", a[i].href);
	break;
}
if(!x || !y) {
	//alert("Are not obtain location coordinates");
	return;
}
var mainUrl =  "map.php?cx=" + x + "&cy=" + y;
var locs = ["mn", "fc", "sh"];
var currentFactoryType = getFactoryType();
var tab = getFactoryTable(document);
if(!tab) {
	return;
}
var p = tab.parentNode;
var tabCount = 1;
var tabs = new Array();
tabs[currentFactoryType] = tab;
// Асинхронно запрашиваем др. станицы
for(var i = 0; i < locs.length; i++) {
	if(i != currentFactoryType) {
		//alert("i=" + i + " locs[i]=" + locs[i])
		var url = mainUrl + "&st=" + locs[i];
		getDOC(url, addFactoryTable, i);
	}
}
// Обработчик, добавляющий запрошенный таблицы
function addFactoryTable(newDocument, factoryType) {
	//alert("currentFactoryType=" + currentFactoryType + " factoryType=" + factoryType)
	var newTab = getFactoryTable(newDocument); // Получили таблицу
	tabs[factoryType] = newTab;
	tabCount++;
	if(tabCount == 3) {
		p.removeChild(tab);
		for(var i = 0; i < tabs.length; i++) {
			p.appendChild(tabs[i])
		}
	}
}
function getFactoryType() {
	var factoryType;
	var b = document.getElementsByTagName("b");
	for(var i = 0; i < b.length; i++) {
		if(b[i].innerHTML == "\u0414\u043e\u0431\u044b\u0447\u0430") {
			factoryType =  0;
			break;
		}
		if(b[i].innerHTML == "\u041e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430") {
			factoryType =  1;
			break;
		}
		if(b[i].innerHTML == "\u041f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0441\u0442\u0432\u043e") {
			factoryType =  2;
			break;
		}
	}
	return factoryType;
}
// Получаем таблицу
function getFactoryTable(doc) {
	var tab;
	var b = doc.getElementsByTagName("b");
	for(var i = 0; i < b.length; i++) {
		if(b[i].innerHTML == "\u0417\u0430\u0440\u043f\u043b\u0430\u0442\u0430") {
			tab =  b[i].parentNode.parentNode.parentNode;
			break;
		}
	}
	return tab;
}
function getDOC(url, callback, factoryType) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
		overrideMimeType: "text/html; charset=windows-1251",
        onload: function (response) {
			callback(htmltocontext(response.responseText), factoryType);
        }
    });
}
function htmltocontext(source) {
	var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
	var doc = document.implementation.createDocument('', '', dt);
	var html = doc.createElement('html');
	html.innerHTML = source;
	doc.appendChild(html);
	return doc;
}
function getVarValueFromURL(varName, url) {
	if(url == undefined) {
		url = window.location.toString();
	}
    var data = url.substring(url.indexOf('?') + 1);
    var vars = data.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == varName) {
            return pair[1];
        }
    }
    return null;
}
