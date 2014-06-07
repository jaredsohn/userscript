// ==UserScript==
// @name        vk_menu_ext
// @namespace   Sheogorath_the_Mad
// @description oh god
// @include     http://*vk.com*
// @version     1
// @grant       none
// ==/UserScript==

var sidebar = document.getElementById("side_bar");
var links = sidebar.getElementsByTagName("ol")[0];

/*
Для того, чтобы добавить нужные элементы в меню, нужно добавить в кавычках и через запятую саму ссылку и отображаемый текст
*/

var user_links = [ 	"http://vk.com/durov", "Дуров",
			"http://bash.im", "Цитатник Рунета", 
			"http://whatever-you-want", "Ну ты понел",
		];

if (links) {
	for (var i=0; i<user_links.length; i=i+2) {
		var new_link = document.createElement("li");
		new_link.innerHTML = "<a class=\"left_row\" href=\"" + user_links[i] + "\"><span class=\"left_label inl_bl\">" + user_links[i+1] + "</span></a>";
		links.appendChild(new_link);
	}
} 
else {
	console.log("Element not found!");
}