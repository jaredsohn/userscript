// ==UserScript==
// @name       Codeforces Copy Input Botton
// @include        http://codeforces.com/contest/*/problem/*
// @include        http://codeforces.ru/contest/*/problem/*
// @include        http://codeforces.com/problemset/problem/*/*
// @include        http://codeforces./problemset/problem/*/*
// @include        http://www.codeforces.com/contest/*/problem/*
// @include        http://www.codeforces.ru/contest/*/problem/*
// @include        http://www.codeforces.com/problemset/problem/*/*
// @include        http://www.codeforces./problemset/problem/*/*
// ==/UserScript==

function substituteBrForNewline(myString) {
    var length;
    do {
        length = myString.length;
        myString = myString.replace('<br>', '\n');
    } while (length != myString.length);
    return myString;
}

function addCopyLink(obj) {
    var preObj, link;
    preObj = obj.getElementsByTagName('pre')[0];
    link = obj.getElementsByClassName('title')[0].appendChild(document.createElement('a'));
    link.style.fontSize = '70%';
    link.innerHTML = ' [copy]';
    link.addEventListener('click', function() { GM_setClipboard(substituteBrForNewline(preObj.innerHTML)); }, false);
}

function main() {
    var inputs = document.getElementsByClassName('input'), i;
    for (i = 0; i < inputs.length; i++) addCopyLink(inputs[i]);
}

main();

