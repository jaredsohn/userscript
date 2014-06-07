// ==UserScript==
// @name       Image URL and Page link Copy button over Screencast image - Firefox Compatible
// @namespace  http://screencast.com/
// @version    1.0
// @description  Add a button to copy image URL anf Page Link over the screencast image
// @match      http://screencast.com/t/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant GM_setClipboard
// @copyright  2012+, You
// ==/UserScript==

var buttonAdded = false;
console.log("OK man");
$('#mediaDisplayArea').mouseenter(function(){
    if(!buttonAdded){
        $('<div>Copy all links</div>').attr('id','copyImageInfoWrapper').css({
            'width':100,
            'height':30,
            'background-color':'#dcdcdc',
            'border':'1px solid red',
            'font-weight':'bold',
            'line-height':'30px',
            'cursor':'pointer'
        }).appendTo(this).offset({
            top: $('.embeddedObject').offset().top + 10, 
            left: $('.embeddedObject').offset().left + 10
        });
        buttonAdded = true;
    }
}).mouseleave(function(){
    $('#copyImageInfoWrapper').remove();
    buttonAdded = false;
}).click(function(){
    console.log("OK");
    if($('.embeddedObject').prop('tagName') === "IMG"){
    	GM_setClipboard("[url]" + window.location.href + "[\/url]\r\n\r\n[img]" + $('.embeddedObject').attr('src') + "[\/img]\r\n\r\n");
    }
    else{
        GM_setClipboard("[url]" + window.location.href + "[\/url]\r\n\r\n");
    }
});