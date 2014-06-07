// ==UserScript==
// @name        XTube - Cleanup subscription page
// @namespace   http://userscripts.org/users/546697
// @description Remove photo albums, old videos and empty albums
// @include     http://www.xtube.com/subscription.php
// @include     http://www.xtube.com/subscription.php?page=*
// @version     20140109
// @grant       GM_addStyle
// ==/UserScript==

(function() {
/*var links = document.getElementsByTagName("a");
for (var i = 0; i < links.length; ++i) {
    var href = links[i].href;
    if (href.indexOf("xtube.com/subscription.php") > 0 &&
        href.indexOf("field_subscribe_user_id=") > 0 &&
        href.indexOf("act=") < 0) {

        links[i].href += "&act=Subscribe";
    }
    
}*/

GM_addStyle("a.l-arr { display: none !important; }" +
            "a.r-arr { display: none !important; }" +
            "div#content form > br { display: none !important; }");

var box = document.getElementsByTagName("div");
for (var i = 0; i < box.length; ++i) {
    if (box[i].className == "Gy3content") {
        // Empty albums
        box[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
    } else if (box[i].className == "scroll-box") { 
        var link = box[i].getElementsByTagName("a");
        for (var j = 0; j < link.length; ++j) {
            var text = link[j].innerHTML;
            if (text.indexOf("s Photos") > 0) {
                box[i].style.display = "none";
            }
        }
        
        var empty = 1;
        var item = box[i].getElementsByTagName("div");
        for (var j = 0; j < item.length; ++j) {
            if (item[j].className == "item") {
                var text = item[j].innerHTML;
                if (text.indexOf("year") > 0 ||
                    text.indexOf("month") > 0 ||
                    text.indexOf("weeks") > 0) {
                    item[j].style.display = "none";
                } else if (text.indexOf("week") > 0) {
                    item[j].style.opacity = "0.6";
                    empty = 0;
                } else if (text.indexOf("days") > 0) {
                    item[j].style.opacity = "0.8";  
                    empty = 0;
                } else if (text.indexOf("day") > 0) {
                    item[j].style.background = "#F7F2E0";
                    empty = 0;
                } else if (text.indexOf("hour") > 0) {
                    item[j].style.background = "#F6E3CE";
                    empty = 0;
                } else if (text.indexOf("minute") > 0) {
                    item[j].style.background = "#F6CECE";
                    empty = 0;
                }
            }
        }
        if (empty) {
            box[i].style.display = "none";
        }
    }
    
}

})();
