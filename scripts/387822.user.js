// ==UserScript==
// @name        Google Images link fixer
// @namespace   http://tvkdevelopment.com
// @description Keeps the Images link at the second spot.
// @include     /^[a-z]+:\/\/([^.]+.)?google.[a-z]+/
// @version     3
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// ==/UserScript==

var onloadCount = 0;
$(function() {
    
    // onload is called 3 times for some reason
    if (++onloadCount > 1) {
        return;
    }
    
    // Makes sure the link is fixed after changing query
    $("#gbqfq").keyup(function() {
        fixImagesLink();
    });
    
    function fixImagesLink() {
        var fixed = 0;
        var interval = setInterval(function() {
            
            var links = $("#hdtb_msb");
            
            // Ignore if the links couldn't be found
            if (!links.length) {
                safeGuard();
                return;
            }
            
            var imagesLink = links.find("a[href*='tbm=isch']").parent();
            var videosLink = links.find("a[href*='tbm=vid']").parent();
            
            // Ignore when the images link is still on the right spot
            if (links.children().index(imagesLink) == 1 && links.children().index(videosLink) == 2) {
                return;
            }
            
            // Move the images links
            imagesLink.detach().insertAfter(links.children(":first"));
            videosLink.detach().insertAfter(imagesLink);
            
            // After fixing the images link twice, we're done
            if (++fixed == 2) {
                clearInterval(interval);
                return;
            }
            
            // Make sure we stop checking in case Google changes something
            safeGuard();
        }, 30);
        
        var safeGuardCount = 0;
        var safeGuardLimit = 50;
        function safeGuard() {
            if (++safeGuardCount > safeGuardLimit) {
                clearInterval(interval);
            }
        }
    }
    fixImagesLink();
        
});