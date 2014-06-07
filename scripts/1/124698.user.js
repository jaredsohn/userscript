// ==UserScript==
// @name        YYN BST Open All Unread
// @namespace   http://www.guillaumecl.com/
// @description Adds a button to the YYN BST forum to open all unread links
// @include     http://www.yoyonation.com/talk/index.php/board,7.0.html
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version     1.0
// ==/UserScript==

$(document).ready(function() {
    $("td.bodytd").children().first().after("<div align=\"center\" style=\"padding-top: 4px;\" id=\"addedDiv\"> <a id=\"addedLink\" style=\"cursor:pointer;\">Open All Unread</a> </div>");
    $("#addedLink").click(function() {
        var urls = new Array();
        $("td.bodytd > table").find("tbody").find("tr").find("td").find("table.bordercolor").eq(0).find("tbody").children("tr.windowbg2").each(function(index) {
            var td = $(this).children("td.windowbg").eq(0);

            // if an a is found, that's a "new" link
            var newFound = td.children("a");
            if(newFound.length !== 0) {
                var text = td.find("span").eq(0).find("a").attr("href");
                urls.push(text);
            }
        });

        // using the new url array, open all the new pages
        var i;
        for(i in urls) {
            window.open(urls[i]);
        }
    });
});
