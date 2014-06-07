// ==UserScript==
// @name           tekstowo.pl
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace      brak
// @description    Czytelny tekst i tłumaczenie na tekstowo.pl, bez zbędnych rzeczy i syfu.
// @include        http://www.tekstowo.pl/*
// ==/UserScript==

jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ?
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}

$('.adv-top').hide();
$('.adv-pion').hide();
$('.adv-home').hide();
$('.adv-bottom').remove();
$('#bottom').remove();
$('.left-column').remove();
$('.big-buttons').remove();
$('.pokaz-tlumaczenie').remove();
$('.pokaz-rev').remove();
$('.green-box').remove();
$('.belka').remove();
$("div:regex(class, teledysk.*)").remove();
$("div:regex(class, glosowanie.*)").remove();
$('#translation').show().attr('id','translationX').attr('style','margin-top:10px;');
$('.tlumaczenie').show();

$('#translation').show();

$(".right-column").attr('style', 'width:100%;margin:0px;padding:0px;float:left;');
$(".song-text").attr('style', 'margin-left:100px;');
$(".tlumaczenie").attr('style', 'margin-right:100px;');
$(".content").attr('style', 'width:100%;margin:0px;padding:0px;');