// ==UserScript==
// @name        fake douban FM Pro
// @namespace   http://blog.sbw.so/
// @description fake douban FM Pro to remove ads
// @include     http://douban.fm/
// @author      o丨Reborn <sbwtws@gmail.com>
// @updateURL   https://userscripts.org/scripts/source/416912.meta.js
// @downloadURL https://userscripts.org/scripts/source/416912.user.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/d92f6fd8ad5265626f726ee90f
// @version     14-03-18.1
// @grant       none
// ==/UserScript==

(function(){
    var _window = unsafeWindow;
    var _clock = null;
    
    function fakePro() {        
        _window.user_record.is_pro = true; 
        
        if (_window.user_record.is_pro) 
            clearInterval(_clock);
    }
    
    window.addEventListener('DOMContentLoaded', function(){
        //_window.user_record.is_pro = true; 
        _clock = setInterval(fakePro, 100);
    }, false); 
})();
