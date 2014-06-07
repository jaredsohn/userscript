// ==UserScript==
// @id             gplus.lightbox.fix@pawel.mucha.com
// @name           Google+ Photo Lightbox Fix
// @version        1.1
// @namespace      http://pawel.mucha.com
// @author         Pawel Mucha
// @description    Correct minor "improvements" of the new Google+ Photo Lightbox.
// @license        Creative Commons BY-NC-SA
// @include        http://plus.google.*/*
// @include        https://plus.google.*/*
// @run-at         document-end
// ==/UserScript==

// Changelog:
// ver. 1.1     rewrite for the new Google+ UI
// ver. 1.0.8   bugfix release (fixes the erratic behaviour of slideshow)
// ver. 1.0.7   the Photo button on the top bar now goes to your albums directly 
// ver. 1.0.6   Google+ stylesheet update; general code cleanup
// ver. 1.0.5   bugfix release (fixes the trouble it causes when tagging a photo)
// ver. 1.0.4   bugfix release
// ver. 1.0.3   slideshow feature (press 1-9 for interval, 0 to turn off), down arrow to bring up minatures box
// ver. 1.0.2   galleries now loop (only for keyboard traversing for now)
// ver. 1.0.1   scrapbook photos compatibility fix (event type listener change from "click" to "mouseup")
// ver. 1.0     initial release

(function(){
    // Only HTML element can be "preloaded" to its own variable
    var DOM = {
        html      : document.getElementsByTagName("html")[0],
        body      : document.getElementsByTagName("body")[0]
    };
    
    var LightBox = {
        // user id
        userId : null,
        
        // store the needed timeouts
        timeout : { slideshow : null },
        
        // store the status of the whole lightbox and the commentbox inside
        status : { lightbox : false, commentbox : false, slideshow : 0 },

        // check the status of some elements
        check : {
            inInput : function () {
                var activeNode = document.activeElement;
                var activeNodeName = activeNode.nodeName.toLowerCase();
                
                return (
                    activeNodeName == "input" || activeNodeName == "textarea" || activeNodeName == "select" || activeNodeName == "button"
                    ||
                    activeNode.hasAttribute('contenteditable')
                    ||
                    activeNode.className.match(/editable/)
                ) ? true : false;
            },
            
            lightBox : function () {
                return (DOM.body.className.match(/Dca/));
            },
            
            thumbnailBox : function() {
                return (document.getElementsByClassName("uJ").length > 0
                         &&
                        parseInt(document.getElementsByClassName("uJ")[0].style.height) > 0) ? true : false;
            },
            
            commentBox : function() {
                return (document.getElementsByClassName("nO").length > 0
                         &&
                        parseInt(document.getElementsByClassName("nO")[0].style.width) > 0) ? true : false;
            }
        },

        // trigger event
        trigger : {
            click : function(obj) {
               var lmbClick = document.createEvent("MouseEvents");
               lmbClick.initEvent("click", true, false); // Firefox prefers this way over .initMouseEvent()
               obj.dispatchEvent(lmbClick);
            },
            fakeClick : function(obj) {
               var lmbDown = document.createEvent("MouseEvents");
               var lmbUp   = document.createEvent("MouseEvents");
               lmbDown.initEvent("mousedown", true, false); // Firefox prefers this way over .initMouseEvent()
               lmbUp.  initEvent("mouseup",   true, false);
               obj.dispatchEvent(lmbDown);
               obj.dispatchEvent(lmbUp);
            }
        },
        
        // wrapper arround the handler which needs to be delayed
        clickListener : function() {
            // this precheck is crucial for the script to work after
            // leaving the lightbox with the Esc key
            if (!LightBox.check.lightBox)
            {
                LightBox.status.lightbox = false;
                LightBox.status.commentbox = false;
            }
            window.setTimeout(LightBox.handler, 1000);
        },

        // the actual handler
        handler    : function() {
            // check if the click caused the lightbox to appear
            LightBox.status.lightbox = LightBox.check.lightBox();
            
            // if so...
            if (LightBox.status.lightbox)
            {
                // ... make the caption and the comments on the photo disappear
                document.getElementsByClassName("RJ")[0].style.display = "none";
                
                // if we haven't hidden the commentbox yet, let's do it...
                if (!LightBox.status.commentbox)
                {
                    // ... by simulating a click on the double arrow button
                    LightBox.trigger.click( document.getElementsByClassName("BJ")[0] );
                    
                    // remember that we did it so we won't
                    // accidentally do it again if the user pulls it up
                    LightBox.status.commentbox = true;
                }
            }
            else // if the click closed the lightbox, or didn't open it
            {
                // reset the status
                LightBox.status.lightbox  = false;
                LightBox.status.commentbox = false;
            }
        },
        
        // keyboard listener
        keypressListener : function(e) { 
            // Keypress listener should work only in lightbox
            if (! LightBox.check.lightBox()) return;
            
            // Keypress listener should work only when commentbox is hidden
            if (LightBox.check.commentBox()) return;
            
            // Keypress listener should not work when inputing data
            if (LightBox.check.inInput()) return;
                
            // If the pressed key was the left or right arrow
            if (e.keyCode == 37 || e.keyCode == 39 || e.which == 37 || e.which == 39)
            {
                 // Stop the slideshow in case it is running
                 LightBox.status.slideshow = 0;
                 window.clearTimeout(LightBox.timeout.slideshow);
                    
                 // Remember the direction
                 var dir = (e.keyCode == 37 || e.which == 37) ? "l" : "r";
               
                 // Let's see if we need to go to the other end of the album
                 // If the thumbnail box is open...
                 if (LightBox.check.thumbnailBox())
                 {
                     LightBox.repeat(dir);
                 }
            }
            // If the key was 0 - 9 on the main or numeric part of the keyboard
            else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105))
            {
                LightBox.status.slideshow = e.keyCode - ((e.keyCode >= 96) ? 96 : 48);
                LightBox.slideshow();
            }
            // If the key was down arrow
            else if (e.keyCode == 40)
            {
                // open thumbnail box 
                LightBox.trigger.fakeClick( document.getElementsByClassName("UJ")[0].childNodes[0] );
                // and stop the slideshow in case it is running
                LightBox.status.slideshow = 0;
                window.clearTimeout(LightBox.timeout.slideshow);
            }
            // If the key was spacebar
            else if (e.keyCode == 32)
            {
                // Stop the slideshow in case it is running
                LightBox.status.slideshow = 0;
                window.clearTimeout(LightBox.timeout.slideshow);
            }
        },
        
        repeat : function(dir) {
             // Photos in thumbnail box
             var mbPhotos = document.getElementsByClassName("n-M-Sb");
            
             // If it was found and it contains more than one image...
             if (mbPhotos.length > 1)
             {
                 var x;

                 //... and we're currently watching the first or the last of them 
                 if (dir == "r" && mbPhotos[ mbPhotos.length - 1 ].className.match(/vca/))
                 {
                     x = 0;
                 }
                 else if (dir == "l" && mbPhotos[0].className.match(/vca/))
                 {
                     x = mbPhotos.length - 1;
                 }
                 
                 if (x !== undefined)
                 {
                     // Click the first/last one (classic click does not work, needs workaround)
                     LightBox.trigger.fakeClick( mbPhotos[ x ].childNodes[0].childNodes[0] );
                 }
             }
        },
        
        slideshow : function() {
            if (LightBox.status.slideshow == 0)
            {
                window.clearTimeout(LightBox.timeout.slideshow);
            }
            else if (LightBox.status.slideshow > 0 && LightBox.status.slideshow <= 9)
            {
                // Reset the timeout
                window.clearTimeout(LightBox.timeout.slideshow);
                // First step after one second
                window.setTimeout(LightBox.slideshowProceed, 1000);
            }
        },

        slideshowProceed : function() {
            // Check if somehow we didn't end up in some input box
            if (LightBox.check.inInput())
            {
                LightBox.status.slideshow = 0;
                return;
            }
            
            if (LightBox.status.slideshow != 0) // assertion
            {
                LightBox.trigger.click( document.getElementsByClassName("lF")[0] );
                if (document.getElementsByClassName("lF")[0].style.display != "none")
                {
                    LightBox.timeout.slideshow = window.setTimeout(LightBox.slideshowProceed, LightBox.status.slideshow * 1000);
                }
                else
                {
                    LightBox.status.slideshow = 0;
                }
            }
        }
    };
    
    // set the listeners to listen for the clicks
    document.addEventListener("mouseup", LightBox.clickListener, false);
    
    // set the listeners to listen for keystrokes
    document.addEventListener("keyup", LightBox.keypressListener, false);

})();
