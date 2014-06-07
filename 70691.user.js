// ==UserScript==
// @name           notextomate
// @namespace      http://leprosorium.ru/users/shmel
// @description    Push Ctrl + Space to detect and prevent the Lepra's textomate feature.
// @include        http://leprosorium.ru/*
// @include        https://leprosorium.ru/*
// @include        http://*.leprosorium.ru/*
// @include        https://*.leprosorium.ru/*
// @grant          GM_xmlhttpRequest
// ==/UserScript==

var zws = "&#8203;"

function findReplaces(callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://leprosorium.ru/fraud/textomate/',
        onload: function(response) {
            response.responseText.replace(/fow_word.>([^<]+)<\//g,
                function(_, word) { callback(word); }
            );
        }
    });
}

function handler(event) {
    if (event.keyCode != 32 || ! event.ctrlKey) {
    return;
    }
    
    var target = event.target;
    if (!/textarea/i.test(target.nodeName)) return;

    function hide(value) {
        var repl = value[0] + zws + value.substring(1);
        var text = target.value;
        var replCount = 0;
        function doRepl(str) { replCount++; return repl; }
        target.value = text.replace(RegExp(value, 'g'), doRepl);
        if (replCount>0)
            alert('Textomate prevented: ' + value);
    }

    findReplaces(hide);

    event.preventDefault();
    if (window.opera && window.opera.postError) {
        setTimeout(function(){ target.focus() }, 0);
    }
}

document.addEventListener('keydown', handler, false);
