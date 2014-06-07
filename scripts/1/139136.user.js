// ==UserScript==
// @name        Mimovrste to ajax
// @namespace   W3D
// @include     http://www.mimovrste.com/katalog/*
// @version     1
// ==/UserScript==

GM_addStyle(
'#container {\
	transition: opacity 1s; -moz-transition: opacity 1s; -webkit-transition: opacity 1s; -o-transition: opacity 1s;\
}'
);
onload();

function onload(){
	//links in leftColl
	var es = document.getElementById("leftColl").getElementsByTagName("a");
	for(i in es){
		var lnk = es[i].getAttribute("href");
		es[i].setAttribute("href","javascript:void(0);");
		
		( //new scope .. so variable gets transfered and saved.. otherwise it changes, all the way to last value
			function(inlnk){
				es[i].addEventListener('click', function(){loadPage(inlnk);}, true);
			}
		)(lnk);
	}
}

function loadPage(urlString){
	document.getElementById("container").style.opacity = 0.6;
	
	GM_xmlhttpRequest({
		method: "GET",
		url: urlString,
		onload: function(response) {
			var doc = getDocFromString(response.responseText);
			var replacement = doc.getElementById("container");
			document.getElementById("container").innerHTML = replacement.innerHTML;
			document.getElementById("container").style.opacity = 1.0;
			onload();
		}
	});
}

function getDocFromString(docString){
	var doc = document.implementation.createHTMLDocument("");
	doc.documentElement.innerHTML = docString;
	return doc;
}
