// ==UserScript==
// @name noFloatFieldYandex
// @version 0.91_2011-07-22
// @namespace spmbt.kodingen.com
// @author spmbt0
// @description Скрывает плавающее фиксированное поле строки поиска
// @include http://*.yandex.ru/*
// @include http://yandex.ru/*
// ==/UserScript==
var css ='.b-head-floater_fixed_yes{display: none;}.b-scroll{left:auto!important;top:49%!important;right: 3px;}';
if(typeof GM_addStyle != "undefined"){ GM_addStyle(css);
}else if(typeof PRO_addStyle != "undefined"){ PRO_addStyle(css);
}else if(typeof addStyle != "undefined"){ addStyle(css);
}else{
	var heads = document.getElementsByTagName("head");
	if(heads.length > 0){
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node);
}}
