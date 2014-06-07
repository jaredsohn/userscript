// ==UserScript==
// @name        Blip.fm
// @namespace   http://blip.fm
// @description Implement new blip notification and additional dock shortcuts. This script is meant for use with Fluid (http://fluidapp.com)
// @include     *blip.fm*
// @author      Ian White (ian@blip.fm)
// @version     0.1.2
// ==/UserScript==
// v0.1.2   2009-08-11    Show 'Now Playing' in dock menu
// v0.1.1   2009-08-11    Fix Growl notifications
// v0.1     2009-08-11    First Release

(function () {
    if (window.fluid) {
   
        // TODO: HACK! Only run once
        if(window.blipInit) return;
        window.blipInit = true;
        // ENDHACK
        
        var newBlips = 0;
        var nowPlayingHeadline = '';
        
        // Show 'loading...' in dock menu while page is loading
        window.fluid.addDockMenuItem("Loading...", function () { window.fluid.activate() });        
        
        // Do the magic after the page has completed loading
        $E.on(window, 'load', function () {
            Blip.fluid = {};
            Blip.fluid.drawDockMenu = drawDockMenu;
            
            // Add menu items
            window.fluid.removeDockMenuItem("Loading...");
            window.fluid.addDockMenuItem("Play", function () { Blip.control.play(); });
            window.fluid.addDockMenuItem("Previous", doPrev);
            window.fluid.addDockMenuItem("Next", doNext);
        
            // Change menu options with play state
            // The timeout is a workaround for a bug that crashes the app (0.9.6)
            Blip.control.events.play.subscribe(function () { setTimeout('Blip.fluid.drawDockMenu(true)', 100) });
            Blip.control.events.pause.subscribe(function () { setTimeout('Blip.fluid.drawDockMenu(false)', 100) });
            Blip.control.events.resume.subscribe(function () { setTimeout('Blip.fluid.drawDockMenu(true)', 100) });
            Blip.control.events.stop.subscribe(function () { setTimeout('Blip.fluid.drawDockMenu(false)', 100) });
        
            // Display new blips in the dock
            Blip.control.events.add.subscribe(function () {
                window.fluid.dockBadge = ++newBlips;
            });
            
            Blip.control.events.play.subscribe(function(e, o) {
                var headline = $("nowplaying").innerHTML.replace(/^Loading/, 'Now Playing');
                
                // Show 'Now Playing' in the menu
                // The delayed drawDockMenu (above) will redraw the menu, so don't bother doing it here
                if(nowPlayingHeadline) window.fluid.removeDockMenuItem(nowPlayingHeadline);
                nowPlayingHeadline = headline;
                
                // Enable Growl notifications
                window.fluid.showGrowlNotification({
                    title: "Blip.fm is now playing",
                    description: headline.replace(/^Now Playing: /, ''),
                    identifier: "Blip.fm"
                });
            });
        });
        
        // Clear out the dock badge when use clicks anywhere in the document
        $E.on(window.document, 'click', function () {
            newBlips = 0;
            window.fluid.dockBadge = null;
        });
        
        // Redraw the menu when play/pause is toggled
        // (kinda lame, but can't find a way to replace an item)
        function drawDockMenu(play) {
            var play = !!play;
            
            window.fluid.removeDockMenuItem(nowPlayingHeadline);
            window.fluid.removeDockMenuItem(" ");
            window.fluid.removeDockMenuItem("Play");
            window.fluid.removeDockMenuItem("Pause");
            window.fluid.removeDockMenuItem("Previous");
            window.fluid.removeDockMenuItem("Next");
        
            window.fluid.addDockMenuItem(nowPlayingHeadline, function () { window.fluid.activate() });
            window.fluid.addDockMenuItem(" ");
            
            if(play) {
                window.fluid.addDockMenuItem("Pause", doPause);
            } else {
                window.fluid.addDockMenuItem("Play", doPlay);
            }
                
            window.fluid.addDockMenuItem("Previous", doPrev);
            window.fluid.addDockMenuItem("Next", doNext);
        }
        
        function doPlay () {
            Blip.control.resume();
        }
        
        function doPause () {
            Blip.control.pause();
        }
        
        function doPrev () {
            Blip.control.prev();
        }
        
        function doNext () {
            Blip.control.next();
        }
    }
})();