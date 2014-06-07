// ==UserScript==
// @name        StartPage save your settings and change the default ixquick-proxy to HideMyAss
// @include     https://startpage.com/*
// @include     https://*.startpage.com/*
// @run-at      document-start
// @version     0.1
// ==/UserScript==

var d       = document,
    urlPath = window.location.pathname.split("/");

/**
 * variable cValue
 * 
 * this string makes the preferences you like on startpage.com
 * to change the preferences, go to: startpage.com/do/preferences.pl
 * change the settings, click on 'Save Settings' and check the cookie value in your console
 * copy the value, and replace it with the value in cValue
 * 
 * @type {string}
 */
var cValue = "sslEEE1N1Nfont_sizeEEEmediumN1Nrecent_results_filterEEE1N1Nlanguage_uiEEEenglishN1Ndisable_open_in_new_windowEEE0N1Ndisable_family_filterEEE1N1Nnum_of_resultsEEE50N1NlanguageEEEenglishN1Ndisable_video_family_filterEEE1N1NsuggestionsEEE1N1N";

// cookie vars
var cName       = "preferences"
    ,cExpireDay = 365;

// check if cookie needs to be set
( d.cookie === "" ) ? setCookie("preferences", cValue, cExpireDay) : false;

// check if cookie is changed. if changed, show cookie in console
( d.cookie.replace("preferences=", "") != cValue ) ? console.log("Cookie: \n\n %c" + d.cookie.replace("preferences=", ""), "background: #222; color: grey") : false;

// remove the stupid ads and other nonsense
GM_addStyle("#sponsored_container, #sponsored, #tip, .bookmark { display:none!important; }");

// if 'search' is in the url, start proxy() to change the proxy url of ixquick-proxy.com
// if you preffer ixquick-proxy, just make a comment of this if-statement
if( urlPath[2] == "search" ) {
    window.addEventListener('DOMSubtreeModified', proxy, false);
}




// FUNCTIONS

// set preferences in cookie
function setCookie(cName, cValue, cExpireDay) {
    var expireDate = new Date(),
        cValue     = escape(cValue);;
    expireDate.setDate(expireDate.getDate() + cExpireDay);
    
    // write cookie
    d.cookie = cName + "=" + cValue + ";domain=.startpage.com;path=/";
    
    // reload page, to load the settings
    d.location.reload(true);
}

// add costum proxy on startpage.com
function proxy() {
    // get all ahrefs and ixquick-proxy ahrefs
    var ahref      = d.querySelectorAll('.result > h3 > a[id^="title_"]')
        ,getProxy  = d.querySelectorAll(".result > p > #proxy_link")
        ,proxyName = "";

    // loop though the urls and change the proxy url
    for(var i=0, len = ahref.length; i < len; i++) {
        // HideMyAss
        getProxy[i].href = "http://www.nullrefer.com/?https://4.hidemyass.com/ip-1/encoded/" + window.btoa(ahref[i].href.substring(4, ahref[i].length));
        proxyName = "HideMyAss";

        // ssl-proxy.my-addr.org
        // getProxy[i].href = "https://ssl-proxy.my-addr.org/myaddrproxy.php/" + ahref[i].href.replace(":/", "");
        // proxyName = "my-addr";
        
        // Change the proxy name on page
        getProxy[i].innerHTML = proxyName;
    }
}