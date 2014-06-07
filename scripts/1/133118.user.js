// ==UserScript==
// @name           MoeOnlineIngnorer
// @description    Игнор для MoeOnline
// @include        http://www.moe-online.ru/post/*
// @version        1.0
// ==/UserScript==

var ignore = [];

main_container = document.getElementById('prgpost_list');
list_container = document.getElementById('modmessage_list');

var block_main = function(){
	main_container.removeEventListener("DOMSubtreeModified", block_main, true);
        var elements = main_container.getElementsByClassName('inf');

	for(var i = 0; i < elements.length; i++) {
		var name = elements[i].childNodes[1].innerHTML;	
		for(var j = 0; j < ignore.length; j++) {
		    if(name.indexOf(ignore[j]) != -1) {
				elements[i].parentNode.parentNode.style.display = 'none';
			}
		}
	}
}

var block_list = function(){
    var elements = list_container.getElementsByClassName('info');
	
	for(var i = 0; i < elements.length; i++) {
		var name = elements[i].childNodes[0].innerHTML;	
		console.info(name);
		for(var j = 0; j < ignore.length; j++) {
		    if(name.indexOf(ignore[j]) != -1) {
		         elements[i].parentNode.parentNode.style.display = 'none';
		    }
		}
	}
}

if(main_container != null) {
	main_container.addEventListener("DOMSubtreeModified", block_main, true);
	block_main();
}
if(list_container != null) {
	list_container.addEventListener("DOMSubtreeModified", block_list, true);
	block_list();
}