// ==UserScript==
// @name        rapidmoviez
// @namespace   rapidmoviez
// @include     http://rapidmoviez.com/
// @version     1
// @grant       none
// ==/UserScript==
    //shared
    $('.show-us-love').remove();
    $('#DockMenuDiv').next().remove(); // remove Announcements
    $('#DockMenuDiv').next().remove(); // remove Member's Area Discussion ...
    $('div.gray.clear').remove(); // facebook on the right
    $('DIV.updates.clear').remove(); // facebook, twitter, email icons
    $('.top').remove();
    $(window).scrollTop(0);

$(document).ready(function(){
    RemoveUnwanted();
});

var bLoding = false;
$(window).scroll(function() {
    if($(window).scrollTop() > $(document).height() - $(window).height() - 2000 && bLoding == false) {
           // ajax call get data from server and append to the div
           bLoding = true;
           //alert ("loading");
           var d = $("<div/>");
           
           d.load($('.current:last').next().attr("href") + " .blog-contents" , function (){
                bLoding = false;
                d.insertAfter($(".blog-contents:last"));
                d.find("h2:first").hide();
                $('.pagination').hide();
                RemoveUnwanted();
           });

        //$( ":contains(Latest Movies and TV Shows)" ).hide();


    }
});

function RemoveUnwanted(){
    var unwantedList = ["Dancing With the Stars","Chelsea Lately","Jimmy" , "The Colbert Report", "Big Brother" , "Prospectors" , "Ninja Warrior" ,"Fast N Loud" , "WWE Monday Night" , "The Daily Show" , "Keeping up with the Kardashians" , "American Experience" , "Love and Hip Hop" , "Miami Monkey" ,"Guitar Center Sessions" , "Have I Got News For You","Pit Bulls and Parolees","The Voice"];
    $(unwantedList).each(function(i,d){
        $( "a:contains('"+ d +"')" ).closest(".blog-post").hide()
    });
}