// ==UserScript==
// @name        The Feminist Breeder Right-Click Restore
// @namespace   http://userscripts.org/*
// @description Restores right click functionality to thefeministbreeder.com
// @include     /^https?://([^/]+\.)?thefeministbreeder\.com/.*$/
// @version     1
// @require		http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

window.rv = ["document.ondragstart", "document.onselectstart", "document.onmousedown", "document.oncontextmenu", "document.body.oncontextmenu"];

window.rv.forEach(function(i){
	$("script:contains('" + i + "')").remove();
});

window.onload = function(){
	window.setTimeout(function(){
		clrV();
	}, 1000);
};

function clrV(){
	window.rv.forEach(function(i){
		try {
			eval(i + " = null;");
		} catch(e){};
	});
}
