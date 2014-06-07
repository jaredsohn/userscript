// ==UserScript==
// @name        censor
// @namespace   http://userscripts.org/user/587636
// @include     http://backdash.pl/forum/*
// @version     4
// @grant       none
// ==/UserScript==
window.myReplace = function myReplace(str, group1) {
    return '<a target="_blank" href="' + group1 + '">' + group1 + '</a>';
}
window.cenzorujem = function(){}
document.getElementById('shoutbox_table') .lastChild.addEventListener('DOMNodeInserted', window.cenzorujem, false);

window.cenzorujem = function () {
    document.getElementById('shoutbox_table') .lastChild.removeEventListener('DOMNodeInserted', window.cenzorujem, false);

    var lyst = document.getElementById('shoutbox_table') .lastChild
    for (var i = 0; i < lyst.childNodes.length; i++) {
        var el = lyst.childNodes[i].firstChild;
        if (typeof (el) != 'undefined' && el != null) {
            if (el.innerHTML.match('>szostakfm<') != null){
                el.firstChild.style.color = '#00AA00' ;
            }
            var matches = false
            var banned = [
            ];
            for (var j = 0; j < banned.length; ++j) {
                if (el.innerHTML.match('>' + banned[j] + '<') != null) {
                    matches = true;
                    break;
                }
            }
            if (matches) {
                lyst.removeChild(lyst.childNodes[i]);
                --i;
            }
        }
    }
    for (var i = 0; i < lyst.childNodes.length; i++) {
        var el = lyst.childNodes[i].lastChild
        if (typeof (el) != 'undefined' && el != null) {
            el.firstChild.innerHTML = el.firstChild.innerHTML.replace(/ (https:\/\/[^" ><]*)/gi, window.myReplace)
            el.firstChild.innerHTML = el.firstChild.innerHTML.replace(/^(https:\/\/[^" ><]*)/gi, window.myReplace)
        }
    }

    
    document.getElementById('shoutbox_table') .lastChild.addEventListener('DOMNodeInserted', window.cenzorujem, false);
}

window.cenzorujem();
