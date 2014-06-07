// ==UserScript==
// @name           check*pad Extend Jump To
// @namespace      http://longhand.blog.shinobi.jp/
// @description    Extend right side pulldown box for jumping to other list in check*pad.
// @include        http://www.checkpad.jp/projects/view/*
// ==/UserScript==

/* NOTE: check*pad has already required jQuery. */

window.addEventListener('load', function () {
//////// window.addEventListener::load::START

    var pulldownBox = document.getElementById("selectJumpTo");
    pulldownBox.setAttribute("size", pulldownBox.length);

//////// window.addEventListener::load::END
}, false);
