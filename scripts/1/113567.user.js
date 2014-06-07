// ==UserScript==
// @name	tinami_add_collection_with_star
// @description	TINAMIでコレクションを追加するときに，同時に支援を行う Requirement: Chrome or Firefox
// @version	1.2
// @namespace    http://www1.icnet.ne.jp/a7v83w2r/
// @include	http://www.tinami.com/view/*
// @match	http://www.tinami.com/view/*
// ==/UserScript==

(function(){

var elem_cadd = document.getElementById("collection_add").getElementsByTagName("img")[0];

var click = function (){
	elem_cadd.addEventListener("click", function(){
		var elem_star = document.getElementById("support_button_container").childNodes[0];
		elem_star.click()

//if the target element to click is unlike button
//see: http://d.hatena.ne.jp/language_and_engineering/20090907/p1
//
//var elem_cadd = document.getElementById("collection_add").getElementsByTagName("img")[0];
//var mev = document.createEvent("MouseEvents");
//mev.initEvent("click", false, true);
//elem_cadd.dispatchEvent(mev);

	},false)
};

click();


})();