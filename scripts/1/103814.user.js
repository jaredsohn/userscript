// ==UserScript==
// @name          {{brd}} to link
// @namespace     lurkmore.ru/
// @include       http://lurkmore.ru/%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:RecentChanges
// @include       http://lurkmore.ru/index.php?title=%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:RecentChanges*
// @description   Convert {{brd}} template to link
// @version       0.0.1
// @author        xinn
// ==/UserScript==

var brdRegExp = /(\{\{brd\|(\d+)\}\})/g;

document.body.innerHTML = document.body.innerHTML.replace(brdRegExp, "(<a href='http://lurkmore.ru/index.php?diff=$2&oldid='>diff</a>)");