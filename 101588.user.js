// ==UserScript==
// @name           CustomTwitter2
// @namespace      h13i32maru2
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @exclude        http://twitter.com/invitations/*
// @exclude        http://twitter.com/settings/*
// @exclude        http://twitter.com/goodies/*
// @exclude        https://twitter.com/invitations/*
// @exclude        https://twitter.com/settings/*
// @exclude        https://twitter.com/goodies/*
// ==/UserScript==
//script info
var name = "CustomTwitter";
var version = "2010-11-22";
var url = "http://h13i32maru.jp/gm/custom_twitter";
var versionUrl = url + "/version";
var resourceUrl = url + "/" + version;
var scriptUrl = "http://userscripts.org/scripts/show/67940";
var prefix = "h13i32maru::ct";

function createUtil() {
    var that;
    var util = {
        $: function(selector, elm) {
            elm = elm || document;
            return elm.querySelectorAll(selector);
        },
        head: function() {
            return document.getElementsByTagName("head")[0];
        },
        removeElementById: function(id) {
            var e = document.getElementById(id);
            if (!e) {
                return;
            }
            e.parentNode.removeChild(e);
        },
        log: function(obj) {
            if (typeof console == "object" && typeof console.log == "function") {
                console.log(obj);
            }
        },
        dateTime: function(unixTime) {
            var d = new Date(parseInt(unixTime));
            return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        },
        getValue: function(key, _default) {
            if (!window.localStorage) {
                that.log("can't user localStorage");
                return;
            }

            var value = window.localStorage.getItem(key);
            if (value != null) {
                if (value == "true") {
                    value = true;
                }
                else if (value == "false") {
                    value = false;
                }
                else if (value.match(/^[0-9.]+$/)) {
                    value = Number(value);
                }
                return value;
            }
            else {
                return _default
            }
        },
        setValue: function(key, value) {
            if (!window.localStorage) {
                that.log("can't user localStorage");
                return;
            }

            window.localStorage.setItem(key, value);
        },
        deleteValue: function(key) {
            if (!window.localStorage) {
                that.log("window.localStorage and GM_deleteValue are not defined");
            }
            window.localStorage.removeItem(key);
        },
        listValues: function() {
            if (!window.localStorage) {
                Util.log("window.localStorage and GM_listValues are not defined");
                return;
            }

            //localStorage.length is not availabled in user script
            var list = [];
            var key;
            try {
                for (var i = 0;; i++) {
                    key = window.localStorage.key(i);
                    if (!key) {
                        break;
                    }
                    list.push(key);
                }
            }
            catch(e) {}
            return list;
        },
        addStyleText: function(id, text) {
            if (document.getElementById(id)) {
                var e = document.getElementById(id);
                e.parentNode.removeChild(e);
            }

            var e = document.createElement("style");
            if (id) {
                e.id = id;
            }
            e.textContent = text;
            document.getElementsByTagName("head")[0].appendChild(e);
        },
        addStyleUrl: function(id, url) {
            var e = document.createElement("link");
            e.id = id;
            e.rel = "stylesheet";
            e.type = "text/css";
            e.href = url;
            document.getElementsByTagName("head")[0].appendChild(e);
        },
        encodeUrlParam: function(param) {
            var name;
            var data = [];
            param = param || {};

            for (name in param) {
                if (param.hasOwnProperty(name)) {
                    data.push(name + "=" + param[name]);
                }
            }

            return data.join("&");
        },
        xhr: function(url, param, callback, method) {
            var data = "";

            method = method || "GET";

            var req = new XMLHttpRequest;

            if (callback) {
                req.onreadystatechange = function() {
                    if (req.readyState == 4) callback(req.responseText, req);
                }
            }

            if (param) {
                param = that.encodeUrlParam(param);
                if (method.toUpperCase() == "GET" && param.length > 0) {
                    url = url + "?" + param;
                    param = null;
                }
            }

            req.open(method, url, true);
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            req.send(param);
        },
        browser: function() {
            var ua = navigator.userAgent;
            if (ua.indexOf("Firefox") > -1) {
                return "firefox";
            }
            if (ua.indexOf("Chrome") > -1) {
                return "chrome";
            }
            return "";
        },
        os: function() {
            if (navigator.platform.indexOf("Mac") > -1) {
                return "mac";
            }
            if (navigator.platform.indexOf("Win") > -1) {
                return "windows";
            }
            return null;
        },
        GM_addStyle: function(id, resourceName) {
            if (typeof(GM_getResourceText) == "function") {
                var e = document.createElement("style");
                e.id = id;
                e.textContent = GM_getResourceText(resourceName);
                document.getElementsByTagName("head")[0].appendChild(e);
            }
        }
    };

    that = util;

    return util;
}
var util = createUtil();

var stream = function() {
    var that;
    var stream = {
        count: 0,
        handler: [],
        init: function() {
            setInterval(that.update, 300);
        },
        addHandler: function(handler) {
            that.handler.push(handler);
        },
        update: function() {
            var e = util.$(".stream-items .stream-item");
            if (!e) {
                return;
            }
            var nowCount = e.length;
            if (nowCount == that.count) {
                return;
            }
            that.count = nowCount;
            for (var i = 0; i < that.handler.length; i++) {
                that.handler[i]();
            }
        }
    }

    that = stream;
    return stream;
} ();

function commonCustom() {
    function init() {
        setDateTime();
        stream.addHandler(setDateTime);
    }
    function setDateTime() {
        var e;
        var list = util.$(".stream-item ._timestamp:not([data-ct-date-time]) , .stream-item ._old-timestamp:not([data-ct-date-time])");
        for (var i = 0; i < list.length; i++) {
            e = document.createElement("span");
            e.className = "ct-date-time";
            e.textContent = util.dateTime(list[i].getAttribute("data-time"));
            list[i].setAttribute("data-ct-date-time", true);
            list[i].parentNode.appendChild(e);
        }
    }
    init();
} ();
