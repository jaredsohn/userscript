// ==UserScript==
// @name           Burmese Classic - Auto Download
// @namespace      -
// @description    Instead of clicking "Go to next page" links in ad pages, go to the movie pages and download right away.
// @details        Allow pop-ups in burmeseclassic.com to make the script work perfectly. To download with IDM, open to IDM > Options Button > File Types > insert "FLV" in the upper textbox.
// @include        http://www.burmeseclassic.com/*
// ==/UserScript==
if (window.location.href.substr(0,34) == "http://www.burmeseclassic.com/type")
    window.location = document.body.getElementsByTagName("a")[0].href;
else if (window.location.href.substr(0,38) == "http://www.burmeseclassic.com/showtime")
{
    var anchors = document.body.getElementsByTagName("a");

    for (var i=1; i<anchors.length; i++)
        window.open(anchors[i].href, target="_blank");

    var flashadd = document.getElementById("single").attributes[2].value;
    window.location = flashadd.substr(5, flashadd.indexOf("&") - 5);
}
else if (window.location.href.substr(0,44) == "http://www.burmeseclassic.com/new_player.php")
{
    var flashadd = document.getElementById("single").attributes[2].value;
    window.location = flashadd.substr(5, flashadd.indexOf("&") - 5);
}