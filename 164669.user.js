// ==UserScript==
// @author 	     ghostamonsta
// @name         Ziza picture width fix
// @namespace    http://ziza.qip.ru/
// @version      0.3
// @description  Ziza.ru picture width fix set width none to correct viewing ziza.ru/girls/page/xxx/, adds a link to download the video, delete confirmation dialogbox age. 
// @match        http://ziza.qip.ru/*
// @copyright    2013+, ghostamonsta
// ==/UserScript==


(function (window, undefined) {  // [2] нормализуем window
    var w;
    if (typeof unsafeWindow != undefined) {
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
    if (w.self != w.top) {
        return;
    }

    GM_addStyle("#dle-content img {max-width: none !important;}");
    
    var deldiv = document.getElementById("lb_overlay");
    if (deldiv) deldiv.parentNode.removeChild(deldiv);
    var deldiv = document.getElementById("popup_1");
    if (deldiv) deldiv.parentNode.removeChild(deldiv);
      
    var embed;
    if (document.getElementById('opv'))    {embed =   document.getElementById('opv').getElementsByTagName('param');}
    if (embed){
    for (i=0; i<embed.length; i++){
      if (embed[i].name=='movie')
      {
      
      var url = embed[i].getAttribute("value").substring(embed[i].getAttribute("value").indexOf("file=") + 5);
      
   
      var link = document.createElement("a");
      link.innerHTML = '<H1><a style="color:red;" href="'+url+'">Download video!!!!&nbsp;</a></H1>';
    
      var details = document.getElementById("dle-content");
      
      details.parentNode.insertBefore(link,details);  
      
      }
      
    }}
    
    
})(window);

