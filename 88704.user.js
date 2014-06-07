// ==UserScript==
// @id             www.zaycev.net-2d5cfc23-b749-47ea-8741-7110af1acfa9@script
// @name           zaycev_direct_link
// @namespace      http://userscripts.org/scripts/show/88704
// @version 2.2.0
// @history 2.2.0 Добавил мгновенное получение ссылки в некоторых случаях.
// @history 2.1.0 Область видимости, надпись ожидание ссылки.
// @history 2.0.1 Доп. проверка.
// @history 2.0.0 Теперь он на jQuery и выдаёт ТОЛЬКО прямую ссылку на mp3, без автоскачивания и прочего, никаких настроек.
// @history 1.5 new class
// @history 1.4 new ID
// @history 1.3 Обновлено под новый дизайн кнопки
// @history 1.2 Обновлён код под scriptish, обновлён regexp
// @history 1.1 Добавлен автоапдейтер
// @history 1.0 Релиз
// @author         Black_Sun
// @description    
// @include        http://*zaycev.net/pages/*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @run-at         document-end
// ==/UserScript==
(function($,win, u, noConsole, FAST){

try{
$(function(){
var lnk=$(".download-block__button.download-block__button_download").attr('href')
if(lnk.search(/http:\/\/dl(.*)zaycev.net\/[a-z0-9]{1,10}\-[a-z0-9]{1,4}\-[a-z0-9]{1,4}\-[a-z0-9]{1,4}(.*)\/(.*)\.mp3/ig)!=-1){
	$('.download-block__top').parent().prepend('<div id="linkbox" class="box" align="center" style="font-size:18px"><a href="'+lnk+'">Ваша ссылка на файл</a><br /><input type="text" value="'+lnk+'" onclick="this.select();" size="'+Math.round(lnk.length-10)+'"></div>')
}
if(lnk.search(/\/download.php\?id=\d{1,}[^\" >]&ass=[^\s\"]+\*?/ig)!=-1){
$('.download-block__top').parent().prepend('<div id="linkbox" class="box" align="center" style="font-size:18px">Ссылка грузиться, ждём...</div>')
$.get(lnk,function(dat){
var dllnk=$('#direct-download-link',dat).find('a').attr('href')
if(dllnk.search(/\http:\/\/dl.zaycev.net\/[^\s\"]+[^\" >]*?/ig)!=-1){
$('#linkbox').html('<a href="'+dllnk+'">Ваша ссылка на файл</a><br /><input type="text" value="'+dllnk+'" onclick="this.select();" size="'+Math.round(dllnk.length-10)+'">')
return false;

} else {
$('.download-block__top').parent().prepend('<div style="font-size:18px;color:green">Упс, что-то не так, изменилась ссылка mp3?</div>');
}
})}})
}catch(er){
    console.log("~~ER_global: "+ er +' (line '+(er.lineNumber||'')+')') 
    }; 

}(jQuery,typeof unsafeWindow !='undefined'? unsafeWindow: window,'undefined',1,1));