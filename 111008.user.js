// ==UserScript==
// @name            blockPopUpWindow
// @id              blockPopUpWindow@zbinlin
// @namespace       http://script.mozcp.com/blockpopupwindow
// @description     阻止弹窗
// @include         http*
// @author          zbinlin
// @homepage        http://mozcp.com
// @updateURL       https://bitbucket.org/zbinlin/blockpopupwindow/raw/tip/blockPopUpWindow.meta.js
// @version         0.0.1 重写 blockPopUpWindow，重置版本号
// @version         0.0.2 调整规则顺序
// @version         0.0.3 修复 因同源弹窗过滤式不严导致可能发现广告弹窗 bug
// @version         0.0.4 添加 弹窗提示对话框中的弹窗网址自动换行（超过字数限制时）
// @version         0.0.5 修复 通过打开一空白窗口后再载入网址来绕过检测 bug
// @version         0.0.6 修改 弹窗提示说明
// @version         0.0.7 添加 弹窗红名单功能
// @version         0.0.8 修改 通过域名黑名单（或白名单）来拒绝（或允许）先打开空白窗口再载入网址的弹窗
// @version         0.0.9 修复 localStorage 禁用时引起的错误
// @version         0.1.0 修改 取消 include about:blank
// @version         0.2.0
// @version         0.2.1
// @version         0.2.2
// @version         0.2.3
// @version         0.2.3.1
// @contributionURL https://me.alipay.com/zbinlin
// @run-at          document-start
// ==/UserScript==

/**
 * ************************ 注意 ****************************
 * 由于 0.1.* 版与 0.2.* 版的 id 不同，
 * 安装 0.2.* 版时如果之前安装了 0.1.* 版的需要把 0.1.* 版卸。
 * **********************************************************
 * *********************** Changelog ************************
 * version: 0.2.3.1
 *  * 修改 v0.2.3 中的实现方式
 *
 * version: 0.2.3
 *  * 修复 firefox 21+ window.open 的 reference window 无法访问 postMessage
 *
 * version: 0.2.2
 *  * 修复 form 提交时出现异常导致失败
 *
 * version: 0.2.1
 *  * 修改 form 方式弹窗的判断标准
 *
 * version: 0.2.0
 *  * 重写脚本
 *  * 添加阻止 form （表单）方式弹窗的功能
 *  * 修改阻止弹窗的缺省模式为“全自动模式”
 * **********************************************************
 */

"use strict";

(function (win) {

/*
* 阻止弹窗模式：
* 0 : 默认，交互模式
* 1 : 半自动模式
* 2 : 全自动模式
* 注：
*   交互模式，即弹出一对话框，让用户选择允许或拒绝弹窗的操作。
*   半自动模式，只记录拒绝弹窗操作。
*   全自动模式，将记录允许及拒绝弹窗操作。
*/
var blockMode = 2;

// 弹窗计数
// 在自动模式中，在脚本自动选择允许或拒绝弹窗操作前，会进行一段学习模式，
// 即，将记录用户选择允许或拒绝弹窗的操作，并将其写入到 localStorage 中。
// 用户选择一次允许或拒绝弹窗的操作，记录将自动加一或减一。
// 当该记录达到 blockPopUpWindowCount 的值时，转入自动模式，由脚本自动跟据
// 记录进行允许或拒绝弹窗的操作。
// 如果用户修改该值，将重新进入学习模式。
var blockPopUpWindowCount = 3;

/*
* 临时自动模式；当 blockMode = 0 时，可用！
* 临时自动模式不会写入到 localStorage，仅对当前页面生效。
* 当关闭或刷新后，将重新记录。
* enabled
*   true  启用
*   false 禁用
* count   弹窗计数
*/
var tempCount = {
    enabled: true,
    count: blockPopUpWindowCount,
}


// 允许在同一域名下的弹窗
var allowPopUpInSameOrigin = 1;

// 弹窗黑名单
// 可专门应付确定的弹窗地址
var popupblacklist = [
];

// 弹窗红名单
// 允许包含该名单下的地址直接弹窗
var popupredlist = [
];


// 域名黑名单
// 与弹窗黑名单不同的是，该黑名单是对打开的页面生效，而不是对弹窗的地址生效
// 如果打开的页面地址内包含有域名黑名单中的域名，将拒绝该页面下的所有弹窗
var blacklist = [
];

// 域名白名单
// 与域名黑名单相反，将允许页面下的所有弹窗
var whitelist = [
];


var Configure = {
    blockMode: blockMode,
    blockPopUpWindowCount: blockPopUpWindowCount,
    tempCount: tempCount,
    allowPopUpInSameOrigin: allowPopUpInSameOrigin,
    popupblacklist: popupblacklist,
    popupredlist: popupredlist,
    blacklist: blacklist,
    whitelist: whitelist
}

/*
function getET() {
    var et = "";
    if (window.opera)
        et = "BeforeScript";
    else if (typeof window.mozPaintCount == "number")
        et = "beforescriptexecute";
    else
        et = "DOMContentLoaded";
    return et;
}
*/

var BlockPopUpWindow = {
    config: Configure,
    init: function (window) {
        if (this._firstRun) return;
        this._firstRun = true;

        if (window.wrappedJSObject) {
            window = window.wrappedJSObject;
        }

        if (this.config.tempCount.enabled) {
            this._tc = 0;
        }

        var blockOpen = window.open;
        var self = this;
        var fn = ""+
            'return function () {\n'+
            '    var args = Array.slice(arguments);\n'+
            '    var uri = args[0];\n'+
            '    return _self.uriChecker(uri, "window.open") ? _open.apply(window, args) : null;\n'+
            '};'+
        "";
        window.open = new window["Function"]("_open", "_self", fn)(blockOpen, self);
        
        var formSubmit = (window.HTMLFormElement.wrappedJSObject || window.HTMLFormElement).prototype.submit;
        (window.HTMLFormElement.wrappedJSObject || window.HTMLFormElement).prototype.submit = function () {
            return ("_blank" !== this.target || self.uriChecker(this.action, "form")) && formSubmit.apply(this, Array.slice(arguments));
        };

        this.win = window;
    },
    uriChecker: function (uri, w) {
        var config = this.config;
        var blockMode = config.blockMode,
            blockPopUpWindowCount = config.blockPopUpWindowCount,
            tempCount = config.tempCount,
            allowPopUpInSameOrigin = config.allowPopUpInSameOrigin,
            popupblacklist = config.popupblacklist,
            popupredlist = config.popupredlist,
            blacklist = config.blacklist,
            whitelist = config.whitelist;

        var _hostname = this.getHostnameFrom(uri);

        // window.open(""); 防止先打开新空白窗口后再载入网址
        //if (uri == "") return _log("已阻止弹出空白页面！");

        if (this.checkIn(_hostname, popupblacklist)) return !!this.log(uri, "弹窗黑名单"); // 弹窗黑名单
        if (this.checkIn(_hostname, popupredlist)) return true; // 弹窗红名单

        var hostname = this.win.location.hostname;
        if (this.checkIn(hostname, blacklist)) return !!this.log(uri, "域名黑名单"); // 域名黑名单
        if (this.checkIn(hostname, whitelist)) return true; // 域名白名单

        if (allowPopUpInSameOrigin && hostname.contains(_hostname)) return true; // 允许在同一域名下的弹窗

        var allow = false;
        try {
            var _ls = this.win.localStorage;
        } catch (ex) {
            return !!this.log(uri, "localStorage 已禁用！");
        }
        if (blockMode) {
            var count = parseInt(_ls.getItem("_blockPopUpWindowCount"));
            if(isNaN(count) || count != blockPopUpWindowCount) {
                _ls.setItem("_blockPopUpWindowCount", blockPopUpWindowCount)
                _ls.setItem("blockPopUpWindowCount", 0);
            }
            count = parseInt(_ls.getItem("blockPopUpWindowCount"));
        }

        switch (blockMode) {
            case 0:
                if (tempCount.enabled) {
                    if (this._tc >= tempCount.count)
                        allow = false;
                    else if (this._tc <= -tempCount.count)
                        allow = true;
                    else if (this.confirm(uri, w)) {
                        --this._tc;
                        allow = true;
                    } else {
                        ++this._tc;
                        allow = false;
                    }
                } else {
                    allow = this.confirm(uri, w);
                }
                break;
            case 1:
                if (count >= blockPopUpWindowCount)
                    allow = false;
                else if (this.confirm(uri, w))
                    allow = true;
                else {
                    _ls.setItem("blockPopUpWindowCount", ++count);
                    allow = false;
                }
                break;
            case 2:
                if (count >= blockPopUpWindowCount)
                    allow = false;
                else if (count <= -blockPopUpWindowCount)
                    allow = true;
                else if (this.confirm(uri, w)) {
                    _ls.setItem("blockPopUpWindowCount", --count);
                    allow = true;
                } else {
                    _ls.setItem("blockPopUpWindowCount", ++count);
                    allow = false;
                }
                break;
        }
        allow || this.log(uri, "用户拒绝");
        return allow;
    },
    log: function (uri, des) {
        uri = uri || "about:blank";
        var log = (console && console.log) || (this.win.console && this.win.console.log) || GM_log;
        log("『" + (des ? des : "未知") + "』\n::blocked URI:: " + uri);
        return null;
    },
    checkIn: function (str, list) {
        if (!str || !Array.isArray(list)) return false;
        return list.some(function (item) {
            var pat = item instanceof RegExp ? item : new RegExp("\\b" + item.toString().replace(/\./g, "\\.") + "$");
            return str.search(pat) != -1;
        });
    },
    confirm: function (uri, w) {
        var allow = false;
        try {
            uri = uri || "about:blank";
            var ml = 90;
            var str = uri.match(new RegExp(".{1," + ml + "}", "g")).join("\n");
            // 提示是否阻止弹窗
            var ch = "\n==========================================================================================\n";
            allow = this.win.confirm("来自用户脚本 blockPopUpWindow 的提示，是否允许弹出以下地址的窗口！" + ch + str + ch + "弹窗方式：" + w);
        } catch (ex) {
            allow = false;
        }
        return allow;
    },
    getHostnameFrom: function (uri) {
        var a = this.win.document.createElement("a");
        return (a.href = uri, a.hostname);
    }
}

BlockPopUpWindow.init(win);

})(window, undefined);
