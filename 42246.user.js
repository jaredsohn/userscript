// ==UserScript==
// @name           Battle Countdown
// @namespace      u_tech
// @description    Добавляет счетчик хода в зaголовок окна  
// @include        http://game.dozory.ru/cgi-bin/main.cgi*
// ==/UserScript==

if (parent.parent.frames.length == 3){
  var old_title = parent.parent.document.title.split('*').pop();
  
  function addTitle(){
    parent.parent.document.title = document.getElementById('countdown').innerHTML+ ' * '+old_title;
    window.setTimeout(addTitle, 1000);
  }
  window.setTimeout(addTitle, 1000);
}
