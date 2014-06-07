// ==UserScript==
    // @name                meyone
    // @namespace   blablabla
    // @description a filter twitter
    // @include             **
    // ==/UserScript==
    // ==Authors==
    //              Meyone
    //              
    // ==Edited by
    //      Mey
    //      
    //==License==
    //      NOONNE
    //              
    //      
__cnt__=0; jQuery('.stream A.follow-btn > DIV.follow-text').each(function (i, ele) { ele = jQuery(ele); if (ele.css('display')!='block') {console.log('already following:', i); return;} setTimeout(function () {ele.click();}, __cnt__++*500); });