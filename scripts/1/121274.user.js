// ==UserScript==
// @name           ES_seenap
// @namespace      escilon
// @include        http://escilon.ru/sea/*
// @require  http://static.escilon.ru/js/jquery-1.5.2.min.js
// @require  http://static.escilon.ru/js/jquery.blockUI.js
// @require  http://static.escilon.ru/js/nature.full.js?v=23
// ==/UserScript==




var static_images_path='http://static.escilon.ru';

setTimeout(function(){endPart()}, 3000)
function endPart(){
if ($('#botes_list input').attr('id'))
{
$('#botes_list input')[0].checked=true;
boteattack($('#botes_list input').attr('id'));
}
else {
switch (document.URL){
case 'http://escilon.ru/sea/461/': location.href = 'http://escilon.ru/go/sea/407/'; break
case 'http://escilon.ru/sea/407/': location.href = 'http://escilon.ru/go/sea/353/'; break
case 'http://escilon.ru/sea/353/': location.href = 'http://escilon.ru/go/sea/299/'; break
case 'http://escilon.ru/sea/299/': location.href = 'http://escilon.ru/go/sea/245/'; break
case 'http://escilon.ru/sea/245/': location.href = 'http://escilon.ru/go/sea/191/'; break
case 'http://escilon.ru/sea/191/': location.href = 'http://escilon.ru/go/sea/137/'; break
case 'http://escilon.ru/sea/137/': location.href = 'http://escilon.ru/go/sea/83/'; break
case 'http://escilon.ru/sea/83/': location.href = 'http://escilon.ru/go/sea/82/'; break
case 'http://escilon.ru/sea/82/': location.href = 'http://escilon.ru/go/sea/81/'; break
case 'http://escilon.ru/sea/81/': location.href = 'http://escilon.ru/go/sea/80/'; break
case 'http://escilon.ru/sea/80/': location.href = 'http://escilon.ru/go/sea/79/'; break
case 'http://escilon.ru/sea/79/': location.href = 'http://escilon.ru/go/sea/78/'; break
case 'http://escilon.ru/sea/78/': location.href = 'http://escilon.ru/go/sea/77/'; break
case 'http://escilon.ru/sea/77/': location.href = 'http://escilon.ru/go/sea/76/'; break
case 'http://escilon.ru/sea/76/': location.href = 'http://escilon.ru/go/sea/75/'; break
case 'http://escilon.ru/sea/75/': location.href = 'http://escilon.ru/go/sea/74/'; break
case 'http://escilon.ru/sea/74/': location.href = 'http://escilon.ru/go/sea/73/'; break
case 'http://escilon.ru/sea/73/': location.href = 'http://escilon.ru/go/sea/72/'; break
case 'http://escilon.ru/sea/72/': location.href = 'http://escilon.ru/go/sea/71/'; break
case 'http://escilon.ru/sea/71/': location.href = 'http://escilon.ru/go/sea/70/'; break
case 'http://escilon.ru/sea/70/': location.href = 'http://escilon.ru/go/sea/69/'; break
case 'http://escilon.ru/sea/69/': location.href = 'http://escilon.ru/go/sea/68/'; break
case 'http://escilon.ru/sea/68/': location.href = 'http://escilon.ru/go/sea/122/'; break
case 'http://escilon.ru/sea/122/': location.href = 'http://escilon.ru/go/sea/176/'; break
case 'http://escilon.ru/sea/176/': location.href = 'http://escilon.ru/go/sea/123/'; break
case 'http://escilon.ru/sea/123/': location.href = 'http://escilon.ru/go/sea/177/'; break
case 'http://escilon.ru/sea/177/': location.href = 'http://escilon.ru/go/sea/124/'; break
case 'http://escilon.ru/sea/124/': location.href = 'http://escilon.ru/go/sea/178/'; break
case 'http://escilon.ru/sea/178/': location.href = 'http://escilon.ru/go/sea/125/'; break
case 'http://escilon.ru/sea/125/': location.href = 'http://escilon.ru/go/sea/179/'; break
case 'http://escilon.ru/sea/179/': location.href = 'http://escilon.ru/go/sea/126/'; break
case 'http://escilon.ru/sea/126/': location.href = 'http://escilon.ru/go/sea/180/'; break
case 'http://escilon.ru/sea/180/': location.href = 'http://escilon.ru/go/sea/127/'; break
case 'http://escilon.ru/sea/127/': location.href = 'http://escilon.ru/go/sea/181/'; break
case 'http://escilon.ru/sea/181/': location.href = 'http://escilon.ru/go/sea/128/'; break
case 'http://escilon.ru/sea/128/': location.href = 'http://escilon.ru/go/sea/182/'; break
case 'http://escilon.ru/sea/182/': location.href = 'http://escilon.ru/go/sea/129/'; break
case 'http://escilon.ru/sea/129/': location.href = 'http://escilon.ru/go/sea/183/'; break
case 'http://escilon.ru/sea/183/': location.href = 'http://escilon.ru/go/sea/130/'; break
case 'http://escilon.ru/sea/130/': location.href = 'http://escilon.ru/go/sea/184/'; break
case 'http://escilon.ru/sea/184/': location.href = 'http://escilon.ru/go/sea/131/'; break
case 'http://escilon.ru/sea/131/': location.href = 'http://escilon.ru/go/sea/185/'; break
case 'http://escilon.ru/sea/185/': location.href = 'http://escilon.ru/go/sea/132/'; break
case 'http://escilon.ru/sea/132/': location.href = 'http://escilon.ru/go/sea/186/'; break
case 'http://escilon.ru/sea/186/': location.href = 'http://escilon.ru/go/sea/133/'; break
case 'http://escilon.ru/sea/133/': location.href = 'http://escilon.ru/go/sea/187/'; break
case 'http://escilon.ru/sea/187/': location.href = 'http://escilon.ru/go/sea/134/'; break
case 'http://escilon.ru/sea/134/': location.href = 'http://escilon.ru/go/sea/188/'; break
case 'http://escilon.ru/sea/188/': location.href = 'http://escilon.ru/go/sea/135/'; break
case 'http://escilon.ru/sea/135/': location.href = 'http://escilon.ru/go/sea/189/'; break
case 'http://escilon.ru/sea/189/': location.href = 'http://escilon.ru/go/sea/136/'; break
case 'http://escilon.ru/sea/136/': location.href = 'http://escilon.ru/go/sea/190/'; break
case 'http://escilon.ru/sea/190/': location.href = 'http://escilon.ru/go/sea/137/'; break
}}}

