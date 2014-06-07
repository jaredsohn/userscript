// ==UserScript==
// @name          Ads Remover (Codes-Sources)
// @description   Remove some ads
// @include       *www.codes-sources.com*
// ==/UserScript==

try {

(function() {
    var Sheet = document.createStyleSheet();
    Sheet.cssText = (
        "TD.Right { display: none !important; }"+
        "DIV.f { background-image: none !important }"
    );

    document.body.style.width=(document.body.offsetWidth-120)+"px";

    var result = document.getElementById("ctl00_Main_Codes").getElementsByTagName("a");
    for (var i=0; i<result.length; i++) {
        if (result[i].title && result[i].title!="") {
            result[i].innerHTML = result[i].title.substr(0, 80).toUpperCase();
        }
    }

})()

} catch (ex) {}