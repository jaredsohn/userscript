// ==UserScript==
// @name       GoogleReaderPlusPlus
// @namespace  GoogleReaderPlusPlus
// @version    v1.0
/* @reason
 * zi ji tiao jiao, feng yi zu shi
 * @end
 */
// @match     http://www.google.com/reader/*
// @match     https://www.google.com/reader/*
// @author    wonderfuly@gmail.com
// @thankto   wong2.cn
//
// ==/UserScript==

function movePlusoneToTop(entry){
    // move the plus one button from bottom to top
    var plus_one_span = entry.getElementsByClassName("item-plusone")[0];
    entry.getElementsByClassName("entry-author")[0].appendChild(plus_one_span);
    setTimeout(function(){
        plus_one_span.style.marginLeft = "10px";
        plus_one_span.style.marginTop = "3px";
    }, 1500);
}
document.getElementById("entries").addEventListener("DOMNodeInserted", function(event){
    var target = event.target;
    if(target.classList[0] == "entry"){
        movePlusoneToTop(target);
    }
})
var entries = document.getElementById("entries").getElementsByClassName("entry");
for(var i = 0, len = entries.length; i < len; i++){
    var entry = entries[i];
    movePlusoneToTop(entry);
}