// ==UserScript==
// @name            HF CSS Mod
// @namespace       webdev77/CssMod
// @description     HF CSS Mod
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         1.0
// ==/UserScript==



function add(customcss) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = customcss;
    head.appendChild(style);
}

//Changes Reputation comment colors to white
add('.repvoteleft, .repvoteright {color:#FFFFFF !important; }');