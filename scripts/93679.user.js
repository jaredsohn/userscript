// ==UserScript==
// @name           Display Image Info
// @author          caoyue
// @version           1.3
// @description    Display Image Info in Image Title
// @license	GPL v3 or later version
// @downloadURL	https://userscripts.org/scripts/source/93679.user.js
// @updateURL	https://userscripts.org/scripts/source/93679.meta.js
// @include        *
// ==/UserScript==

/*
*    v1.0
*    Base64 image 
*    long url cut
*    v1.1
*    Image width limit
*    v1.2
*    Title Wrap
*    Restore original attribute when mouseout
*/
(function () {
    var URL_MAX_LENGTH = 100;  //Max Url Length, more than this size will be cut short
    var MIN_SIZE_DISPLAY = 30;   //Image width less than this size will not be displayed

    var url;
    var title;
    document.addEventListener('mouseover', function (e) {
        var tar = e.target;
        if (tar.nodeName.toLowerCase() == 'img') {
            if (tar.naturalWidth > MIN_SIZE_DISPLAY || tar.naturalWidth == 0) {
                title = tar.title;
                imgSize = tar.naturalWidth + "px × " + tar.naturalHeight + "px";
                url = tar.src;
                if (tar.src.match("data:image")) {
                    url = "(Base64 Image)";
                }
                else if (tar.src.length > URL_MAX_LENGTH) {
                    var str = tar.src;
                    url = str.substr(0, 50) + "..." + str.substr(str.length - 50, 50);
                }

                if (tar.title.indexOf("px ×") == -1) {
                    var t = tar.title == "" ? "" : "TITLE : " + tar.title;
                    var a = tar.alt == "" ? "" : t == "" ? "ALT : " + tar.alt : "\u000AALT : " + tar.alt;
                    var s = a == "" ? "SIZE : " + imgSize : "\u000ASIZE : " + imgSize;
                    tar.title = t + a + s + "\u000AURL : " + url;
                }
            }
        }
    }, false);
    document.addEventListener('mouseout', function (e) {
    if(e.target.nodeName.toLowerCase() == 'img' && title != undefined){
        e.target.title = title;
        }
    }, false);
})();