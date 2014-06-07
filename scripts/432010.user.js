// ==UserScript==
// @name        TinyPNG Downloader
// @namespace   http://userscripts.org/users/198926
// @version     0.2
// @description Download multiple images in one click from TinyPNG.com
// @include     http*://tinypng.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

//padding modification of original tag to make space for new button
$('section.results').css('padding','20px 20px 39px 20px');

//add a button to download all event
$('section.results').append('<div id="tamper-monkey" style="margin: 0.25rem;font-size: 13px;height: 1.75rem;text-decoration: underline;text-align: right'+
                          ';padding: 0px 0.8rem;background: none repeat scroll 0% 0% #F0F0F0;border: 0.0625rem solid #DDD;color: #363A43;font-weight: 700;-webkit-border-radius: 15px;'+
                          '-moz-border-radius: 15px;-ms-border-radius: 15px;-o-border-radius: 15px;border-radius: 0.125rem;">Download All</div>');

//::hover selector
$('div#tamper-monkey').hover().css('cursor','pointer');

//download all click event
$('div#tamper-monkey').click(function(){

         //we go around all download buttons
        $('section.results ul li.active div.actions a').each(function(){
             
              //check if already clicked
             if($(this).attr('id') != 'clicked'){
                $(this).click();
                $(this).attr('id','clicked');
            }
        });
});