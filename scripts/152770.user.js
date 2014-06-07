// ==UserScript==

// @name LinguaLeo CSV
// @description    Creates csv-file based on LinguaLeo dictionary. Adds a link to the print view
// @namespace      http://lingualeo.ru/userdict/print
// @include        http://lingualeo.ru/userdict/print
// @include        http://lingualeo.com/userdict/print
// @version        0.2
// @author         plesk

// ==/UserScript==

//Эта функция парсит словарь
unsafeWindow.generateCSV = function generateCSV(){ 
  var dict_arr = new Array() 
  tg = document.getElementsByClassName("ind") 
  for (var i = 1; i < tg.length; i++){ 
     tgpc = tg[i].parentNode.childNodes 
     dict_arr.push(tgpc[3].innerText.replace(";", ",") + ";" + tgpc[5].innerText.replace(";", ",") + ";" + tgpc[7].innerText.replace(";", ",")) 
  } 
  // Создадим новое окно
  newwindow=window.open("","CSV"); 
  // В качестве тела поместим наш CSV
  newwindow.document.body.innerHTML = dict_arr.join("<br>") 
  if (window.focus) {newwindow.focus()} 
} 

// Добавим ссылку в шапку документа
document.body.childNodes[3].innerHTML = document.body.childNodes[3].innerHTML + "<br><a href='' onClick='generateCSV()'>Создать CSV</a>"