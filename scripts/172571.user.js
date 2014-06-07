// ==UserScript==
// @name                        Helvetifeedly
// @namespace                   Helvetifeedly
// @version                     0.2
// @reason                      sidebar auto scroll to feeds list
// @author                      Mescoda on http://mescoda.com/
// @description                 Style for Feedly.com
// @include                     http://www.feedly.com/home*
// @include                     https://www.feedly.com/home*
// @include                     http://cloud.feedly.com/*
// @include                     https://cloud.feedly.com/*
// @include                     http://feedly.com/*
// @include                     https://feedly.com/*
// @grant                       GM_xmlhttpRequest
// ==/UserScript==

(function() {
    var headElem = document.getElementsByTagName('head')[0],
        cssElem = document.createElement('style'),
        cssArray = [],
        interval;
    cssArray.push("*{font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif !important;}")
    cssArray.push("#box .entryBody, #box .entryHeader{font-family: 'Helvetica Neue',Helvetica,Arial,'Hiragino Sans GB','WenQuanYi Micro Hei',simsun,sans-serif !important; font-size:16px; color:#333;}");
    cssElem.textContent = cssArray.join('\n');
    headElem.appendChild(cssElem);
    function setSidebarScroll() {
        if(document.getElementById('feedlyTabs') && document.getElementById('feedlyTabs').childNodes.length) {
            document.getElementById('feedlyTabs').scrollTop = 170;
            clearInterval(interval);
        }
    }
    interval = setInterval(setSidebarScroll, 200);
})();