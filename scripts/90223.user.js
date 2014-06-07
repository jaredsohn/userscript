// ==UserScript==
// @name           BR Eater
// @description    ブログなどでよく目にする連続改行を省略し読みやすくします。
// @include        http://ameblo.jp/*
// @include        http://gree.jp/*
// ==/UserScript==
(function()
{
  document.body.innerHTML = document.body.innerHTML.
    replace(/(<br>\s*){2,}<br>/ig, '<br><br>').
    replace(/(<div>\s*&nbsp;\s*<\/div>\s*){2,}<div>/ig, '<div>&nbsp;</div><div>');
})();
