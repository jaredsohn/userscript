// ==UserScript==
// @name        upload.com.ua helper for Opera 9/10 and GreaseMonkey
// @version     2.3.3
// @date        2.03.2010
// @author      ki0 <ki0@ua.fm>
// @download    http://userscripts.org/scripts/source/67477.user.js
// @include http://upload.com.ua/get/*
// @include http://www.upload.com.ua/get/*
// @include http://upload.com.ua/dget/*
// @include http://www.upload.com.ua/dget/*
// ==/UserScript==

//start downloading automatically
var autostart = /*@Enable automatic downloading start@bool@*/true/*@*/;

var adBlock = /*@Enable AD blocking@bool@*/true/*@*/;

if (window.opera != undefined)
    unsafeWindow = window;

var req = null;

document.std_write = document.write;

var no_doc_write = "<script>document.write = function(){};</script>";

var pass_page = '<form method="post" action="';

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

function GetLink() {
    var fileName = req.responseText.match(/filename" value="([^"]*)/);
    if (fileName == null)
        document.title = "Script error3!" + document.title;
    else
        fileName = fileName[1];
    var res = req.responseText.match(/var link[a-z0-9]+ = (new Array\([^;]+)/);
    var arr;
    eval("arr = " + res[1]);
    var url;
    for (i = 0, url = "", b = false; i < arr.length; i++) {
        c = arr[i];
        if (!b && c == '|') {
            b = true;
            url = 'http://dl' + url + '.upload.com.ua/';
        }
        else {
            url += c;
        }
    }
    url += '/' + fileName;

    if (location.href.indexOf("?mode=free") > -1) {
        var bt = document.getElementById("submit");
        bt.outerHTML = "<a id='submit' href=" + url + ">DOWNLOAD</a>";
    }
    else {
        var arr = document.getElementsByTagName("a");
        for (i = 0; i < arr.length; i++) {
            if (arr[i].href.indexOf("?mode=free") > -1)
                break;
        }
        if (arr[i]) {
            arr[i].href = url;
            arr[i].innerHTML = "DOWNLOAD";
        }
    }

    if (autostart)
        location.href = url;
}

function stateChangedCaptcha() {
    if (req.readyState == 4) {
        if (req.status == 200) {
            if (req.responseText.indexOf("confirm.php") > -1)
                PostCaptcha();
            else if (req.responseText.indexOf("decreaseTimer") > -1)
                GetLink();
            else {
                if (req.responseText.indexOf(pass_page) < 0)
                    document.title = "ScriptError2! " + document.title;
                else {
                    if (adBlock)
                        document.std_write(no_doc_write + req.responseText);
                    else
                        document.std_write(req.responseText);
                    document.title = "Password required2! " + document.title;

                }
            }
        }
        else
            document.title = "XMLHttpRequest Error! " + document.title;
    }
}

function PostCaptcha() {
    setCookie("capcha", "0000", 365);
    req = new XMLHttpRequest();
    req.onreadystatechange = stateChangedCaptcha;
    req.open("POST", location.href, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.setRequestHeader("Content-Length", "18");
    req.send("code=0000&x=20&y=21");

}

function stateChangedFree() {
    if (req.readyState == 4) {
        if (req.status == 200) {
            if (req.responseText.indexOf("confirm.php") > -1)
                PostCaptcha();
            else if (req.responseText.indexOf("decreaseTimer") > -1)
                GetLink();
            else {
                if (req.responseText.indexOf(pass_page) < 0) {
                    document.title = "ScriptError1! " + document.title;
                }
                else {
                    if (adBlock)
                        document.std_write(no_doc_write + req.responseText);
                    else
                        document.std_write(req.responseText);
                    document.title = "Password required1! " + document.title;
                }
            }

        }
        else
            document.title = "XMLHttpRequest Error! " + document.title;
    }
}

function SendFree() {
    req = new XMLHttpRequest();
    req.onreadystatechange = stateChangedFree;
    req.open("GET", location.href + "?mode=free", true);
    req.send(null);
}

if (document.write) {

    if (adBlock)
        document.write = function() { };

    if (location.href.indexOf("dget") < 0)
        if (location.href.indexOf("?mode=free") < 0)
        SendFree();
    else
        PostCaptcha();
    else {
        unsafeWindow.setTimeout = function(callback, time) {
            if (adBlock) {
                pf_url = "about:blank";
                this.openPopUnder = function() {
                };
                var frame = document.getElementById("ad_frame");
                if (frame)
                    frame.src = "about:blank";
                adBlock = false;
            }
            var callback2 = callback.slice(0, -2);
            unsafeWindow[callback2]();
            if ((unsafeWindow.url != '') && (autostart)) {
                document.location.href = unsafeWindow.url;
                autostart = false;
            }
        };
    }
}
