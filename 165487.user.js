// ==UserScript==
// @name Bai Du Xiang Ce
// @description  收藏到百度相册
// @version 1.0
// @include http*
// ==/UserScript==

(function(e, t) {
    function i(e) {
        return document.getElementById(e)
    }
    function h() {
        return location.hostname == "xiangce.baidu.com" && e.pic && pic.owner && pic.owner.is_self && e.location.href.indexOf("/feed/") == -1 ? (alert("你在自己的相册，不能收藏自己的图片哦！"), !1) : e._bdXC_showing ? !1 : (r.refresh(), r.images.length <= 0 ? (alert("对不起没有找到合适的图片"), !1) : !0)
    }
    var n = {
        add: function(e, t, n) {
            e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, n)
        },
        remove: function(e, t, n) {
            e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent("on" + t, n)
        },
        stop: function(e) {
            if (!e) return ! 1;
            e.preventDefault ? (e.preventDefault(), e.stopPropagation()) : (e.returnValue = !1, e.cancelBubble = !1)
        },
        listenerBody: !1
    },
    r = {
        selectImg: [],
        SCROLLTOP: 0,
        currentURL: "",
        selectStatus: !1,
        imgNumChange: null,
        images: [],
        refresh: function() {
            r.images = r.getImages()
        },
        getImages: function() {
            function t(e) {
                var t = {},
                n = e.src,
                r = e.width,
                i = e.height,
                s, o, u, a;
                return r / i > 1 ? (o = 398, s = o * r / i) : r / i == 1 ? (o = 398, s = 398) : (s = 398, o = s * i / r),
                u = 299 - o / 2 || 0,
                a = 299 - s / 2 || 0,
                {
                    w: e.width,
                    h: e.height,
                    src: n,
                    alt: e.alt || "",
                    orig: e,
                    rw: s,
                    rh: o,
                    top: u,
                    left: a
                }
            }
            function n(n, r) {
                var i = n.images;
                for (var s = 0,
                o, u; o = i[s++];) o.style.display != "none" && o.complete && (u = t(o), u.w > 400 && u.h > 400 && u.src && (o.setAttribute("dataxc-width", u.w), o.setAttribute("dataxc-height", u.h), o.setAttribute("dataxc-register", 1), e.push(u)))
            }
            var e = [];
            n(document);
            var r = document.getElementsByTagName("iframe");
            for (var i = 0,
            s; s = r[i++];) try {
                var o = s.contentDocument;
                o && n(o)
            } catch(u) {}
            return e
        },
        fastGetImages: function() {
            function o(e) {
                var t = e.images,
                n = [];
                for (var r = 0,
                i, s; i = t[r++];) i.style.display != "none" && i.width > 400 && i.height > 400 && i.src && n.push(i);
                return n.length
            }
            var e = 0,
            t = document.getElementsByTagName("iframe");
            for (var n = 0,
            r; r = t[n++];) try {
                var i = r.contentDocument;
                i && (e += o(i))
            } catch(s) {}
            return e += o(document),
            e
        },
        imgNumListener: function() {
            var e = 0;
            r.imgNumChange && clearInterval(r.imgNumChange),
            r.imgNumChange = setInterval(function() {
                e = r.fastGetImages(),
                e != r.images.length && r.refresh()
            },
            2e3)
        }
    },
    s = "http://xiangce.baidu.com/bookmark",
    o = {
        format: function(e, t) {
            return e.replace(/#\{(.+?)\}/g,
            function(e, n) {
                var r = t[n];
                return "undefined" == typeof r ? "": r
            })
        },
        getView: function() {
            var t = document,
            n = t.compatMode == "BackCompat" ? t.body: t.documentElement;
            return {
                w: n.clientWidth,
                h: n.clientHeight,
                st: e.pageYOffset || t.documentElement.scrollTop || t.body.scrollTop,
                sl: e.pageXOffset || t.documentElement.scrollLeft || t.body.scrollLeft
            }
        },
        getPosition: function(t) {
            var n = 0,
            r = 0;
            if (t.getBoundingClientRect) {
                var i = e,
                s = document.body,
                o = document.documentElement,
                u = t.getBoundingClientRect(),
                a = o.clientTop || s.clientTop || 0,
                f = o.clientLeft || s.clientLeft || 0,
                l = i.pageYOffset || s.scrollTop || o.scrollTop,
                c = i.pageXOffset || s.scrollLeft || o.scrollLeft;
                n = u.left + c - f,
                r = u.top + l - a
            }
            return {
                left: n,
                top: r,
                width: t.width,
                height: t.height
            }
        },
        ie: /msie (\d+\.\d+)/i.test(navigator.userAgent) ? document.documentMode || +RegExp.$1: t
    },
    u = {
        bdXC_style_text: "#bdXC_overlay{background-color: #000;  opacity: 0.7;  width:100%;height:100%;filter: alpha(opacity=70);position:fixed;left:0;z-index:2147483645;top:0;_position:absolute !important;_bottom:auto !important;_top:expression(eval(document.documentElement.scrollTop))!important;}                            body{_background-image:url(about:blank);_background-attachment:fixed;}                            #bdXC_logo{display:'';}                            #bdXC_bar{height:50px;background-color:#f8f9f8;opacity:1;z-index:2147483647;position:fixed;left:0;top:0;width:100%;margin:0;padding:0;text-align:center;_position:absolute !important;_bottom:auto !important;_top:expression(eval(document.documentElement.scrollTop))!important;}                            #bdXC_fav_button{display:inline-block;width:143px;height:30px;position:absolute;left:612px;top:12px;background:url(http://xiangce.baidu.com/static/images/bdXC_fav_button_cancle.png) 0 0 no-repeat;cursor:default;}                            .bdXC_fav_button_select{background-position:0 -39px!important;cursor:pointer !important;}                            .bdXC_fav_button_select:hover{background-position:0 -80px!important;}                            #bdXC_bar_inner{width:830px;padding-top:10px;position:relative;margin-left:auto;margin-right:auto;text-align:left;}                            #bdXC_close{display:inline-block;height:30px;width:67px;position:absolute;right:0;top:12px;background:url(http://xiangce.baidu.com/static/images/bdXC_fav_button_cancle.png) -153px -39px no-repeat;}                            #bdXC_close:hover{background-position:-153px -80px;}                            #bdXC_fav_tips{font-size:12px;color:#999;position:absolute;top:19px;right: 235px;}                            #less_than12{clear:both;text-align:center;color:#fff;padding-top:100px;font-size:14px;display:none;}                            #bdXC_fav_num_current,#bdXC_fav_num_total{color:#ff6600;font-family: arial;font-weight: bold;}                            #bdXC_selectAll{vertical-align: middle;margin:0;margin-top:-1px;}                            #bdXC_controll{text-algin:center;position:absolute;width:100%;left:0;top:50px;z-index:2147483646;}                            #bdXC_controll_inner{text-align:left;width:830px;margin-left:auto;margin-right:auto;}                            #bdXC_controll_inner ul{margin:0;padding:0;}                            #bdXC_controll_inner li{_display:inline;text-align: center;overflow:hidden;background-color:#fff;list-style:none;margin:0;padding:0;width:398px;height:398px;border:1px solid #fff;float:left;margin-top:10px;margin-left:10px;position:relative;cursor:pointer;}                            .bdXC_tile_img{position:absolute;}                            #bdXC_controll_inner li.bdXC_selected{border-color:#1aa8f5;}                            #bdXC_controll_inner li.bdXC_tile_over .bdXC_img-lay{display:block;}                            .bdXC_tile_over .bdXC_img_select{display:inline-block;}                            .bdXC_img-lay{position:absolute;width:398px;height:398px;background-color:#000;opacity:0.60;filter: alpha(opacity=60);left:0px;top:0px;display:none;}                            .bdXC_img_select,.bdXC_img_cancle{display:none;width:75px;height:33px;position:absolute;left:65px;top:85px;background:url(http://xiangce.baidu.com/static/images/bdXC_operate_btn.png) no-repeat -81px 0;cursor:pointer;}                            .bdXC_img_select:hover{background:url(http://xiangce.baidu.com/static/images/bdXC_operate_btn.png) no-repeat -81px -37px;}                            .bdXC_img_cancle{display:none;background:url(http://xiangce.baidu.com/static/images/bdXC_operate_btn.png) no-repeat 0 0;}                            .bdXC_img_cancle:hover{background:url(http://xiangce.baidu.com/static/images/bdXC_operate_btn.png) no-repeat 0 -37px;}                            .bdXC_tile_size_wrap{position:absolute;top:170px;left:0;text-align: center;margin:0;padding:0;width:398px;}                            .bdXC_tile_size{display:inline-block;background-color:#333;padding:2px 4px 2px 4px;font-size:12px;color:#fff;font-family: arial;}                            .bdXC_select_logo{position:absolute;top:75px;left:70px;width:70px;height:48px;display:none;background:url(http://xiangce.baidu.com/static/images/bdXC_select_logo.png) no-repeat;_background: none;_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://xiangce.baidu.com/static/images/bdXC_select_logo.png',sizingMethod='crop');}                            #bdXC_float_btn{width:123px;padding-left:5px;background: url(http://xiangce.baidu.com/static/images/xiangce_ext_floatbtn_bg.png) no-repeat;}                            .bdXC_float_btn_a{display: inline-block;cursor: pointer;color: #666;text-decoration: none;}                            #bdXC_float_btn_t{display:inline-block; line-height:16px; padding:8px 0 8px 30px;font:12px '宋体' !important;color:#fff;}                            #bdXC_float_btn:hover{text-decoration:none; background-image: url(http://xiangce.baidu.com/static/images/xiangce_ext_floatbtn_bg_hover.png);}                            #bdXC_float_btn:hover .bdXC_float_btn_l{background-position:-28px 4px;}                            #bdXC_float{display:none;position: absolute;left: 0;top:0;z-index:2147483644;cursor: pointer;}                            #bdXC_favWindow{display:none;position:absolute;width:650px;height:350px;z-index:2147483646;background-color:#fff;}                            #close_fav_window{display:none;width:11px;height:11px;position:absolute;background:url(http://xiangce.baidu.com/static/images/bdXC_closeWindow.png);position:absolute;left:620px;top:15px;}                            #frameloading{position:absolute;top:150px;left:280px;color:#666;}                            #bdXC_faviframe{display:none;width:650px;height:350px;border:none;}                            .bdXC_float_btn_a,.bdXC_float_btn_a:visited,.bdXC_float_btn_a:hover,.bdXC_float_btn_a:active{text-decoration: none;}",
        addStyle: function() {
            var e = document.createElement("style");
            e.type = "text/css",
            e.media = "screen",
            e.styleSheet ? e.styleSheet.cssText = u.bdXC_style_text: e.appendChild(document.createTextNode(u.bdXC_style_text)),
            (document.getElementsByTagName("head")[0] || document.body).appendChild(e)
        }
    };
    u.addStyle();
    var a = {
        createOverLay: function() {
            var e = document.createElement("div");
            e.id = "bdXC_overlay",
            document.body.appendChild(e),
            o.ie && o.ie == 6 ? (e.style.width = o.getView().w, e.style.height = o.getView().h, e.innerHTML = '<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);"></iframe>') : e.style.top = 0;
            var t = document.createElement("div");
            return t.id = "bdXC_favWindow",
            t.innerHTML = "<span id='frameloading'>正在加载....</span><a href='' id='close_fav_window' onclick='return window._bdXC.closeFavWindow()'></a>",
            document.body.appendChild(t),
            e
        },
        createTopBar: function() {
            if (o.ie && o.ie == 6) var t = ['<div id="bdXC_bar_inner">', '<img id="bdXC_logo" src="http://xiangce.baidu.com/static/images/bdXC-logo.png">', '<a id="bdXC_fav_button" href="#" onclick = "return window._bdXC.favButton(this)"></a>', '<span id="bdXC_fav_tips">已选择<span id="bdXC_fav_num_current">0</span>张图片，最多可选<span id="bdXC_fav_num_total">', 10, "</span>张</span>", '<a id="bdXC_close" href="#" onclick="return window._bdXC.closeLay(this)"></a>', "</div>"];
            else var t = ['<div id="bdXC_bar_inner">', '<img id="bdXC_logo" src="http://xiangce.baidu.com/static/images/bdXC-logo.png">', '<a id="bdXC_fav_button" href="#" onclick = "return window._bdXC.favButton(this)"></a>', '<span id="bdXC_fav_tips">已选择<span id="bdXC_fav_num_current">0</span>张图片 <input id="bdXC_selectAll" type="checkbox" /> 全选</span>', '<a id="bdXC_close" href="#" onclick="return window._bdXC.closeLay(this)"></a>', "</div>"];
            var r = document.createElement("div");
            r.id = "bdXC_bar",
            r.style.width = o.getView().w,
            r.innerHTML = t.join(""),
            document.body.appendChild(r),
            (!o.ie || o.ie != 6) && n.add(i("bdXC_selectAll"), "click",
            function(t) {
                var n = t.target || t.srcElement;
                if (n.checked == 1) {
                    var r = i("bdXC_list"),
                    s = r.getElementsByTagName("li");
                    for (var o = 0,
                    u = s.length; o < u; o++) s[o].getAttribute("data-select") != 1 && e._bdXC.previewSelect.apply(s[o], [s[o]])
                } else {
                    var r = i("bdXC_list"),
                    s = r.getElementsByTagName("li");
                    for (var o = 0,
                    u = s.length; o < u; o++) s[o].getAttribute("data-select") == 1 && e._bdXC.previewSelect.apply(s[o], [s[o]])
                }
            })
        },
        createContent: function() {
            r.imgNumChange && clearInterval(r.imgNumChange);
            var e = ['<div id="bdXC_controll_inner"><ul id="bdXC_list">'],
            t = [],
            n = ['<li style="#{marLeft}" data-index="#{index}" onclick="return window._bdXC.previewSelect(this)" data-select="0">', '<img class="bdXC_tile_img" style="top:#{top}px;left:#{left}px;" src="#{src}" width="#{rw}" height="#{rh}" />', '<p class="bdXC_tile_size_wrap"><span class="bdXC_tile_size">#{w}x#{h}</span></p>', '<div class="bdXC_tile_super">', '<div class="bdXC_img-lay"></div>', '<div class="bdXC_select_logo"></div>', '<a onclick="return false" class="bdXC_img_select" href=""></a>', '<a onclick="return false" class="bdXC_img_cancle" href=""></a>', "</div>", "</li>"],
            s = ['</ul><p id="less_than12">温馨提示：百度相册收藏工具仅支持400*400以上的图片哦 ^_^</p><div style="clear:both;"></div></div>'];
            for (var u = 0,
            a = r.images.length; u < a; u++) u % 4 == 0 && (r.images[u].marLeft = "margin-left:0"),
            r.images[u].index = u,
            t.push(o.format(n.join(""), r.images[u]));
            var f = document.createElement("div");
            f.id = "bdXC_controll",
            f.innerHTML = e.join("") + t.join("") + s.join(""),
            document.body.appendChild(f),
            r.selectStatus = !0,
            r.images.length <= 12 ? i("less_than12").style.display = "block": i("less_than12").style.display = "none"
        },
        updateNum: function() {
            i("bdXC_fav_num_current").innerHTML = r.selectImg.length,
            r.selectImg.length > 0 ? i("bdXC_fav_button").className = "bdXC_fav_button_select": i("bdXC_fav_button").className = ""
        },
        showLay: function() {
            i("bdXC_overlay").style.display = "",
            i("bdXC_bar").style.display = "",
            a.createContent(),
            a.bindEvent()
        },
        closeLay: function() {
            e._bdXC_showing = !1,
            i("bdXC_overlay").style.display = "none",
            i("bdXC_bar").style.display = "none";
            try {
                i("bdXC_selectAll").checked = !1
            } catch(t) {}
            r.selectImg = [],
            i("bdXC_controll") && i("bdXC_controll").parentNode.removeChild(i("bdXC_controll")),
            r.selectStatus = !1,
            document.documentElement.scrollTop = document.body.scrollTop = r.SCROLLTOP,
            r.imgNumListener()
        },
        bindEvent: function() {
            var e = i("bdXC_controll_inner").getElementsByTagName("li");
            for (var t = 0,
            r = e.length; t < r; t++) o.ie ? (n.add(e[t], "mouseenter", a.bindEnv(e[t], a.enter)), n.add(e[t], "mouseleave", a.bindEnv(e[t], a.leave))) : (n.add(e[t], "mouseover",
            function(e) {
                var t = e.relatedTarget; (!t || !(t.compareDocumentPosition(this) & 8) && t !== this) && a.enter.apply(this, [e])
            }), n.add(e[t], "mouseout",
            function(e) {
                var t = e.relatedTarget; (!t || !(t.compareDocumentPosition(this) & 8) && t !== this) && a.leave.apply(this, [e])
            }))
        },
        enter: function(e) {
            var t = this.getAttribute("data-select"),
            r = this.getElementsByTagName("a");
            t == 1 ? (r[0].style.display = "none", r[1].style.display = "inline-block") : (r[0].style.display = "inline-block", r[1].style.display = "none", this.getElementsByTagName("div")[1].style.display = "block"),
            n.stop(e)
        },
        leave: function(e) {
            var t = this.getAttribute("data-select"),
            r = this.getElementsByTagName("a");
            r[0].style.display = "none",
            r[1].style.display = "none",
            t != "1" && (this.getElementsByTagName("div")[1].style.display = "none"),
            n.stop(e)
        },
        bindEnv: function(e, t) {
            return function() {
                t.apply(e, arguments)
            }
        },
        init: function() {
            a.createOverLay(),
            a.createTopBar(),
            a.createContent(),
            a.bindEvent()
        }
    },
    f = {
        fragment: null,
        createView: function() {
            var e = document.createElement("div");
            e.id = "bdXC_float",
            e.innerHTML = ['<div id="bdXC_float_btn">', '<a href="javascript:void(0)" class="bdXC_float_btn_a">', '<span id="bdXC_float_btn_t">收藏到百度相册</span>', "</a>", "</div>"].join(""),
            document.body.appendChild(e),
            f.fragment = e
        },
        bindEvent: function() {
            n.add(f.fragment, "mouseover",
            function() {
                n.remove(document.body, "mouseover", f.bodyListenerHandler),
                f.bodyListenerFlag = !1,
                f.hideBtnTimer && clearTimeout(f.hideBtnTimer),
                f.fragment.style.display = "block"
            }),
            n.add(f.fragment, "mouseout",
            function() {
                f.hideFloatBtn(),
                f.bodyListenerFlag == 0 && (n.add(document.body, "mouseover", f.bodyListenerHandler), f.bodyListenerFlag = !0)
            }),
            n.add(f.fragment, "click",
            function(e) {
                l.init(),
                n.stop(e)
            }),
            n.add(document.body, "mouseover", f.bodyListenerHandler),
            f.bodyListenerFlag = !0
        },
        bodyListenerFlag: !1,
        bodyListenerHandler: function(e) {
            var t = e.target || e.srcElement,
            n = t.nodeName.toUpperCase(),
            i = t.className;
            if (n == "IMG") {
                if (t.getAttribute("dataxc-register") == 1) {
                    var s = o.getPosition(t);
                    f.hideBtnTimer && clearTimeout(f.hideBtnTimer),
                    f.fragment.style.display = "block",
                    f.fragment.style.left = s.left + s.width - 127 + "px",
                    f.fragment.style.top = s.top - 29 + "px",
                    r.currentURL = t.src
                }
            } else(n != "A" || i != "bdXC_float_btn_a") && f.hideFloatBtn()
        },
        hideFloatBtn: function() {
            f.hideBtnTimer && clearTimeout(f.hideBtnTimer),
            f.hideBtnTimer = setTimeout(function() {
                f.fragment.style.display = "none"
            },
            2e3)
        },
        hideBtnTimer: null,
        init: function() {
            f.createView(),
            f.bindEvent()
        }
    },
    l = {
        init: function() {
            var t = l.getUrl();
            if (o.ie && o.ie == 6) {
                var n = t.join("");
                return e.open(n, "_blank", "width=650,height=400,top=0,left=0"),
                r.selectImg = [],
                c.closeLay(),
                !1
            }
            var n = t.join(""),
            s = i("bdXC_faviframe");
            s || (r.selectImg.length > 10, l.createIframe(n, r.selectImg.length > 10 ? 1 : 0))
        },
        getUrl: function() {
            var e = [s];
            document.title ? e.push("?tpl=newmark&name=" + encodeURIComponent(document.title)) : e.push("?tpl=newmark&name="),
            e.push("&surl=" + encodeURIComponent(location.protocol + "//" + location.host));
            if (r.selectStatus == 0) e.push("&srcs[]=" + encodeURIComponent(r.currentURL));
            else {
                if (r.selectImg.length > 10) return e;
                for (var t = 0,
                n = r.selectImg.length; t < n; t++) {
                    e.push("&srcs[]=" + encodeURIComponent(r.images[r.selectImg[t]].src));
                    if (e.join("").length > 2083) {
                        e.splice(e.length, 1);
                        break
                    }
                }
            }
            return e
        },
        createIframe: function(e, t) {
            var n = o.getView(),
            r = n.sl + parseInt((n.w - 650) / 2),
            s = n.st + parseInt((n.h - 400) / 2),
            u = document.createElement("div");
            u.style.width = "650px",
            u.style.height = "350px",
            u.id = "bdXC_faviframe_con",
            u.innerHTML = '<iframe id="bdXC_faviframe" src ="' + e + '" frameBorder="0" scrolling="no" border="0"  width="200px" height="200px" onload="_bdXC.frameOnload(' + t + ')"></iframe>';
            var a = i("bdXC_favWindow");
            a.style.left = r + "px",
            a.style.top = s + "px",
            a.appendChild(u),
            a.style.display = "",
            i("frameloading").style.display = "",
            i("bdXC_overlay").style.display = "block",
            i("bdXC_favWindow").style.display = "block",
            c.bindEvent()
        },
        poll: function() {
            var e = [];
            if (r.selectStatus == 0) e.push(r.currentURL);
            else for (var t = 0,
            n = r.selectImg.length; t < n; t++) e.push(r.images[r.selectImg[t]].src);
            var s = e.join("[%]"),
            o = [],
            n = Math.ceil(s.length / 1e3);
            for (var t = 0; t < n; t++) {
                var u = s.substr(t * 1e3, 1e3),
                a = "t=" + n + "/",
                f = "c=" + t + "/";
                o.push(a + f + u)
            }
            var l = i("bdXC_faviframe"),
            c = l.src,
            t = 0,
            h = setInterval(function() {
                t < n ? (l.src = c + "#" + o[t], t++) : clearInterval(h)
            },
            100)
        }
    },
    c = {
        xiangceHost: "http://xiangce.baidu.com",
        bindWindow: !1,
        closeFavWindow: function() {
            return i("bdXC_faviframe_con").parentNode.removeChild(i("bdXC_faviframe_con")),
            i("bdXC_favWindow").style.display = "none",
            i("bdXC_overlay").style.display = "none",
            i("close_fav_window").style.display = "none",
            c.closeLay(),
            !1
        },
        favButton: function(e) {
            return r.selectImg.length > 0 && (i("bdXC_controll").style.display = "none", i("bdXC_bar").style.display = "none", l.init()),
            !1
        },
        selectAll: function() {
            return ! 1
        },
        previewSelect: function(e) {
            var t = e.getAttribute("data-select");
            if (t == "0") {
                if (o.ie && o.ie == 6) var n = 10;
                else var n = 500;
                if (r.selectImg.length >= n) return alert("最多只能选" + n + "张图片哦~"),
                !1;
                e.setAttribute("data-select", "1");
                var i = e.getElementsByTagName("div");
                for (var s = 0,
                u = i.length; s < u; s++) i[s].className && (i[s].className == "bdXC_img-lay" || i[s].className == "bdXC_select_logo") && (i[s].style.display = "block");
                e.style.borderColor = "#1aa8f5";
                var f = e.getAttribute("data-index");
                r.selectImg.push(f)
            } else {
                e.setAttribute("data-select", "0");
                var i = e.getElementsByTagName("div");
                for (var s = 0,
                u = i.length; s < u; s++) i[s].className && (i[s].className == "bdXC_img-lay" || i[s].className == "bdXC_select_logo") && (i[s].style.display = "none");
                e.setAttribute("data-select", "0"),
                e.style.borderColor = "#fff";
                var f = e.getAttribute("data-index");
                for (var s = 0,
                u = r.selectImg.length; s < u; s++) if (r.selectImg[s] == f) {
                    r.selectImg.splice(s, 1);
                    break
                }
            }
            var l = e.getElementsByTagName("a");
            return l[0].style.display = "none",
            l[1].style.display = "none",
            a.updateNum(),
            !1
        },
        closeLay: function() {
            return a.closeLay(),
            !1
        },
        frameOnload: function(e) {
            i("frameloading").style.display = "none",
            i("bdXC_faviframe_con").style.display = "block",
            i("bdXC_faviframe").style.display = "block",
            i("close_fav_window").style.display = "inline-block",
            e && l.poll()
        },
        init: function() {
            h() && (e._bdXC_showing = !0, r.SCROLLTOP = Math.max(document.documentElement.scrollTop, document.body.scrollTop), document.documentElement.scrollTop = document.body.scrollTop = 0, a.init(), f.init()),
            e._bdXC_loaded = !0
        },
        bindEvent: function() {
            e.postMessage ? this.bindWindow || (this.bindWindow = !0, e.addEventListener ? e.addEventListener("message", this.getMessageHandler("modern"), !1) : e.attachEvent && e.attachEvent("onmessage", this.getMessageHandler("modern"))) : o.ie && o.ie != 6 && i("bdXC_faviframe").attachEvent("onload", this.getMessageHandler("old"))
        },
        getMessageHandler: function(t) {
            function s(e) {
                e && e.origin === c.xiangceHost && (e.data === "closeWindow" || e.data.type === "closeWindow") && c.closeFavWindow()
            }
            function o() {
                var t, s = i("bdXC_faviframe");
                try {
                    t = s.contentWindow.name,
                    t == "closeWindow" && (s.detachEvent("onload", arguments.callee), c.closeFavWindow())
                } catch(o) {
                    r && s.detachEvent("onload", arguments.callee),
                    n && !r && (s.contentWindow.location = 'about:blank', s.style.display = "none", r = !0),
                    n++
                }
            }
            var n = 0,
            r;
            return t == "modern" ? s: o
        },
        reInit: function() {
            h() && (r.selectImg = [], a.updateNum(), r.SCROLLTOP = Math.max(document.documentElement.scrollTop, document.body.scrollTop), document.documentElement.scrollTop = document.body.scrollTop = 0, a.showLay(), e._bdXC_showing = !0)
        }
    };
    c.init(),
    e._bdXC = c
})(window, undefined);