// ==UserScript==
// @name          Klavogonki: hide account info
// @namespace     klavogonki
// @version       0.1
// @description   hide account info on the user panel
// @include       http://klavogonki.ru/*
// @author        Lexin
// @updateURL     
// @downloadURL   
// ==/UserScript==

function main(){
    var e = document.getElementById('userpanel-level');
    var acc = e.nextElementSibling;
    if (/.*Аккаунт.*/.test(acc.innerHTML))
    {
        acc.parentNode.removeChild(acc);
    }
}

function execScript(source) {
    if (typeof source == 'function') {
        source = '(' + source + ')();';
    }
    
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = source;
    document.body.appendChild(script);
}

execScript(main);