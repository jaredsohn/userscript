// ==UserScript==
// @name           gyogyital-elteto_fiola
// @namespace      vegzetur
// @include        http://*.vegzetur.hu/index.php?m=karakterlap&sub=targylista
// ==/UserScript==

var min_ep = 45500;

function id(elem){
    return document.getElementById(elem);
}

function iszik(){
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://vilag3.vegzetur.hu/index.php?m=karakterlap&sub=targylista&tev=visel&targy=1582'
       
    });
}

var matches = document.getElementById('karakter_ep').innerHTML;
EP = parseInt(matches.replace(".","").replace(".","").replace(".",""));
if (EP<min_ep && document.body.innerHTML.indexOf('kisebb éltető fiola')>0){
    setTimeout(iszik, 2000);   
}