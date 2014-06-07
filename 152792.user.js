// ==UserScript==

// @name DCD Album PostCode tags
// @description    Adds album tags to the post code on album page at http://dcdnet.ru.
// @namespace      http://dcdnet.ru/albums/*
// @include        http://dcdnet.ru/albums/*
// @include        http://www.dcdnet.ru/albums/*
// @version        0.5a
// @author         plesk

// ==/UserScript==
// Соберём все теги в строку
// Переберём все блоки боковой панели
var getTags_ = ""
tg = document.getElementsByClassName('supplementary')
for (var j = 0; j < tg.length; j++){
   tg1 = tg[j].childNodes[0].childNodes[1].childNodes[0];
   // Если в шапке блока встретилось слово "Теги" - этот блок наш
   if (tg1.innerHTML.indexOf("Теги") >= 0){
     tl = tg[j].childNodes[0].childNodes[3].childNodes[1].childNodes[1].getElementsByClassName("output");
     for (var i = 0; i < tl.length; i++){
       if (getTags_.length != 0){
          getTags_ = getTags_ + "; "
	   }
       getTags_ = getTags_ + tl[i].textContent.trim();
     }
   } 
}

if (getTags_ != ''){    
  code = document.getElementById('post_insert_textarea')
  code1 = code.innerHTML.substring(0, code.innerHTML.indexOf('[album]'))    
  code2 = code.innerHTML.substring(code.innerHTML.indexOf('[album]'))
  if (code2.indexOf(' ') >= 0){
     code2 = code2.substring(0, code2.indexOf(' '))
  }
  code3 = '&lt;br&gt;&lt;br&gt;&lt;i&gt;&lt;b&gt;Теги: &lt;/b&gt;' + getTags_ + '&lt;/i&gt;&lt;/p&gt;'
  code.innerHTML = code1+code2+code3
}