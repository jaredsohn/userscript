// ==UserScript==
// @name       Baidu Zhidao Auto Check
// @namespace  http://www.einverne.tk/
// @version    2013.12.25
// @description  Baidu Zhidao Auto Check
// @match      http://zhidao.baidu.com/question/*
// @copyright  2012+, einverne
// ==/UserScript==

(function(){
    var signInTimer = setInterval ( function() {
            var signInBtn = document.querySelector ("#signin-btn");
            if (signInBtn) {
                clearInterval (signInTimer);
                var clickEvent  = document.createEvent ('MouseEvents');
                clickEvent.initEvent ('click', true, true);
                signInBtn.dispatchEvent (clickEvent);
            }
        }
        , 200
    );
}());