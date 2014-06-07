// ==UserScript==
// @name        GitHub hierarchical list view
// @namespace   github
// @description 
// @version     0.0.1
// ==/UserScript==

var clickHandler = function() {
    var icon = $(this).parent("td");
    var row = icon.parent();
    var a = icon.next("td").children("a");
    var indent = parseInt($(".content", row).css("padding-left"));
    $.get(a[0].href, null, function(doc) {
        var rows = $("tr", doc).slice(2);
        $("img[alt=directory]", rows).click(clickHandler);
        $(".content", rows).css("padding-left", (isNaN(indent) ? 0 : indent) + 15 + "px");
        rows = rows.insertAfter(row);
    }, "text/html");
}
window.setTimeout(function() {
    alert(typeof $);
    $("img[alt=directory]").click(clickHandler);
}, 10000)
alert(typeof $);