// ara
// Copyleft Onur Ulusu
// görüş ve öneri: onurulusu@gmail.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ChangeLog
// version 1.0
// 1.0    18.05.2009

// ==UserScript==
// @name			ara
// @description		eusozluk'te başlığı çeşitli platformlarda arattırır.
// @namespace		eusozluk.com
// @include			http://www.eusozluk.com/*
// @include			http://eusozluk.com/*
// ==/UserScript==

window.addEventListener(
	'load',
	function() {
		var h1 = document.getElementsByTagName('h1');
		addSelect(h1[0]);
	},
false);

function addSelect(div){
		
		var anonym = document.createElement('div');
		anonym.setAttribute('align','right');
		anonym.innerHTML = "<select class=\"asl\" onchange=\"var h1 = document.getElementsByTagName('h1')[0];  var link=h1.getElementsByTagName('a')[0].href; keyword = link.split('q=')[1]; if(this.selectedIndex>0){window.open(decodeURIComponent(this.options[this.selectedIndex].value)+keyword);this.selectedIndex=0;}\"><option>ara</option><option value=\"http://www.google.com.tr/search?q=\">google</option><option value=\"http://en.wikipedia.org/wiki/Special:Search?fulltext=Search&search=\">wikipedia(en)</option><option value=\"http://tr.wikipedia.org/wiki/Special:Search?fulltext=Search&search=\">wikipedia(tr)</option><option value=\"http://www.youtube.com/results?search_type=&search_query=\">youtube</option><option value=\"http://www.tureng.com/search/\">tureng</option><option value=\"http://us.imdb.com/find?q=\">imdb</option></select>";
		div.appendChild(anonym);
	}



