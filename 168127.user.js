// ==UserScript==
// @id             www.flickr.com-ac3fe513-a410-4570-9c20-6a7a0a7fd069@script
// @name           highest photo download button
// @version        1.0
// @history        1.0 Релизная версия
// @namespace      http://userscripts.org/scripts/show/168127
// @author         Black_Sunlight
// @include        http://www.flickr.com/photos/*/in/*
// @require	   http://code.jquery.com/jquery-latest.min.js
// @run-at         document-end
// ==/UserScript==

var url=location.href
$('#gn-wrap').find('ul').eq(0).append('<li class="toplink gn-upload"><a id="loadng" href="#" class="gn-link">ИДЁТ ЗАГРУЗКА...</a></li>')
if(url.search(/.*sizes.*/ig)==-1){
var osize=url.replace(/(.*)?(\/in\/.*)/ig,'$1/sizes/o$2')
$.get(osize,function(data){
var ourl=$('#allsizes-photo',data).find('img').eq(0).attr('src')
if(ourl.search(/\_d\.[a-z]{1,3}/ig)==-1){
ourl=ourl.replace(/(\_[a-z]{1,3})+(\.[a-z]{1,3})/ig,'$1_d$2')
}
$('#loadng').attr({
'href':ourl,
'title':"В максимально доступном качестве"
}).text("Скачать это фото")
});
}else{
var osize=url.replace(/(.*)?(\/[a-z]{1,}\/in\/)+(.*)/ig,'$1/o/in/$3')
$.get(osize,function(data){
var ourl=$('#allsizes-photo',data).find('img').eq(0).attr('src')
if(ourl.search(/\_d\.[a-z]{1,3}/ig)==-1){
ourl=ourl.replace(/(\_[a-z]{1,3})+(\.[a-z]{1,3})/ig,'$1_d$2')
}
$('#loadng').attr({
'href':ourl,
'title':"В максимально доступном качестве"
}).text("Скачать это фото")
});
}