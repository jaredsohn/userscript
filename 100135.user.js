// ==UserScript==
// @name           One.lt_isjungimas
// @description    Bandymas nebepirmas, bet is pirmuju
// @include        http://*.one.lt/navigate.do*friend=*
// @version        1.0
// @copyright      Tadas Ceponis
// @license        Tadas Ceponis licenzijuoja
// ==/UserScript== 

//================================= Naudojamos svetaines ===============================

function init (){


//e = location.href;
//alert(e);

//window.top.close();
closeWindow();

}

if (window.addEventListener) {
    window.addEventListener('load', init, false);
} else {
    document.attachEvent('onload', init);
}