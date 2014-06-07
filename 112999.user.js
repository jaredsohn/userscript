// ==UserScript==
// @id             www.hobius.com-d3eb53cb-41f3-4af7-97ae-6a73dbcf6919@script
// @name           hobius auto show more
// @version        1.4
// @history        1.4 Допилена вставка ника по клику, переведено в стадию RC, включено по умолчанию.
// @history        1.3 Выключено по умолчанию, переведено в стадию альфа.
// @history        1.2 Добавлен функционал вставки ника по нажатию на коммент, опция commclk. Значение true или false.
// @history        1.1 Теперь работает и на Chrome (Tempermonkey).
// @history        1.0 Релиз
// @namespace      http://userscripts.org/scripts/show/112999
// @author         
// @description    Скрипт нажимает кнопку Show More когда до конца страницы остаётся меньше 500px. Так же скрипт вставляет ник из коммента в форму ответа. Использует jQuery.
// @include        http://www.hobius.com/*
// @require	http://code.jquery.com/jquery-latest.min.js
// @run-at         document-end
// ==/UserScript==

var commclk=true; //Выставите false если не хотите что б ник вставлялся по нажатию на коммент
function commname()
{
  $(this).parent().parent().find("textarea:eq(0)").val($(this).parent().parent().find("textarea:eq(0)").val()+"@"+$("a.user",this).text()+" ").focus();
}
if(commclk){function comm(){$("li",".comments").each(function(){$(this).bind('click',commname);});$('head').append('<style>.comments li{cursor:pointer;}</style>')}}
$(function(){
if(commclk)$('.flink').each(function(){$(this).click(function(){setTimeout(function(){$("li",".comments").each(function(){$(this).unbind('click',commname);});comm()},1000)})})
$(window).scroll(function () {
var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop(),
    showmore=document.getElementById('entries-more');
if(scrollBottom<500 && showmore.innerHTML.indexOf('Show more')!=-1){var event = document.createEvent("HTMLEvents");event.initEvent("click", true, true);document.getElementById('entries-more').dispatchEvent(event);
if(commclk)setTimeout(function(){$("li",".comments").each(function(){$(this).unbind('click',commname);});comm();if(commclk)$('.flink').each(function(){$(this).click(function(){setTimeout(function(){$("li",".comments").each(function(){$(this).unbind('click',commname);});comm()},1000)})})},1000)}});
if(commclk)setTimeout(function(){comm()},1000)
});
