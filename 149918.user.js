// ==UserScript==
// @name        John Doe Google
// @namespace   http://www.sharkpp.net/
// @version     0.5
// @description real name shield for Google site
// @author      sharkpp
// @copyright   2012-2014, sharkpp
// @license     MIT License
// @include     https://*.google.co.jp/*
// @include     https://*.google.com/*
// @include     https://www.youtube.com/*
// @include     http://*.google.co.jp/*
// @include     http://*.google.com/*
// @include     http://www.youtube.com/*
// ==/UserScript==

(function (){
    var targets = [
            { xpath: '//*[@id="gbi4t"]',          style: '', text: 'John Doe' },
            { xpath: '//*[@class="gb_x gb_2 gb_e gb_W"]', style: '', text: 'john@example.net' },
            { xpath: '//*[@class="gb_da"]', style: '', text: 'John Doe' },
            { xpath: '//*[@class="gb_ea"]', style: '', text: 'john@example.net' },
            { xpath: '//*[@id="gb_119"]/span[2]', style: '', text: '+John' },
            { xpath: '//*[@id="yt-masthead-user-displayname"]', style: '', text: 'John' },
            { xpath: '//*[@data-pid="119"]/span[2]',      style: '', text: '+John' },
        ];
    for (var i = 0, num = targets.length; i < num; i++) {
        var items = document.evaluate(targets[i].xpath, document, null,
                                      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var j = 0; j < items.snapshotLength; j++) {
            var item= items.snapshotItem(j);
            if (targets[i].style) {
                item.style.cssText = targets[i].style;
            }
            if (targets[i].text) {
                item.innerHTML = targets[i].text;
            }
        }
    }
})();

