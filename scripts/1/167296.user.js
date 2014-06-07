// ==UserScript==
// @name        Netvibes
// @namespace   http://shtucer.ru
// @description Netvibes
// @include     http*://*netvibes.com*
// @version     0.01
// @description Change behavior for the clicking on the feed's title. Opens site instead closing feed. 
// ==/UserScript==

window.addEventListener("load", improveMe, true);

function improveMe(event) {

    var content = document.getElementById("smartreader-feeds-inner");
    if(content !== null){
        content.addEventListener("DOMNodeInserted", function(event){
            var header = content.getElementsByTagName("a"), idx, msg = "";
            for(idx in header){
                if(header[idx].className.indexOf("onClickCloseEntry") >= 0){
                    header[idx].classList.remove("onClickCloseEntry");
                }
            }
        }, false);
    }

}

