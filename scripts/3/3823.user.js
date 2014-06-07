// ==UserScript==
// @name            DeviantArt.com Ad remover
// @author          Jonas John
// @namespace       http://www.jonasjohn.de/
// @description     Removes inline ads from deviantart.com and skips AD pages
// @include         http://*.deviantart.com/*
// @exclude         http://my.deviantart.com/
// @license         Public Domain
// @version	        0.2
// @released        2006-04-13
// @updated         2006-04-13
// @compatible      Greasemonkey
// ==/UserScript==

(function(){

    function devfix(){
        
        // hide inline ads:
        var divs = document.getElementsByTagName('div');
        
        for (var x=0; x < divs.length; x++){
        
            if (divs[x].className.indexOf('ie-paintfix')!=-1 && divs[x].innerHTML.indexOf('store/subscribe')!=-1){
                divs[x].style.display = 'none';
                //divs[x].style.border = '1px solid red';
            }
            
            if (divs[x].className.indexOf('ie-floatfix')!=-1 && divs[x-1].innerHTML.indexOf('store/subscribe')!=-1){
                divs[x-1].parentNode.style.display = 'none';
                //divs[x-1].parentNode.style.border = '1px solid red';
            }
        }
        
        
        // skip splash ad pages
        
        var is_ad_page = 0;
        
        var links = document.getElementsByTagName('a');
        
        if (links[0].innerHTML.indexOf('continue')!=-1 && links[2].innerHTML.indexOf('Join today')!=-1){
            is_ad_page = 1;
        }
        
        // if we are on an ad page, skip it
        if (is_ad_page == 1){ 
        
            var target = links[0].href;
            
            location.href = target;
        }
    }
    
    devfix();
  
}) ();

