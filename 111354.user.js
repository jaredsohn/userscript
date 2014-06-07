// ==UserScript==
// @name          Friendly Netflix Scrolling
// @namespace     http://www.pixelstential.com/downloads
// @description   replaces Netflix's wannabe-cool mouse-over scrolling with regular scroll bars
// @grant         none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include       http://movies.netflix.com/*
// ==/UserScript==

$(".videoAnnotation").css("height", "20px");
$(".slider").css("height", "275px");
$(".slider").css("overflow", "auto");

function nirvan(a){
    var divCount = $("#slider_"+a+" > div.agMovieSetSlider > div").length;
    $("#slider_"+a+" > div.agMovieSetSlider > span.boxShotDivider").css("display", "none");
    $("#slider_"+a+" > div.agMovieSetSlider").css("width", divCount*190);
    $("#slider_"+a+" > div.sliderButton").css("display", "none");
}

if($("body").attr("id")=="page-WiMovie"){
    nirvan(0);
}
else{
    for(i=0; i<$("#bd > div.mrows > div").length; i++){
        nirvan(i);
    }
}