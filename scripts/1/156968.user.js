// ==UserScript==
// @name        15Mpedia - Twitter
// @namespace   https://userscripts.org/users/pablog
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @version     1
// @description Integra 15Mpedia con Twitter
// ==/UserScript==

/*
 * Este script integra 15Mpedia con Twitter, mostrando un botón extra si el usuario de Twitter contiene una página en 15Mpedia.
 * 15Mpedia es una enciclopedia libre sobre el movimiento 15M y forma parte del proyecto 15M.cc.
 * Sus normas y pilares son similares a los de Wikipedia.
 */

var username = document.getElementsByClassName('profile-card-inner')[0].getAttribute('data-screen-name');

GM_xmlhttpRequest({
    method: "GET",
    url: "https://wiki.15m.cc/w/api.php?action=ask&query=[[twitter::" + username + "]]&format=json",
    headers: { 
        "User-Agent": "Mozilla/5.0 (Greasemonkey script)",
    },
    onload: function(response) {
        //GM_log(response.responseHeaders);
        //GM_log(response.responseText);
        obj = JSON.parse(response.responseText);
        var results = obj.query.results;

        if (Object.keys(results).length != 0) {
            var key = Object.keys(results)[0];
            var url = results[key].fullurl;

            var newspan = document.createElement('span');
            var target1 = document.evaluate('//div[contains(@class, "user-actions btn-group")]', document, null, 9, null).singleNodeValue;
            var target2 = document.evaluate('//div[@class="user-dropdown js-link btn"]', document, null, 9, null).singleNodeValue;
            newspan.setAttribute('class', 'btn');
            newspan.innerHTML = '<a href="'+url+'" target="_blank">15M</a>';
            target1.insertBefore(newspan, target2);
        }
    },
    onerror: function(response) {
    GM_log("Error/GM_xmlhttpRequest");
    }
});
