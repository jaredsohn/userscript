// ==UserScript==
// @name           lowbirdgag
// @namespace      *
// @description    use lowbird.com like 9gag.com - j:next, k:previous, m:zoom
// @include        http://www.lowbird.com/*/view/*
// ==/UserScript==


//-- config
var prevKey = 75 //k
var nextKey = 74 //j
var zoomKey = 77 //m


//-- script
window.addEventListener('keydown', checkKeyRedirect);

function checkKeyRedirect(event){  
 
    if(event.keyCode == prevKey){
        var prev = false;
        var prevBar = document.getElementById('prevBar');
        
        //do redirect
        if(prevBar.hasAttribute('href')){
            location.href = prevBar.getAttribute('href');
        }
    }
    
    if(event.keyCode == nextKey){
        var next = false;
        var nextBar = document.getElementById('nextBar');
        
        //do redirect
        if(nextBar.hasAttribute('href')){
            location.href = nextBar.getAttribute('href');
        } 
    }  
    
    if(event.keyCode == zoomKey){
        var curImg = document.getElementById('image');
        
        if(curImg.className == 'scaled'){
            curImg.className = 'full';
        } else {
            curImg.className = 'scaled';
        }
    }   
}