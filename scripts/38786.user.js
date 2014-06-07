// Radiohead Messageboard Background
// Created by Sandbag
// change the background of the RHMB for any other cool image
// ==UserScript==
// @name           RHMB background image
// @namespace      RHMB background image
// @include        http://www.radiohead.com/msgboard/*
// @include        http://www.radiohead.co.uk/msgboard/*
// @include        http://radiohead.com/msgboard/*
// @include        http://radiohead.co.uk/msgboard/*
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(' body {background-image: url(http://www.radiohead.com/Archive/Site9/images/backs/central-park-.jpg); background-attachment: fixed;} ')
