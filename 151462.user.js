// ==UserScript==
// @name       Block Last Christmas
// @namespace  m36
// @version    0.2
// @description  Blocks Last Christmas
// @include        http*://*tube*
// @include        http*://*video*
// @include        http*://*vimeo*
// @copyright  2012 m36
// ==/UserScript==
if (document.title.match(/wham/gi) || document.title.match(/last\s*christmas/gi)) {
    document.write('<!--');
    window.stop();
    document.title = "Wham - Last Christmas detected.";
    document.innerHTML = "";
}