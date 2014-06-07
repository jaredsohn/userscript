// ==UserScript==
// @name           Ikariam Big City Edit
// @namespace      Ikariam Big City Edit - Replace city view...
// @mail           metehanarslan@gmail.com
// @description    Ikariam Big City Edit userscript replaces the city view with a cool town background. Image hosting was changed to be better. Some businesses block image shack so photobucket was used for this one....
// @include        http://s*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==




function addNewStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
