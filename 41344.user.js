// ==UserScript==
// @name            No hxxp No _http
// @namespace       http://rainux.org/
// @description     DRL 一度盛行 _http:// 和 hxxp:// 文本链接，导致浏览器打开不便，此脚本会将 DRL 页面中所有的这类文本链接处理成正常的 http://。
// @include         https://*d4e.org/*
// @include         https://*dream4ever.org/*
// ==/UserScript==

(function() {
    function processNode(node) {
        if (node.nodeType == 3) {
            node.nodeValue = node.nodeValue.replace(/(_http|hxxp)(s*:\/\/)/gi, 'http$2');
            return;
        }

        for (var childNode = node.firstChild; childNode != null; childNode = childNode.nextSibling) {
            processNode(childNode);
        }
    }

    processNode(document.body);
}
)();
