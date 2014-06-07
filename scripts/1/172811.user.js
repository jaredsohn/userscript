// ==UserScript==
// @name        HF Change CSS
// @author      Emylbus
// @namespace   http://www.sublyme.net
// @description Change the CSS of HF! Warning: This will break the style of many HF features and I can't be buggered to change them all.
// @include     *hackforums.net/*
// @version     0.3
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @run-at      document-start
// @run-at      document-reload
// ==/UserScript==

// Replace this with any myBB global CSS from any site you want (look through <head> section of their page source)
var newCSS = "http://www.supportforums.net/cache/themes/theme6/global.css";

// If true, the CSS will only be changed on nsfw.hackforums.net/* set to false for any hf page :D
var nsfwOnly = true;

function cssReplace2(){
    var i, holder;
    holder = document.getElementsByTagName('link');
    for(i=0; i<holder.length; i++){
        if(holder[i].outerHTML.indexOf('global.css') != -1){
            holder[i].outerHTML = holder[i].outerHTML.replace('http://x.hackforums.net/cache/themes/theme3/global.css', newCSS);
        }
    }
    document.getElementsByTagName('link') = holder;
}


function main(){
    if(nsfwOnly){
        if(document.URL.indexOf('nsfw.') != -1){
            cssReplace2();
        }
    }else{
        cssReplace2();
    }
}

main();