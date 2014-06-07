// ==UserScript==
// @name        TripAdvisorRatingsPercentage
// @namespace   Adam
// @include     http://www.tripadvisor.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1
// ==/UserScript==

              
ratingScores = new Array();
$ratingEle = $($(".review_filter_lodging .composite")[0]);
$ratings = $ratingEle.find(".barChart", this).children();
totalRatings = 0;

$ratings.each(function( index, e ) {
 	$this = $(e);
    $count = parseInt($this.find("div").siblings(".compositeCount").text().replace(',',''));
    totalRatings = totalRatings + $count
    console.log( index + ": " + $count );
    ratingScores[index] = $count;
});


$ratings.each(function( index, e ) {
 	$this = $(e);
    var dec = Math.round((ratingScores[index]/totalRatings)*1000)/1000;
    $this.before("<span class='AdamRedArm'>" + (dec*100).toFixed(2) + "%</span>");
});

$(".AdamRedArm").css("color","red");