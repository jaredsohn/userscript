// ==UserScript==
// @name              remove  mixi head from title
// @namespace         http://userscripts.org/users/253871
// @description         mixi.jpのページから [mixi]を消す
// @include                 *
// @include                http://mixi.jp/*
// ==/UserScript==
( function () {
    reg = /\[mixi\]/gi;
    document.title= document.title.replace(reg, '');
})();