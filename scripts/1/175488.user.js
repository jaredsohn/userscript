// ==UserScript==
// @id             *-35776adf-67ae-4008-9c39-e1e989d0fc39@scriptish
// @name           comments del
// @version        2.1.2
// @history        2.1.2 заменит attr на prop
// @history        2.1.1 Не там был вызов анонимной функции
// @history        2.1.0 Переписал область видимости и таймер, который теперь реально работает (запрос:1секунда:запрос...).
// @history        2.0.0 Кроссбраузерные области видимости. И области доступа.
// @history        1.1.2 Сорри за Алерты
// @history        1.1.1 Переменная для внутреннего доступа, для задержки.
// @history        1.1.0 Добавлено серьёзный фикс, поэтому версия 1.1.0 (новый инклюд и определение страницы по заголовку, таким образом скрипт теперь работает не только на странице с 10 комментами) 
// @history        1.0.1 Добавлено название чекбокса для снятия/выделения всех.
// @history        1.0.0 Релиз
// @namespace      http://userscripts.org/scripts/show/175488
// @author         Black_Sunlight
// @description    Выборочное массовое удаление комментариев на ucoz
// @include        http://*/index/86
// @include        http://*/index/
// @require	http://code.jquery.com/jquery-latest.min.js
// @run-at         document-end
// ==/UserScript==

(function(win, u, noConsole, FAST){

$(function(){
if($('title').text()=="Управление комментариями"){
$('form[id^="frm"]').eq(0).after('<label for="all">Выделить/снять всё: </label><input type="checkbox" id="all" title="Выделить/снять всё"/>  <button id="go">Удалить</button>')
var scr=$('body').find('script').eq(0).text();
var m=scr.match(/ssid:\'[a-zA-Z0-9]{1,10}/ig)+'';
var ssid=m.replace(/ssid:\'/ig,'')
var first='1';

$('table[id^="comEntT"]').each(function(i){
var id=$(this).attr('id').split('comEntT').join('');
$(this).find('td[align="right"]').find('span').eq(0).before('<input id="'+id+'" type="checkbox" />')
})

$('#all').change(function(){
if($(this).prop('checked')){$('input[type="checkbox"]').prop('checked',true)}
else{$('input[type="checkbox"]').prop('checked',false)}
});

$('#go').on('click',function(){
$('input[type="checkbox"]').each(function(){
var $that=$(this)
if($(this).prop('checked')){
win._uPostForm('',{url:'http'+'://'+document.location.host+'/index/',type:'POST',data:{ssid:ssid,a:'38',s:$that.attr('id')}});
sleep(1000);
}
})
})
}
});
function sleep(ms) {
ms += new Date().getTime();
while (new Date() < ms){}
}
}(typeof unsafeWindow !='undefined'? unsafeWindow: window,'undefined',1,1));