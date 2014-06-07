// ==UserScript==
// @author         PoZitron
// @name           Habrahabr topics highlighter
// @description    Жёлтым выделяет топики alizar'а, фиолетовым топики Mithgol'а
// @version        1.0
// @include        http://*habrahabr.ru/*
// ==/UserScript==

(function(){
    var hentry = document.querySelectorAll('div.post');
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
		if (hentry[i].querySelector("div.author a").innerHTML == "Mithgol") {
        //  hentry[i].querySelector(".post_title").style.Color = "#ffff00";  
		  hentry[i].querySelector(".post_title").style.backgroundColor = "#AE7BFF";
        //  hentry[i].querySelector(".post_title").style.fontStyle = "italic";
		}        
	}
})();
