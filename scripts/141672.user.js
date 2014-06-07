// ==UserScript==
// @id             forum.ru-board.com-49677d9a-8b6c-4a0a-9ea9-0a12453561cd@script
// @name           ru-board features
// @version        1.3
// @history        1.3 Добавил цвет загруженных данных, что б отличие было хоть какое-то
// @history        1.2 Фикс отображения иконок BB кодов, для показы жмём большую кнопку рядом с полем и жмём верхнюю левую кнопку.
// @history        1.01 Оказывается там уже есть BB-codes
// @history        1.0Релиз скрипта, пока 1 фича, читаем на странице.
// @namespace      http://userscripts.org/scripts/show/141672
// @author         Black_Sun
// @include        http://forum.ru-board.com/*
// @run-at         document-end
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==

var global={
			more:true,
			bbfix:true,
			loadingimage:'data:image/gif;base64,R0lGODlhMgAyAKIAANbW1r29va2trZycnISEhFpaWgAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAgAHACwHAAgAJQAhAAADeni63AfgRUerlfhqCvncW+eIYGmemUWiyuqxcCyjblWX9/jNfC/nL9pOA/TBiqph8qhsIHE7gaDVZIkgUmNQy+36DDHwQXwho8wa9NhsaC/aYjCcMUfHG/exQr7v6+1+a3l3g32AeoiFf36EcHFkjm9ui4iCXm+Bl5MJACH5BAUDAAcALAcAGgAGAAMAAAMIeHoiRKq9dRIAIfkEBQQABwAsBwAYAAkABQAAAw54uifCyzFCVimKWgxPAgAh+QQFBAAHACwHABUACwAIAAADE3i6K8LQwUkJocrOUuAYCueBWAIAIfkEBQUABwAsBwARAAwADAAAAxl4uizC8LhIq12E3HxvKR4YDUMUBAppolYCACH5BAUGAAcALAcADQANABAAAAMeeLp8Ii2+SKuNhNyTt/9FsYWf1V1nFAQUAChr+14JACH5BAUHAAcALAsACgALABIAAAMdeLorwtDBSQmhyuLNVynb143VhWkkI2ErAwDbuyUAIfkEBQgABwAsDgAIAAsAEgAAAx14uivC0MFDyFz16lXK7lsoZhopntGjSSgDANu7JQAh+QQFCQAHACwQAAgADAAPAAADHXi6R3RCsOWgXKXMmbf31dc8YmkqUZmerAcA5VsmACH5BAUKAAcALBEACAAOAAsAAAMceLpVR2RJ1V6ccCohVtacJm7duIRmqo4AsLZrAgAh+QQFCwAHACwSAAgADwAHAAADGXiqRFdlydVenEcIfOrSnMeNADB+QnkqWgIAIfkEBQsABwAsFAAIAA4ACwAAAx14KnJEKkrmoDwAXFVKzNvRhWQpPaaCpmw7NSmTAAAh+QQFCgAHACwXAAgADAAPAAADHQhwIvfwKOaihYTcmLf/RfEd4WieT/epaHs1Y5MAACH5BAUJAAcALBoACAALABIAAAMdCHDcrS42IeSsNktCNNdgyBSFRoqo9WVrKlEalQAAIfkEBQgABwAsHQAKAAsAEgAAAxwIcNytLsopxGT16h0J0R4nakVBmuMVqh+XXVUCACH5BAUHAAcALB8ADQANABAAAAMcCHDcfurJSWsTwh6su2cEoYVfVxTa+ZEWy1lYAgAh+QQFBgAHACwgABEADAAMAAADGAhw3K4uykmjEPXczBsh2dcdRZGVjFh9CQAh+QQFBQAHACwhABUACwAIAAADEghw3K0uyinEZPU6QjRnRaGFCQAh+QQFBAAHACwjABgACQAFAAADDQhw3KcuHiHkrIcQqxMAIfkEBQMABwAsJgAaAAYAAwAAAwgIcHzKQrQTEwAh+QQJAgAHACwHAAgAJQAhAAADJni63P4wykmrvTjrzbv/YCiOZGmeaKqubLsCsBq7dG3feK7vvJYAADs='
}


if(global.more){
var ldd=[];
$('.pusto').each(function(i){
$(this).after('<div id="m'+i+'" style="font-weight:normal;display:none;background:#DDDDDD"></div>');
})
$('.pusto>a').click(function(event,i){
event.stopPropagation();
event.preventDefault();
if($.inArray($(this).parent().next().attr('id'),ldd)!=-1){
$('#'+$(this).parent().next().attr('id')).slideToggle(800)
}else{
/*if(click){
click=false;*/
var block=$(this).parent().next().attr('id'),
       lnk=$(this).attr('href');
ldd.push(block);
$('#'+block).show().html('<img src="'+global.loadingimage+'"/>');
$.get(lnk,function(data){
if(lnk.split('#')[1]>0){$('#'+block).html($('span[class^="post"]',data).eq(lnk.split('#')[1]-1).html())}
else{$('#'+block).html($('span[class^="post"]',data).eq(0).html())}
});/*}else{click=true;$('#'+$(this).parent().next().attr('id')).slideUp(800).html('');}*/}
})
}
if(global.bbfix){
$(function(){
var fix=document.getElementById('fix_tg_pan');
var imgs=fix.getElementsByTagName('img');
for(var i=0;i<imgs.length;i++){
if(imgs[i]){
var style=imgs[i].getAttribute('style').split(';');
for(var j=0;j<style.length;j++){
if(style[j].search('background-position')!=-1)var pos=style[j].split(':')[1]
}
var posit=pos.split(' ')
if(posit[1].search('px')==-1)imgs[i].style.backgroundPosition=posit[1]+'px 0'
}}})}