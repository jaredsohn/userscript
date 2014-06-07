// ==UserScript==
// @name           Animenfo Jump
// @namespace      http://abhin4v.myinfo.ws
// @include        http://www.animenfo.com/search.php*
// ==/UserScript==


function jump() {
    resultNodesCount = document.evaluate( 'count(/html/body/div[2]/table/tbody/tr/td[2]/div/table[2]/tbody/tr)', document, null, XPathResult.ANY_TYPE, null ).numberValue;


    if (resultNodesCount == 2 || resultNodesCount == 3) {
        resultNodes = document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/div/table[2]/tbody/tr[2]/td/a" , document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
        window.location = resultNodes.snapshotItem(0).href;
    }

}

//window.addEventListener('load', moveForward, false);
jump();