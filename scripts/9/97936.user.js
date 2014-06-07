// ==UserScript==
// @name        fileplanet.com.ua helper
// @version     1.0
// @date        27.02.2011
// @author      ki0 <ki0@ua.fm>
// @download	http://userscripts.org/scripts/source/97936.user.js
// @include     http://www.fileplanet.com.ua/*
// @include     http://fileplanet.com.ua/*
// @exclude     http://www.fileplanet.com.ua/*.html
// @exclude     http://fileplanet.com.ua/*.html
// @exclude     http://www.fileplanet.com.ua/?op=*
// @exclude     http://fileplanet.com.ua/?op=*
// ==/UserScript==

//start downloading automatically
var autostart = /*@Enable automatic downloading start@bool@*/ true/*@*/;

function load(e) {
    if (document.getElementsByName("rand").length == 0) {
        if (document.forms.length != 0)
            document.getElementsByName("method_free")[0].click();
        else {
            var link = document.getElementById("direct_link");
            link.getElementsByTagName("img")[0].onclick = "";
            if (autostart) {
                document.location.href = link.getElementsByTagName("a")[1].href;
            }
        }
    }
    else {
        document.forms[0].submit();
    }
}

window.addEventListener('load', load, false);
