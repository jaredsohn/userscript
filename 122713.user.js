// ==UserScript==
// @author         greatkir
// @name           Freehabr topics highlighter
// @description    Выделением цветом топиков избранных авторов
// @version        1.0
// @include        http://*freehabr.ru/*
// ==/UserScript==

(function(){
    var hentry = document.querySelectorAll('div.topic');
	for (var i=0; i<hentry.length; i++){
        // alizar
		if (hentry[i].querySelector("div.author a").innerHTML == "alizar") {

        // Цвет шрифта (выключено)
        //  hentry[i].querySelector(".post_title").style.Color = "#ffff00";

        // Цвет фона текста
		  hentry[i].querySelector(".post_title").style.backgroundColor = "#FFF899";

        // Наклонный шрифт
          hentry[i].querySelector(".post_title").style.fontStyle = "italic";
		}


        // Mithgol
		if (hentry[i].querySelector("li.author a").innerHTML == "vigen65") {
        //  hentry[i].querySelector(".post_title").style.Color = "#ffff00";  
		  hentry[i].querySelector(".post_title").style.backgroundColor = "#AE7BFF";
        //  hentry[i].querySelector("title").style.fontStyle = "italic";
		}        
	}
})();