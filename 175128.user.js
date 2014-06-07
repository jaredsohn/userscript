// ==UserScript==
// @name        TMD filtru torrente
// @description ascunde torrentele care nu le doresti
// @include     *torrentsmd.com/*
// @include     *torrentsmd.*/*
// @include     *torrentsmoldova.*/*
// @version     1.0
// @icon         http://s017.radikal.ru/i432/1308/7b/34fa18a96812.png
// @require     http://code.jquery.com/jquery-1.10.2.js
// ==/UserScript==

$(document).ready(function () {
    var exclude = ['Дом-2', 
                   'САШАТАНЯ', 
                   '[Trance]', 
                   'iOS', 
                   'TELESYNC', 
                   'CamRip', 
                   'Anime', 
                   'AniMedia', 
                   'СашаТаня', 
                   'Деффчонки', 
                   'Понять. Простить', 
                   'True Blood', 
                   'Уилфред', 
                   'КВН.', 
                   'Дурнушек.Net', 
                   'Квартирный вопрос', 
                   'Чрезвычайное происшествие', 
                   'Pretty Little Liars', 
                   'Avenida Brasil', 
                   'Каникулы в Мексике', 
                   'Teen Wolf', 
                   'Пусть говорят.',
                   '/ CAM]',
                   '[ITA]',
                   '[Alternative]',
                   '[Rock]',
                   '[AlternRock]',
                   '[Metalcore]',
                   '[Hard Rock]',
                   '[Heavy Metal]',
                   'Got Talent',
                   '[Drama]',
                   '[Romance]'];
    exclude.forEach(function(i){
        $('.tableTorrents tr:contains(' + i + ')').hide();
        jQuery(document).ready(function($) {
  $('.tableTorrents b[title="Închis"]').closest('tr').hide();
});
    });
});