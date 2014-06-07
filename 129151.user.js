// ==UserScript==
// @name        testpdd.com.ua update
// @namespace   http://www.testpdd.com.ua/*
// @description ADS remove + layout fix
// @include     http://www.testpdd.com.ua/*
// @author      kottenator
// ==/UserScript==

(function (win, doc) {
    var gbc = doc.getElementsByClassName,
        gbt = doc.getElementsByTagName,
        gbi = doc.getElementById,
        body = doc.body,
        head = gbt('head')[0];
        
    function addStyle(cssText) {
        var style = doc.createElement('style');
        style.setAttribute('type', 'text/css');
        style.appendChild(doc.createTextNode(cssText));
        head.appendChild(style);
    }
        
    function fixMainView() {
        body.style.maxWidth = '1200px';
        body.style.margin = '0 auto';
        gbc('lcol')[0].style.display = 'none';
        gbt('table')[0].style.display = 'none';
    }
    
    function fixStartTestView() {
        addStyle('\
            .cssbox, .cssbox_body, .cssbox_head, .cssbox_head h2 {\
                background: none;\
            }\
            \
            .cssbox {\
                padding: 0;\
            }\
            \
            .cssbox_body {\
                border: 1px solid #aaa;\
                border-radius: 10px;\
                box-shadow: 0 4px 10px gray;\
                margin: 0;\
                padding: 15px 30px;\
            }\
        ');
    }
    
    function fixMainTestView() {
        gbi('ga').style.display = 'none';
    }
    
    function dispatch() {
        var url = win.location.href;
        if (/testpdd.com.ua\/startTest-v\d+\.php/.test(url)) {
            fixStartTestView();
        } else if (/testpdd.com.ua\/maintest-v\d+\.php/.test(url)) {
            fixMainTestView();
        } else {
            fixMainView();
        }
    }
    
    dispatch();
})(window, window.document);