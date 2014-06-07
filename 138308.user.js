// ==UserScript==
// @name           coloration pseudo jvc
// @namespace      colorationpseudo
// @description    coloration
// @include        http://www.jeuxvideo.com/forums/0-*
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://www.jeuxvideo.com/messages-prives/*
// ==/UserScript==

var pseudo, i, tr, td, ul, change;
pseudo = {};
pseudo.add = function (name, color) {
    this[name.toLowerCase()] = color;
}

pseudo.add("Skelletor543", "#DD0000");


function change(elem, pseudo) {
    if (pseudo.hasOwnProperty(elem.innerHTML.toLowerCase())) {
        elem.style.color = pseudo[elem.innerHTML.toLowerCase()];
    }
}

if (new RegExp("\\.jeuxvideo\\.com/forums/([0-9]+)\\-([0-9]+)\\-([0-9]*)\\-([0-9]*)\\-([^-]*)\\-([0-9]*)\\-([0-9]*)\\-(.*)\\.htm#?(.*)").test(location.href)) {
    switch (RegExp.$1) {
    case "0" :
        try {
            tr = document.getElementById("liste_topics").getElementsByTagName("tr");
            for (i = 0; i < tr.length; ++i) {
                var td = tr[i].getElementsByTagName("td");
                if (td.length > 3) {
                    change(td[td.length - 3], pseudo);
                }
            }
        } catch (e) {
        }
        break;
    case "1" :
    case "3" :
        try {
            ul = document.getElementById("col1").getElementsByTagName("ul");
            for (i = 0; i < ul.length; ++i) {
                change(ul[i].getElementsByTagName("strong")[0], pseudo);
            }
        } catch (e) {
        }
        break;
    }
}