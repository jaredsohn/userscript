// ==UserScript==
// @name           Taringa Ohmayk
// @version        1.0.0
// @author         ohmayk
// @description    Oculta Buscar Amigos y re-distribuye los menu de destacados en la pagina principal para widthscreen
// @include        http://www.taringa.net/*
// @exclude        http://www.taringa.net/agregar*
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==


var findFriends = $('a[href="/buscar/amigos/"]');

findFriends.css('display', 'none');

var tipBox = $('.tip-box');

tipBox.css('display', 'none'); 

var breg = $('.b-reg-an');

breg.css('display', 'none'); 

$('#main').css('width','1015px');
$('#main-col').css('width','1015px');
$('#main-col #left-col').css('width','370px');
$('#trendsPostBox').insertBefore('#lastCommentsBox');
$('#topsPostBox').insertAfter('#right-col').css('float','left');

$('#estadisticasBox').insertAfter('#topsUserBox'); // right-col - topsUserBox