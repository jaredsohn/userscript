// ==UserScript==
// @name           IgnoreFanpages
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @description    hotukdeals ignore fanpages, comments, threads, quotes
// @include        http://www.hotukdeals.com/*
// @version        0.02
// ==/UserScript==


//------ ALL PAGES

$('.username:contains(^fanpages$)').append('<p>Test</p>'); 

$(".username:contains('fanpages')").append('<p>Test</p>');

//new skin
$(".redesign-comment").has(     ".username:contains('fanpages')"    ).css("display", "none");
$(".m-items-listings-text-only tr").has(".td-thread-starter strong a:contains('fanpages')" ).css("display", "none");
$(".s-items-listings li ").has(".thermometer-details a:contains('fanpages')" ).css("display", "none");
 
// oldskin
$(".s-items-listings li ").has(".thermometer-details a:contains('fanpages')" ).css("display", "none");
$(".item-comment").has(".content h3 a:contains('fanpages')" ).css("display", "none");
                                           

//old delete message
//$( ".bbcode_quote").has(     ".bbcode_quote_head:contains('fanpages')"    ).css("display", "none");


//ignore but preserve
$(".bbcode_quote_head:contains('fanpages')").siblings().each(function() {
     
var aElem = $(this);
var $mychildren = $(this).children();

    $(this).text("Ignored troll bait message");
         $(this).append($mychildren); 

});

$(".bbcode_quote_head:contains('fanpages')").text("Ignored Troll");



