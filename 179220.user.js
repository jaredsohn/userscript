// ==UserScript==
// @name        Bubble extender
// @namespace   olee
// @include     http://drrrchat.com/room/
// @version     1
// @grant       none
// ==/UserScript==

if (!document.getElementsByClassName) {
    document.getElementsByClassName=function(cn) {
        var allT=document.getElementsByTagName('*'), allCN=[], i=0, a;
        while(a=allT[i++]) {
            a.className==cn ? allCN[allCN.length]=a : null;
        }
        return allCN;
    }
}

var el = document.getElementById('body');
el.style.width = '100%';
el.style.left = '0px';
el.style.marginLeft = '0px';

setInterval(function() {
    var el = document.getElementsByClassName('body');
    for (var i = el.length - 1; i >= 0; i--) {
        el[i].style.width = '100%';
        el[i].style.height = '';
    }
    var el = document.getElementsByClassName('bubble');
    for (var i = el.length - 1; i >= 0; i--) {
        el[i].style.width = '';
    }
    var el = document.getElementsByTagName('dd');
    for (var i = el.length - 1; i >= 0; i--) {
        el[i].style.maxWidth = '100%';
    }
}, 250);
/* */
setTimeout(function() {
    window.messageSound = soundManager.createSound({
        id: 'newMessageSound',
        url: 'https://dl.dropboxusercontent.com/u/26603849/drrrchat_messageSound.mp3',
        volume: 100
    });
}, 2000);
/* */
