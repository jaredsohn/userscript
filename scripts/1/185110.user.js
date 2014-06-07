// ==UserScript==
// @name        Cow find
// @namespace   http://userscripts.org/
// @description Find the cow
// @include     http://findtheinvisiblecow.com/
// @version     1
// @grant       none
// ==/UserScript==

function isBlock (elementId) {
    var e = document.getElementById(elementId);
    return ('block' == e.style.display);
}

function findIt () {
    if (!find.cow.pos.x) {
        return false;
    }
    if (isBlock('modal-congratulations')) {
        return false;
    }
    if (isBlock('cow')) {
        return false;
    }
    var t = document.createElement('div');
    t.style.position = 'absolute';
    t.style.left = (find.cow.pos.x - 50) + 'px';
    t.style.top = (find.cow.pos.y -50) + 'px';
    t.style.width = '100px';
    t.style.height = '100px';
    t.style.display = 'block';
    t.style.zIndex = '100';
    t.style.background = 'radial-gradient(50px, rgba(255, 0, 0, 1), rgba(255, 0, 0, 0))';
    t.style.color = '#444';
    t.style.fontFamily = 'sans-serif';
    t.style.fontSize = '9px';
    t.style.lineHeight = '170px';
    t.style.textAlign = 'center';
    t.innerHTML = 'by Spaceboy';
    document.body.appendChild(t);
    window.setTimeout(function () {
        t.parentNode.removeChild(t);
    }, 500);
}

window.setInterval(findIt, 10000);