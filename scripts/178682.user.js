// ==UserScript==
// @name        GwApplyInSingleCombat
// @namespace   gw
// @description скрипт для подачи заявки в одиночки. 
// @include     http://www.ganjawars.ru/warlist.php?war=armed*
// @version     1
// ==/UserScript==


(function () {


    var root    = (typeof unsafeWindow != 'undefined' ? unsafeWindow : window);
    var doc     = root.document;
    if(window.location.hash == '#go'){
        targetUrl = doc.querySelector('body > div > table:nth-of-type(2) > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td > a').getAttribute('href');
        location.replace(targetUrl);
    }
})();

