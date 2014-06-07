// ==UserScript==
// @name       		My Fancy New Userscript
// @namespace  		MFNUSNSyep
// @version    		0.1
// @description  	enter something useful: useful
// @include    		http://www.heroeswm.ru/auction.php*art_type*
// ==/UserScript==

    var wb = document.getElementsByClassName('wb');
    var as = [];
    for (var i=1; i<wb.length; i++) {
        var tv = wb[i].childNodes;
        as.push(tv);
    }
    for (var i= 0; i<as.length; i++) {
        var prochka = as[i].item(0).getElementsByTagName('img').item(0).getAttribute('title');
        prochka = prochka.substring(prochka.indexOf('Прочность:')+11);
        prochka = prochka.substring(0,prochka.indexOf('/'));
        var ins = as[i].item(2).querySelectorAll('table > tbody > tr > td').item(2);
        var price = ins.innerHTML;
        while (price.indexOf(',') != -1) {
            price = price.substring(0,price.indexOf(',')) + price.substring(price.indexOf(',')+1);
        }
        ins.innerHTML = ins.innerHTML + '<br>' + (price/prochka).toFixed(2);
    }