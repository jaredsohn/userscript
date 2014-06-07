// ==UserScript==
// @name        d2l
// @namespace   http://dota2lounge.com/myprofile
// @include     http://dota2lounge.com/myprofile
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1
// ==/UserScript==

var won = 0;
var itemsWon = 0;
var itemsLost = 0;
var itemsPlaced = 0;
var placed = 0;

var placedRare = 0;
var placedUncommon = 0;
var placedCommon = 0;

var wonRare = 0;
var wonUncommon = 0;
var wonCommon = 0;

var lostRare = 0;
var lostUncommon = 0;
var lostCommon = 0;


$.ajax({
url: "http://dota2lounge.com/ajax/betHistory.php",
success: function(data){

        var tds = $('td',$(data)).filter(function() {
                      return +$(this).attr('colspan') == 2
                    });
        tds.each(function(i){
            if($(this).html() == "Won")
            {
                won++;  
                                
                itemsWon += $(this).next().children().length;
                wonRare += $(this).next().find(".Rare").length;
                wonUncommon += $(this).next().find(".Uncommon").length;
                wonCommon += $(this).next().find(".Common").length;
            } else if($(this).html() == "Placed")
            {
                var didLost = $(this).parent().prev().find(".lost").length == 1;
                
                placed++;
                itemsPlaced += $(this).next().children().length;
                placedRare += $(this).next().find(".Rare").length;
                placedUncommon += $(this).next().find(".Uncommon").length;
                placedCommon += $(this).next().find(".Common").length;
                
                if(didLost)
                {
                    itemsLost += $(this).next().children().length;
                    lostRare += $(this).next().find(".Rare").length;
                    lostUncommon += $(this).next().find(".Uncommon").length;
                    lostCommon += $(this).next().find(".Common").length;
                }
            }
        });
    
        var el = $(".box-shiny-alt");
        $(el).append("<br/><br\>");
        $(el).append("<div>Placed " + placedRare + " rare, " + placedUncommon + " uncommon, " + placedCommon + " common</div>");
        $(el).append("<div>Won " + wonRare + " rare, " + wonUncommon + " uncommon, " + wonCommon + " common</div>");    
        $(el).append("<div>Lost " + lostRare + " rare, " + lostUncommon + " uncommon, " + lostCommon + " common</div>");    
        $(el).append("<div>Net " + (wonRare - lostRare) + " rare, " + (wonUncommon - lostUncommon) + " uncommon, " + (wonCommon - lostCommon) + " common</div>");    
    }
});