// ==UserScript==
// @name           NoCocologNews,NoConetama
// @namespace      https://app.cocolog-nifty.com/t/app
// @description    do not show cocolog news and conetama on cocolog
// @include        https://app*.cocolog-nifty.com/*
// @include        http://app*.cocolog-nifty.com/*
// ==/UserScript==

(function() {
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    addGlobalStyle(
'body div#gray-background div#outer_sidebar, body div#gray-background div#cocologNetaPost, body div#gray-background div#cocologNetaToggle { display: none !important; }' +
'body div#container { width: 713px !important; }' +
'div#toptabs-container { width: 740px !important; } ' +
'div#topmenu, div#footermenu { width: 720px !important; } ' +
'div.cpposition {width: 724px !important; }'

    );
})();
