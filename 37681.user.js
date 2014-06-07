// ==UserScript==
// @name           Подсветка поисковых результатов
// @author         http://leprosorium.ru/users/21007
// @namespace      http://search.leprosorium.ru/
// @description    Подсвечивает результаты в Поисковой Системе им. Бухтоярова™
// @include        http://search.leprosorium.ru/*
// ==/UserScript==

	//http://javascript.about.com/library/bldom08.htm
	if (!document.getElementsByClassName){
		document.getElementsByClassName = function(cl) {
		var retnode = [];
		var myclass = new RegExp('\\b'+cl+'\\b');
		var elem = this.getElementsByTagName('*');
		for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
		}
		return retnode;
		}; 
	}

	function $(id) {
		var obj = window.document.getElementById(id)
		if (obj != undefined) {
			return obj
		} else {
			return false
		}
	}
	function $class(name,base) {
		base = base || document;
		return base.getElementsByClassName(name)
	}
	
	function $classFirst(name,base) {
		var res = $class(name,base)
		if (res[0]){
			return res[0]
		}else {
			return false
		}
	}
	
	var search_string = $('search-string').value;
	var search_terms = search_string.split(' ');
	var highlight_colors = new Array('#FFFF66', '#A0FFFF', '#99FF99', '#FF9999', '#FF66FF', '#880000', '#00AA00', '#886800', '#004699', '#990099');
	var highlight_text_colors = new Array('#000000', '#000000', '#000000', '#000000', '#000000', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff');
	var regex;
	
	for (var i in search_terms)  { 
		regex = new RegExp(">([^<]*)?("+search_terms[i]+")([^>]*)?<","ig"); 
		$('search-results-column').innerHTML = $('search-results-column').innerHTML.replace(regex,'>$1<span style="background:'+highlight_colors[i]+';font-weight:bold;color:'+highlight_text_colors[i]+';">$2</span>$3<');
	}
	
	