// ==UserScript==
// @name           Red Button remover
// @description    Red Button remover
// @include        http://*.smbc-comics.com/*
// @version        1.0
// ==/UserScript==

if (location.href.indexOf('?id=') !== -1){
    var find = function (str, arr){
        var ret = false;
        arr.forEach(function (elem, i){
            if (str.indexOf(elem) !== -1){
                ret = true;
            }
        });
        return ret;
    }

    if (find(document.getElementById('aftercomic').children[0].src, ['gif', 'jpg', 'png', 'jpeg']) === false){
        var redBtn = document.getElementById('redbtn');
        redBtn.parentElement.removeChild(redBtn);
    }
}