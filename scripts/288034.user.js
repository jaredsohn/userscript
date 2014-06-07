// ==UserScript==
// @name        sodomite-total-annihilation
// @namespace   *.ficbook.net
// @description removes homosexual fanfics
// @include     http://ficbook.net/*
// @include     https://ficbook.net/*
// @include     http://ficbook.net
// @include     https://ficbook.net
// @include     http://*.ficbook.net
// @include     https://*.ficbook.net
// @include     http://*.ficbook.net/*
// @include     https://*.ficbook.net/*
// @version     1
// @grant       none
// @run-at      document-end
// @author      fastr2000@gmail.com
// ==/UserScript==

function containsSodom(element){
    var text = element.innerHTML.toLowerCase();
    var forbiddenWords = ["слэш", "яой", "гомосеки"]; //extend this list as you wish

    for(var i = 0; i < forbiddenWords.length; i++){
        if( text.indexOf(forbiddenWords[i])!=-1){
            return true;
        }
    }
    return false;
}

function searchAndDestroy(node){
  
    if(node==null){
        node = document;

    }
    // you can extend this conditions to match different page elements
    if(node.className=="fanfic_thumb"){     
        if( containsSodom(node)){         
            node.parentNode.removeChild(node);
        }

    }else{
        for(var i= 0; i < node.childNodes.length; i++){
            searchAndDestroy(node.childNodes[i]);
        }               
    }
    
}

window.onload=function(){searchAndDestroy();};


