// ==UserScript==
	// @name Имиджбордовский "Punto Switcher"
	// @description Исправляет неправильную раскладку или капслок в названии доски
	// @include http://www.iichan.ru/*
	// @include http://iichan.ru/*
	// @include http://0chan.ru/*
	// @include http://www.0chan.ru/*
	// ==/UserScript==
		var arr = new Object();

arr={а:'f',в:'d',г:'u',д:'l',е:'t',з:'p',и:'b',к:'r',л:'k',м:'v',н:'y',о:'j',п:'g',р:'h',с:'c',т:'n',у:'e',ф:'a',ц:'w',ч:'x',ш:'i',щ:'o',ы:'s',ь:'m',я:'z'};

	
	if (document.title=="404 Not Found"){
	s=decodeURIComponent(location.href).toLowerCase().replace(/[а-яА-Я]/ig, function(m) { return arr[m]; });
	if (location.href!=s) location.href=s;
}
