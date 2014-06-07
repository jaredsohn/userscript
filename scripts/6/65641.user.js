// ==UserScript==
// @name Lepra - I want it all
// @description Подписка на все подлепры, к которым у вас есть доступ.
// @namespace http://leprosorium.ru
// @include http://leprosorium.ru/underground/*
// ==/UserScript==

var pod_lepras = document.querySelectorAll("input[id^='sub_lepro_index']");
var current_page = 1;
var total_pages = Number(document.querySelector("#total_pages strong").innerHTML);

if (location.pathname.indexOf("subscribers") !== - 1) {
	current_page = Number(location.pathname.substr(location.pathname.lastIndexOf("/") + 1));
}

for(var i = 0, l = pod_lepras.length; i < l; i += 1){
	if(!pod_lepras[i].checked){
		pod_lepras[i].click();
	}
}

if (current_page === total_pages) {
	alert("Работа выполнена, %username%.\nCейчас скрипт можно удалить.");
} else {
	location.href = "http://leprosorium.ru/underground/subscribers/" + (current_page + 1);
}

