// ==UserScript==
// @name        mttweets
// @namespace   http://mediatemple.net
// @description mttweets
// @include     http://bin.mediatemple.net/*
// @include     https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @author      Dain Kennison & PJ Bezilla
// ==/UserScript==      


if (window.fluid) {

// set the dock icon count variable
var dockCount = 0;

function growlIt()  {
    
    // looks for any tweet that has the "new" class
    // the class new gets added breifly on the website 
    var resultcount = $('#tweets li.new').length;
    
    // if there's new tweets do stuff
    if (resultcount > 0) {
    
        // add the # of new tweets to the dockCount
        dockCount += resultcount;
        
        // display the amount of new tweets on the dock icon
        fluid.dockBadge = dockCount;
    
        // setup and growl the new tweets
        $('#tweets li.new').each(function() {
        
            var username = $(this).find('.username').text();
            
            var text = $(this).find('.text').text();
            
            var avatar = $(this).find('.avatar').css('background-image');
            
            //cut off the css surrounding the image url
            avatar = avatar.slice(4,-1);
        
            if (!$(this).data('growl')) {
        
                fluid.showGrowlNotification({
                    title: username,
                    description: text,
                    sticky: false,
                    icon: avatar
                }, function() {
                    
                    $(this).data('growl', 'growled').addClass("growled");
                
                });
            
            }
        
        });
        
        // very simplistic way to subtract from the dockbadge count (just hover on tweets)
        $('#tweets li').hover(function() {
                    
            //mouseenter
            
        }, function() {
        
            //mouseleave
            
            if (dockCount > 0) {
            
                dockCount -= 1;
                
                fluid.dockBadge = dockCount;
            
            } else {
            
                fluid.dockBadge = "";
            
            }
        
        }); 
        
    }
    
}

$(document).ready(function() {

    setInterval(growlIt, 1000);
    
});

// end window.fluid
}


