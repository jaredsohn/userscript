// ==UserScript==
// @name           Big Ferma
// @namespace      ferma
// @description    Big Ferma by NeOn
// @include        http://farmer.vkontakte.ru/*
// ==/UserScript==


var width = "100%"; //ширина фермы
var height = "650"; //высота фермы

var header = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">'+
'<html>'+
'  <head>'+
'    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">'+
'    <style type="text/css">'+
'      html, body {height:100%;padding: 0px; margin: 0px;}'+
'      #main {'+
'        width: 100%;'+
'        height:100%;'+
'        min-height:100%;'+
'      }'+
'    </style>'+
'  </head>'+
'  <body>';

var footer = '<a href="http://yar-net.ru/f/index.php?showtopic=70050939">Об ошибках писать сюда</a> | <a href="http://vkontakte.ru/id3962482" target="top">Автор мода "большая ферма"</a> | <a href="#" onClick="javascript: location.reload()" style="cursor: pointer">Вернуть как было</a></body></html>';

function ololo()
{
if (confirm("Сделать большую ферму?")) {
var x = document.getElementById('searchResults').innerHTML;
x = x.replace(/607/, width);
x = x.replace(/550/, height);
x = x.replace(/607/, width);
x = x.replace(/550/, height);
x = x.replace(/10px/, "0px");
x = x.replace(/10px/, "0px");
document.write(header + x.split('<div style="border-top: 1px ', 1) + footer)
document.title = 'Большая ферма by NeOn';
}
}

setTimeout(ololo, 3000);
