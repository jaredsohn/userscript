// ==UserScript==
// @name           ithappens.ru- hide readed
// @namespace      http://*ithappens.ru*
// @description   Прячет прочитанные истории при клике  справа от заголовка
// @include        http://ithappens.ru/*
// @autor      nepa3ot
// @version   0.3
// ==/UserScript==

for (var i = 1; i < 11; i++) {
var y = i + 1;
var z = y + 1;
//назначаем тегу div с классом "text" id-шник
document.body.innerHTML = document.body.innerHTML.replace("<div class=\"text\">", "<div class=\"text\" id=\"main" + i + "\"style=\"display: block;\">");
document.body.innerHTML = document.body.innerHTML.replace("<div class=\"text\" id=\"main" + y + "\"style=\"display: block;\">", "<div class=\"text\" id=\"main" + z +"\"style=\"display: block;\">");

//делаем ссылки на новости открывабщимися в отдельной вкладке
document.body.innerHTML = document.body.innerHTML.replace("<a href=\"/story", "<a target=\"_blank\" href=\"/story"); 

//назначаем тегу h3 св-во  onclick
document.body.innerHTML = document.body.innerHTML.replace("<h3>", "<h3 onclick=\"closeThis(" + i + "\)\">");
document.body.innerHTML = document.body.innerHTML.replace("<h3 onclick=\"closeThis(" + y + "\)\">", "<h3 onclick=\"closeThis(" + z + "\)\">");
}

(function() {
var script = "function closeThis(id) { document.getElementById('main'+id).style = document.getElementById('main'+id).style.display = 'none';}"

	var bodys = document.getElementsByTagName("body");
	if (bodys.length > 0) {
		var node = document.createElement("script");
		node.type = "text/javascript";
		node.appendChild(document.createTextNode(script));
		bodys[0].appendChild(node); 
	}
})();