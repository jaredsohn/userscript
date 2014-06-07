// ==UserScript==
// @name           Blogger Edit Layout Customization
// @namespace      Burglish.com
// @description    Blogger Edit Layout Customization
// @include        http*://*.blogger.com/*
// ==/UserScript==


function _id(_s){
    return document.getElementById(_s);
}

var ef = _id("app-outer-wrap");
if(ef){
    ef.style.width = "1000px";
    ef.style.left = "20px";

    _id("template").style.left="20px";
    _id("template").style.width="1000px";

    _id("layout-editor").style.left="20px";
    _id("layout-editor").style.width="1000px";
    
    _id("outer-wrap").style.left="20px";
    _id("outer-wrap").style.width="1000px";

    _id("layout-top").style.left="20px";
    _id("layout-top").style.width="1000px";

    var f=window.frames[0];
    if(f){
        var    fd = f.document;

        var ly = fd.getElementById("layout");
        if(ly){
            ly.style.width = "1000px";
        }
    }
}