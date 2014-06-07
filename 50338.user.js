// ==UserScript==
// @name           WHT Forum ad remover
// @namespace      http://userscripts.org/users/92501
// @description    Deletes the sidebar ad from WHT, supplement to adblockplus with easylist
// @include        http://www.webhostingtalk.com/forumdisplay.php?f=*
// @include        http://www.webhostingtalk.com/showthread.php?t=*
// ==/UserScript==

var table_cells = document.getElementsByTagName("td");

function remove(element) {
    element.parentNode.removeChild(element);
}

for (var i = 0; i < table_cells.length; i++) {
    // presently the ad is the only thing matching these attributes
    if ((table_cells[i].getAttribute("align") == "right")
        && (table_cells[i].getAttribute("valign") == "top")
        && (table_cells[i].getAttribute("width") == "200"))
        {
            remove(table_cells[i]);
            break;
    }
}
