// ==UserScript==
// @name       tinypngdownload.user.js
// @namespace  https://github.com/Dazag
// @version    0.2
// @description  download photo in 1click from tinypng
// @match      http://*tinypng.org/*
// @copyright  2012+, David Zamora
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

//padding modification of original tag to make space for new button
$('section.files').css('padding','20px 20px 39px 20px');

//add a button to download all event
$('section.files').append('<div id="tamper-monkey" style="margin-right:5px;font-size:13px;height: 25px;text-decoration: underline;text-align:right'+
                          ';padding: 0 9%;background-color: #F0F0F0;border: 1px solid #DDD;color:#40444F;font-weight:700;-webkit-border-radius: 15px;'+
                          '-moz-border-radius: 15px;-ms-border-radius: 15px;-o-border-radius: 15px;border-radius: 15px;">Download All</div>');

//::hover selector
$('div#tamper-monkey').hover().css('cursor','pointer');

//download all click event
$('div#tamper-monkey').click(function(){

         //we go around all download buttons
        $('section.files ul li.active div.actions a').each(function(){
             
              //check if already clicked
             if($(this).attr('id') != 'clicked'){
                $(this).click();
                $(this).attr('id','clicked');
            }
        });
});
