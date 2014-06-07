// ==UserScript==
// @id             addReplyQuoteLink@v2ex.com
// @name           add reply quote link for v2ex.com
// @version        0.0.1
// @namespace      https://www.v2ex.com/addReplyQuoteLink
// @author         zbinlin
// @description    在回复内容中添加引用的楼层链接
// @updateURL      https://bitbucket.org/zbinlin/add-reply-quote-link/raw/tip/addReplyQuoteLink@v2ex.meta.js
// @include        http://*.v2ex.com/t/*
// @include        https://*.v2ex.com/t/*
// @run-at         document-end
// ==/UserScript==

/**
 * ******************************** Changelog ********************************
 * version: 0.0.1
 *  * 初始化
 *  * 注：未实现添加跨页的楼层链接
 * ***************************************************************************
 */

"use strict";
(function (window, undefined) {
    function GM_addStyle(css) {
        var style = document.createElement("style");
        style.innerHTML = css;
        document.head.appendChild(style);
    }
    GM_addStyle(["",
        ".gm-ref-container {",
        "}",
        ".gm-ref-container > a {",
            "display: inline-block;",
            "overflow: hidden;",
            "vertical-align: top;",
        "}",
        ".gm-ref-container > a:not(:first-child) {",
            "max-width: 0;",
            "margin-left: 0;",
            "white-space: nowrap;",
            "transition: all 0.3s ease-in 0.1s",
        "}",
        ".gm-ref-container:hover > a:not(:first-child) {",
            "max-width: 5em;",
            "margin-left: 0.5em;",
            "transition: all 0.3s ease-out 0.1s",
        "}",
    ""].join(""));
    var history = window.history;
    var TCLS = "gm-ref-target",
        HTMLAnchorElement = window.HTMLAnchorElement;
    window.addEventListener("popstate", function (evt) {
        var state = evt.state;
        if (!state) return;
        var id = state.id;
        if (!id) {
            return;
        }
        window.scrollTo(state.x, state.y);
    });
    window.addEventListener("click", function (evt) {
        if (0 !== evt.button) return;
        var target = evt.target;
        if (!(target instanceof HTMLAnchorElement) ||
            !target.classList.contains(TCLS)) {
            return;
        }
        var id = target.dataset.id;
        var elem = document.getElementById(id);
        if (!elem) return;
        evt.preventDefault();
        history.pushState({
            id: id,
            x: window.pageXOffset,
            y: window.pageYOffset
        }, "");
        elem.scrollIntoView(true);
    });
    var members = {};
    var tc = document.querySelector(".box small.gray > a").textContent,
        t = document.querySelector(".box > .cell > .topic_content").textContent.substr(0, 80);
    members[tc] = [
        {
            id: "Main",
            index: 0,
            content: t
        }
    ];
    var elems = Array.prototype.slice.bind(document.querySelectorAll(".box > .cell[id], .box > .inner[id]"))();
    elems.reduce(function (members, elem, idx, arr) {
        var sa = elem.querySelector("a.dark"),
            a  = sa.textContent;
        if (tc == a) {
            (function (sa) {
                var parent = sa.parentNode,
                    span   = document.createElement("span");
                span.textContent = "（楼主）";
                parent.insertBefore(sa, parent.insertBefore(span, sa));
            })(sa);
        }
        var rpy = elem.querySelector(".reply_content"),
            t   = rpy.textContent.substr(0, 80);
        Array.prototype.slice.bind(rpy.querySelectorAll('a[href^="/member/"]'))().forEach(function (elem, idx, arr) {
            var a = elem.textContent;
            var aset = members[a];
            if (!aset) return;
            var fragment = document.createDocumentFragment();
            fragment.appendChild(new Text("("));
            aset.reduceRight(function (p, e, i, a) {
                var link = document.createElement("a");
                link.classList.add(TCLS);
                link.href = "#" + e.id;
                link.textContent = "#" + e.index;
                link.title = e.content;
                link.dataset.id = e.id;
                fragment.appendChild(link);
            }, null);
            fragment.appendChild(new Text(")"));
            var span = document.createElement("span");
            span.classList.add("gm-ref-container");
            span.appendChild(fragment);
            var parent = elem.parentNode;
            parent.insertBefore(span, elem);
            parent.insertBefore(elem, span);
        });
        members[a] || (members[a] = []);
        members[a].push({
            id: elem.id,
            index: elem.querySelector("span.no").textContent,
            content: t
        });
        return members;
    }, members);
})(window);
