// ==UserScript==
// @id             www.rainymood.com-18027699-689c-40c9-824b-e98467322f43@scriptish
// @name           rainymood volume level
// @version        1.1.0
// @history        1.1.0 Добавил вариант с локальным файлом дождя.
// @history        1.0 Release
// @namespace      http://userscripts.org/scripts/show/168590
// @author         Black_Sunlight
// @include        http://www.rainymood.com/
// @require	https://raw.github.com/Black-Sunlight/lib-files/master/jquery.js
// @run-at         document-end
// ==/UserScript==

//var mp3="http://localhost/RainyMood.mp3"
$(function(){
var uppod="http://uppod.ru/player/uppod.swf", 
      ustyle="?st=http://uppod.ru/player/styles/audio14-919.txt&";
var movie=document.querySelector('object[id^="wimpy_button"]').getElementsByTagName('param')[0].getAttribute('value')
var movietrue=movie.replace(/(http\:\/\/www\.rainymood\.com\/wimpy_button.swf\?theF)(.*)/ig,uppod+ustyle+"f$2")
if(typeof(mp3)!="undefined"){
$('object').attr('id','rain').html('<param value='+(uppod+ustyle+mp3)+' name="movie"><param value="high" name="quality"><param value="transparent" name="wmode"><embed width="230" height="30" name="wimpy_button_64483" type="application/x-shockwave-flash"  pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent" quality="high" src='+(uppod+ustyle+mp3)+'>')
}else{
$('object').attr('id','rain').html('<param value='+movietrue+' name="movie"><param value="high" name="quality"><param value="transparent" name="wmode"><embed width="230" height="30" name="wimpy_button_64483" type="application/x-shockwave-flash"  pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent" quality="high" src='+movietrue+'>')
}
$('#myContent').find('h1').first().append($('#rain'))
$('#rain').wrap('<div/>')
})