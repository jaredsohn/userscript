// ==UserScript==
// @name        hack kome@open
// @namespace   http://userscripts.org/scripts/show/478953
// @include     http://open2ch.net/*
// @include     http://*.open2ch.net/*
// @include     http://xpic.sc/*
// @version     0.1.1.1
// @grant       none
// ==/UserScript==

+function(){
    var cssElement;
    function addCss(css){
        if(!cssElement){
            cssElement = document.createElement('style');
            cssElement.type = 'text/css';
            document.getElementsByTagName('head')[0].appendChild(cssElement);
            cssElement.cssText = "";
        }
        cssElement.innerHTML += css;
    }
    function isElement(node){return node.nodeType === Node.ELEMENT_NODE;}
    function getTagName(element){return element.tagName.toLowerCase();}
    function getSize(pxSize){return parseInt(pxSize,10);}
    function eachAddedNodes(mutations,func){
        mutations.forEach(function(m){
            var nodes = m.addedNodes;
            for (var i = 0; i < nodes.length; ++i){
                func(nodes[i]);
            }
        });
    }
    
    // kome list
    addCss("div#klog_view{white-space:normal!important;}");
    addCss("klog{margin-right:3px;}");
    addCss(".textKome{display:block;word-break:break-all;}");
    addCss(".imgKome{display:inline-block;}");
    function isImgKome(komeElement){
        return komeElement.querySelectorAll('img').length>0;
    }
    function modKomeList(komeElement){
        var className = (isImgKome(komeElement))? "imgKome" : "textKome" ;
        komeElement.classList.add(className);
    }
    // kome
    function isComeElement(element){
        return getTagName(element) === "div" && element.classList.length === 0 &&
            element.childNodes.length === 1 && element.firstChild.childNodes.length === 0;
    }
    function addEventOnce(element,type,func){
        element.addEventListener(type,function wrapper(){
            element.removeEventListener(type,wrapper);func();
        });
    }
    function modKome(komeElement){
        var node = komeElement.firstChild;
        if(isElement(node) && getTagName(node) === "img"){
            if(node.complete){
                modImgSize(node);
            }else{
                fixImgPosition(node);
                addEventOnce(node,"load",function(){modImgSize(node);});
            }
        }
    }
    function modImgSize(imgElement){
        var targetPixels = 400*300;
        var width = imgElement.width;
        var height = imgElement.height;
        var r = (width*height)/targetPixels;
        if(r>1){
            r = 1/Math.sqrt(r);
            console.log("form w:"+width+";h:"+height);
            width = Math.round(width*r);
            height = Math.round(height*r);
            imgElement.width = width;
            imgElement.height = height;
            console.log("to w:"+width+";h:"+height);
        }
        fixImgPosition(imgElement);
    }
    function fixImgPosition(imgElement){
        var komeElement = imgElement.parentNode;
        var top = getSize(komeElement.style.top);
        var maxTop = window.innerHeight-imgElement.height;
        if(maxTop<top && maxTop>=0){
           komeElement.style.top = maxTop+"px";
        }
    }
    //register observers
    function observeKomeView(){
        var observer = new MutationObserver(function(list,ob){eachAddedNodes(list,modKomeList);});
        var view = document.getElementById("klog_view");
        observer.observe(view,{childList:true});
    }
    var observer = new MutationObserver(function(list,ob){
        eachAddedNodes(list,function(node){
            if(!isElement(node)) return;
            if(node.id === "komediv"){
                observeKomeView();
            }else if(isComeElement(node)){
                modKome(node);
            }
        });
    });
    observer.observe(document.body,{childList:true});
}();