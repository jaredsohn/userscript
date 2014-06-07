// ==UserScript==
// @name           EPL digilehe fit
// @namespace      ee.barsbite.raido
// @description    mahutab digilehe ka 1024 piksli laiusele ekraanile
// @include        http://ajaleht.epl.ee/digi/*
// ==/UserScript==

if (document.getDivsByClassName == undefined) {
	document.getDivsByClassName = function(className)
	{
		var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
		var allElements = document.getElementsByTagName("div");
		var results = [];

		var element;
		for (var i = 0; (element = allElements[i]) != null; i++) {
			if (hasClassName.test(element.className))
				results.push(element);
		}

		return results;
	}
}

function deleteDivs(className) {
	var content = document.getDivsByClassName(className);
	console.log("delete " + className + " -> pikkus: " + content.length);
	if (content.length > 0) {
		for (var i = 1; i < content.length; i++) {
			content[i].parentNode.removeChild(content[i]);
		}
	}
}

window.onload = muuda();

function muuda() {
	GM_log("laetud");
	var navigationContainer = document.getElementById('navigationContainer');
	if (navigationContainer) {
		navigationContainer.style.left = "0";
		navigationContainer.style.marginLeft = "0";
		navigationContainer.style.width = "1024px";
		navigationContainer.style.height = "748px";
		navigationContainer.style.top = "0";
		navigationContainer.style.marginTop = "0";
	}
	
	var container = document.getElementById('container');
	if (container) {
		container.style.left = "0";
		container.style.top = "0";
		container.style.marginLeft = "0";
		container.style.marginTop = "0";
	}
	
	var head = document.getElementsByTagName('head')[0];
	if (head) {
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = 
			'.prev, .next, .up, .down {opacity: 0.4;z-index: 106;}'+
			'.next {position:fixed;left:auto;right:0;} .next div {margin-left:19px;height:72px;width:28px;background-position:-36px center;border-radius:20px 0 0 20px;}'+
			'.prev {position:fixed;} .prev div {left:0;height:72px;width:28px;background-position:-8px center;border-radius:0 20px 20px 0;}'+
			'.up {position:fixed;} .up div {height:28px;width:72px;background-position:center -8px;border-radius:0  0 20px 20px;}'+
			'.down {position:fixed;} .down div {margin-top:9px;height:28px;width:72px;background-position:center -36px;border-radius:20px 20px 0 0;}';
		head.appendChild(style);
	}
	
	document.body.style.overflow = "hidden";
}