// ==UserScript==
// @name YouTube Tags
// @description Shows the youtube tags
// @namespace http://internetztube.net 
// @include http://www.youtube.com/watch?*
// @include https://www.youtube.com/watch?*
// @match http://www.youtube.com/watch?*
// @match https://www.youtube.com/watch?*
// @author InternetzTube2
// @version 1.0
// @date 2013-01-30
// @license GPL
// ==/UserScript==

var x; 
x = new XMLHttpRequest();
x.onreadystatechange = function() {
    if (x.readyState == 4 && x.status == 200)
    {
        document.getElementById('tags_content').innerHTML = x.responseText;
    }
}
var extras_section = document.getElementsByClassName("watch-extras-section")[0];
extras_section.innerHTML += "<li id=\"tags\"><h4 class=\"title\">Tags</h4><div class=\"content\" id=\"tags_content\"></div></li>";

x.open("GET","http://internetztube.4lima.de/php/yt.php?url=" + escape(window.location),true);
x.send();