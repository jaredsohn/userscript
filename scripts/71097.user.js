// ==UserScript==
// @name           watch_on_favotter
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    watch the tweet on favotter
// @include        http://twitter.com/*/status/*
// @include        http://twitter.com/*/statuses/*
// @include        https://twitter.com/*/status/*
// @include        https://twitter.com/*/statuses/*
// ==/UserScript==
(function () {
    var li = document.createElement("li");
    li.innerHTML = '<a href="http://favotter.net/status.php?id=' + location.href.split("/").pop() + '">ふぁぼへ移動</a>';
    var acs = document.getElementsByClassName("actions-hover")[0];
    acs.insertBefore(li, acs.firstChild);
})();
