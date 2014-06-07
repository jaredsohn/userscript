// ==UserScript==
// @name       CC Forum quick link
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  does not change the nav makes the headline a link
// @description 2014-05-03
// @include    http*://www.conquerclub.com/forum/*
// @copyright  2014+, DgZ345
// ==/UserScript==

document.getElementById("site-description").getElementsByTagName("h1")[0].innerHTML='<a href="/forum/index.php" style="color: rgb(255, 255, 255);">Forum</a>';
