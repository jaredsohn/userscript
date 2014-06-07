// ==UserScript==
// @name       rutor.org color torrent
// @namespace  rutor
// @version    1.0
// @description  ваши любимые раздачи не утекут мимо, редактируем на свой вкус
// @include      *rutor.org*
// @copyright  drakulaboy
// @require     http://code.jquery.com/jquery-1.6.4.js
// ==/UserScript==

$('div#index tr').filter(function () {
    return /Кухня|Универ/.test(this.innerText);
}).closest('tr').css('background-color', '#40E0D0');