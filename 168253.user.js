// ==UserScript==
// @name           YouTube Dim Background Toggler
// @namespace      http://techexplored.com
// @version        0.1
// @description    Dim the background for a better YouTube experience!
// @include        http://*.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/user/*
// @include        http://youtube.com/user/*
// @include        https://*.youtube.com/watch*
// @include        https://youtube.com/watch*
// @include        https://*.youtube.com/user/*
// @include        https://youtube.com/user/*
// ==/UserScript==

function injectDiv() {
    var div = document.createElement('div');
    div.id = 'dimBG';
    div.setAttribute("style","z-index: 9999; opacity: 0.95; top: 0; left: 0; width: 100%; height: 100%; position: fixed; background-color: #000; display:;")
    document.body.appendChild(div);
}

function toggleBG() {
    var obj = document.getElementById('dimBG');
    if(obj.style.display != 'none') {
        obj.style.display = 'none';
    } else {
         obj.style.display = '';
    }
}

if(document.getElementById('dimBG') === null) {
    injectDiv();
}

document.body.onclick = function() {toggleBG()};