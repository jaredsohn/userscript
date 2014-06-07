// ==UserScript==
// @name Вылидатор
// @description Заменяет в слове "Вы" прописную букву на строчную.
// @icon http://s3.amazonaws.com/uso_ss/19494/large.png
// @license MIT
// @version 1.0
// @include *
// ==/UserScript==

(function() {

var RULES =
[
	//Исходное выражение должно быть таким: /(?<!(<p>))(?<!(<\W*br\W*>))(?<!\.) В(?=(...)[^а-яА-Я])/g, с заменой на ' в',
	//но регулярки в яваскрипте не поддерживают lookbehind, так что идем кривым путем.
	[/(<\W*br\W*>)?(<p>)?(\.)? В(?=(ами?|а(с|ш(а|е(го|й|му?)|и(м|ми|х)?|у)?)|ы)[^а-яА-Я])/g, function($0, $1, $2, $3){return ($1 || $2 || $3) ? $0 : ' в';}]//,
	//Еще правила можно добавить сюда в виде масива [/RegExp/, 'на что заменять'], например: [/ё/g, 'е']
];

function replace() {
	document.removeEventListener('DOMContentLoaded', replace);
	var doc = document.body.innerHTML;
	for(var i = 0, n = RULES.length; i < n; i++) {
		doc = doc.replace(RULES[i][0], RULES[i][1]);
	};
	document.body.innerHTML = doc;
}

document.addEventListener('DOMContentLoaded', replace);
replace();

})();