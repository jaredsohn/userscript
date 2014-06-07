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

addNewStyle('#city #container .phase1, #city #container .phase2, #city #container .phase3, #city #container .phase4, #city #container .phase5, #city #container .phase6, #city #container .phase7, #city #container .phase8, #city #container .phase9, #city #container .phase10, #city #container .phase11, #city #container .phase12, #city #container .phase13, #city #container .phase14, #city #container .phase15, #city #container .phase16, #city #container .phase17, #city #container .phase18, #city #container .phase19, #city #container .phase20, #city #container .phase21, #city #container .phase22, #city #container .phase23, #city #container .phase24, #city #container .phase25, #city #container .phase26, #city #container .phase27, #city #container .phase28, #city #container .phase29, #city #container .phase30, #city #container .phase31, #city #container .phase32, #city #container .phase33, #city #container .phase34, #city #container .phase35, #city #container .phase36, #city #container .phase37, #city #container .phase38, #city #container .phase39, #city #container .phase40, #city #container .phase1012 {background-image:url(http://s17.ikariam.net/skin/img/city/city_level24.jpg);}');
addNewStyle('#city #container #mainview #locations .wall .buildingimg {background-image:url(http://s17.ikariam.net/skin/img/city/building_wall.gif);}');
