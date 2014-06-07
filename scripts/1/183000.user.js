// ==UserScript==
// @name           infoQ presentations
// @description    adds buttons to navigate slides on infoq presentations
// @version        1.1
// @namespace      com.joshwand
// @include        http://www.infoq.com/presentations/*
// ==/UserScript==

// credit to http://userscripts.org/scripts/show/36826 back in 2008

var idx = 0;

(function () {
    
    var imgSelector = 'div#slide img';
    var swfSelector = 'div#slideContainer object';

    var isSWF = document.querySelector(swfSelector) !== null;

    var slideSelector = isSWF ? swfSelector : imgSelector;
    console.log('slideSelector = ' + slideSelector);

    function updateSlideSrc(src) {
        var element = document.querySelector(slideSelector);
        if (isSWF) {
            element.data = src;
        } else {
            element.src = src;
        }
    }

    var s = document.createElement('div');
    //s.setAttribute('style','position: absolute; z-index: 999; visibility: visible; left: 700px; top: 500px;')
    s.setAttribute('id','O_o');
    
    var preB = document.createElement('input');
    preB.setAttribute('type','button');
    preB.setAttribute('value','pre');
    preB.setAttribute('style','color: red; opacity: 0.6; -webkit-appearance: push-button;border: 1px solid black;padding: 1px 4px;-webkit-border-radius: 3px;margin: 4px;');
    
    var nextB = document.createElement('input');
    nextB.setAttribute('type','button');
    nextB.setAttribute('value','next');
    nextB.setAttribute('style','color: red; opacity: 0.6; -webkit-appearance: push-button;border: 1px solid black;padding: 1px 4px;-webkit-border-radius: 3px;margin: 4px;');
    
    var counter = document.createElement('span');  
     var updateCounter = function() {
        counter.textContent = (idx + 1) + '/' + unsafeWindow.slides.length;
    };
    updateCounter();
   
    
    s.appendChild(preB);
    s.appendChild(nextB);
    s.appendChild(counter);
    
    
    var preF = function(){
        if (idx > 0) {
            var pp = document.querySelector(slideSelector);
            updateCounter();
            updateSlideSrc(unsafeWindow.slides[--idx]);
            
            //nextB.setAttribute('value','next('+idx+')')
            //preB.setAttribute('value','pre')
        }
        
        
    };
    var nextF = function(){
        if (idx < unsafeWindow.slides.length - 1) {
            var pp = document.querySelector(slideSelector);
            updateSlideSrc(unsafeWindow.slides[++idx]);
            updateCounter();
            //nextB.setAttribute('value','next('+idx+')')
            //preB.setAttribute('value','pre')
        }
    };
    
    var inF = function(){
        this.style.opacity='1';
    };
    var outF = function(){
        this.style.opacity='0.6';
    };
    preB.addEventListener('click',preF,false);
    nextB.addEventListener('click',nextF,false);
    preB.addEventListener('mouseover',inF,false);
    nextB.addEventListener('mouseover',inF,false);
    preB.addEventListener('mouseout',outF,false);
    nextB.addEventListener('mouseout',outF,false);
    
    var sc = document.querySelector('#slideContainer');
    
    console.log("fooooo");
    sc.insertBefore(s, sc.firstChild);
    //document.querySelector('#slideContainer').parentNode.insertBefore(appendChild(s);
}
)();