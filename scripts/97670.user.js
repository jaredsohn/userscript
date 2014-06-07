// ==UserScript==
// @name           wordfilter
// @namespace      http://wakachan.org/unyl/
// @description    wordfilter for wakaba in general and /unyl/ in particular
// @include        http://wakachan.org/*
// @include        http://*.wakachan.org/*
// @include        http://iichan.ru/*
// @include        http://*.iichan.ru/*
// @include        http://iichan.net/*
// @include        http://*.iichan.net/*
// @author         unylnonymous
// ==/UserScript==

function magenta_span(word, replacement) {
	return '<span style="background-color: magenta; color: yellow;"><abbr title="' + word.split('').join('.') + '">' + replacement + '</abbr></span>';
}

var span = magenta_span;

var replacements = { 
	'^[Ш|Щ]ЛЮХ([а-яА-ЯёЁ\w\d]*)' : function (re) { return span(re[0], 'НЯШ' + re[1].toUpperCase()) }, 
	'^Г[А|О]ВН([а-яА-ЯёЁ\w\d]*)' : function (re) { return span(re[0], 'ДОБР' + re[1].toUpperCase()) }, 
	'^ХУЙ(Ц)([а-яА-ЯёЁ\w\d]*)' : function (re) { return span(re[0], 'СЫР' + (re[1] + re[2]).toUpperCase()) }, 
	'^ШКОЛОТ([а-яА-ЯёЁ\w\d]*)' : function (re) { return span(re[0], 'ДЕТВОР' + re[1].toUpperCase()) }, 
	'^АНАЛЬ([а-яА-ЯёЁ\w\d]*)' : function (re) { return span(re[0], 'КАВАЙ' + re[1].toUpperCase()) }, 
	'^СУЧЕЧК([а-яА-ЯёЁ\w\d]*)' : function (re) { return span(re[0], 'НЯШЕЧК' + re[1].toUpperCase()) }, 
	'^ХУ[И|Й|Е|Н]Т([а-яА-ЯёЁ\w\d]*)' : function (re) { return span(re[0], 'МОЭТ' + re[1].toUpperCase()) }, 
	'^SAGE$' : function(re) { return span(re[0], 'DESU') }, 
	'^PROFIT$' : function (re) { return span(re[0], 'ГЕШЕФТ') }, 
	'^КУКАРЕКА([а-яА-ЯёЁ\w\d]*)' : function (re) { return span(re[0], 'НЯКА' + re[1].toUpperCase()) }, 
	'^ПАЦАН([а-яА-ЯёЁ\w\d]*)' : function (re) { return span(re[0], 'АНОН' + re[1].toUpperCase()) }, 
	};

function getElementsByClass(search_class, tag, node) {
	var class_elemenths = new Array();
	for (var child in node.getElementsByTagName(tag)) {
		if (child.className == search_class) {
			class_elemenths.push(child)
		}
	}
	return class_elemenths;
}

function filter(collection) {
	for (var i = 0; i < collection.length; ++i) {		
		var words = collection[i].innerHTML.split(/[^а-яА-ЯёЁa-zA-Z]/);
			
		for (var j = 0; j < words.length; ++j) {
			
			if (!words[j]) {
				continue;
			}
			
			for (var key in replacements) {
				var groups = words[j].match(new RegExp(key, 'i'));
				if (groups) {
					collection[i].innerHTML = collection[i].innerHTML.replace(groups[0], replacements[key](groups));
				}
			}
		}
	}
}

function spoil() {
	filter(document.getElementsByTagName('blockquote'));  // posts
	filter(getElementsByClass('unkfunc', 'blockquote', document));  // quotation in posts
}

(function() { 
	
	spoil();

})();

