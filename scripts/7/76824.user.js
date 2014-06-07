// ==UserScript==
// @name           Virtonomica: дополнительные реалмы
// @namespace      virtonomica
// @description    Добовляет реалмы Lien и Mary
// @include        http://virtonomica.*/*/main/*
// ==/UserScript==


var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

    $('#realmselect')
        .append($('<a>').attr('href', '/mary/main/user/privat/headquarters').text('Реалм mary'))
        .append($('<a>').attr('href', '/lien/main/user/privat/headquarters').text('Реалм lien'));
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);