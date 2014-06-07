// ==UserScript==
// @name          NETLOAD
// @namespace     http://jbz.wikidot.com
// @description   Limpia NETLOAD de popups y de los tiempos de espera
// @include       http://netload.in/*
// ==/UserScript==

function addJS(a){
    var b = document.getElementsByTagName('head')[0];
    if (!b) {
        return;
    }
    var c = document.createElement('script');
    c.type = 'text/javascript';
    c.innerHTML = a;
    b.appendChild(c);
}

function getParam(a){
    var b = window.location.href;
    if (a) {
        var c = "[\\?&]" + a + "=([^&#]*)";
        var d = new RegExp(c);
        var r = d.exec(b);
    }
    if (r) {
        return r[1];
    }
}

var IFRAMES_YEAH = document.getElementsByTagName('iframe')

for (var i = 0; i < IFRAMES_YEAH.length; i++) {
    IFRAMES_YEAH[i].parentNode.removeChild(IFRAMES_YEAH[i])
};

window.addEventListener('load', function(e){

    var pag1 = getParam('file_id'); // If it's file -> get captcha
    var pag2 = getParam('id'); // si es la pagina de descargas
    
    if (pag1) {
        addJS('change();'); // elimina la espera
    }
    else 
        if (pag2) {
            window.setTimeout(function(){
                window.location = document.evaluate('//a[@class="Orange_Link"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).href;
            }, 25000)
        }
        else {
            r = document.evaluate('//div[@class="Free_dl"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            window.location = r.snapshotItem(0).firstChild.href;
        }
    addJS('function popUnder(){}'); // elimina los popups
}, false);
