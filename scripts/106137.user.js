// ==UserScript==
// @name           holmes test helper
// @namespace      http://ext256.com/
// @description    helps test holmes
// @include        http://bb-hm-webtest*
// @include        http://db-testing-ecom*
// @include        http://yx-testing-hm*
// ==/UserScript==

/**
 * 自动填充验证码
 */
var vcodes = document.getElementsByName('entered_imagecode');
if (vcodes.length > 0) {
    vcodes[0].value = '1111';
}

/**
 * 发送心跳，防止session过期
 */
setInterval(function() {
    var img = document.createElement('img');
    img.addEventListener('error', function() {
        img = null;
    }, false);
    img.src = 'http://' + location.host + '/hm-web/';
}, 20 * 60 * 1000);
