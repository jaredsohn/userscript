// ==UserScript==
// @name           iGoogle Complact
// @namespace      jp.xrea.civic
// @include        http://www.google.co.jp/ig*
// @include        http://www.google.com/ig*
// ==/UserScript==
(function(){
	//
	var col1 = document.getElementById('col1');
	col1.style.display = "none";
	document.getElementById('addstuff').appendChild(document.createTextNode(" | "));
	var button = document.createElement("a");
	document.getElementById('addstuff').appendChild(button);
	button.innerHTML = "Sidebar";
	button.setAttribute("href", "#");
	button.addEventListener("click", function(){
		col1.style.display = (col1.style.display == "" ? "none" : "");
		return false;
	}, true);


 })();
