// ==UserScript==

// @name DCD CopyTags
// @description    Creates message box with all tags in a one string on artist or album page at http://dcdnet.ru.
// @namespace      http://dcdnet.ru/artists/*
// @include        http://dcdnet.ru/artists/*
// @include        http://dcdnet.ru/albums/*
// @include        http://www.dcdnet.ru/artists/*
// @include        http://www.dcdnet.ru/albums/*
// @version        0.1a
// @author         plesk

// ==/UserScript==

// Соберём все теги в строку
unsafeWindow.getTags = function(j){ 
  getTags_ = "";
  tl = document.getElementsByClassName('supplementary')[j].childNodes[0].childNodes[3].childNodes[1].childNodes[1].getElementsByClassName("output");

	for (var i = 0; i < tl.length; i++){
	   if (getTags_.length != 0){
        getTags_ = getTags_ + "; "
	   }
     getTags_ = getTags_ + tl[i].textContent.trim();
  }

  alert(getTags_);
}


tg = document.getElementsByClassName('supplementary')
// Переберём все блоки боковой панели
for (var i = 0; i < tg.length; i++){
   tg1 = tg[i].childNodes[0].childNodes[1].childNodes[0];
   // Если в шапке блока встретилось слово "Теги" - этот блок наш
   if (tg1.innerHTML == "Теги"){
      tg1.innerHTML = tg1.innerHTML + "   <input type='image' onClick='getTags("+i+");' src='http://dcdnet.ru/style/artist-even.png' align='center'>";
   }
}

