// ==UserScript==
// @name          BuO Linker
// @namespace     Социолог
// @author        Социолог (http://otvety.google.ru/otvety/user?userid=15818589940208089811)
// @description   Браузерный плагин для превращения статичных URl`ов в кликабельные ссылки. Для ВиО...
// @version       1.0
// @include       http://otvety.google.ru/*
// @include       http://www.otvety.google.ru/*
// ==/UserScript==


function linkify(text){
    if (text) {
        text = text.replace(
            /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
            function(url){
                var full_url = url;
                if (!full_url.match('^https?:\/\/')) {
                    full_url = 'http://' + full_url;
                }
                return '<a target="_blank" href="' + full_url + '">' + url + '</a>';
            }
        );
    }
    return text;
}

(function() {
  var url = document.getElementById('wpcpiroot');
  if (document.readyState == "complete") {
    linkify(url)
  } else {
    window.addEventListener('load', function() { linkify(url) }, true);
  }
})();