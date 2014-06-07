// ==UserScript==
// @name        江西省中招网上报名系统 For Chrome
// @namespace   http://use.i.E.your.homepage/
// @version     1.0
// @description IE-Only Bypass & Fix Plus Other features
// @include     http://117.40.83.118/*
// @copyright   2012+, Jixun
// @run-at      document-start
// ==/UserScript==

// 获取窗口对象
try {
    var w = unsafeWindow;
} catch (e) {
    var w = window;
}

// Chrome 用 IE 函数兼容，火狐没测试
w.Object.prototype.__defineGetter__ ('text', function (){ return this.textContent });

// 过 IE 验证
w.ActiveXObject = true;

addEventListener ('DOMContentLoaded', function () {
    // 自动验证码
    var createCodeOld = w.createCode,
        varCode = document.querySelector ('#txbValidateCode');
    varCode.setAttribute ('readonly', !0);
    w.createCode = function () {
        createCodeOld ();
        varCode.value = unsafeWindow.code;
    };
    w.createCode ();
    
    // 登陆错误免重填表单 & 免登陆超时
    w.resetLoginText = w.timeOut = function () {};
}, false);