// ==UserScript==
// @name           Dynamo corrector
// @namespace      http://userscripts.org/users/50041
// @description    Agrega corrector ortografico
// @include        http://*
// @include        https://*
// @include        file:*
// @copyright      Fernando
// @version        1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

// Buttons from YouTube

// addGlobalStyle

function addGlobalStyle(css) {
    if(!(head=document.getElementsByTagName('head')[0])) {return;}
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    var script = document.createElement('style');
    script.type = 'text/javascript';
    script.src = 'C:/proyectos/framework_js/googiespell/AJS.js';
    head.appendChild(script);
    script = document.createElement('style');
    script.type = 'text/javascript';
    script.src = 'C:/proyectos/framework_js/googiespell/googiespell.js';
    head.appendChild(script);
    script = document.createElement('style');
    script.type = 'text/javascript';
    script.src = 'C:/proyectos/framework_js/googiespell/cookiesupport.js';
    head.appendChild(script);
    var link = document.createElement('link');
    link.href = 'C:/proyectos/framework_jsgoogiespell/googiespell.css';
    link.rel = 'stylesheet';
    link.type = 'text/css';
        document.getElementById("idTextArea").setAttribute('class', 'textarea');
        document.getElementById("idAreaComentario").setAttribute('class', 'textarea');
        head.appendChild(link);    
        var googie1 = new GoogieSpell("googiespell/", "https://www.google.com/tbproxy/spell?lang=");
        googie1.decorateTextarea("idTextArea");
        var googie2 = new GoogieSpell("googiespell/", "https://www.google.com/tbproxy/spell?lang=");
        googie2.decorateTextarea("idAreaComentario");



}

addGlobalStyle('.liga{color:green;}');