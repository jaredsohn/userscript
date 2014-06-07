// ==UserScript==
// @name         Klavogonki: qualification record
// @namespace    klavogonki
// @version      0.2
// @description  Calculation of the confirmed record based on qualification / Расчет подтвержденного рекорда по квалификации
// @match        http://klavogonki.ru/profile/*/stats/*
// @author       Lexin
// @updateURL    https://userscripts.org/scripts/source/160010.meta.js
// @downloadURL  https://userscripts.org/scripts/source/160010.user.js
// ==/UserScript==
function main(){
    var qualElem = document.getElementById('profile-block').getElementsByClassName('note')[0];
    if (qualElem) {
        var res = /(\d+)\s*зн\/мин/.exec(qualElem.textContent);
        if (res) {
            var qual = res[1];
            qualElem.innerHTML += ' засчитываются все результаты до ' + (qual * 1.2).toFixed() + ' зн/мин';
        }
    }
}
function contentEval(source) {
    if (typeof source == 'function') {
        source = '(' + source + ')();';
    }
    
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}
contentEval(main);