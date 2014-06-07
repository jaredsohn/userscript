// ==UserScript==
// @name           Vkontakte groups purifier
// @description    Removes decorative shit from group names in listing
// @version        0.1.0.0 alpha
// @author         subzey
// @encoding       utf8
// @license        GNU GPL
// @include        http://vkontakte.ru/*
// @include        http://*.vkontakte.ru/*
// ==/UserScript==

(function (){
	function capitalize(str){
		return str.toLowerCase().replace(/^(\s)*(\S)/, function(first){
			return first.toUpperCase();
		});
	}
	function fixGroups(){
		var groupsBlock = document.getElementById("groups");
		if (!groupsBlock) return;
		var groupsAnchors = groupsBlock.getElementsByTagName("a");
		for (var i=0; i<groupsAnchors.length; i++){
			var groupTitle = groupsAnchors[i].innerText;
			groupTitle = groupTitle.replace(/:-?[)P]/g, " ");
			groupTitle = groupTitle.replace(/[^A-Za-zА-ЯЁа-яё0-9'"«»„“”!?.,;:—-]+/g, " ");
			groupTitle = groupTitle.replace(/^[^A-Za-zА-ЯЁа-яё0-9"„“«]+|[^A-Za-zА-ЯЁа-яё0-9"»”)]+$/g, "");
			groupTitle = groupTitle.replace(/\s+/, " ");
			groupTitle = groupTitle.replace(/[A-ZA-ЯЁ\s]{9,}/g, capitalize);
			groupsAnchors[i].innerText = groupTitle;
		};
	};
	document.addEventListener('DOMContentLoaded', fixGroups, true)
})()