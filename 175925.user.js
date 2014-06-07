// ==UserScript==
// @name           gyogyital-aldott_kulacs
// @namespace      vegzetur
// @include        http://*.vegzetur.hu/index.php?m=karakterlap&sub=targylista
// ==/UserScript==

var min_ep = 85500;

function id(elem){
    return document.getElementById(elem);
}

function iszik(){
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://vilag3.vegzetur.hu/index.php?m=karakterlap&sub=targylista&tev=visel&targy=1584'
       
    });
}

var matches = document.getElementById('karakter_ep').innerHTML;
EP = parseInt(matches.replace(".","").replace(".","").replace(".",""));
if (EP<min_ep && document.body.innerHTML.indexOf('áldott kulacs')>0){
    setTimeout(iszik, 2000);   
}