// ==UserScript==
// @name titleSber
// @description Замена title у sberbank
// @author Surovtsev Alex
// @license MIT
// @version 1.0
// @include https://sbi.sberbank.ru:9443/ic/bird/printPrev.zhtml
// ==/UserScript==



// [1] Оборачиваем скрипт в замыкание, для кроссбраузерности (opera, ie)

(function(window, undefined ) {



  // [2] нормализуем window

  var w;

  if (typeof unsafeWindow != undefined){

    w = unsafeWindow 

  } else {

    w = window;  

  }

   // В юзерскрипты можно вставлять практически любые javascript-библиотеки. 

   // Код библиотеки копируется прямо в юзерскрипт. 

// При подключении библиотеки нужно передать w в качестве параметра окна window 

   // Пример: подключение jquery.min.js 

   // (function(a,b){function ci(a) ... a.jQuery=a.$=d})(w);

  

  // [3] не запускаем скрипт во фреймах

  // без этого условия скрипт будет запускаться несколько раз на странице с фреймами

  if (w.self != w.top){

    return;

  }



  // [4] дополнительная проверка наряду с @include

  //if (/http:\/\/userscripts.org/.test(w.location.href)){

    //Ниже идёт непосредственно код скрипта
var destination=w.document.getElementById(".Destination").innerHTML;
var rDestinationPos=destination.indexOf("\n");
if (rDestinationPos<=0) rDestinationPos=destination.length;
var title1="ПП № "+w.document.getElementById(".DocNumber").innerHTML+" от "+w.document.getElementById(".DocDate").innerHTML+" ("
+destination.substr(0, rDestinationPos)+") Получ- "+w.document.getElementById(".Receiver_OrgName").innerHTML.substr(0, 100);
w.document.title=title1;
w.print();
w.close();

//.DocDate
//.Destination
//.Receiver_OrgName
  //}

})(window);