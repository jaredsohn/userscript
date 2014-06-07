// ==UserScript==
// @name           FestiveDrJ.user.js
// @namespace      -
// @description    Dress up DrJ in the spirit of Christmas
// @include        http://www.fluther.com/*
// ==/UserScript==

// ==UserScript==
// @name           fixedbuttons.user.js
// @namespace      -
// @description    Fluther fixed buttons
// @include        http://www.fluther.com/*
// ==/UserScript==

function addScriptToBody(js) {
    var body = document.body, script = document.createElement('script');
    if (!body) {return}
    script.type = 'text/javascript';
    try {script.innerHTML = js}
    catch(x) {script.innerText = js}
    body.appendChild(script);
}

addScriptToBody('javascript:( function() { var newimg=document.createElement("img");newimg.setAttribute("src", "http://michelangelo.fluther.com/images/v2/logos/fluther-holidays.png");var oldimg=document.getElementById("logo");oldimg.parentNode.appendChild(newimg);oldimg.parentNode.removeChild(oldimg);newimg.setAttribute("id", "logo"); } )();');
