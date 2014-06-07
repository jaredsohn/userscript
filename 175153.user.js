// ==UserScript==
// @name       Futhead player compare
// @namespace  http://www.wareisjoe.com/
// @version    0.9
// @description  This script allows you to right click multiple players from the search results page or any of the category pages and convieniently compare them!
// @include      http://*.futhead.com/*
// @exclude		 http://*.futhead.com/fifa/players/*
// @copyright  2012+, Joe Ware
// @require http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

//setting up some variables
var selectedCards = new Array();

//Create, style and append the compare button
$("body").append("<div class='comparebutton' style='z-index:5; position:fixed; top:5em; right:5em;background:#921003;color:white;font-family:Arial, sans-serif; height:60px; width:100px; text-align:center;'><p style='line-height:3em;font-size:1.5em;'>Compare!</p></div>");


//prevent default right click menu from appereaing on right click
$('.playercard').bind('contextmenu', function(){
    
    // Handle right-click event.
    return false;
});

//adds event listner for click even on compare button and redirects users to the compare page they have requested
$( ".comparebutton" ).click(function() {
    var string = selectedCards.join("/");
    window.location.href = 'http://www.futhead.com/fifa/players/compare/' + string;
});


//adds event listners for mousedown event on .playercard elements
$('.playercard').mousedown(function(event) {
    event.preventDefault();
    switch (event.which) {
        case 1:
            //  alert('Left mouse button pressed');
            break;
        case 2:
            // alert('Middle mouse button pressed');
            break;
        //case3 = right click, if a user has right clicked on a .playercard element appropriate styling is applied and added or removed from the selectedCards array.
        case 3:
            var cardId = $( this ).parent("a").attr("href");
            
            cardId = cardId.split("/"); 
            cardId = cardId[3];  
            
            
            if(selectedCards.length > 3){
                if($.inArray(cardId, selectedCards) > -1){
                    $( this ).css('box-shadow', 'none');
                    var indexy = selectedCards.indexOf(cardId)
                    selectedCards.splice(indexy);
                    event.preventDefault();
                    break;
                }
                
                
                break;
            }
            
            
            if($.inArray(cardId, selectedCards) > -1){
                $( this ).css('box-shadow', 'none');
                var indexy = selectedCards.indexOf(cardId)
                selectedCards.splice(indexy);
                event.preventDefault();
                break;
                
            } else {                                      
                var color = $( this ).css('box-shadow', '10px 10px 5px #de504c');
                selectedCards.push(cardId);
                
                var string = selectedCards.join("/");
                
                
                
                
                break;
            }
            
            
            
            break;
        default:
            alert('You have a strange mouse');
    }
});