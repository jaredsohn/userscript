// ==UserScript==
// @name        Resize Vimeo Player To Window Size
// @namespace   Reeywhaar
// @description Expands video to full browser window. Works pretty the same as "Resize Youtube Player To Window Size" by Zren
// @icon	https://secure-a.vimeocdn.com/images_v6/apple-touch-icon-114.png
// @include     *vimeo.com/*
// @version     1
// ==/UserScript==

(function VimeoFullsize(){
    function maximize(){
        var windowHeight = unsafeWindow.innerHeight;
        var windowWidth = unsafeWindow.innerWidth;
    
        var content = document.querySelector('#main #content');
        content.style.padding = '0px';
        content.style.width = windowWidth+'px';
    
        var playerContainer = document.querySelector('#video .player_container');
        playerContainer.style.height = windowHeight+"px";
        playerContainer.style.width = windowWidth+"px";
    }
    
    function getPosition(el){
        var element = document.querySelector(el);
        var xPosition = 0;
        var yPosition = 0;
      
        while(element) {
            xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }
        return yPosition;
    }
    
    function prependElement(parent, el){
        parent.insertBefore(el,parent.childNodes[0]);
    }
    
    unsafeWindow.addEventListener('resize', function(){
       maximize();
    });
    
    prependElement(document.querySelector('#wrap'), document.querySelector('#clip'));
    
    document.querySelector('#clip').style.marginBottom = '0px';
    
    unsafeWindow.dispatchEvent(new Event('resize'));
})();