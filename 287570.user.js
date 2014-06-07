// ==UserScript==
// @name       DotD Forums Time Ago
// @version    1.0
// @description  Changes Date format on forum posts from timestamp to time ago
// @include    *dawnofthedragons.com/forums*
// @require    http://code.jquery.com/jquery-latest.min.js
// @require    http://timeago.yarp.com/jquery.timeago.js
// ==/UserScript==
var tr = function(s) {
    return s.replace(new RegExp(String.fromCharCode(160), "g"), " ").replace(/,\s|th\s|st\s|nd\s|rd\s/gi, " ")
},
g = function(t) {
    console.log($.trim(tr(t)));
    console.log(new Date($.trim(tr(t))));
    return $.timeago(new Date($.trim(tr(t))))
},
f = function() {
    $(this).text(g($(this).text()))
};
$("div.posthead span.postdate").each(f);
$("div.forumlastpost p.lastpostdate").each(f);
$("dl.threadlastpost dd:last-child").each(f);
$("div.threadmeta span.label").each(function() {
    var t = $(this).contents().filter(function() {
        return this.nodeType == 3
    })[1],
    txt = $.trim(tr($(t).text()));
    $(t).replaceWith(", " + g(txt));
});

$("ul#sidebar>li:nth-child(3) div.meta").each(function() {
    var d = $(this).contents().filter(function() {
        return this.nodeType == 3
    })[2],
    t = $(this).find("span.time"),
    txt = $.trim(tr($(d).text())) + " " + t.text();
    t.remove();
    $(d).replaceWith(g(txt));
});
$("ul#sidebar>li:nth-child(4) div.meta").each(f);