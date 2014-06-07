// ==UserScript==
// @name Add print page to Zhihu
// @namespace Zhihu-Print
// @description Add a button to clean the answer page of Zhihu to fit for print.
// @include http://www.zhihu.com/question/*
// @match http://www.zhihu.com/question/*
// @version 1.4
// ==/UserScript==

(function (window) {
    var document = window.document;

    var removeNodeBySelector = function (selector) {
        var nodes = document.querySelectorAll(selector),
            nodesLength = nodes.length,
            i,
            node;
        for (i = 0; i < nodesLength; i += 1) {
            node = nodes[i];
            node.parentNode.removeChild(node);
        }
    };
    var prepareForPrint = function () {
        removeNodeBySelector("a.comment");
        removeNodeBySelector("a.report");
        removeNodeBySelector("a.share");
        removeNodeBySelector("a.zm-item-link-avatar");
        removeNodeBySelector("a.zu-edit-button");
        removeNodeBySelector("a.zu-question-answer-meta-comment");
        removeNodeBySelector("div#zh-question-meta-wrap");
        removeNodeBySelector("div#zh-tooltip");
        removeNodeBySelector("div.mention-popup");
        removeNodeBySelector("div.question-status");
        removeNodeBySelector("div.zg-warn-message");
        removeNodeBySelector("div.zh-answers-title");
        removeNodeBySelector("div.zh-backtotop");
        removeNodeBySelector("div.zm-comment-box");
        removeNodeBySelector("div.zh-question-answer-form-wrap");
        removeNodeBySelector("div.zm-editable-tip");
        removeNodeBySelector("div.zm-item-vote-info");
        removeNodeBySelector("div.zm-tag-editor");
        removeNodeBySelector("div.zm-votebar");
        removeNodeBySelector("div.zh-footer");
        removeNodeBySelector("div.zu-footer");
        removeNodeBySelector("div.zu-global-notify");
        removeNodeBySelector("div.zu-main-sidebar");
        removeNodeBySelector("div.zu-question-collap-title");
        removeNodeBySelector("div.zu-top");
        removeNodeBySelector(".zu-autohide");
        removeNodeBySelector(".zg-bull");
        removeNodeBySelector(".more-awesome");
        removeNodeBySelector(".awesome-answer-list");

        document.querySelector("body.zhi").style.padding = 0;
        document.querySelector(".zu-main-content-inner").style.margin = 0;
    };
    var addPrintButton = function () {
        var sideWrap = document.getElementById("zh-question-side-header-wrap"),
            menuDiv = document.getElementById("zh-question-operation-menu"),
            printA = document.createElement("a");
        printA.innerHTML = "&#25171;&#21360;"; // "Print" in chinese with html entities.
        printA.className = "zg-btn-white zg-mr10";
        printA.id = "zh-item-print";
        printA.href = "javascript:;";
        sideWrap.insertBefore(printA, menuDiv);

        printA.addEventListener("click", prepareForPrint);

        printA = null;
    };
    addPrintButton();
})(window);