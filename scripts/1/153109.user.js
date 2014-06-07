// ==UserScript==
// @id             googleV
// @name           GoogleV
// @version        1.1
// @namespace      http://userscripts.org/users/Harv
// @author         Harv
// @description    Google 页面小调整/自动获取下一页
// @updateURL      https://userscripts.org/scripts/source/153109.meta.js
// @include        http://www.google.tld/search*
// @include        https://www.google.tld/search*
// @run-at         document-end
// ==/UserScript==
/*
 *  更新历史
 *  2012/12/05 v1.1 加入判断是否需要加载下一页，解决不需要时无限加载的bug
 *  2012/11/27 v1.0 googlekingkong 太庞大了加上年久失修，在新版 google 中惨不忍睹。
 *                  所以将自己用到的功能整理了下，写了这个脚本。
 */
(function() {
    var googleV = {
        start: 0,  //google使用start表示结果数，第一页0，第二页10...
        prevStart: 0,
        resultCount: 1, //结果序号
        loadCount: 2,
        isNextLoading: false,
        urlPerfix: /&start=[^&]+/.test(document.location.href)
                ? document.location.href.replace(/(&start=)[^&]+/, "$1")
                : document.location.href + "&start=",
        removeNodes: ["#foot"], //移除root
        CONST: {},
        init: function() {
            this.CONST = {
                MARGIN_LEFT: window.getComputedStyle(this.$("#topabar > .ab_tnav_wrp"), null)
                    .getPropertyValue("margin-left"),
                NEXT_PAGE_LOADING: "Loading next page ...",
                NEXT_PAGE_LOADED: "All pages loaded!"
            };
            this._nav = document.querySelectorAll("table#nav td");  //导航，用于判断是否需要加载下一页
            
            var s = this.getParameterByName("start");   //假如不是从第一页进入
            if(s != "") {
                this.start = parseInt(s);
            }

            this.beautyPage();      //页面美化
            this.removeUnwanted();  //移除不需要的dom
            this.moveExtra2Top();   //将相关搜索移到最上面
            this.getDrectLink();    //去掉google结果跳转
            this.numberResult();    //给结果添加序号
            this.searchInSite();    //添加在此站点中搜索
            this.loadNextPage();    //自动获取下一页
        },
        $: function(selector, node) {
            if(!node) node = document;
            return node.querySelector(selector);
        },
        getParameterByName: function(name) {    //获取QueryString
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(window.location.search);
            if(results == null)
                return "";
            else
                return decodeURIComponent(results[1].replace(/\+/g, " "));
        },        
        addStyle: function(cssText) {
            var style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = cssText;
            this.$("head").appendChild(style);
        },
        removeUnwanted: function() {
            for(var i = 0; i < this.removeNodes.length; i++) {
                var node = this.$(this.removeNodes[i]);
                if(node) node.parentNode.removeChild(node);
            }
        },
        moveExtra2Top: function() {
            var extra = this.$("#extrares");
            if(!extra) return;
            extra.parentNode.removeChild(extra);
            var cssText = "#extrares p{display:inline;padding-right:10px;}";
            cssText += "#extrares{margin-left:"
                + this.CONST.MARGIN_LEFT + ";margin-right:" + this.CONST.MARGIN_LEFT
                + ";padding-left:" + window.getComputedStyle(this.$("#resultStats"), null)
                    .getPropertyValue("padding-left") + "!important;}";
            this.addStyle(cssText);
            this.$("#topabar").appendChild(extra);
        },
        beautyPage: function() {
            this.addStyle("#center_col{width:inherit!important;margin-right:"
                + this.CONST.MARGIN_LEFT
                + ";}#center_col .s{max-width:100%!important;}"
                + ".vspib{display:none!important;}"
                + ".gv_nextpage{width:100%;text-align:center;margin-bottom:20px;padding:5px;"
                + "background-color:rgb(245,245,245);border:1px solid rgb(229,229,229);border-radius:3px;}"
                + ".gv_nextpage a{padding: 0 5px;}"
                + ".gv_number{margin-right:5px;color:#36393D}");
        },
        loadOneNextPage: function() {
            var loading = this.$("#rso").appendChild(document.createElement("div"));
            loading.setAttribute("class", "gv_nextpage gv_nextpage_loading");

            for(var cur = 1; cur < this._nav.length - 2; cur++) {
                if(this._nav[cur].getAttribute("class") == "cur") break;
            }
            var more = this._nav.length - 2 - cur;
            if(this._nav.length == 0 || more <= 0) {    //没有导航（只有1页）或没有下一页
                document.removeEventListener("scroll", this._scroll, false);
                document.removeEventListener("gv_nextpage_loaded", this._load, false);

                loading.innerHTML = this.CONST.NEXT_PAGE_LOADED;

                return;
            }

            loading.innerHTML = this.CONST.NEXT_PAGE_LOADING;

            this.start += 10;
            this.loadCount--;

            var me = this;
            GM_xmlhttpRequest({
                method: "GET",
                url: me.urlPerfix + me.start,
                onload: function(resp) {
                    var next = new DOMParser()
                        .parseFromString(resp.responseText, "text/html");
                    me.getDrectLink(next);   //去掉google结果跳转
                    me.getImg(next);         //获取下一页缩略图
                    me.numberResult(next);   //给结果添加序号
                    me.searchInSite(next);   //添加在此站点中搜索

                    var lis = next.querySelectorAll("#rso > li");
                    var rso = me.$("#rso");
                    for(var j = 0; j < lis.length; j++) {
                        rso.appendChild(lis[j]);
                    }

                    me._nav = next.querySelectorAll("table#nav td");

                    var content = "";
                    var prev = me.start/10;
                    var i = (prev - 3) > 0 ? (prev - 3) : 1;
                    var last = more > 3 ? prev + 4 : prev + more;
                    if(prev > 1) {
                        content += "<a href='" + me.urlPerfix + 10*(prev-2) + "'>上一页</a>";
                    }
                    if(cur > 3) {
                        content += "...";
                    }
                    for(;i < last; i++) {
                        if(i != prev) {
                            content += "<a href='" + me.urlPerfix + 10*(i-1) +"'>" + i + "</a>";
                        } else {
                            content += "<a>" + i + "</a>";
                        }
                    }
                    if(more > 3) {
                        content += "..."
                    }
                    if(more > 0) {
                        content += "<a href='" + me.urlPerfix + 10*prev + "'>下一页</a>"
                    }

                    var loading = me.$(".gv_nextpage_loading");
                    loading.setAttribute("class", "gv_nextpage gv_nextpage_loaded");
                    loading.innerHTML = content;

                    if(me.loadCount == 0) {
                        me.loadCount = 2;
                        return;
                    }
                    document.dispatchEvent(me.gv_nextpage_loaded);  //加载第2页
                }
            });
        },
        loadNextPage: function() {
            this.gv_nextpage_loaded = document.createEvent("Event");
            this.gv_nextpage_loaded.initEvent("gv_nextpage_loaded", false, false);

            var me = this;

            this._scroll = function() {
                if(me.loadCount < 2) return;    //正在加载下2页中
                //浏览到还剩2页时自动加载2页
                var totalHeight = document.documentElement.scrollHeight;
                var currentHeight = document.documentElement.scrollTop + document.documentElement.clientHeight;
                if(totalHeight-currentHeight < 1500) {    //2页高度大概是1500px
                    me.loadOneNextPage();
                }
            };
            document.addEventListener("scroll", this._scroll, false);

            this._load = function() {
                me.loadOneNextPage();
            };
            document.addEventListener("gv_nextpage_loaded", this._load, false); //加载第2页

            me.loadOneNextPage();   //初始化，自动加载2页
        },
        getDrectLink: function(node) {
            if(!node) node = document;
            var selectors = [".r a", ".th a"];  //文本链接和图片链接
            for(var i = 0; i < selectors.length; i++) {
                var links = node.querySelectorAll(selectors[i]);
                for(var j = 0; j < links.length; j++) {
                    links[j].removeAttribute("onmousedown");    //移除google统计
                    if(/[\?&]url=[^&]/i.test(links[j].href)) {  //替换google跳转链接
                        links[j].href = links[j].href.replace(/.*[\?&]url=([^&]*).*/i, "$1");
                    }
                }
            }
        },
        getImg: function(node) {
            if(!node) node = document;
            
            var imgscrs = node.querySelectorAll("#xfoot > script");
            //页面有缩略图时，第一个script块是获取缩略图函数，第二个为其他函数...
            for(var i = 0; i < imgscrs.length - 1; i++) {
                var src = imgscrs[i].innerHTML;
                if(src.indexOf("data:image/") == -1) continue;
                //替换document为当前页面节点node，减少搜索范围
                scr = src.replace("function()", "function(document)");
                scr = scr.replace("})();", "})(node);");
                eval(scr);
            }
        },
        numberResult: function(node) {
            if(!node) node = document;
            var results = node.querySelectorAll("li > div.vsc > h3.r");
            for(var i = 0; i < results.length; i++) {
                var number = results[i].insertBefore(document.createElement("span"), results[i].firstChild);
                number.setAttribute("class", "gv_number");
                number.innerHTML = this.resultCount++;
            }
        },
        searchInSite: function(node) {
            if(window.location.href.indexOf("site%3A") != -1) return; //如果已经是 site： 搜索了则退出

            if(!node) node = document;
            var fs = node.querySelectorAll("li > div.vsc div.f");
            for(var i = 0; i < fs.length; i++) {
                var std = this.$("span.std", fs[i]);
                if(!std) {
                    std = fs[i].appendChild(document.createElement("span"));
                    std.setAttribute("class", "std");
                }
                var cite = this.$("cite", fs[i]);
                if(cite) {
                    var span = std.appendChild(document.createElement("span"));
                    span.setAttribute("class", "gl");
                    span.innerHTML = " - ";

                    var a = std.appendChild(document.createElement("a"));
                    a.setAttribute("class", "fl");
                    a.setAttribute("target", "_self");
                    a.innerHTML = "在此站点中搜索";

                    cite = cite.innerHTML
                        .replace(/<[^>]*>/g, "")        //移除<b>...</b>等
                        .replace(/^[^\/]*\/\//, "");    //移除http/https等
                    cite = window.location.href.replace(/(.*q=[^&]*)(.*)/, "$1" + "%20site%3A" + cite.split("/")[0] + "$2");
                    a.setAttribute("href", cite);
                }
            }
        }
    };

    googleV.init();

})();
