// ==UserScript==
// @id             pay.95559.com.cn-1d741400-c93c-4427-817a-7c200c7d722e@CzBiX
// @name           95559 in Firefox
// @version        1.0
// @namespace      CzBiX
// @author         CzBiX
// @description    let 95559's Online Payment support Firefox
// @include        https://pay.95559.com.cn/netpay/Trans
// @run-at         document-end
// ==/UserScript==

var $ = function(id){ return document.getElementById(id);};

var tranPass = $('tranPass1');
var softkeyboard = $('softkeyboard');

if (!tranPass || !softkeyboard) {
    return;
}

unsafeWindow.showkeyboard = function () {
    softkeyboard.style.top = '-25px';
    softkeyboard.style.left = '310px';
    softkeyboard.style.display = 'block';
} 
