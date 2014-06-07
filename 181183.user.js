// ==UserScript==
// @id             notabenoid.com-be5dfe5a-598d-40bf-96a3-fb6adf563293@scriptish
// @name           notabenoid already voted color
// @version        1.0.2
// @history        1.0.2 Обновил библиотеку и создание
// @history        1.0.2 Теперь запросы выполняются по добавленной кнопке "Мои голоса"
// @history        1.0.0 Релиз
// @namespace      http://userscripts.org/scripts/show/181183
// @author         Black_Sunlight
// @include        http://notabenoid.com/*/*
// @include        http://notabenoid.ru/*/*
// @require	https://raw.github.com/Black-Sunlight/lib-files/master/jquery.js
// @run-at         document-end
// ==/UserScript==

$(function(){
$('#tb-main>div').append('<button id="myvotes" class="btn" title="Выделить элементы где я голосовал">Мои голоса</button>')
$('#myvotes').on('click',function(){myvotes()})
})
function myvotes(){
var nick=$('#header-submenu').find('strong').eq(0).text()
$('div[id^="t"]').each(function(){
var self=$(this);
$.get(location.href.split('?')[0]+'/rating_explain?id='+self.attr('id').substring(1),function(data){
var obj=$.parseJSON(data)
$.each(obj,function(i){
if(obj[i].login==nick){self.attr('style','background:rgba(0, 204, 0, 0.10)')}
})
})
})
}
