// ==UserScript==
// @name           saerch hot key
// @namespace      saerch_hot_key
// @description    focus search area on ctrl + space
// @include        http://sa-serv10.tb.local/glpi/*
// @include        http://sa-serv10/glpi/*
// @include        http://www.les-verbes.com/*
// @include        http://les-verbes.com/*
// @include        http://*.php.net/*
// @include        http://php.net/*
// @include        http://ya.ru/*
// @include        http://yandex.ru/*
// @include        http://www.ya.ru/*
// @include        http://www.yandex.ru/*
// @include        http://lingvopro.abbyyonline.com/*
// @include		   http://www.lingvo-online.ru/*
// @grant		   none
// ==/UserScript==


// 0 - up
// 1 - down
var ctr = 0;
var key = 0;
var xpath_url = "";
var host = document.location.host;

//alert(host);

if( host == "www.les-verbes.com" || host == "les-verbes.com" ){

    xpath_url = "//form[@action='conjuguer.php']//input[@name='verbe']";

}else if( host == "sa-serv10.tb.local" ){

    xpath_url = "//div[@id='champRecherche']/input";

}else if( host == "www.php.net" || host == "php.net" ){

    xpath_url = "//form[@id='topsearch']//input[@name='pattern']";

}else if( host == "www.yandex.ru" || host == "yandex.ru"  || host == "ya.ru"  || host == "www.ya.ru" ){

    xpath_url = "//form[@action='http://yandex.ru/yandsearch']//input[@id='text']";

}else if( host == "google.ru" || host == "google.ru" ){

    xpath_url = "//input[@id='gs_htif0']"

}else if( host == "lingvopro.abbyyonline.com" || host == "www.lingvo-online.ru"){

    xpath_url = "//textarea[@id='searchText']"

}
//

if( ! window.opera){
//    doc = document.wrappedJSObject;

    doc = document;

    doc.onkeydown = function(e){
        if(e.keyCode == 17){
            ctr = 1;
        }
        if(e.keyCode == 32){
            key = 1;
        }

        if( ctr && key ){

            if( xpath_url ){
                xpathfirst( xpath_url ).select();
//                xpathfirst( xpath_url ).focus();
            }
        }
    }
    doc.onkeyup = function(e){
        if(e.keyCode == 17){
            ctr = 0;
        }
        if(e.keyCode == 32){
            key = 0;
        }
    }
}

/**
 * Возращает первый результат xpath запроса query
 */
function xpathfirst(query, startingPoint)
{
    var res = xpath(query, startingPoint);

    if (res.snapshotLength == 0){return false;}

    return res.snapshotItem(0);
}
/**
 * Обертка для xpath запроса
 */
function xpath(query, startingPoint){
    
    if (startingPoint == null) {
        startingPoint = document;
    }
    var retVal = document.evaluate(query, startingPoint, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    return retVal;
}
