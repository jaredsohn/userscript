// ==UserScript==
// @name 115 Get Back Copy Link
// @author Amemiya
// @namespace http://sukima.me
// @version 0.0.2
// @license public domain
// @description Get the link back in Firefox and Chrome
// @published 2012-03-19
// @include http://115.com/file/*
// ==/UserScript==

document.addEventListener('mousedown',
    function(){
        par = document.getElementById("js_download_btn_lis");
        for(var i in par.childNodes){
            var btn = par.childNodes[i];
            if(btn.className != "btn btn-arrow")
                btn.href=btn.getAttribute("url");
        }
    }, false);
