// ==UserScript== 
// @name Grooveshark HTML5 Ad Remover 
// @description Removes the side banner advertisements on Grooveshark. 
// @namespace http://pko.ch/ 
// @include http://grooveshark.com/*
// @include http://*.grooveshark.com/*
// ==/UserScript==

function getElementsByClassOrIdRegexpMatch(classname_re, node)  {
    if(!node){
        node = document.getElementsByTagName("body")[0];
    }

    var a = [];
    var re = new RegExp(classname_re);
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className) || re.test(els[i].id)){
            a.push(els[i]);
        }
    return a;
}

var removeAd = function() {
    nodes = getElementsByClassOrIdRegexpMatch(/(^|\b)\w*[cC]apital\w*(\b|$)/)
    for( i in nodes ){
        try{
            n = nodes[i]
            n.parentElement.removeChild(n)
        }catch(e){
            ; // Just swallow them.
        }
    }


    //$('body').resize()
    /*
    try{
        document.getElementById("page_wrapper").style.width = "100%";
    }catch(e){
        ; // Just swallow them.
    }
    */
}

window.onload = function() {
    document.body.addEventListener("DOMSubtreeModified", removeAd, true);
    removeAd();
}
