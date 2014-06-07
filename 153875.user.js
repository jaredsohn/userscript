// ==UserScript==
// @name          Save my Youtube embed code
// @namespace     http://nuridol.egloos.com
// @description   나의 embed를 지켜줘
// @version       1.0.2
// @author        NuRi
// @homepageURL   http://userscripts.org/scripts/show/153875
// @updateURL     https://userscripts.org/scripts/source/153875.meta.js
// @include       http://www.youtube.com/watch*
// @include       https://www.youtube.com/watch*
// ==/UserScript==

// ...script by NuRi

function letsEmbed() {
    var textareas = document.getElementsByTagName("textarea");
    for (var i=0; i < textareas.length; i++) {
        var element = textareas[i];
        if (element.className.match('share-embed-code')) {
            createEmbedTag(element);
            break;
        }
    }

}

function createEmbedTag(element) {
    if (element == null) {
        return;
    }

    var resultTextarea = document.getElementById('converted_textarea');
    if (resultTextarea == null) {
        resultTextarea = document.createElement("textarea");
        resultTextarea.id = 'converted_textarea';
        resultTextarea.style.backgroundColor = "#FFE";
        resultTextarea.style.border = "solid 1px rgb(209,206,254)";
        resultTextarea.style.width = '470px';
        resultTextarea.style.height = '120px';
        resultTextarea.style.marginLeft = "3px";
        element.parentNode.insertBefore(resultTextarea, element.nextSibling);
    }
    var code = element.value;
    if (preCode == code) {
        return;
    }
    preCode = code;
    resultTextarea.value = convertTag(code);
}

function convertTag(tag) {
    if (tag == "") {
        return "";
    }


    var width = tag.replace(/^.*width="([^"]+)".*$/, "$1");
    if (parseInt(width, 10) > 0) {
        width = parseInt(width, 10); //+ 'px';
    }
    else {
        width = "100%";
    }

    var height = tag.replace(/^.*height="([^"]+)".*$/, "$1");
    if (parseInt(height, 10) > 0) {
        height = parseInt(height, 10); // + 'px';
    }
    else {
        height = "auto";
    }

    var videoSrc = tag.replace(/^.*src="([^"]+)".*$/, "$1");
    videoSrc = videoSrc.replace("www.youtube.com/embed", "www.youtube.com/v");
    videoSrc = videoSrc.replace("www.youtube-nocookie.com/embed", "www.youtube-nocookie.com/v");

    if (videoSrc.match("\\?")) {
        videoSrc = videoSrc + "&version=3";
    }
    else {
        videoSrc = videoSrc + "?version=3";
    }

    var fullScreen = "false";
    if (tag.match("allowfullscreen")) {
        fullScreen = "true";
    }

    var convertedVideoCode = '<object width="' + width + '" height="' + height + '"><param name="movie" value="' + videoSrc + '"></param><param name="allowFullScreen" value="' + fullScreen + '"></param><param name="allowscriptaccess" value="always"></param><embed src="' + videoSrc + '" type="application/x-shockwave-flash" width="' + width + '" height="' + height + '" allowscriptaccess="always" allowfullscreen="' + fullScreen + '"></embed></object>';

    var convertedCode = convertedVideoCode; // + '<p><a href="http://nuridol.net/ut_convert.html">NuRi\'s Tools - Youtube 변환기</a></p>';

    return convertedCode;
}

var preCode = "";
var myVar=setInterval(function(){letsEmbed()},1500);
