// ==UserScript==
// @name        Cross Domain GET
// @namespace   Cross_Domain_GET
// @include     http://userscripts.org/topics/136264*
// @version     1.01
// @grant       GM_xmlhttpRequest
// ==/UserScript==

console.log('start');

function getImages(htmlStr) {
    var tbl, inhtml, imgs, anchors;
    tbl = document.createElement('table');

    /* Adding original domain to each img */
    inhtml = htmlStr.split("src\=\'\/").join("src\=\'http\:\/\/dragcave.net\/");

    /* Adding original domain to each anchor */
    inhtml = inhtml.split("href\=\"\/").join("href\=\"http\:\/\/dragcave.net\/");

    /* Creating DOM table for searches */
    tbl.innerHTML = inhtml;

    imgs = tbl.getElementsByTagName('img');
    //	anchors = div.getElementsByTagName('a');
    return imgs;
}

GM_xmlhttpRequest({
    method: "GET",
    url: "http://dragcave.net/abandoned",
    headers: {
        "User-Agent": "Mozilla/5.0"
    },
    onload: function (response) {
        console.log([
        response.status,
        response.statusText,
        response.readyState,
        response.responseHeaders,
        response.responseText,
        response.finalUrl].join("\n"));
        var tabl = response.responseText.match("<table.*?>(.*?)</table>")

        /* Getting full table */
        console.log(tabl[0]);

        /* Getting imgs */
        var images = getImages(tabl[0]);
        console.log(images);

        console.log('finish');
    }
});