// ==UserScript==
// @name          VKontakte_winamp
// @namespace     http://s.gmjs.ru/vk/winamp/
// @description   VKontakte winamp plugin
// @include       *vkontakte.ru*
// @include       *vk.com*
// @version       1.2
// ==/UserScript==


/**

  Скрипт создан на основе скрипта vk_audio.js пакета VkOpt
  http://vkopt.net.ru/
 
*/



(function(){
    var js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = "http://static.gmjs.ru/vk/winamp/vk_winamp.user.js";
    document.getElementsByTagName('head')[0].appendChild(js);

})();