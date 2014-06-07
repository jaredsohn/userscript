// ==UserScript==
// @name           Brein Torrentz
// @namespace      Tim Kuik
// @include        http://anti-piracy.nl/*
// @include        http://www.anti-piracy.nl/*
// ==/UserScript==
// Determine menu text


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div#header { background-image:url(http://imgur.com/jyb2k.png); }');
addGlobalStyle('div#header h1 { background-image:url(http://imgur.com/Mfczz.png); }');





document.body.innerHTML = document.body.innerHTML.replace(/zoeken op trefwoord/gi, "zoeken naar torrentz");


document.body.innerHTML = document.body.innerHTML.replace(/name=\"q\"/gi, "name=\"f\"");


document.body.innerHTML = document.body.innerHTML.replace(/action=\"\/home\/search.asp\"/gi, "action=\"http://www.torrentz.com/search\"");