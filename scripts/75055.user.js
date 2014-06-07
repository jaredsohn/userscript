// ==UserScript==
	// @name                ps3.in.ua market eliminator
	// @namespace	        http://www.ps3.in.ua/
	// @description	        script that hides annoying market topics in search results
	// @include				http://www.ps3.in.ua/forum/index.php?act=Search*
	// @include				http://*ps3.in.ua/forum/index.php?act=Search*
// ==/UserScript==

var allspans = document.getElementsByTagName('span');
var spans = [];
for (var i = 0; i < allspans.length; i++) {
	if (allspans[i].className == 'forumdesc') {
		spans.push(allspans[i]);
	}
}
for (var i = 0; i < spans.length; i++) {
	var x = spans[i].firstChild.innerHTML;
	var restrict = [
		'Покупка',
		'Продажа',
		'Обмен',
		'Не консольная тематика',
		'Аукцион',
		'Барахолка',
		'PSN Барахолка',
		'Список проверенных лиц'
	];
	for (var j = 0; j < restrict.length; j++) {
		if (x == restrict[j]) {
			spans[i].parentNode.parentNode.style.display='none';
		}	
	}
}