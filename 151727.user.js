// ==UserScript==

// @name LinguaLeo Pretty Print
// @description    Pretty print view for LinguaLeo.ru: remove digits and add letters
// @namespace      http://lingualeo.ru/userdict/print
// @include        http://lingualeo.ru/userdict/print
// @include        http://lingualeo.com/userdict/print
// @version        0.4
// @author         plesk

// ==/UserScript==

// Чистим заголовок
tg = document.getElementsByClassName('ind')[0].innerHTML = ""

// Убираем цифры и добавляем буквы
tg = document.getElementsByClassName('ind gray')
prevSymb = ""

for (var i = 0; i < tg.length; i++){
   txt = tg[i].parentNode.childNodes[3].innerText
   curSymb = txt.substring(txt, 1, 2).toUpperCase()

   if (prevSymb != curSymb){
      tg[i].innerHTML = "<b><font size='5'>" + curSymb + "</font></b>";
   }else{
      tg[i].innerHTML = "";
   }

   prevSymb = curSymb
}

// Серые буквы делаем чёрными
while (tg.length != 0){
   tg[0].className = "ind"
   tg = document.getElementsByClassName('ind gray')
}