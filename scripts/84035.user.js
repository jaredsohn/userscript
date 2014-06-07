// ==UserScript==
// @name           VKontakte Groups Purifier (Firefox)
// @description    Removes decorative shit from group names in listing. Based on verion for Opera by subzey.
// @version        0.1
// @author         Olexandr Skrypnyk
// @encoding       utf8
// @license        GNU GPL
// @include        http://*vkontakte.ru/*
// @include        http://*vk.com/*
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
			var groupTitle = groupsAnchors[i].innerHTML;
			groupTitle = groupTitle.replace(/:-?[)P]/g, " ");
			groupTitle = groupTitle.replace(/[^A-ZÀÁÂÃÄÅÆÇÈÉÊĚĘÌÍÎÐÑÒÓÔÕÖØÙÚÛÜŬŮÝÞŸßČĎŁŇŘŠŤŽa-zàáâãäåæçèéêěęìíîðñòóôõöøùúûüŭůýþÿßčďłňřšťžА-ЯІЇЁЄҐЎа-яёіїєґў0-9'&"«»„“”!?.,;:—-]+|&nbsp;|&lt;|&gt;/g, " ");
			groupTitle = groupTitle.replace(/^[^A-ZÀÁÂÃÄÅÆÇÈÉÊĚĘÌÍÎÐÑÒÓÔÕÖØÙÚÛÜŬŮÝÞŸßČĎŁŇŘŠŤŽa-zàáâãäåæçèéêěęìíîðñòóôõöøùúûüŭůýþÿßčďłňřšťžА-ЯІЇЁЄҐЎа-яёіїєґў0-9"„“«]+|[^A-ZÀÁÂÃÄÅÆÇÈÉÊĚĘÌÍÎÐÑÒÓÔÕÖØÙÚÛÜŬŮÝÞŸßČĎŁŇŘŠŤŽa-zàáâãäåæçèéêěęìíîðñòóôõöøùúûüŭůýþÿßčďłňřšťžА-ЯІЇЁЄҐЎа-яёіїєґў0-9"»”)]+$/g, "");
			groupTitle = groupTitle.replace(/[-]+/g, "-");
			groupTitle = groupTitle.replace(/[!]+/g, "!");
			groupTitle = groupTitle.replace(/[?]+/g, "!");
			groupTitle = groupTitle.replace(/[,]+/g, "!");
			groupTitle = groupTitle.replace(/\s+/, " ");
			groupTitle = groupTitle.replace(/[A-ZÀÁÂÃÄÅÆÇÈÉÊĚĘÌÍÎÐÑÒÓÔÕÖØÙÚÛÜŬŮÝÞŸßČĎŁŇŘŠŤŽА-ЯІЇЁЄҐЎ\s]{9,}/g, capitalize);
			groupsAnchors[i].innerHTML = groupTitle;
		};
	};
	document.addEventListener('DOMContentLoaded', fixGroups, true)
})()