// ==UserScript==
// @name        Juick Classic
// @namespace   com.juickadvanced
// @description Juick Classic Style
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include     http://juick.com/*
// @include     http://dev.juick.com/*
// @updateURL   https://userscripts.org/scripts/source/155098.meta.js
// @downloadURL https://userscripts.org/scripts/source/155098.user.js
// @grant       none
// @version     1.45
// ==/UserScript==

// commit checklist:
// 1. verify scrolling menu abs/fix position

function jalog(str) {
    try {
        Application.console.log(str)
    } catch(e) {
        if (window.console)
            window.console.log(str);
        else if (console)
            console.log(str);
    }
}

jalog("JA: launched!")
var ua = window.navigator.userAgent;
var firefox = ua.indexOf("Gecko") != -1 && ua.indexOf("like Gecko") == -1;
var isOpera = ua.indexOf("Presto") != -1;
var firefoxAddon = false;
try { var comps = Components.classes; firefoxAddon = true; } catch (e) {}

var originalTop = -1;
var jaiprtru = "https://ja.ip.rt.ru:8443/"
//var jaiprtru = "http://localhost:8080/"

try {
    window.name = "japluginwindow";
    if (window.document.getElementById("powered_by_juick_classic"))
        throw "Document already processed by juick classic "
    window.addEventListener("message", function (event) {
        jalog("onmessage: "+event);
        jalog("onmessage: "+event.data);
        jalog("onmessage: "+event.data.callbackId);
        jalog("onmessage: "+event.data.data);
        if (event.data.callbackId) {
            window[event.data.callbackId](event.data.data);
        }
    }, false)
    //jalog("main_process definitiion begin")
    function main_process(document, window) {
        jalog("JA: launched!")

        try {
            var $ = window.jQuery;
            if (!document.body || !window.jQuery) {
                jalog("JA: body is not ready or jquery is not ready");
                window.setTimeout(function () {
                    main_process(document, window)
                }, 10);
                return;
            }

            if (window.document.getElementById("powered_by_juick_classic")) {
                jalog("jc_mainprocessed duplicate!")
                return;
            }
            jalog("JA: continued with jquery!")
            if (isOpera || firefox) {
                window.setInterval(function () {
                    if (!!$("#column").offset()) {
                        // fix column disappearing and appearing during long scroll down.
                        var e = document.documentElement.scrollTop || document.body.scrollTop;
                        if (originalTop == -1) {
                            originalTop = $("#column").offset().top;
                            fixColumnPosition();    // it's opera!
                        } // init once
                        var b = originalTop;
                        // ugnich code follows
                        var d = $("#column");
                        var c = $("#rcol");
                        //                      console.log("scrolltop: "+e+" coltop="+b+" nowfix="+(d.hasClass("fix")));
                        if (b < e) {
                            if (d.hasClass("fix") == false) {
                                d.removeClass("abs");
                                d.addClass("fix");
                                c.removeClass("abs");
                                c.addClass("fix");
                            }
                        } else {
                            if (d.hasClass("fix") == true) {
                                d.removeClass("fix");
                                d.addClass("abs");
                                c.removeClass("fix");
                                c.addClass("abs");
                            }
                        }
                    } else {
//                        console.log("NO timeout: "+$("#column").offset());
                    }
                }, 50)  // fast enough
            }

            jalog("JA: main_process")
            var mode = "UNKNOWN";
            var shouldCheckMessageOrder = true;
            var LIs = document.getElementsByTagName("LI");
            var globals = {}

            // detecting our location
            var msgthread = false;
            var msg = false;
            for (var i = 0; i < LIs.length; i++) {
                var clazz = LIs[i].getAttribute("class");
                if (clazz == "ads") {
                    // yandex ad
                    LIs[i].parentNode.removeChild(LIs[i]);
                }
                if (clazz && clazz.indexOf("msgthread") != -1) {
                    msgthread = true;
                }
                if (clazz && clazz.indexOf("msg") != -1) {
                    msg = true;
                }
                if (i > 20) break;  // enough to find ads
            }
            if (msgthread) {
                mode = "THREAD"
            } else if (msg) {
                mode = "MESSAGES"
            }

            function setText(element, txt) {
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
                element.appendChild(element.ownerDocument.createTextNode(txt));

            }

            function createLink(href, txt) {
                var a = document.createElement("A");
                a.setAttribute("href", href);
                a.appendChild(document.createTextNode(txt));
                return a;

            }

            function getText(element) {
                var sb = "";
                if (element.nodeValue) {
                    sb = sb + element.nodeValue;
                }
                var scan = element.firstChild;
                while (scan) {
                    sb += getText(scan);
                    scan = scan.nextSibling;
                }
                return sb;
            }

            function setCookie(c_name, value, exdays) {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + exdays);
                var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
                // is there other way of setting cookie?
                document.cookie = c_name + "=" + c_value;
            }

            function getCookie(c_name) {
                var x, y, ARRcookies = document.cookie.split(";");
                for (var i = 0; i < ARRcookies.length; i++) {
                    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                    x = x.replace(/^\s+|\s+$/g, "");
                    if (x == c_name) {
                        return unescape(y);
                    }
                }
            }

            function convertDate(juickDate) {
                // input: juick date: 2013-06-02 07:19:11.0 GMT
                // output: javascript default date format (mostly):  "Sun Jun 02 2013 10:40:36 GMT+0300 (EEST)"
                //         firefox: 2013-06-02T07:19:11
                if (firefox) {
                    return juickDate.substr(0, 10)+"T"+juickDate.substr(11,8)+"+00:00";
                } else {
                    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                    var month = months[parseInt(juickDate.substr(5, 2))-1]; // convert month
                    var result = month + " ";
                    result += juickDate.substr(8, 2) +" ";  // date
                    result += juickDate.substr(0, 4) +" ";  // year
                    result += juickDate.substr(11, 8) +" ";  // time
                    result += "GMT";
                    return result;
                }
            }

            function formatAndAppendText(nodeToAppendTo, str) {
                var strs = str.split("\n");
                for(var i=0; i<strs.length; i++) {
                    if (i != 0) {
                        nodeToAppendTo.appendChild(document.createElement("br"));
                    }
                    var s= strs[i];
                    s = s.replace(/&quot;/g,"\"");
                    s = s.replace(/&amp;/g,"&");
                    nodeToAppendTo.appendChild(document.createTextNode(s));
                }
            }

            function getAbsoluteLeft(elem) {
                var left = 0;
                var curr = elem;
                // This intentionally excludes body which has a null offsetParent.
                while (curr.offsetParent) {
                    left -= curr.scrollLeft;
                    curr = curr.parentNode;
                }
                while (elem) {
                    left += elem.offsetLeft;
                    elem = elem.offsetParent;
                }
                return left;
            };


            var pendingAjaxs = new Array();
            var requestInProgress = false;

            function maybeNextAjaxRequest() {
                if (pendingAjaxs.length > 0) {
                    pendingAjaxs.shift()(); // call lazy function
                }

            }

            function doAjaxRequest(url, callback, wantXML, serial) {
                try {
                    var req;
                    if (serial) {       // we need to use serial for some batch actions, e.g. automatic comments inlining (juick bans parallel queries)
                        if (requestInProgress) {
                            pendingAjaxs.push(function () { // lazy function call
                                doAjaxRequest(url, callback, wantXML, serial);
                            })
                            return;
                        }
                    }
                    requestInProgress = true;
                    if (isOpera) req = new window.XMLHttpRequest();
                    else req = new XMLHttpRequest();
                    req.open("GET", url, true);
                    req.onload = function (oh) {
                        try {
                            jalog("onload: ajax ok")
                            if (wantXML) {
                                jalog("onload: xml="+req.responseXML)
                                callback(req.responseXML);
                            } else {
                                jalog("onload: text="+req.responseText)
                                callback(req.responseText);
                            }
                        } catch (e) {
                            jalog("JA(2): " + e)
                            alert("doAjaxRequest: " + e);
                        } finally {
                            requestInProgress = false;
                            maybeNextAjaxRequest();
                        }
                    }
                    req.onerror = function(err) {
                        requestInProgress = false;
                        jalog("onload: ajax onerror: "+err)
                    }
                    req.send();
                } catch (e) {
                    requestInProgress = false;
                    jalog("default ajax: "+ e)
                    try {
                        if (requestInProgress) {
                            pendingAjaxs.push(function () { // lazy function call
                                doAjaxRequest(url, callback, wantXML);
                            })
                        } else {
                            requestInProgress = true;
                            GM_xmlhttpRequest({
                                method: "GET",
                                url: url,
                                onerror: function (response) {
                                    jalog("gm ajax err: " + e)
                                },
                                onload: function (response) {
                                    jalog("gm ajax ok" + e)
                                    try {
                                        try {
                                            if (response.charCodeAt && response.length) {
                                                // is string
                                                response = "" + response;
                                            } else {
                                                response = response.responseText;
                                            }
                                        } catch (e) {
                                            response = response.responseText;
                                        }
                                        if (wantXML) {
                                            callback(parseHTML(response));
                                        } else {
                                            callback(response);
                                        }
                                    } catch (e) {
                                        jalog("JA(3): " + e)
                                        //alert("GM_xmlhttpRequest: "+e+" response="+response+" resp.rx="+respo);
                                    } finally {
                                        requestInProgress = false;
                                        maybeNextAjaxRequest();
                                    }
                                },
                                onerror: function () {
                                    requestInProgress = false;
                                    maybeNextAjaxRequest();
                                },
                                ontimeout: function () {
                                    requestInProgress = false;
                                    maybeNextAjaxRequest();
                                }
                            });
                        }
                    } catch (e) {
                        jalog("JA(4): " + e)
                        //document.title = "Sorry, unable to make XMLHttpRequest: "+e;
                    }
                }

            }

            function parseHTML(response) {
                var docu = null;
                var resp = "" + response;
                if (firefoxAddon) {
                    // firefox addon mode
                    // jalog("firefox addon mode");
                    try {
                        const PARSER_UTILS = "@mozilla.org/parserutils;1";
                        var newDoc = document.implementation.createHTMLDocument('');
                        if (PARSER_UTILS in Components.classes) {

                            var parser = Components.classes[PARSER_UTILS].getService(Ci.nsIParserUtils);
                            if ("parseFragment" in parser) {
                                docu = parser.parseFragment(response, true,
                                    false, null, document.documentElement);
                                newDoc.body.appendChild(docu);
                                docu = newDoc;
                            }
                        }
                        if (!docu) {
                            docu = Components.classes["@mozilla.org/feed-unescapehtml;1"]   // fallback snippet from mozilla
                                .getService(Components.interfaces.nsIScriptableUnescapeHTML)
                                .parseFragment(html, false, null, document.documentElement);
                            newDoc.body.appendChild(docu);
                            docu = newDoc;
                        }
                    } catch (e) {
                        jalog("JA(5): " + e)
                        //alert(e);
                    }
                } else if (firefox) {
                    jalog("firefox gm mode");
                    // firefox in greasemonkey mode
                    var parser = new DOMParser();
                    docu = parser.parseFromString(response, "text/html");
                } else if (isOpera) {
                    //FIREFOX_CUT_START
                    jalog("opera mode");
                    docu = document.implementation.createHTMLDocument('')
                    //
                    // HTML parsed like this is safe, because it's detached HTML (javascript is not executed etc), good for xpath though.
                    // I could not find other ways to parse HTML page for subsequent xpath querying.
                    $(docu.body).html(response);
                    //FIREFOX_CUT_END
                } else {
                    jalog("chrome possibly?");
                    docu = document.implementation.createHTMLDocument('')
                    docu.write(response);
                }
                return docu;
            }

            // (C) power juick
            function getElementsByXPath(xpath, root) {
                var result = document.evaluate(xpath, root, null, 0, null);
                var nodes = new Array();
                i = 0;
                while (node = result.iterateNext()) {
                    nodes[i] = node;
                    i++;
                }

                return nodes;
            }

            // (C) power juick (mostly)
            function inlineMedia(root) {
                var all_links = getElementsByXPath(".//div[@class='msg-txt']/a", root);

                function createImageLink(elem, imgref, linkref) {
                    var a = document.createElement("a");
                    a.setAttribute("href", linkref);
                    var img = document.createElement("img");
                    img.setAttribute("src", imgref);
                    img.setAttribute("style", "max-width: 500px; max-height: 400px; width: auto; height: auto;");
                    a.appendChild(img);
                    elem.appendChild(a);
                }

                function createYoutube(elem, imgref, linkref) {
                    var elem = document.createElement("div");
                    elem.setAttribute("style", "margin-top: 5px;");

                    $(elem).html('<object style="max-width: 560px; width: 100%; height: 340px;"><param name="movie" name="dest1" value="http://www.youtube.com/v/'
                        + 'ZZZZZ'
                        + '&hl=ru_RU&fs=1&"></param><param name="allowFullScreen" value="true"></param><param name="wmode" value="transparent"></param><param name="allowscriptaccess" value="always"></param><embed name="dest2" src="http://www.youtube.com/v/'
                        + 'ZZZZZ'
                        + '&hl=ru_RU&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="transparent" style="max-width: 560px; width: 100%; height: 340px;"></embed></object>');
                    var dest1E = elem.firstChild.firstChild  // dest1
                    dest1E.setAttribute("value", dest1E.getAttribute("value").replace("ZZZZZ", tubeid[1]));
                    var dest2E = dest1E.nextSibling.nextSibling.nextSibling.nextSibling;    // dest2
                    dest2E.setAttribute("src", dest2E.getAttribute("src").replace("ZZZZZ", tubeid[1]));
                    return elem;
                }

                for (var li = 0; li < all_links.length; li++) {
                    var node = all_links[li];
                    if (tubeid = /youtube\.com\/watch\?v=(.+)/
                        .exec(node.href)) { // YouTube
                        node.parentNode.insertBefore(createYoutube(tubeid[1]), node.nextSibling);
                    } else if (tubeid = /youtu\.be\/(.+)/
                        .exec(node.href)) { // YouTube
                        node.parentNode.insertBefore(createYoutube(tubeid[1]), node.nextSibling);
                    } else if (myurl = /gelbooru\.com\/index\.php\?page=post\&s=view\&id=(\d+)/
                        .exec(node.href)) { // Gelbooru
                        (function (node) {
                            try {
                                doAjaxRequest("http://acao-0x588.herokuapp.com/acao/gelbooru.com/index.php?page=dapi&s=post&q=index&id=" + myurl[1], function (response) {
                                    var gelbooru_thumbnail = response.getElementsByTagName("post")[0].attributes["preview_url"].value;
                                    var gelbooru_id = response.getElementsByTagName("post")[0].attributes["id"].value;
                                    var elem = document.createElement("div");
                                    elem.setAttribute("style", "margin-top: 5px;");
                                    createImageLink(elem, gelbooru_thumbnail, "http://gelbooru.com/index.php?page=post&s=view&id=" + gelbooru_id);
                                    node.parentNode.insertBefore(elem, node.nextSibling);
                                }, true);
                            } catch (e) {
                                jalog("JA(6): " + e)
                                //alert("oops!"+e);
                            }
                        })(node);
                    } else if (myurl = /http:\/\/omploader\.org\/(v|i)(.+)(\/.+|)/
                        .exec(node.href)) { // OMPLoader.org
                        var elem = document.createElement("div");
                        elem.setAttribute("style", "margin-top: 5px;");
                        createImageLink(elem, myurl[2], myurl[0]);
                        node.parentNode.insertBefore(elem,
                            node.nextSibling);
                    } else if (node.href.indexOf("i.juick.com") != -1) {
                        // do nothing
                    } else if (myurl = /(http|https):\/\/(.*)\.(jpg|png|gif)/.exec(node.href.toLowerCase())) {
                        //
                        // GENERIC image
                        //
                        var elem = document.createElement("div");
                        elem.setAttribute("style", "margin-top: 5px;");
                        var imgref = node.href;
                        createImageLink(elem, imgref, imgref);
                        node.parentNode.insertBefore(elem,
                            node.nextSibling);
                    }
                }
            }

            function toggleInlineComments(msgid, then) {
                var existing = document.getElementsByClassName("comments-" + msgid);
                if (existing.length == 0) {
                    var url = "http://juick.com/" + msgid;
                    doAjaxRequest(url, function (response) {
                        window.setTimeout(function () {
                            try {
                                // jalog("got ajax response for inline comments")
                                var resp = "" + response;
                                var ix = resp.indexOf("<ul id=\"replies\">");
                                if (ix != -1)
                                    resp = resp.substr(ix);
                                ix = resp.indexOf("<div id=\"footer\">");
                                if (ix != -1) {
                                    resp = resp.substr(0, ix);
                                }
                                var doc = parseHTML(resp);
                                var comments = new Array();
                                var dest = document.getElementById("msg-" + msgid);
                                if (dest) {
                                    for (var i = 1; i < 900; i++) {
                                        var comm = doc.getElementById("" + i);
                                        if (comm) {
                                            var header = getText(comm.getElementsByClassName("msg-header")[0]);
                                            var txt = getText(comm.getElementsByClassName("msg-txt")[0]);
                                            var newDiv = document.createElement("div");
                                            var newHdr = document.createElement("span");
                                            newHdr.appendChild(document.createTextNode(header + " "));
                                            newHdr.style.fontWeight = "bold";
                                            var newTxt = document.createElement("span");
                                            newTxt.appendChild(document.createTextNode(txt));
                                            newDiv.appendChild(newHdr);
                                            newDiv.appendChild(newTxt);
                                            newDiv.style.paddingLeft = "60px";
                                            newDiv.style.fontSize = "smaller";
                                            newDiv.setAttribute("class", "comments-" + msgid);
                                            if (theme == "orig") {
                                                newDiv.style.backgroundColor = "#fff";
                                                newDiv.style.marginLeft = "58px";
                                            }
                                            dest.appendChild(newDiv);
                                        }
                                    }
                                }
                                // jalog("done inline comments")
                                then();
                            } catch (e) {
                                jalog("JA(7): " + e)
                            }
                        }, 100)
                    }, false, true)
                } else {
                    for (var i = existing.length - 1; i >= 0; i--) {
                        existing[i].parentNode.removeChild(existing[i]);
                    }
                    then();
                }
            }


            // places column with links etc to the right
            function fixColumnPosition() {
                var content = null;
                try {
                    content = document.getElementById("content");
                } catch (e) {
                    //
                }
                if (content) {
                    if (mode == "MESSAGES") {
                        var rcol = document.getElementById("rcol");
                        if (columnRight) {
                            if (rcol)
                                rcol.style.paddingLeft = "50px"
                        }
                        var col = document.getElementById("column");
                        if (col && col.classList.length == 1) {
                            window.setTimeout(function () {
                                //
                                // run after original code
                                //
                                var e = document.documentElement.scrollTop || document.body.scrollTop;
                                var d = document.getElementById("column");
                                var c = document.getElementById("#rcol");
                                if (originalTop == -1) {
                                    jalog("col="+$("#column"))
                                    jalog("coloffs="+$(document.getElementById("column")).offset())
                                    try {
                                        originalTop = $(document.getElementById("column")).offset().top;
                                    } catch (e) {
                                        jalog("e="+e)
                                    }
                                }
                                var b = originalTop
                                if (b < e) {
                                    // fix
                                    if (columnRight) {
                                        var newLeft = getAbsoluteLeft(content) + content.offsetWidth - 12;
                                        col.style.left = newLeft + "px";
                                    }
                                    if (!document.scrollUpButton && scrollUpButton) {
                                        document.scrollUpButton = document.createElement("img")
                                        document.scrollUpButton.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABLCAYAAAAs2+QLAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAAnAAAAJwEqCZFPAAAAB3RJTUUH3QYCCQAXyz8mMgAAIABJREFUeNp1u3mUZddV5vnb59x73xxzRkRGzoPmyZZlyUIWtmwMLst2gwFTYMxUhc3cNl2FYQGNTf9RRXcBVctd9FpV1QVUNTS4XWoKGzAYPGB5kCxZs5RKZUqZyjkjY37DHc7Zu/+4LyJTVHWsFRkZ+SJe3n33Pt/+vm/vK0+WZN4QNSwIINhgHS5/Bf2+70UBPsoneI4TPMR/ks/wGL9324P2N//qiiuOqh/sx1mC9AIsV+jpDP03v9rQP1//EjwzI2xVwu5nHIsveQYnHFsvifQvSjragq1K2r3KfMc0z52MVjtOq/2Kvj3QfXf0CzeZFo9pa9fj3Dv3r/i+96/5Gw7j3nAYcR7bqGArJU6M0OOPYg+8Dfv+2ftFVn7cPsVPANj/9lspt95duV4yYW++f9OSJMVQrFTMAWvHsP5pbGG2DhaQ3+U3AOzV7FcIe5+Q971OJGuqOLDBFnF9CjY9MgS7chr7+wN3wecPCxurnuKUI+t7RqVn2PIUR52NDrhyq4IySrkcIFaRbAhWCmGmojEEf8zi5YFy116Gv/xZPfOTTWENTRfRlxPECfgGNCMsdZDdD2Anf2WP+/3V5/UP/uIn6K4nVFXgn3+sAjDYNAD5ppKIQSyQ8in0zW/C6h/AROqAx4GzdP2E/fQPTLlf+81XDfDBYEsQVZgR7DPn0L85v1f+7b/4JpwMXtaf8SRDb+kLKbqSUJQJRZJQ+gR1gorDVVANlWZUmpWStksZNguJ3UpbU8qUBW5f1PQ7HtH4ziWeOP+rnDqD9O5E9s6C6yEoZMCUw3pgZtjLpxOOHgr63d99i/zZn70N+CSAJU6QU59F013YlRcy/aVfLHn6aWww2AnWAPnEr2MPHkrllvvOCSAGlggM1rETZ5HJc4RPvuUd7m+/9FGY3PQUa87mk4TBICWPKQMaFJYSLSU0UiIeFY+IIU6xPFL4isw56zScJZuprFwurXCOx32oTr018ui98Y6D/9wat3/R/uenfkxuS67IwtsrkoAbRYht5Jxhh1N0qhfsD/5A5GMfO4dj/Wq5/te/wxd9mIlev8N+nQPf99uctq3tpNJqCcOhGeAi4EHOVbg9KaoRHj6G/LJ7c3y28Va2vniH46mjjlXxvLKesHk+ZWU1Y3S+QTVoEmgRXUO0kYm6VBBnVGIuRKOskLIkcTmZ5WRZTlsqEinRbinx+sqW3hXZ7ZWeGp/4NB96+dd43duvuENncJ0hcuBGKIE0YIsebQgqkimU21VqyfVL2OISrPf2wiee54Jt2bVlPBoB4AC84S4KkiX1axc24Q/tgD37hY/I1henRMorzqZPJVxY92yGlPXNlGLQQF2L2Oyg2sa0hVkTiZkZCaihFhFfQrMg5iNKTbFc0CmY6BrtGbNGYpQvw9mDsLtn/Np36pd+9/O86YX/QnEAZjxuaEhTYTaiFwU74KG+BVc/khtvxMxg2p02OE15TbDjm7L9h0OwDOiMf+KJxzL7jyffC59pO/qPOpusPJfaCSvrnpGk9LWBuialtQlJlxg6zug6QhusCebBUDSIWaHoEPUZYk6qVM1rZMsrIVVmndHJhf4Zc8uHVScm3ctfe1C/8eZv2KHOedsdTYcjvDSRMoOsQvBIkrQkhNFONE4Ec66O6toP77FDhxJ74YXXnGXiCD7/eezzX8Xe84b/AP0DwusXPLfMJxgJWycSNk814EoTv9nCRm2CdgjW9ZZMOWRKKad8Usx1OtViu10tNrM4b1TTzmwSlS4x6ZpJh+DaSGhhGw0urjZYfjVlZtjQ/jnHuSDh4X8knzn1E2zgdbKDVQOMiAmIeaQPPPJILoBNT9fXn/D/87GwgPzpn3blhhvWMasRWxVhhI0uY+954+9Y+rlLrhq+z7N6ynFxxdM/n7B1pYEno+9bVI0W0XeISc+TTgg60Wn72e/9vjd898Ji5w5xpCCiqtXaWn78/33omT9dXhlcMjyoUzRCMfIQPV5HbBq4kTGbZWRVgEG8+Mr36GNnPmtHvudJu9OZNhMkGNYssSJFlpbg3/5Rw73hSGH33IP4cfau/QRg/3548N05+/bCuD3xh/8Xdt9Ti/qBG3+Ny0/dK/E/3O7dxUvOVk8nXDmRsHqpyeZmRnRtRtqhcl1o9LBk0lQm775nz+0f+OAdH2u02GMSfZol4pwjxOCbrXT+nm879JaJidbg+EvLF3DOISJ4BGegqdFsGE6FkTd8X7AZI23w6sp+u777WbvpQMQcRIP1FAqDtofNKrJ3CubmMH9NkLb4wfvkM3dvya//YCk/9TaTw3d456ds+3X5Uvj33PuOH5XNx2+R6o+csLLquXwyId9KWTmXUQ4aqG+RW4cy7UCjR5VMYG7yrjfsufWd7zzys6NRDhKl22syOzdJt9vCFKqqIlRR9u2fvq070dx66cXlCwgOZ4J4wxuQGjo0kkKoCihLI1tAba89f66j1n6Ou9tDGbTBgaiHrQzX2YvsmkG6cjVge+vbJ+Xfffik3P+LI2l/m7ni9UgxZU4C9id/CJ/9DPaxH/xz8199xpVf2C1cHqYMz2cYKcMLDWLVJIYWubUpky4x6xGTHuYmCLH7Iz9y9y+WZZkZdbC7l2Y4eGCBmdkJRBx5UZHnOSEEO7B/9rbnj114bNgvqqv5cEAlBMBKI1FBE2NoxuwM+Z43yROjyk7e/ZS+/Xzhqg6EtZoUpR5SYNIh/sf4CblpriF3/sxA3nXflrvQxF3xuFaF2yyx1RTXOoK0VuHTieD/41GnF9sJo/WE1eWMtcsZ5bBJ2W9T0CFQZ1WySVQmqEL3Z372bT+TpW4xxCDtdsbi7hkOH1pk775ZpqY6uMQTQmA0KijLSmKMcted++955BunHlU1BTHMgRPIKihzJSsNK5WAEp0hhvYeMO09z81PvKjtPSbrK7hQIM0epBVMp+Cf4FvuHYsPyzu/7+ty/oC5tIe7LiKtFAmCDBwWU+yhx708/bl3SHz+BmfhcsLyhZSNzYyw1cTKNnlsU4Yupe+hvof6CQITP/7jb/7RqcnWTSFGazZTmZuf4uChBQ4cmGfXXId2p0GWJahCUVTkeUlRVGZGdsvNi/sff+zVZ+oCdaABXICkAkqFREkyJR8Y0lV5etJWR7eohvP4Ey9J2sE1QdoZTE5gE4B/U+8QT80+IpP3v4Qexh3o4CqPKwU3iBAcnBXkYU3txScmJPjDCYNLCRv9hEGZYdpgWLQorUtwPaKbENIJlIk737D/jptuWHhHWZaWZl5m5ybZv28XB/bvYtd8l24vI2t4fOoREUIwRnnBaJBLVQXa7cbs0tJk9vyz506BgphgFXg1xAWECF6hrfSjESJydopjulfmZ/8rh+aD2zUJ1sVSB8UW5v+o/DPOL5xg/1tx+jrkoOA2QAbUtGBrBVnro3/1QlfOne44G3YSzm8kDPKUKmQUsUVJl9L1wE14a0woTB44MHPwXe+8+Z/meYF3yNR0l337d3Hw0CILixP0JhpkmcMngvOC9x5wlGVgNCwoipKqCjY72z00Nd2yl168fB6i4NRAIi4JSDOS+MDIR3pdw3bh+hl2+qg981Lf3nrDo3T2gpWIm0XPryH+jW88LP/0p9dotpD5m5HSIWtbsD5CtjaRkxm8YvCFDXGbp7LETqcJl8oUSTLK0GIkLSrfFU16WGNScJNzM63d3//+O35+OBwBKhMTbfbsneXgkQX27ptharpFYztYZzgneOfqoE0oy8BwWDIcjKQsKtu9e/K6M+fWjm1uFAOcKEZF4gNmFUaglIhvG60O1oykw1fRKWN++FXdfVvh+hVsXkJG5zDfaa3RONJzt1xfMnEQJx76m8ilFnJ5BY6X2OkV3HPPqR+8kHhbncgYpg360mRTmlSxS/BdV/fb3uxMa/GHP3D7R/JRnqipdDoNdu+d4dDRRQ4cmGV2rk27leDH/UHMEAfOORLPOGjHcJTT7w8pilJiNO64fd/tTz519rFQxRJxFeIjUQPqFO9UBqkhHpzHXbxsOhJ7YfFla2+cl5XTsHkMVs6BX737f5XnJt7J/nd/yVWTgYsgQeDVEju+Bc+9ivvbZ3GXX1jwemIypT/dYD1tMkxalNKhdB2JvmOWdUGbH/7J1380xnKyCpW02w12L81w+Mgihw7Ps2tXl3a3QZIIzhRDt6U3TgSfOJLE45wQgtYAlpdUVSRJkvTee4+87mtfOf73SKKYBZxAVdVv0EDJU4Mm2svxVWVh/pDagy+Y5hu2f4TdcQvqXfVeV31yWc4cmGaFF22PM742gm8sI199XtwzzzXc5tPTPp7fk7Ex32Cl0aDfbjHKOlTSQ33PWdIztPGzP333h9ttd6QsC7IsYWFhkiNHFzl0ZIHdu3t0ew3SRPBjUbITsBjiBKEu6yTxIFIzyyJQlgFVo5ElzXvedOTGr3/txCM4b0RVYjAEKLV+s1AZqROqDWXlkF7SW+2lu4/YFx/4Z/zJGz+Ft0+K8MB1NvrWt/M7n3uIv9+v8oTr8MSxRbn42Kwvntjn9dWDKasLDZZbDfqtFlWrDVkPTXsoE6bSe9/33PKdhw5OvG00yvGpMDfb49CheY5cN8/SUg1SaSYIhhvLcSeCA5wDoWaSInVZp0mC955oRlUFyrIkhmjtdjY9PdMdvvjChbOYWC24xBCHKzHTCmJRN958Tbk0Z1K+Dr/vIfbqPzL/PT+34k9+Krfyhkn5y5sPcrl9kOMvTsrw63c5np32bC2mrEw02Gg26GdtQrMDWY/Q6BJtgqAT3Y6fe897bvyp4XAkIlGmprrsP7CLw0fm2bNvksmpJmlD6kDFEAScISaI7DBXaletvgNJ4kjSBCeOoEqeFxRFITGq7d83feurZ1ae2bgyHGECmtQtJZaIRkO2hFGILm5gccs4f4zsuWlrPvpJ8d/2q87pYsLF190j+XTDNh6dc9XJ+zzHvOdCK+W0ZfR7GX1pUTQ7WDZBkXWprEfFhIhN/OJH7/+NvCgytSDdTpM9e6c5fHieffummZppkWUO8YIgONkOtPaJRATDMKXWdXWuEe9IvCdNEwShqCryUU6eF1JV0e58/cFvP/bcxW+ORhYEj6mYGJiMDFcpNjDSDSNeMdJ1U/um+d2l+Rs+qTyz922ksSK8NHDx5Qc9T+I4USScKTOqdoMBTYZpB5dOUPgekQkqm0C195FfuP+jJnE6hNKazVQWd09z4NA8+w/MMjvXodFyOM/VYJHaJNMama22CwEZB+8QByJ1u0pSj3MOjUZRBvJRQZ6XEoNy8617b/rGIycf8zScIEAwQczMorMYbLgREzdQ5aQ6FRvZRfMXPn6dn7Czsq65lM/f7HhCPMdLz6lhSukabGmTQaNJlC5xHGywSbTq/vAH7/qBiV52YwiVZZmTXfM99h9e4NCBeXbNd2l3kjpYV2eyDnqcQXGYSR0wMhYHDoegAozPsxOHcw7nPRqNPC/JRwVlEUmTpHvj9Uu7v/XUqWc9qQOngipY5ZwFIwTNNpWkNFtYsfT4svnRxw+6tUEmyfPLLnxj2vGK95wqEjY0ZUBGnjYJtIlJl2ATBCbQovPAA9ffd/3Rue8Y5SPEqUzPdtm/f55DhxZYXJqk20vxSY3G9fVLDcgwDpJrgq2z60RAwInVVbD9vavLGxGqSinywCgvKIvA5ERrYaLdKl965co5hzOD6MxXigTxUQlbigSjmjab7uHnfnXSuWMjkedKX70w4Xm15VmOGVWaMdQmI5pI2iG6LpXroqF799377rzvvv0/OBgMzKyUXq/Jvn1zHDqym717Z5iaapJkDucUcYbbPpey3YUUtpHaOURc/ZrUZsM4zvqGCGPqWWcaoKwqhsOcfFQQymj79s/e6HHLr57ZuiwkAdKoEEjMcBhJYRTOqHrmP/o/rbvBF1fkwtdnXDgz5bkSMwaSMbQWOS1wXYJ00aSLSm9+V2fx/d9/80c2t7YshJG0OxlLe6c5cnQ3Bw/sYmamS7OR4r0BirvGEnSAWdzJunOC1UiFIGMQs9faiFJnX9yYmHiHxkg+yhkMhoxGhaiJXXfD0m0vPL/2yGiU5NAM4CJejTQarZbRcEbWUv9dHXX9p8Udf6XpYnE443JMKbMGeWhD7BFlgkiXKD1ibH3oQ3f+bIzlVFEMJWsIi0uTHL1uicOHFpmfn6TVzkj8jtuJmKBjJiUYZopjTDR2AhVqOKsRW7aJidQ3wcZBOy8kiSAOYqz1cz4KxIg4l8o99x6686tfufywkCqYmkQjDYbTSGJKq41/Jcy5J093pBjMevqTCQOXQdrCtEsMPTRMEK2Hxt599+6/8+jRybfl+cjSTGR+YYKj1y1y3dElFhan6HSb+MTXtSigprUHPGZTzkDE1fKW7R4smNXIDEZ91A0zq4cS/yDLbkw/kyTBcFSlUZSRqoyWJlkzTeXKy6+sX0YqLK1AKsXHSJSIy6LfCPf5yuY9q3OedRKypEHUNqHoEqoeIU6gVY8Qug8+eOP7ndNp501mZzscPLzA0SO72bNnhl6vife+LuFtMqF10DVCe5w4bJztnXJlXNY7XvCYcoqiqoir0RxXZ9qJkKaeLM1IfUY0Rz4K5KNKQjAWFrv7Hn30lccjleGKiKsiVlZIDHhiMqu/IJv9J6SsTjvsjCf3CVZmaMyISQOqJqQddNRJs2qXOGeTE13Zs2+WAwfmmV+cot1u4l0CRk0gsJ1W4102bi/bZS6A1kBl438Rq9sUWhe1KGoKblziAmq2A2TOeVqdBrsWJikKKIZKVQoba0OQarrZjJP9YV5gVQE6IpLRcCmhSpKt3u2wdQH0stCc98RRQpV7YvQ4EtQSLDRwvmlauVZrgl3z0+xZ2sX8/BSdVhMzT1Vtl6TghPqMOo9zdhWDLILZ+IZsg9OYjIx7lTlFVGvwGhMSBYIapjZG7pqGNpoN5uYmGeyNDEdKWSqDrSG4soEUDaxqQGxgISGIJ4kumbs4tKFbsHK4xyhTI1kF0RpFIoLh6xmaOXFirVZTJicmaLdbCMJoFMnzML44wzvwqaORedKGAwTnwI3haAxlmNZMih2KWQeiY5CyMZDFaFRlxSgPhKD174qrwVBrptbttJmZnmR9bUCRF4hFgZAgISWqR8yjiUejS9LRljXc0Ki6QixhIiqVKprX9WNmqCjqYj6M6xqtMxqWrK5sUeT92sq3qyMoJ9DtZkzPTjA91aTd8pDUSC3Xtimp31qwunzxuDHNFPEYECMMBoH1tSGrq1sMBvkYsR2Yw9RhUchHRp5XgFCWYT0vqkpsm6Fr/YVgSCRZDV+3bmOXQISsa2i0ejK6HmvU0IhSgm+eOLn6wtzM3NJFllnfWJMkVbBYn0OrZzGIMTvb4+Ch3SRujtQ7MqG+MThE9JqWRV2mGKhgThCXwPhGhCKyuV5w7swap09dYG19C6Wmm+Aw86AeM09RRBsOhpw4ufxMFUIhQkWgxEtFwyteDU0sWeK9rm/HAK/Oq5p0g0WChCKahgpiCVIiPv/iF1765r6luf179uj1/b4ZEsTQ8XF0hCpiVjEalkz0JpibnSBOpCAJMgafus04MN0+ojgVTOoB5fbAx9QRYmQ0iqyuDDl3do2VlXVwQpIkyPZJI6n1sJlcWemf/bvPP/8ISGlCISSFEUqMgLlAK0ZnGCGZMlhQ4nyUMB3RdjBrFJgvUD9CkgGSDIHRn37qsYdOvrL8TRETXF31qkJVGXkerb9V0t/KGY3K8Q3Ypotyte3YNlceU0onV4nIuKwdAibECopcGQ4qhv2SfBQJFZjVpe2cIGJy5tzKs5/+L499uqiqAc5GghuayRDnc3yWk/iK1IekkxyytU5ilJsqYUWdq6JZFsw1CtT6SOVQBRcNjxahKD71qW98+rqbFx+++calwxO95gy4rMq1MT3VvD1UKiHWN8FMrmGIhqrCdl+ue02d4TFim9X82sYZrkkJaKw96yoYjVRsdTU/niSN3LkYV9cGy8dfvPTy08+cPWtmAXGliA7N2MInAzxDxOeEWBBHVfLEewuSc23j1VOmF0Yqoa+Zr8pKeiP1ETRYPSitIk5KkBTEv3Ti8sZLL60cQ70j+iaUEz/1oftvU6sRVHA12m5ftNUBKlqfQaHWvmLXDN63W5WrnRHZVky10qp/0unv//7D/zc01yEpxyTdII0ODWaxsuhyvBvi6OPTEdiIRqNkfbVMbH9ubliQXApGc6Qh74UkuiJ1q0QyUylQU0NChfohDZ+B1KrcEk/MGgTLqMSkXlCpe6fVfRO7yo0R8M7vSAmxbYmoV5F7p/CvkUuvkZOGTxKJsaFImuOswLkKLGgoIkLAuRxHTiMdkcgI7yo6saKaDkn3O3/D+pd+RNg1p2n1amTQqdiYVVOvni1zRDVGITifW0aK05TEMkgSzDWwqmYXmCK1vFcEM61LVK7hXeIQN/ZydMyybHuDpObX25keq+Qdc4+xyBwHLRAUl5b4Th/vctAKpZ5IeHLSpCSzArGSRlaQr5RkUyHpX3wOfvZO+L1nTBtvifOPX7C1bhmnt6IZHUZs6FCkAlJSn+BJkKSB0zaxcjivbEu+sT9Vq13ZkXk1tdyWgfVrImPWhMMRuVrYMg587HUBZo6xxhofcANUEIt4CtJsQCI5CRXOAt4C3iqwknYITOeVSLeyBiHhgR/y7tEf1tkPLLP8wg+yrg/G674+1E0qG1EaMlRBgwZKMvFUSUoaIjiHVs36P892tids53LHBp1tZ8/YJs+1TPTjxGrNnF6zZlJTx/rWybj9+J1WZDamaLUFqiRS0c5y8uaIZh5JY8QXAQaBiSSwtBjtQC/SmIvJdcNfsRtu3OLJ29/KoT3/SU8/d4voo8F8SGnLIbDKnFyMRWPoioEmTHqj8ElNcR1YApIADjU/9qmkTsTYeRW5qo+3S3dc1Yh4xAI7dsg49PEprrNrHqwmGJhHpFlvA3gPXmv5l6aRlgt4X9LYjNgwMC+RPe3IkVb03eeD/PCkJr949JKcyLAbis9JuQWf/Mm/tItrv0X+mf8cD9kRW7ImV2zJNsplVyUD0zx1EBSL9ZAaATKBSsy8injPdunxWvNiW9xfzfq1GeWaNZPtlqT1DbUELB1XkTdIDUlB3XgfUCFRRZKKng80yordPtJ4MTSX1nSq86pO3rjb0uFbJblyFrn1EO5cqsyfgt88+3H565PTunz0x/ixFx/V57kpXOS4vcALfqPqi2xuWGyNwKX16TQTNB2nRnbgxsReE+o/WP5CFGzMuMSx075qH2j7d9xOOddB14M2s0TA15+GYBGc1u5fOw/sakSXfbW68aaH9cF3DZi7DuYvnZR/3PuKJhOHEdvCdnVg6R5k4gjcdduafOjD9+mdjJhh077OET1ruVyRR8jjeOtVMtmxKVyNt2PBdI0uusqb7TUovF0A24Rj/PfxfEl3zB7+mwUy2970xOrrIAiSCFYYHROmBOYvaevms7zpnhEHDkOvwF0/b1qBSxxw6jSc3OXkvaUiPTj7pPBbn/iWfPPnj9ulUcX17OElTnLJXrC82Rd8G3xLkHad6Shj1FQx0VogiI4RWnYMkGvgaxyw7ti3NgY4EcbVIeMsjx1OieOvIFIKEiCpZ+N4BIrx6CKDzTPEhiPpwqVXkUWwlTncmRVi8kcR/Sc3wIw3G2aw+wKy9AGTI6+OKP71T3D+sQUe/rsDNmfP4tYG6GjKaF8nuCnQGQidevcCwYgmErHtixsTitqikWsX+q7B8jF6i12zryNEERDFJIBUIAW4AnGJmBtYXe0RfFWbX2HN6judGL01m28u26Qi+8cMtjHmNsm5cL890njEJjeMN25ESa5TllJYuBXKYeEGnVOyb98psVdxYRX/+PGL7vyWGPHQmDopBK0v00UxCUCsM3yNFGSHVbk6TJVtfTg+GdvIrOOzW5MWXARXYVKCK8czmsGY20cjLWsrVIKS9GDQh8lC0v4If1HNR9A56F/B2lPgzjz7PvvrR+6w5Wi2elZNpMbDUY6woSQt5DrDaQ/p9XATU+BsS7GR4ULtjkisgyTWJSg6/t6uIvM1uHw1lzoG9J0mhJkRxzds+waYhHqlmlgLeZeD5OALkAAdEzKt33SiBf0Ju7x6nX39+KSe+Dz6xB+jy19DGwmWEKKs5D8iX5mZ1wev/IWtPgNLXaGMJuunYeYVLDuLtYGtAbq6jCozIF0hNg31ViMmSE2mx5rX/pu9XBkjsRNQV3tW217WVYNvG6SvgTiTHSBUs6sIaGKohyhC7AplAizC5rRsFYEn+nfx5ef/Vt8yusRtdw7c7t1KwuD9bjhT6uCRL8tfHTnIoT++ZP69I3nT/3mTvvLQzRKCkruL9piejc/oSJbjVEq2Dzq7oOqBNiE2DALgnTG2VceDsh2n8ZrorwWn7fGpjf1oREhwBFxt+m1TTXOY1dYOloKltefmRAgOtAGNaeG5A8jRAyL9Fs1ze23zL1qE+35X/pePN3T/noKEyX1K8wSXX3ebnlhW+e4HHpI/+fm79Y6n3ygm9zBf3icDtvD8HU3OiOOyRN8RijYwbv6SCJTbE6Qxa3Lj5iI77qTtcGmrl1muLWXkahVsqwlAdBzkdk8WD9aoJ+pG/W+j1EjbcGUJdi+Ie/pwnJye4/IXL9Fu3COPPAIhFFy5AgkCvNBU5ps8XPyP9vSvXNGt00/K6uJu+8Mz/7t8noFWNN0ib7bAS3Q5Ixt+S4jjO13FcY8JmKLjqxqj9tUSNamfBtnpymJjZ0brR1R2WpbbKePx5vNOlusbmoAkhrpaipbbFLMLRWKw29JRJAl9g/2msk4IDwHv493vhoQFYPdZgX3G3m+3zce/LPzAD9gLxz4ld555WfezSOKQvnYomaSQNagSYFQvZ5hBDAbRTEN0qJdrCINhqBjOrPacryp5xLbVkKHY2Ou62pPVtutfd6YR9QvOapPA18UQ1bCRMVFB/5xZq2N91oGOmR6SAAAJkUlEQVSWFMWbDM4KvFkXFh6WhH9NdN/u0HcfvYout35I1nt3c9kdlnMF9GSd8uIVtjYuImlAgsdoGVpsXwVQmRF1p/9afZZV66lBFAMLO8Va73nUwzLdMedl/Hbu6gx5PM4QdDzW0HoAud3hVAwUspHQWxd6CeV6inUDyF7sVAYctqzRlbU1SGiCHgqCfJvuzC7ffoCL+Sw88HGp7ASXH/5R0i+NiEVfvFMhjluMaq1OTRWiWAyxFv5Xy5NtS5V49fyOO4hc1Rg1LRd2ViKumZbWogzdHrWKOBUzLzWAGbiqFhb9izBnYs2zNCYXpXzxFWxhQbgErviIwedI3P5TOFu3sO20AXv2f8LN7j3Hy8eP0k+nhYZRhRXHN/sSz0chCsRUMIejRIkYKphKnQW3I+W2W009O/K1PTsWBjL2s+s+LDhzVwFLxqsSztUkbTvlDlBvWFKPOXbGFgoESC/DzLcobsP8bTeJWzGq/yyatn/J8iGSHPnJn3ZLm1f4mU89WLcQgafvS9kwkf1Hn7SntMfy8EmXf/n1RjsTmhGGDaBheMGiUivabVPGjz9rWWdai5k6qf5qSse6+aqJJ+NRWm3Oa7R6W8NqTbwt+E1d3fajE/CGN8FlNdExBdmAtXW40CAeGKEXBG7+ClvPPy2AJXfY52yx7d383ZB0oTmJ+LRiA7hhVMp9cU3+WNd4Zq4UWkuGn4BsEiqF4GUbcgAJFYVzvmXmJVaOsjDKHPJEx2tLcWdIfpV71YA11hC1eTC2eEcjpSiUEBStpaeoSjDzUjeDpD4jzRofMDWGFXQDJG2o2tg8xj/bJ/zmXcZXv0nyYcFBpHsQYYg1UthrMC/IqkOeG2FLusWzzXNiMgUurREyiCGJKRE/ttX7/dHqxERrWoMxHFWsr5WkaUKr7xEJO3Kx3gZwY1N+TCGFsc91dW40ypW11ZzBoCJU4CRhczNfNnXj52ykprapFxoJdEToYtw+KzKzRLL739Pe/IZshA8bd11fi4dZG7c2g6RZN5reWOnGom5vjTbSaa7Rd8uCS8E1rW5LWd1Uxv3l2WfPP3X//UeOFEXJ6soGWZqwsdEmy4xtFVUXvrvGa7aaI8tV6lE/xuOpKmNjPWd1ZYuqUgMvD3/lxJdRr6TO6pJ2Vi+NA1nTaIyEiUr49nN+7pW94dLel4xuH956Wx1wY2dT7Cq+VAOkGiFJBbcVCBG7FCp71C+bJdOGjIxUjEIUZ2oqweGLY8cvnrjhul0nFxbdkeVLy/T7AxqZQ1yt3MTVTFt1TBVFxsNwfS1XHq9BmDqqyhgNCwvBZPlyfuLs2cElpBGwLCBexysGSqwUX4LbMskKLKl43dKfyxl5g5y57vfUrf1j1nasRnktx/UNLGlgbgvxCl6QMq2g4yELho8RR8RXAU0qkEJwoxTaf/2Xz37uPd/z+u+dhsXRaIiamoiOPXpfOxpxe3tne+uuVlf1YM6uWVhLxvMjL8tXRqc/89kX/wJp5khWIEmF+IBzkXIYSFKlr0oI5ltbzCVDKsWWOo8TutNybOkexSD5h15TpdiWh1wQprFgsHoBSy8htjkVcdOKbyrO1U9+Ri1MY64mI8H1o4n/9EOP/dFb7r/p7sNHdt2RpL4j4pxzgnNOwI+f/dvenjXUwniUOrZ81CyqWYwWizIMXjx+6VuPfuPst5BWAb6PSwZIMsJcTkKJuoAXhRhpqGYLwRZ1XYODVoIoskNjkptgm7dwoUKOXYArc3AlGzeQABsnHRfW247sOqMxE0klkEuJxQIfRphvWAhprJcEzZM2//4rJ7/0pa+8/OXUJ2maOp94L1kjdS5peMzhfeqcg6CVldVInTOcr3nMcFgVIagUeVk/aiap4rMS3GAc7Bbi+yR+hIWCxFV4rejNGL0V86PEJpZ7JhOFbJwp9d7qsh2/t2YxyfZzhQCNPrb5OPbNwZz8zrE78PumIPNY3if624wDt3g2LkSyfkW6kaB5QZQcH4eoE9OgiqsEl9W7NokjOldEZyMwG2wjtQOX176Uj4IVY5ckjv3McY/yUu8bmiqiFaI5ogO89HFui5QBXkdUVYmVkV4ZWSl0aW2k83NbtvAnLXvu9lv5wyv/xNzdoImQvPOdV5lc+S//JV9638eMY4/A5VslFgGKccvcyGHXijLzamTrZKSQinK1IA0JwSCJEZVg0XIzS2vDWF0NExmCMwHUi+Ci4NUh0ZASXDEONsrVSbmv245mtWQyDfVCtB+R2AAvAyQMkaqgM6pIBxVONHOn9frOBru+0LHP7/ou87/xEFz5CPqhXwAzkr/5m2vM4w9edLwe+IvDMOhAB+gb3PMINA4rz++NpCo0hoF27gl5Qa6CFYrXQJSCxBpEUgxnKi7W4wfdeZDVIWTmcCUkQZBoJAoxH9uu20Ol1Gq97cfjC1VES3wskTDCwpCMHB9yBssFcTmk9nK4/dYz3D1U6ywO+D9+6aFx/9EdYp68xoEpSuMrX4N/905729IWX/Z/RVxKhe/4grmzPyNszatd7Aa7YoY0oLcb3LqRbwbiZoW3EosZQT0V28/p1NMCS8erACV4HGmANK9lpq8gGRlaOLwTSjVIDN8xghsn3ulYbgWwgtQXWF7I5mohab9K0+PhbftfsXsfwG6ddXZuVf+7jwmLXSNNvuv9Dfnb/0dNqQTalvkhZQRIaVMRPv51SZ6ZkOJ8w8nZ53zYNcjINxOK5ZTiUkK5lhIqj0mCNpCyISYZuAmQNnhfPxrr+obbFLItYNNwI3CjsfAYjx8sAZpGnILQhDJVnFNcI9BMI6ubBWkopZmHzuQj4a0HT9r/8C7sTYczblhEn/YNvesNW/Yab3gc8I5AW9+CA3vbOjc35OLoFpbeequcuGMv/PJvGyAeb7uakfhjj7rl41OOvWXCxRcT1k55imMeXUsotxwVDm0IcXK8dDJntKdc7YcaUBjJpuBXwa3W9msyBBvW2rZoQRg/h9TvAVP1+xRBqVyUQRnTJA+Uy6G5+/n4nrsu6/e+27ipgzQdumehSXx1t7V+5JV4z/u/Uz74KS8/x1/p9hPi2yN5pnroxsbQmcGWPMcP8S/0RP5mkV/+7XpviigXc+wG9xLLd96mSVyKYdEbK2vKpo8sXwjCilhwjuAF2WtID0K7pqQ2Aem0UBbGcAQyCQ2DSTEYChsbIJXR8/XzAjYJk20YdUzOlSYBSxJn1gvqN1Y02f2kvv3uXH/o/Sa37cY2L0DfcL6TW7rRt8v/Zsb96LMzvIfd9nP8lQD2/wFuxFXOUvB04gAAAABJRU5ErkJggg=="
                                        document.scrollUpButton.setAttribute("style", "position: fixed; left: "+(document.body.offsetWidth-60)+"px; top: 10px;");
                                        document.scrollUpButton.style.cursor = "pointer"
                                        document.scrollUpButton.onclick = function() {
                                            window.scrollTo(0, 0);
                                        }
                                        document.body.appendChild(document.scrollUpButton)
                                    }
                                } else {
                                    if (columnRight) {
                                        col.style.left = "668px";
                                    }
                                    // abs
                                    if (document.scrollUpButton) {
                                        document.body.removeChild(document.scrollUpButton)
                                        document.scrollUpButton = null;
                                    }
                                }
                            }, 5);
                        } else {
                            // window.document.title = "ELSE.."
                        }
                    }
                }
            }

            function callJA(url, data, callback, indicatorPeer) {
                if (getCookie("jaconf") == "1") {
                    if (indicatorPeer) {
                        if (!indicatorPeer.indicator) {
                            indicatorPeer.indicator = document.createElement("img");
                            indicatorPeer.indicator.style.height = "12pt";
                            indicatorPeer.indicator.src = "data:image/gif;base64,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";
                            indicatorPeer.parentNode.insertBefore(indicatorPeer.indicator, indicatorPeer.nextSibling);
                        } else {
                            return;     // already running
                        }
                    }
                    data.hash = getCookie("hash")
                    var cb = "jacb_"+(new Date().getTime())
                    var src = jaiprtru + url + "?callback="+cb
                    for(var i in data) {
                        src = src + "&" + i + "="+encodeURIComponent(data[i]);
                    }
                    if (firefox && !firefoxAddon) {
                        // firefox greasemonkey content script, cross-domain request ok
                        src = src + '&format=json'
                        doAjaxRequest(src, function(txt) {
                            try {
                                var json = JSON.parse(txt);
                                callback(json);
                            } finally {
                                if (indicatorPeer.indicator && indicatorPeer.indicator.parentNode) {
                                    indicatorPeer.indicator.parentNode.removeChild(indicatorPeer.indicator);
                                    indicatorPeer.indicator = null;
                                }
                            }
                        }, false, false)
                    } else {
                        // all other browsers support script calls
                        var scriptel = document.createElement("script");
                        scriptel.src = src;
                        window[cb] = function(arg) {
                            if (indicatorPeer.indicator && indicatorPeer.indicator.parentNode) {
                                indicatorPeer.indicator.parentNode.removeChild(indicatorPeer.indicator);
                                indicatorPeer.indicator = null;
                            }
                            try {
                                callback(arg);
                            } finally {
                                window[cb] = null;
                                document.head.removeChild(scriptel);
                            }
                        }
                        document.head.appendChild(scriptel);
                    }

                } else {
                    if (confirm("ВНИМАНИЕ! Это действие требует подтверждения того, что вы *доверяете* третьему участнику (серверу Juick Advanced) - ваш ключ будет использован одноразово для осуществления вашей идентификации в целях предотвращения нецелевого использования. Трафик на этот сервер идет через защищенное соединение (https). ")) {
                        setCookie("jaconf","1", 5000);
                        callJA(url, data, callback, indicatorPeer);
                    }
                }
            }


            var theme = getCookie("juick_classic_theme");
            if (!theme) theme = "orig";
            var cs = getCookie("cs");
            var continousScroll = cs ? cs != "0" : false;  // opera lags with it
            var ae = getCookie("ae");
            var autoExpand = ae ? ae != "0" : false;
            var ic = getCookie("ic");
            var inlineComments = ic ? ic != "0" : false;
            var aic = getCookie("aic");
            var autoInlineComments = aic ? aic != "0" : false;
            var na = getCookie("na");
            var noArabs = na ? na != "0" : false;
            var im = getCookie("im");
            var doInlineMedia = im ? im != "0" : false;
            var cr = getCookie("cr");
            var columnRight = cr ? cr != "0" : false;
            var mn = getCookie("mn");
            var messageNumbers = mn ? mn != "0" : false;
            var jc_os = getCookie("jc_os");
            var otherSources = jc_os ? jc_os != "0" : false;
            var jcs = getCookie("jcs");
            var juickClassicStyle = true; // jcs ? jcs != "0" : false;
            var rt = getCookie("rt");
            var regularTime = rt ? rt != "0" : false;
            var sub = getCookie("sub");
            var scrollUpButton = sub ? sub != "0" : false;

            var noActionButtons = theme == "bright" || theme == "gray";

            function createOption(key, lab) {
                var opt = document.createElement("option");
                opt.setAttribute("value", key);
                opt.appendChild(document.createTextNode(lab));
                return opt;
            }


            var style = document.createElement("style");

            // make secondary toolbar not so big, so (at least initially) it looks not ugly.
            if (juickClassicStyle) {
                style.appendChild(document.createTextNode("#mtoolbar { width: 574px; }"));
                style.appendChild(document.createTextNode("div.title2 { width: 60%; }"));
                style.appendChild(document.createTextNode("li.msg { border-radius: 6px; }"));
            }


            var jnotify = document.getElementsByName("jnotify");
            if (jnotify.length == 1 && jnotify[0].nodeName.toLowerCase() == "input") {
                var before = document.getElementById("content").firstChild;
                //
                // settings page.
                //
                var form = jnotify[0].parentNode.parentNode       // form
                function addNode(n) {
                    // form.insertBefore(p, jnotify[0].parentNode);
                    before.parentNode.insertBefore(n, before);
                }

                mode = "SETTINGS"

                var hdr = document.createElement("h2");
                setText(hdr, "Juick Classic")
                hdr.setAttribute("style", "background: url('http://ja.ip.rt.ru:8080/images/juick_classic_48.png') no-repeat; padding-left: 58px; line-height: 48px;");
                addNode(hdr);
                var comment = document.createElement("span")
                comment.style.fontSize = "12px";
                comment.style.paddingLeft = "10px"
                comment.appendChild(document.createTextNode("(нажимать на кнопку OK внизу не требуется)"))
                hdr.appendChild(comment)
                //
                // adding theme selection checkbox
                //
                var p = document.createElement("p");
                var select = document.createElement("select");
                p.appendChild(select);
                select.appendChild(createOption("dark", " Тёмная тема"));
                select.appendChild(createOption("bright", " Песочная тема"));
                select.appendChild(createOption("gray", " Светло-серая тема"));
                select.appendChild(createOption("orig", " Родная тема"));
                select.onchange = function () {
                    var newTheme = select.options[this.selectedIndex].value;
                    setCookie("juick_classic_theme", newTheme, 5000);
                    window.alert("Тема изменена. Перезагрузите страницу. ");
                }
                addNode(p)
                for (var i = 0; i < 4; i++) {
                    var testTheme = select.options[i].value;
                    if (testTheme == theme) {
                        select.selectedIndex = i;
                        break;

                    }
                }

                //
                // Juick Classic little style adjustments
                //
                p = document.createElement("p");
                var inputJCS = document.createElement("input");
                var juickClassicStyleCR = inputJCS;
                inputJCS.setAttribute("type", "checkbox");
                inputJCS.disabled = true;
                if (juickClassicStyle)
                    inputJCS.checked = true;
                p.appendChild(inputJCS);
                p.appendChild(document.createTextNode(" Немного подпилить цсс для ламповости"));
                inputJCS.onclick = function () {
                    setCookie("jcs", inputJCS.checked ? "1" : "0", 5000);
                }
                addNode(p)
                //
                // Other sources
                //
                p = document.createElement("p");
                var inputJCOS = document.createElement("input");
                inputJCOS.setAttribute("type", "checkbox");
                if (otherSources)
                    inputJCOS.checked = true;
                p.appendChild(inputJCOS);
                p.appendChild(document.createTextNode(" Добавить доп. источники: 'Неотвеченные' и проч."));
                inputJCOS.onclick = function () {
                    setCookie("jc_os", inputJCOS.checked ? "1" : "0", 5000);
                }
                addNode(p)
                //
                // Message Number
                //
                p = document.createElement("p");
                var inputMN = document.createElement("input");
                inputMN.setAttribute("type", "checkbox");
                if (messageNumbers)
                    inputMN.checked = true;
                p.appendChild(inputMN);
                p.appendChild(document.createTextNode(" Показывать номера мессаг, убрать выпадающий диалог с каждого мессага"));
                inputMN.onclick = function () {
                    setCookie("mn", inputMN.checked ? "1" : "0", 5000);
                    if (inputMN.checked) {
                        juickClassicStyleCR.checked = true;
                        setCookie("jcs", "1", 5000);
                    }
                }
                addNode(p)
                //
                // dates, numbers
                //
                p = document.createElement("p");
                var inputCR = document.createElement("input");
                inputCR.setAttribute("type", "checkbox");
                if (columnRight)
                    inputCR.checked = true;
                p.appendChild(inputCR);
                p.appendChild(document.createTextNode(" Сделать меню справа, а не слева"));
                inputCR.onclick = function () {
                    setCookie("cr", inputCR.checked ? "1" : "0", 5000);
                }
                addNode(p)
                //
                // adding continous scroll checkbox
                //
                p = document.createElement("p");
                var inputCS = document.createElement("input");
                inputCS.setAttribute("type", "checkbox");
                if (continousScroll)
                    inputCS.checked = true;
                p.appendChild(inputCS);
                p.appendChild(document.createTextNode(" Включить бесконечную прокрутку вниз"));
                inputCS.onclick = function () {
                    setCookie("cs", inputCS.checked ? "1" : "0", 5000);
                }
                addNode(p)
                //
                // autoexpand tree view
                //
                p = document.createElement("p");
                var inputAE = document.createElement("input");
                inputAE.setAttribute("type", "checkbox");
                if (autoExpand)
                    inputAE.checked = true;
                p.appendChild(inputAE);
                p.appendChild(document.createTextNode(" Всегда открывать дерево комментариев"));
                inputAE.onclick = function () {
                    setCookie("ae", inputAE.checked ? "1" : "0", 5000);
                }
                addNode(p)
                //
                // nicht arabs!
                //
                p = document.createElement("p");
                var inputNA = document.createElement("input");
                inputNA.setAttribute("type", "checkbox");
                if (noArabs)
                    inputNA.checked = true;
                p.appendChild(inputNA);
                p.appendChild(document.createTextNode(" Арабы не пройдут! NO WAI!"));
                inputNA.onclick = function () {
                    setCookie("na", inputNA.checked ? "1" : "0", 5000);
                }
                addNode(p)
                //
                // inline comments
                //
                p = document.createElement("p");
                var inputIC = document.createElement("input");
                inputIC.setAttribute("type", "checkbox");
                if (inlineComments)
                    inputIC.checked = true;
                p.appendChild(inputIC);
                p.appendChild(document.createTextNode(" Вгружать комменты по клику на к-во комментариев"));
                inputIC.onclick = function () {
                    setCookie("ic", inputIC.checked ? "1" : "0", 5000);
                    if (inputIC.checked) {
                        juickClassicStyleCR.checked = true;
                        setCookie("jcs", "1", 5000);
                    }
                }
                addNode(p)
                //
                // auto inline comments
                //
                p = document.createElement("p");
                p.style.marginLeft = "32pt"
                var inputAIC = document.createElement("input");
                inputAIC.setAttribute("type", "checkbox");
                if (autoInlineComments)
                    inputAIC.checked = true;
                p.appendChild(inputAIC);
                p.appendChild(document.createTextNode(" Вгружать комменты автоматически если меньше пяти штук"));
                inputAIC.onclick = function () {
                    setCookie("aic", inputAIC.checked ? "1" : "0", 5000);
                    if (inputAIC.checked) {
                        juickClassicStyleCR.checked = true;
                        setCookie("jcs", "1", 5000);
                    }
                }
                addNode(p)
                //
                // regular timestamps
                //
                p = document.createElement("p");
                var inputRT = document.createElement("input");
                inputRT.setAttribute("type", "checkbox");
                if (regularTime)
                    inputRT.checked = true;
                p.appendChild(inputRT);
                p.appendChild(document.createTextNode(" Показывать дату/время мессаг (в местной временной зоне)"));
                inputRT.onclick = function () {
                    setCookie("rt", inputRT.checked ? "1" : "0", 5000);
                    if (inputRT.checked) {
                        juickClassicStyleCR.checked = true;
                        setCookie("jcs", "1", 5000);
                    }
                }
                addNode(p)
                //
                // scroll up buton
                //
                p = document.createElement("p");
                var inputSUB = document.createElement("input");
                inputSUB.setAttribute("type", "checkbox");
                if (scrollUpButton)
                    inputSUB.checked = true;
                p.appendChild(inputSUB);
                p.appendChild(document.createTextNode(" Добавить кнопку для скролла наверх"));
                inputSUB.onclick = function () {
                    setCookie("sub", inputRT.checked ? "1" : "0", 5000);
                }
                addNode(p)
                //
                // inline media
                //
                p = document.createElement("p");
                var inputIM = document.createElement("input");
                inputIM.setAttribute("type", "checkbox");
                if (doInlineMedia)
                    inputIM.checked = true;
                p.appendChild(inputIM);
                p.appendChild(document.createTextNode(" Вставлять картинки из ссылок "));
                inputIM.onclick = function () {
                    setCookie("im", inputIM.checked ? "1" : "0", 5000);
                }
                addNode(p)
                //
                // bugtracker link
                //
                p = document.createElement("p");
                var link = document.createElement("a");
                p.appendChild(link);
                link.href = "https://bitbucket.org/sannysanoff/juick-advanced/issues"
                setText(link, "Баг-трекер")
                var bold = document.createElement("b");
                bold.appendChild(document.createTextNode(" <== свои предложения и сообщения об ошибках писать туда"));
                p.appendChild(bold)

                addNode(p)

                //
                // restyle page
                //
                if (theme == "bright") {
                }
                if (theme == "dark") {
                    style.appendChild(document.createTextNode("#content.pagetext { background: #464641; }"));
                }
                p = document.createElement("hr");
                addNode(p)
            }

            style.appendChild(document.createTextNode(".msg { padding: 3px;}"));
            var backgroundColor = null;
            var linkColor = null;

            if (theme != "orig") {
                style.appendChild(document.createTextNode(".msg-cont { background: inherit; }"));
            }
            if (theme == "gray") {
                // all links
                linkColor = "#666";
                // single message
                style.appendChild(document.createTextNode("li.msg { background: #fff; }"));
                // header
                style.appendChild(document.createTextNode("#nav-right a { color: #afafaf; }"));
                style.appendChild(document.createTextNode("#hwrapper { background: #c3c3c3; }"));
                style.appendChild(document.createTextNode("#header label { color: #666; }"));
                backgroundColor = "#f9f9f9";
            }
            if (theme == "bright") {
                // single message
                linkColor = "#b07131";
                style.appendChild(document.createTextNode("li.msg { background: #eeeedf; }"));
                // header
                style.appendChild(document.createTextNode("#hwrapper { background: #b2b283; }"));
                style.appendChild(document.createTextNode("#header label { color: black; }"));
                backgroundColor = "#cbcb9c";
            }
            if (theme == "dark") {
                linkColor = "#b07131";
                style.appendChild(document.createTextNode("#mtoolbar { background: #31312f; }"));
                style.appendChild(document.createTextNode("html { background: black; }"));
                style.appendChild(document.createTextNode("li.msg, .title2 { background: #464641; }"));
                style.appendChild(document.createTextNode(".msg { border: none; }"));
                // this is service toolbar
                style.appendChild(document.createTextNode("div { color: white; }"));
                style.appendChild(document.createTextNode("#hwrapper { background: #000000; }"));
                backgroundColor = "#000000";
            }

            if (linkColor) {
                style.appendChild(document.createTextNode("#nav-right a { color: " + linkColor + "; }"));
                style.appendChild(document.createTextNode("a { color: " + linkColor + "; }"));
            }
            if (backgroundColor) {
                style.appendChild(document.createTextNode("html { background: " + backgroundColor + ";}"));
                document.body.style.backgroundColor = backgroundColor;
            }

            // enlarge new post textarea
            if (document.location.toString().indexOf("/post") != -1) {
                var textarea = document.getElementsByClassName("newmessage")[0];
                textarea.setAttribute("rows","17")
            }

            if (noActionButtons) {
                // remove images from main header
                var post = document.getElementById("hi-post");
                var russian = false;
                if (post) {
                    postText = getText(post.parentNode);
                    post.removeAttribute("class");
                    russian = postText == "Написать";
                    if (linkColor)
                        post.nextSibling.style.color = linkColor;
                }
                var settings = document.getElementById("hi-settings");
                if (settings) {
                    settings.removeAttribute("class");
                    setText(settings, russian ? "Настройки" : "Settings");
                    if (linkColor)
                        settings.parentNode.style.color = linkColor;
                }
                var logout = document.getElementById("hi-logout");
                if (logout) {
                    logout.removeAttribute("class");
                    setText(logout, russian ? "Выйти" : "Logout");
                    if (linkColor)
                        logout.parentNode.style.color = linkColor;
                }
                // fix logo
                var headIco = document.getElementById("hi-logo");
                if (headIco) {
                    headIco.removeAttribute("class");
                    var newLogo = document.createElement("IMG");
                    if (theme == "bright") {
                        newLogo.src = "http://static.juick.com/logo2.png";
                    } else {
                        newLogo.src = "http://static.juick.com/d/4/logo.png";
                    }
                    newLogo.style.width = "120px";
                    newLogo.style.height = "40px";
                    newLogo.style.maxWidth = "120px";
                    newLogo.style.maxHeight = "40px";
                    headIco.appendChild(newLogo);
                }
                style.appendChild(document.createTextNode("#nav-right a { font-weight: bold; }"));

            }


            //
            // add "powered by" image to the header
            //
            try {
                var ul = document.getElementById("header");
                if (ul && ul.nodeName.toLowerCase() == "ul") {
                    var as = ul.getElementsByTagName("A");
                    var logout = null;
                    var post = null;
                    for (var i = 0; i < as.length; i++) {
                        if (as[i].getAttribute("href") == "/logout") {
                            logout = as[i];
                        }
                        if (as[i].getAttribute("href") == "/post") {
                            // remove "wide" attribute from post (because we added extra stuff!)
                            as[i].setAttribute("class", "");
                        }
                    }
                    if (logout) {
                        var beforeLI = logout.parentNode;    // li with 'logout'
                        var newLi = document.createElement("li");
                        newLi.setAttribute("class", "right");
                        var a = document.createElement("a");
                        a.href = "https://chrome.google.com/webstore/detail/juick-classic/bhbhpkhmgbffbpiicpdlipidmknajbkj";
                        a.style.padding = "0px";
                        var img = document.createElement("img");
                        img.src = "http://ja.ip.rt.ru:8080/powered_by.png";
                        img.style.maxWidth = "94px";
                        img.id = "powered_by_juick_classic";
                        img.style.marginBottom = "2px";
                        if (theme == "bright" || theme == "gray") {
                            img.width = "0";
                        }
                        a.appendChild(img);
                        newLi.appendChild(a);
                        beforeLI.parentNode.insertBefore(newLi, beforeLI);
                        var search = document.getElementsByName("search");
                        if (search && search.length == 1 && search[0].nodeName.toLowerCase() == "input") {
                            search[0].style.width = "185px";
                        }
                    }
                }
            } catch (e) {
                jalog("JA(8): " + e)
            }

            if (mode == "THREAD") {
                // fixing column position
                var content = document.getElementById("content");
                content.style.paddingLeft = "40px";
            }

            //
            // returns msgid
            //
            function processMessage(message) {
                //
                // remove timestamp with annoying dropdown which is expected to be clicked,
                // and add proper msgid link and timestamp as text
                //
                //window.alert("process message: "+message.innerHTML)

                if (message.processed) return message.processed;

                var msgtxt = null;
                var msgts = null;
                var msgtss = message.getElementsByClassName("msg-ts");
                if (msgtss.length > 0) {
                    msgts = msgtss[0];
                }
                var msgtxts = message.getElementsByClassName("msg-txt");
                if (msgtxts.length > 0) {
                    msgtxt = msgtxts[0];
                }
                var avatars = message.getElementsByClassName("msg-avatar");
                if (avatars.length > 0) {
                    if (juickClassicStyle) {
                        avatars[0].style.padding = "5px";
                    }
                }
                var forms = message.getElementsByTagName("FORM");
                if (forms.length > 0) {
                    if (juickClassicStyle) {
                        forms[0].style.display = "none";
                    }
                }
                if (msgtxt != null && msgts != null) {
                    var a = msgts.getElementsByTagName("A")[0];
                    var href = "" + a.href;
                    var numberIndex = href.lastIndexOf("/");
                    var msgid = href.substring(numberIndex + 1);
                    var date = a.innerHTML;
                    if (regularTime) {
                        function pad2(s) {
                            while(s.length < 2) {
                                s = "0"+s;
                            }
                            return s;
                        }
                        var converted = convertDate(a.title)
                        var dt = new Date(convertDate(a.title));
                        // alert(a.title+" dt="+dt+" converted="+converted)
                        date = ""+(1900+dt.getYear())+"-"+pad2(""+(dt.getMonth()+1))+"-"+pad2(""+(dt.getDate()))
                        date += " ";
                        date += pad2(""+(dt.getHours()))+":"+pad2(""+(dt.getMinutes()));
                    }
                    var newPart = message.ownerDocument.createElement("div");
                    var comments = message.getElementsByClassName("msg-comments");
                    if (juickClassicStyle) {
                        msgts.style.display = "none";
                    }

                    if (noArabs) {
                        var arabCount = 0;
                        var russCount = 0;
                        var loCount = 0;
                        var arra = "";
                        var codes = "";
                        var text = getText(msgtxt);
                        for (var i = 0; i < text.length; i++) {
                            var charCode = text.charCodeAt(i);
                            if (charCode == 1055) { // long dash
                                loCount++;
                            } else if (charCode >= 0x600) {
                                arabCount++;
                                arra += text.charAt(i);
                            } else if (charCode >= 0x400 && charCode < 0x450) {
                                russCount++;
                            } else {
                                loCount++;
                            }
                            codes += " " + charCode;
                        }
                        if (arabCount > russCount && arabCount > 10) {
                            message.style.display = "none";
                        }
                    }


                    // proper link to message #12345
                    if (juickClassicStyle) {
                        var theA = message.ownerDocument.createElement("a");
                        theA.setAttribute("href", href);
                        theA.appendChild(message.ownerDocument.createTextNode("#" + msgid));
                        // plain text date
                        var theSpan = message.ownerDocument.createElement("span");
                        theSpan.setAttribute("class", "msg-ts");
                        theSpan.style.marginLeft = "15px";  // for date spacing
                        theSpan.appendChild(message.ownerDocument.createTextNode(date));
                        if (comments.length == 0) {
                            theA.setAttribute("style", "padding-left: 10px; font-size: small;")
                            theSpan.style.paddingLeft = "15px";
                            newPart.setAttribute("clazz","zeroCommentsFooter");
                            newPart.appendChild(theA);
                            newPart.appendChild(theSpan);
                            // A and SPAN together
                            msgtxt.parentNode.insertBefore(newPart, forms[0]);
                        } else {
                            var commentz = comments[0];
                            if (inlineComments) {
                                if (commentz.firstChild.nodeName.toLowerCase() == "a") {
                                    // link to comments
                                    var link = commentz.firstChild;
                                    link.onmousedown = function (ev) {
                                        if (ev == null || ev.button == 0) {
                                            var oldHref = link.href;
                                            link.href = "javascript:;";
                                            window.setTimeout(function () {
                                                link.href = oldHref;
                                            }, 500);
                                            window.setTimeout(function () {
                                                link.style.display = "none";
                                                var text = document.createTextNode("Loading..");
                                                link.parentNode.insertBefore(text, link);
                                                toggleInlineComments(msgid, function () {
                                                    link.parentNode.removeChild(text);
                                                    link.style.display = "";
                                                });
                                            }, 100);
                                            return false;
                                        }
                                    };
                                    if (autoInlineComments) {
                                        var numberOfReplies = link.textContent;
                                        if (numberOfReplies.indexOf(" ") == 1) {
                                            var nr = parseInt(numberOfReplies.substr(0, 1));
                                            if (nr < 6) {
                                                window.setTimeout(function() {
                                                    link.onmousedown(null)
                                                }, 2000);
                                            }
                                        }
                                    }
                                }
                            }
                            theA.setAttribute("style", "padding-right: 10px;")
                            // 'A' before list of commenters
                            commentz.insertBefore(theA, commentz.firstChild);
                            commentz.appendChild(theSpan);
                        }
                    }
                    if (doInlineMedia)
                        inlineMedia(message);
                    message.processed = msgid;
                    return msgid;
                }
                return null;
            }

            function checkOrderedMessageIds(msgid) {
                if (!shouldCheckMessageOrder)
                    return true;
                if (globals.lastProcessesMessage) {
                    if (parseInt(msgid) > globals.lastProcessesMessage) {
                        alert("Бесонечный скролл: жуйк вернул снова те же самые данные. Останавливаемся.")
                        continousScroll = false;
                        return false;
                    }
                }
                globals.lastProcessesMessage = parseInt(msgid);
                return true;
            }

            function processComment(message) {
                //
                // remove timestamp with annoying dropdown which is expected to be clicked,
                // and add proper msgid link and timestamp as text
                //
                var msgts = null;
                var msgtss = message.getElementsByClassName("msg-ts");
                if (msgtss.length > 0) {
                    msgts = msgtss[0];
                }
                if (msgts != null) {
                    var a = msgts.getElementsByTagName("A")[0];
                    var date = a.innerHTML;
                    var links = message.getElementsByClassName("msg-links")[0];
                    if (!links) {
                        links = message.getElementsByClassName("msg-comments")[0];  // tree view
                    }
                    if (links && juickClassicStyle) {
                        msgts.style.display = "none";
                        var theSpan = message.ownerDocument.createElement("span");
                        theSpan.setAttribute("class", "msg-ts");
                        theSpan.appendChild(message.ownerDocument.createTextNode(date));
                        links.appendChild(theSpan);
                    }
                }
                if (doInlineMedia)
                    inlineMedia(message);
            }

            function maybeAddImageButton(ta, msgid, rid, addOK) {
                if (document.getElementById("postimage-" + rid) != null) {
                    // already here
                    return false;
                } else {
                    ta.style.width = rid != 0 ? "400px" : "460px";
                    var theA = document.createElement("A");
                    theA.style.fontSize = "smaller";
                    var theIMG = document.createElement("IMG");
                    theIMG.id = "postimage-" + rid;
                    theIMG.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUCAYAAACXtf2DAAAACXBIWXMAAAsTAAALEwEAmpw" +
                        "YAAACkElEQVQ4EaWUOWgUYRSAdzaneMYD7yOgpEgQlUQrJYiiiIiiIAqWsdDGWpLa1iI2aljEINjYKMZCNIkgCiIIGgQtjGSDBwg" +
                        "iahKj6/fNzgyzy8K6+ODb/3r/e/87ZoNCoZD5HwmCYAf3G7HzqKIdHfwrGKiDZlgHp2EEZuEJ1FeyU9U4FwNogLmwE/phAr7DK7g" +
                        "P09BZkwMuNEILtMM5GIWvMAk34AgsgFb4ARchKHdSEgEKWfCly+EAXIZ38AmeQS+0p42wNsLb8B4Wpc+c17OZoVC+VsOrYA8che3w" +
                        "Bx7CTRiGn6D+MseU6OAg7OPsQWp/Su9rPIC90AkzoIElMA5v4RdYByOsJHPY3AJ5MBLFhhjypxuugWm5BeZSB60wCjrUwRRYTMdyvr" +
                        "E3Bh9BfR++Gz5AZnU0ucNYZ96QQfAl86EpGhczmkrX1ViPjoXPZTFoWAOwCzpAyYKezLnh94GRdaE/nSY6ny3bM9JQNKSYGtN12EVKL" +
                        "PJKOAunYD8kQkF1fgY2JpvFiSkKJewiZi9gCHq45Et/g6LTSbgChn0P0qLx87CVe88ZrxPJRFoh+Q7YPAYaPgQDMA5NXGAI67QpXkd7" +
                        "XazVUcEiW9Dj0ZlRF2vAJJZhJno/CUYWWmb0EXl4w7Sbly6NUtPHeq3nyDywC233UtFjDCcXwNeYMvs/jMBzpAc+wwjkwHb0II2dtxB" +
                        "WQBhBYjwyso0De9zLr8F2tGAn4AtozG/Cy2nD8dwU2wgtkU4uLjLrUF7y+xRsWTtIR/6FbAabQEPVpAGFRK/EAVHMkN9BFHTg69vAnr" +
                        "4KySXm1cR7Rl78syvTvsvadGyAx6DUYlx927vZSUkEbhBFniguMTWKWg1rIhYjGPsL542BZVk3kGUAAAAASUVORK5CYII=";
                    theA.appendChild(theIMG);
                    theIMG.height = "" + ta.offsetHeight;
                    theIMG.style.background = "#FFFFFF";
                    theA.href = "/post?body=%23" + msgid + (rid != 0 ? "/" + rid : "") + " ";
                    ta.parentNode.insertBefore(theA, ta.nextSibling);
                    if (addOK) {
                        // in firefox ugnich handler does not work
                        var submit = document.createElement("input");
                        submit.setAttribute("type","submit")
                        submit.setAttribute("value","OK")
                        submit.setAttribute("style","color: black");
                        ta.parentNode.insertBefore(submit, theA);
                    } else {
                        // make OK black
                        theA.nextSibling.style.color = "black"
                    }
                    return true;
                }
            }

            function collectMessages(doc) {
                var msgs = new Array();
                try {
                    var iter = doc.evaluate("//LI[@class='msg']", doc, null, 0, null);
                    for (var message; message = iter.iterateNext();) {
                        if (!message.processed)
                            msgs.push(message)
                    }
                } catch (e) {
                    var maybeMessages = doc.getElementsByTagName("LI");
                    for (var i = 0; i < maybeMessages.length; i++) {
                        var message = maybeMessages[i];
                        if (message.getAttribute("class") == "msg") {
                            if (!message.processed)
                                msgs.push(message)
                        }
                    }
                }
                return msgs;
            }

            if (mode == "MESSAGES") {
                //
                // fix content position
                //
                if (columnRight) {
                    style.appendChild(document.createTextNode("#content { padding-left: 40px; padding-right: 40px; margin: 0px;}"));
                }

                var processAllMessages = function () {
                    // second call of this function happens after ad script finished running in opera
                    if (columnRight) {
                        var ctitle = document.getElementById("ctitle");
                        if (ctitle) {
                            ctitle.style.display = "none";
                        }
                    }
                    var messages = collectMessages(document);
                    for (var li = 0; li < messages.length; li++) {
                        var message = messages[li];
                        try {
                            globals.lastLi = message;
                            var msgid = processMessage(message);
                            if (msgid) {
                                globals.lastProcessesMessage = parseInt(msgid)
                                globals.lastLi.msgid = msgid;
                            }
                        } catch (ex) {
                            window.alert("ex while processing message: " + li + " msg=" + message);
                        }
                        // new messages will be inserted after lastLi
                    }
                    if (messages.length < 2) {
                        // due to script inserted after first message
                        window.setTimeout(processAllMessages, 100);
                    }
                }
                processAllMessages();
            }

            //window.alert("MODE="+mode)
            if (mode == "THREAD") {
                //
                // fixing HASH sign
                //
                var mtoolbar = document.getElementById("mtoolbar");
                var msgid = null;
                if (mtoolbar && juickClassicStyle) {
                    var as = mtoolbar.getElementsByTagName("A");
                    if (as.length > 0) {
                        var a = as[0];
                        var href = a.getAttribute("href");
                        msgid = href.substr(href.lastIndexOf("/") + 1);
                        a.href = "" + msgid;
                        setText(a, "#" + msgid);
                    } else {
                        //window.alert("NO A!")
                    }
                } else {
                    //window.alert("NO MTOOLBAR!")
                }
                var tas = document.getElementsByTagName("TEXTAREA");
                if (tas && msgid) {
                    for (var i = 0; i < tas.length; i++) {
                        if ("body" == tas[i].name) {
                            (function (ta) {
                                ta.addEventListener("focus", function () {
                                    window.setTimeout(function () {  // after button is added
                                        if (maybeAddImageButton(ta, msgid, 0, firefox)) {
                                            var oldWidth = ta.offsetWidth;
                                            ta.style.width = (oldWidth - 50) + "px";
                                        }
                                    }, 200);
                                });
                            })(tas[i])
                        }
                    }
                }

                //
                // fixing missing comment self-link
                //
                var links = document.getElementsByClassName("msg-links")
                for (var i = 0; i < links.length; i++) {
                    var linkz = links[i];
                    var fc = linkz.firstChild;
                    var lh = fc.nodeValue;      // text node
                    if (lh && lh.substr(0, 1) == "/") {
                        if (juickClassicStyle) {
                            var space = lh.indexOf(" ")
                            var rid = lh.substr(1, space);
                            lh = lh.substr(space);
                            fc.nodeValue = lh;
                            var theA = linkz.ownerDocument.createElement("a");
                            theA.setAttribute("href", "#" + rid);
                            setText(theA, "/" + rid);
                            linkz.insertBefore(theA, linkz.firstChild);

                            //
                            // XMPP reply url
                            //
                            linkz.appendChild(linkz.ownerDocument.createTextNode(" · "));
                            var jabberA = linkz.ownerDocument.createElement("A");
                            jabberA.href = "xmpp:juick@juick.com?message;body=%23" + msgid + "/" + rid + " ";
                            setText(jabberA, "#");
                            linkz.appendChild(jabberA);
                            //
                            // fix hash URL that we don't like
                            //
                            var q = linkz.firstChild;
                            var allLinks = linkz.getElementsByTagName("A");
                            for (var l = 0; l < allLinks.length; l++) {
                                var linkText = getText(allLinks[l]);
                                if (linkText == "Comment" || linkText == "Ответить") {
                                    var old = allLinks[l].onclick;
                                    (function (oldProg, commentNode, theA, msgid, rid) {
                                        allLinks[l].onclick = function () {
                                            try {
                                                oldProg();
                                            } catch (e){
                                                // in chrome this raises an exception, but still opens the textarea;
                                                // ff ok
                                            }
                                            setText(theA, "#" + msgid + "/" + rid);
                                            var tas = commentNode.getElementsByTagName("textarea");
                                            if (tas && tas.length > 0) {
                                                var ta = tas[0];
                                                maybeAddImageButton(ta, msgid, rid, false);
                                            }
                                            return false;
                                        }
                                    })(old, linkz.parentNode, theA, msgid, rid);
                                }
                            }
                        }
                    } else {
                        if (juickClassicStyle) {
                            try {
                                var lih = ("" + linkz.innerHTML);
                                var maybeCommentNo = lih.match(new RegExp("showCommentForm\\((\\d+),(\\d+)\\)", ""));
                                if (maybeCommentNo && maybeCommentNo.length == 3) {
                                    var rid = maybeCommentNo[2];
                                    var theA = linkz.ownerDocument.createElement("a");
                                    theA.setAttribute("href", "#" + rid);
                                    theA.appendChild(linkz.ownerDocument.createTextNode("/" + rid));
                                    theA.style.paddingRight = "10px";
                                    linkz.insertBefore(theA, linkz.firstChild);
                                } else {
                                    alert("mcn=" + maybeCommentNo + " lih=" + lih);
                                    alert("mcn=" + maybeCommentNo.length);
                                }
                            } catch (e) {
                                jalog("JA(9): " + e)
                            }
                        }
                    }
                }

                var comments = collectMessages(document);
                for (var i in comments) {
                    processComment(comments[i]);
                }
                var starter = document.getElementById("msg-" + msgid);
                if (starter) {
                    inlineMedia(starter);
                }

            }

            document.body.appendChild(style);

            document.body.style.visibility = "visible";

            globals.loading = false;


            function findLastPart(doc) {
                var lastPara = null;
                try {
                    var iter = doc.evaluate("//P[@class='page']", doc, null, 0, null);
                    for (var message; message = iter.iterateNext();) {
                        lastPara = message;
                        break;
                    }
                } catch (e) {
                    var allP = doc.getElementsByTagName("P");
                    for (var i in allP) {
                        var maybeP = allP[i];
                        if (maybeP.getAttribute && maybeP.getAttribute("class") == "page") {
                            lastPara = maybeP;
                            break;
                        }
                    }
                }
                if (lastPara != null) {
                    var lastA = lastPara.getElementsByTagName("A");
                    if (lastA.length == 1) {
                        return {lastPara: lastPara, lastA: lastA[0]}
                    }
                }
                return null;
            }

            // add other sources
            var allA = document.getElementsByTagName("A")
            for (var i = 0; i < allA.length; i++) {
                if ((""+allA[i].getAttribute("href")) == "/?show=private" && otherSources) {
                    var li = allA[i].parentNode;
                    var newLi = document.createElement("li");
                    li.parentNode.insertBefore(newLi, li.nextSibling);
                    var link = createLink('javascript:;', "Неотвеченные")
                    document.head.setAttribute("test", new Date().toString());
                    link.onclick = function() {
                        callJA("jc_api/pending", {command: "list"} , function(data) {
                            window.data = data;
                            var content = document.getElementById("content");
                            var ul = content.firstElementChild;
                            while(ul.firstChild) {
                                ul.removeChild(ul.firstChild);
                            }
                            for(var p=0; p<data.replies.length; p++) {
                                var reply = data.replies[p];
                                var myreply = null;
                                var psto = null;
                                if (reply.replyto) {
                                    for(var pp=0; pp<data.my_replies.length; pp++) {
                                        if (data.my_replies[pp].parent_mid == reply.parent_mid && data.my_replies[pp].rid == reply.replyto) {
                                            myreply = data.my_replies[pp];
                                        }
                                    }
                                }
                                for(var pp=0; pp<data.posts.length; pp++) {
                                    if (data.posts[pp].mid == reply.parent_mid) {
                                        psto = data.posts[pp];
                                    }
                                }

                                //
                                // CREATE DOM FOR REPLIES
                                //
                                var li = document.createElement("li");
                                li.id = "unread"+p;
                                li.setAttribute("class","msg");
                                ul.appendChild(li)

                                //
                                /// avatar    <div class="msg-avatar" style="padding: 5px;"><a href="/djdoomer/"><img alt="djdoomer" src="//i.juick.com/a/14987.png"></a></div>
                                //
                                var ava = document.createElement("div");
                                ava.setAttribute("class","msg-avatar");
                                ava.setAttribute("style","passing: 5px");
                                var theA = document.createElement("A");
                                theA.href="/"+reply.user.uname+"/";
                                ava.appendChild(theA);
                                var img = document.createElement("img");
                                img.src="//i.juick.com/a/"+reply.user.uid+".png";
                                theA.appendChild(img);
                                li.appendChild(ava)


                                var height = 0;
                                if (psto) {
                                    //
                                    // initial message text
                                    //
                                    var txt = document.createElement("div");
                                    txt.setAttribute("class","msg-txt")
                                    txt.style.fontSize = "8pt";
                                    if (psto.body.length > 300) {
                                        psto.body = psto.body.substr(0, 300)+"...";
                                    }
                                    var link = createLink("/"+psto.user.uname+"/", "@"+psto.user.uname)
                                    txt.appendChild(link)
                                    formatAndAppendText(txt, ": "+psto.body)
                                    li.appendChild(txt);
                                    height += txt.offsetHeight + 5;
                                }
                                if (myreply) {
                                    //
                                    // initial message text
                                    //
                                    var txt = document.createElement("div");
                                    txt.setAttribute("class","msg-txt")
                                    txt.style.fontSize = "10pt";
                                    if (myreply.body.length > 300) {
                                        myreply.body = myreply.body.substr(0, 300)+"...";
                                    }
                                    var link = createLink("/"+myreply.user.uname+"/", "@"+myreply.user.uname)
                                    txt.appendChild(link)
                                    formatAndAppendText(txt, ": "+myreply.body)
                                    li.appendChild(txt);
                                    height += txt.offsetHeight + 5;
                                }

                                ava.style.position = "relative";
                                ava.style.top = ""+height+"px";
                                // <div class="msg-header"><a href="/Faumi/">@Faumi</a>: *<a href="/tag/%3F">?</a></div>
                                //
                                // message text
                                //
                                var txt = document.createElement("div");
                                txt.setAttribute("class","msg-txt")
                                var link = createLink("/"+reply.user.uname+"/", "@"+reply.user.uname)
                                txt.appendChild(link)
                                formatAndAppendText(txt, ": "+reply.body)
                                li.appendChild(txt);

                                //
                                // body and header
                                //
                                var txt = document.createElement("div");
                                txt.setAttribute("class","msg-comments")
                                var theA = document.createElement("A");
                                txt.appendChild(theA);
                                theA.href = "/"+reply.parent_mid+"#"+reply.rid;
                                setText(theA,"#"+reply.parent_mid+"/"+reply.rid)
                                var deleteBtn = document.createElement("input");
                                deleteBtn.type = "button";
                                deleteBtn.value = "Забыть";
                                deleteBtn.style.fontSize = "8pt";
                                deleteBtn.style.marginLeft = "20px";
                                txt.appendChild(deleteBtn);
                                (function() {
                                    var liid = li.id;
                                    var data = {command: "ignore", mid: reply.parent_mid, rid: reply.rid}
                                    var db = deleteBtn;
                                    deleteBtn.onclick = function() {
                                        callJA("jc_api/pending", data , function() {
                                            $("#"+liid).hide('slow');
                                        }, db)
                                    }
                                })();
                                li.appendChild(txt);
                            }

                        }, link)
                        continousScroll = false;
                        return false;
                    }
                    newLi.appendChild(link);
                    break;
                }
            }




            //
            // auto expand tree
            //
            if (autoExpand) {
                try {
                    var ufa = document.getElementById("unfoldall");
                    if (ufa) {
                        ufa.firstChild.onclick();
                    }
                } catch (e) {
                    jalog("JA(10): " + e)
                    //alert("unfold:"+e);
                }
            }

            window.addEventListener("scroll", function () {
                window.yandex_context_callbacks = [];   // slows opera down greatly
                fixColumnPosition();
            });

            if (continousScroll) {
                window.addEventListener("scroll", function () {
                    if (!continousScroll) return;
                    //if (globals.lastScroll && new Date().getTime() - globals.lastScroll < 500) return;
                    //globals.lastScroll = new Date().getTime();
                    var content = document.getElementById("content");
                    if (!content) return;
                    var nVScroll = document.documentElement.scrollTop || document.body.scrollTop;
                    var contentHeight = content.offsetHeight;
                    // window.document.title = "SCROLL="+(nVScroll+window.innerHeight)+" BODYHEI="+contentHeight+" SIGN="+(nVScroll + window.innerHeight - (contentHeight - window.innerHeight * 4))+" ";
                    try {
                        if (nVScroll + window.innerHeight > contentHeight - window.innerHeight * 4) {
                            // 4 pages in advance
                            if (globals.loading) return;
                            globals.loading = true;
                        } else {
                            return;
                        }
                        // prevent repeated load (if some exception happens)
                        var lastPart = findLastPart(document);
                        if (lastPart != null) {
                            setText(lastPart.lastA, "Loading next...");
                            var url = "" + lastPart.lastA.href;
                            var lastMsgId = globals.lastLi.msgid;
                            //
                            // putting parameter in place
                            //
                            if (url.indexOf("before=")) {
                                url = url.replace(new RegExp("before=(\\d+)", "gm"), function (x) {
                                    return "before=" + lastMsgId;
                                })
                            } else {
                                if (url.indexOf("?") == -1) {
                                    url = url + "?before=" + lastMsgId;
                                } else {
                                    url = url + "&before=" + lastMsgId;
                                }
                            }
                            //
                            //
                            //
                            doAjaxRequest(url, function (response) {
                                try {
                                    globals.loading = false;
                                    setText(lastPart.lastA, "Older...");
                                    var resp = "" + response;
                                    ix = resp.indexOf("<div id=\"footer\">");
                                    if (ix != -1) {
                                        resp = resp.substr(0, ix);
                                    }
                                    var doc = parseHTML(resp);
                                    var msgs = collectMessages(doc);
                                    for (var i in msgs) {
                                        var message = msgs[i];
                                        var myMessage = document.importNode(message, true);
                                        globals.lastLi.parentNode.appendChild(myMessage);
                                        globals.lastLi = myMessage;
                                        var msgid = processMessage(myMessage);
                                        if (msgid) {
                                            if (!checkOrderedMessageIds(msgid)) {
                                                return;
                                            }
                                            globals.lastLi.msgid = msgid;
                                        }
                                    }
                                    var lastPart2 = findLastPart(doc);
                                    if (lastPart2 == null) {

                                    } else {
                                        setText(lastPart.lastA, lastPart2.lastA.innerHTML);
                                        lastPart.lastA.href = lastPart2.lastA.getAttribute("href");
                                    }
                                    var arclones = document.getElementsByTagName("arclones");
                                    for (var i = 0; i < arclones.length; i++) {
                                        arclones[i].parentNode.removeChild(arclones[i]);
                                    }
                                } catch (e) {
                                    jalog("JA(11): " + e)
                                    //window.alert(e);
                                }
                            }, false);
                        } else {
                            //window.alert("Last part is null");
                        }
                    } catch (e) {
                        jalog("JA(12): " + e)
                    }
                });

            }

            fixColumnPosition()

            if ("1.41" != getCookie("welc")) {
                setCookie("welc", "1.41", 5000)
                window.alert("Juick Classic обновился.\nОпции Juick Classic встроены в страницу настроек Жуйка.\nВсе опции по умолчанию отключены.\nПриятного пользования.")
            }

            jalog("main function ended")



        } catch (e) {
            jalog("JA: main function: " + e)
            window.alert("JA: main function: " + e)
        }
    }

    //jalog("main_process definitiion end")

    if (firefox) {
        // jalog("launch process: firefox ");
        // addon entry point
        window.addEventListener("load", function () {
            if ("juick_classic_initialized" in this && this.juick_classic_initialized) {
                return;
            }
            this.juick_classic_initialized = true;
            try {
                document.getElementById("appcontent")
                    .addEventListener("DOMContentLoaded", function (event) {
                        // FF addon mode
                        var doc = event.originalTarget;
                        if (doc.location.host == "juick.com" || doc.location.host == "dev.juick.com") {
                            main_process(doc, window);
                        }
                    }, true);
            } catch (e) {
                // FF greasemonkey mode
                main_process(window.document, window);
            }
        }, false);
    } else if (isOpera) {
        //FIREFOX_CUT_START
        jalog("launch process: opera");
        try {
            opera.extension.onmessage = function (e) {
                // opera extension mode
                try {
                    jalog("opera on message.");
                    jalog("opera on message: "+ e.data.action);
                    if (e.data.action === 'jc_load_jquery') {
                        // opera only!!
                        var script = document.createElement('script');
                        script.appendChild(document.createTextNode(e.data.script));
                        document.head.appendChild(script);
                        jalog('juick classic(1): added jquery script to page: jQuery=' + window.jQuery);
                        jalog('main process starting from opera');
                        main_process(window.document, window);
                        jalog('main process finished called from opera');
                    }
                } catch (e) {
                    jalog("opera on message error: "+e);
                }
            }
        } catch (e) {
            jalog("launch process: opera 2nd try");
            // opera tampermonkey and opera extension
            main_process(window.document, window);
        }
        //FIREFOX_CUT_END
    } else {
        jalog("launch process: others (chrome)");
        // chrome
        main_process(window.document, window);
    }

} catch (e) {
    window.console.error("JA error: " + e);
    // in opera, these messages are in dragonfly console.
}
