// ==UserScript==
// @name           Bugun++
// @description    Bugun++ 
// @namespace      http://userscripts.org/users/228522
// @version        0.5
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://antik.eksisozluk.com/*
// @include        https://antik.eksisozluk.com/*
// ==/UserScript==

var turkeyTime = new Date();
                    var localTime = new Date();
                    var UTC = localTime.getTime() + (localTime.getTimezoneOffset()*60000);
                    turkeyTime = new Date(UTC + (3*60*60000)); // Yaz saati
                    //turkeyTime = new Date(UTC + (2*60*60000)); // Kis saati

var month = turkeyTime.getMonth() + 1;
                    var day = turkeyTime.getDate();
                    var year = turkeyTime.getFullYear();


function xpath(xpath, element) {
    if (!element)
        element = document;
    return document.evaluate(xpath, element, null,
                             XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function bugun_button() {
    var mytr = xpath("//table[@class='nav']//tr[2]/td[1]").snapshotItem(0);
    mytr.setAttribute("onclick","top.sozindex.location.href = 'index.asp?a=sr&kw=&au=&so=y&fd="+day+"&fm="+month+"&fy="+year+"'");
}

function bugun_duzelt() {
    window.location.href = "index.asp?a=sr&kw=&au=&so=y&fd="+day+"&fm="+month+"&fy="+year;
}

if (window.location.href.match(/\/top\.asp/)) {
   bugun_button();
} else if (window.location.href.match(/\/index\.asp\?a=td/)) {
   bugun_duzelt();
}
