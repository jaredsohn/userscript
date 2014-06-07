// ==UserScript==
// @name        FontChanger
// @namespace   Styler
// @description Changes the font-family of the content loaded to one ("Ubuntu Mono" in my case)
// @include     *
// @version     1
// @grant       
// ==/UserScript==


function changeStyle(obj) {
    try{
    obj.style.fontFamily = "Ubuntu Mono";
    }catch(e){}
    }
function changeStyleRecur(obj) {
    changeStyle(obj);
    if(obj.hasChildNodes()) {
        for(var i=0; i<obj.childElementCount; i++) {
            changeStyleRecur(obj.children[i]);}
            }
    }
changeStyleRecur(document.body);