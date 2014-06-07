// ==UserScript==
// @name        Arenda-piter enhances
// @namespace   http://www.arenda-piter.ru/
// @include         http://www.arenda-piter.ru/*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
// Copyright Nagaev Maksim  <nagaev.maksim@gmail.com>

$(".tdm_11 em").each(function(){
    var id = $(this).text();
    $(this).html("<a target='_blank' href=\"http://www.arenda-piter.ru/workpage.php?page=variant&nom="+id+"\">"+id+"</a>")
    .css("text-decoration", "underline");
});

$(".tdm_02 table a").each(function(){
    var href = $(this).attr("href");
    var yaHref = href.replace("/mapshow.php?text=", "http://maps.yandex.ru/?text=");
    $(this).attr("href", yaHref);
});