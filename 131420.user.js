// ==UserScript==
// @name           skip specified songs
// @author         Krazy Lee
// @namespace      krazy
// @description    Auto skip the songs you are impossible to like.
// @include        http://douban.fm/*
// @version        0.1
// ==/UserScript==



if(window.loaded) return;
var $g 	           = function( id ){ return document.getElementById(id); },
    $rm	           = function(elem){ elem ? elem.parentNode.removeChild(elem) : elem;},
    skip_button    = $g("skip") || document,
    nowPlaySong    = JSON.parse(localStorage.nowPlaySong),
    current_title  = "";		
	
var evt = document.createEvent("MouseEvents"); 
evt.initEvent("click",true,true);  

function checkSong(){	
    var jap = /[\u0800-\u4e00]/; // the hell of Japanese words;
    ["title","album","artist"].forEach(function(key){
        if( /[\u0800-\u4e00]/.test(nowPlaySong[key]) ){
	    console.log(nowPlaySong[key] + " 因含有日文被无情的跳过");
	    skip_button.dispatchEvent(evt);				
	}	
    });
};		

$rm($g("fm-app-notice"));//remove the kind notice...

setTimeout(function(){		
    nowPlaySong =  JSON.parse(localStorage.nowPlaySong);	
    current_title === nowPlaySong.title ? current_title : 
    (function(){
	current_title = nowPlaySong.title;
	checkSong();
    })();
    console.log(current_title + "--" +nowPlaySong.title);
    setTimeout(arguments.callee,500);
},500);	
	
window.loaded = true;
	