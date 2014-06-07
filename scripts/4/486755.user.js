// ==UserScript==
// @name        PixelJoint Rating Guide
// @namespace   http://userscripts.org/users/386946
// @include     http://pixeljoint.com/pixelart/*
// @include     http://www.pixeljoint.com/pixelart/*
// @version     1
// @grant       none
// @require http://code.jquery.com/jquery-latest.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

//GM_setValue("test01", "test01 val");
/*
console.log(GM_getValue("test01"));

console.log('hi1');


function pjRatecounterGet (x) {
    return GM_getValue(x);
};

function pjRatecounterSet (x,y) {
    GM_setValue(x, y);
};

console.log('hi2');
*/
$(document).ready(function() {
    
 /*
    pjRatecounterSet("test1","penis")
    console.log(pjRatecounterGet("test1"));
 
    //Timer
 /*
    var today = Math.floor((new Date).getTime() / 86400000);
    var lastdayrecorded = GM_getValue("currentday");
    
   
    if (lastdayrecorded && today = lastdayrecorded) {
       console.log("starting new day"); 
       GM_setValue("currentday", today);
    }
    else {
        console.log("already started new day "+today);
    }*/
    

    //Add Guide Box
    $("#ratings1").after('<div id="ratingguide">Rating Guide</div>');
    
    //Define stars
    $("#star1_1").hover(function(){
    	$('#ratingguide').text("+1 This is really bad and shouldn't be in the gallery");
	});    
    $("#star1_2").hover(function(){
    	$('#ratingguide').text("+2 not really good");
	});    
    $("#star1_3").hover(function(){
    	$('#ratingguide').text("+3 average bad");
	});    
    $("#star1_4").hover(function(){
    	$('#ratingguide').text("+4 average");
	});    
    $("#star1_5").hover(function(){
    	$('#ratingguide').text("+5 Average good");
	});    
    $("#star1_6").hover(function(){
    	$('#ratingguide').text("+6 Well done, pixelling is nice");
	});    
    $("#star1_7").hover(function(){
    	$('#ratingguide').text("+7 Really good. Solid.");
	});    
    $("#star1_8").hover(function(){
    	$('#ratingguide').text("+8 Fantastic, wish I was this good.");
	});    
    $("#star1_9").hover(function(){
    	$('#ratingguide').text("+9 Really Unique and very well done");
	});    
    $("#star1_10").hover(function(){
    	$('#ratingguide').text("+10 Perfect, a masterpiece");
	});    
	
	
});