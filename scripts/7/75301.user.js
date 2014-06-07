// ==UserScript==
// @name           virtonomica:Заметки
// @namespace      virtonomica
// @description    расширение возможностей показа заметок
// @include        http://virtonomic*.*main/company/view/*unit_list
// ==/UserScript==
var run = function() {
	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;

	$("div.st > span:contains('[hide]')").each(function() { 
		$(this).hide();
	});
	$("div.st > span:contains('[hide]')").parent().find("img").each(function() { 
		$(this).hide();
	});

}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);