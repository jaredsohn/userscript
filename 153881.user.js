// ==UserScript==
// @name         Twitter Instagram Cards - Photo Viewer
// @namespace    http://chrisbradbury.net
// @author       Chris Bradbury
// @version      1.1
// @description  Now that Instagram have pulled their twitter support, this script adds back inline instagram photos.
// @include      https://twitter.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

$documentHeight = '';

function height(){
    
    if($documentHeight != document.body.scrollHeight){
       loadInstagram();
    }
    setTimeout(function(){ height(); },3000);
    
}

function loadInstagram(){
    $documentHeight = document.body.scrollHeight;
    $('body').find('.js-tweet-text').each(function(key,value){
        if ( value.innerHTML.indexOf("instagr.am") >= 0 ){
            if( value.innerHTML.indexOf('div class="instagram"') >= 0 ){ }else{
                $instagram = value.innerHTML.split('http://instagr.am/p/');
                $instagram = $instagram[1].split('/"');
                $instagram = $instagram[0];
                $(this).append('<div class="instagram" style="margin-top: 10px; margin-bottom: 5px;"><img width="435" src="http://instagr.am/p/'+$instagram+'/media" /></div>');
            }
        }else if( value.innerHTML.indexOf("instagram.com/p/") >= 0 ){
            if( value.innerHTML.indexOf('div class="instagram"') >= 0 ){ }else{
                $instagram = value.innerHTML.split('instagram.com/p/');
                $instagram = $instagram[1].split('/"');
                $instagram = $instagram[0];
                $(this).append('<div class="instagram" style="margin-top: 10px; margin-bottom: 5px;"><img width="435" src="http://instagr.am/p/'+$instagram+'/media" /></div>');
            }
        }
    });
}
$(document).ready(function(){
    loadInstagram(); 
    height();
});