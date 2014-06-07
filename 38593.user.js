// Old Radiohead Messageboard
// Created by Sandbag
// yeh it's pure css edition cause i'm an noob and i can't be arsed
// ==UserScript==
// @name           Old RHMB
// @namespace      OLD RHMB
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

addGlobalStyle(' font {color: #000000; font-family: arial;}'); 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(' .body {font-family: arial;}'); 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(' .BodyBold { font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #000000 ; font-weight: bold;  text-transform: uppercase; }'); 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.Menu { font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: normal; text-transform: lowercase; color: #000000; }'); 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.IndividualMessageSubject { font-family:  Arial, Helvetica, sans-serif; font-size: 12px; color: #000000 ; font-weight: normal}'); 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.IndividualMessageBody { font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #000000 ; font-weight: normal}'); 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(' .BodyLarge { font-family: Arial, Helvetica, sans-serif; font-size: 16px;}'); 
