// ==UserScript==
// @id             remaway@inoyakaigor.ru
// @name           Remove away.php from vk.com links
// @version        1.0
// @namespace      inoyakaigor.ru
// @author         Игорь InoY Звягинцев
// @description    Удаляет из ссылок Вконтакте away.php
// @include        *vk.com/*
// @updateURL      http://inoyakaigor.ru/progs/userscripts/remaway.user.js
// @run-at         document-end
// @icon           data:image/png;base64,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


// ==/UserScript==

function remaway(){
  var a = document.getElementsByTagName("a");
  for(i=0; i<a.length; i++){
    if(a[i].href.match(/away.php/)){
      var offset = a[i].href.search("http%3A%2F%2F");
      if(offset == -1) {
        offset = a[i].href.search("https%3A%2F%2F");
      }
      if(a[i].href.search(/&post=/g) == -1){
        a[i].href = decodeURIComponent(a[i].href.substring(offset));
      }else{
        a[i].href = decodeURIComponent(a[i].href.substring(offset,a[i].href.search(/&post=/g)));
      }
    }
  }
}

window.setInterval(function(){remaway()},500);