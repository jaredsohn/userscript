// ==UserScript==
// @name          SubScene Subtitle preview
// @version       1
// @date          21-11-2013
// @description   full preview / download subtitle file from subscene.com
// @namespace     subtitle
// @require 	  http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @include       http://*subscene.com/subtitles/*
// @include       https://*subscene.com/subtitles/*
// ==/UserScript==


var x='http://mybutt.hol.es/?url=';
$(function(){    
        function doshit(){
                var url =window.location;
            	var win=window.open(x+url, '_blank');
  				win.focus();
    	}   
        
	var dl = $('.download');
    dl.append('<a class="shit button positive">PRIKITIEW</a>');
    $('a.shit').click(doshit);
  

});
