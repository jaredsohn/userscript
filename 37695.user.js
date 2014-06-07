// ==UserScript==
// @name           another 2ch.ru captha fix
// @namespace      lolwut
// @include        http://2ch.ru/*
// ==/UserScript==

var form;
if (form = document.getElementById("postform")) {
    form.target = "ninjaframe";
    var ninjaframe = document.createElement("iframe");
    ninjaframe.name = "ninjaframe";
    ninjaframe.style.display = "none";
    ninjaframe.addEventListener("load",function(){check(ninjaframe)},false);
    form.appendChild(ninjaframe);
    var check = function (a) {
	var d = a.contentWindow.document;
	if (d.location.toString().match("http://2ch.ru/cgi-bin/wakaba.pl/")){
	    error = d.evaluate(
		'/xhtml:html/xhtml:body/xhtml:h1/text()', d,
		function () {return 'http://www.w3.org/1999/xhtml'},
		XPathResult.ANY_UNORDERED_NODE_TYPE, null
	    ).singleNodeValue;
	    form.appendChild(error);
	} else if (d.location.toString().match("2ch.ru")) {
	    document.location = d.location.toString();
	}
    }
}