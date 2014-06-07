// ==UserScript==
// @name        Gmail
// @namespace   http://fluidapp.com
// @description Gmail features for Fluid
// @include     https://mail.google.com/*
// @include     https://*.google.com/mail/*
// @author      Todd Ditchendorf
// ==/UserScript==

(function() {
    if (!window.fluid) {
        return;
    }
    
    var fluid_unread = 0;
    
    window.fluid.addDockMenuItem("Refresh", function() { Q.refresh(); });
    
    function updateDockBadge() {
        var title = document.title;
        var old_fluid_unread = fluid_unread || 0;

        if (title && title.length) {
            var start = title.indexOf("(");
            var end = title.indexOf(")");
            if (start > -1 && end > -1) {
                start++;
                fluid_unread = title.substring(start, end);
            } else {
                fluid_unread = 0;
            }
        }
        
        //set the dock badge
        if ((fluid_unread || 0) > 0) {
            window.fluid.setDockBadge(fluid_unread);
        } else {
            window.fluid.setDockBadge("");  
        }
        
        //growl if there are more unread items than last time
        if ((fluid_unread || 0) > old_fluid_unread) {
            fluid.showGrowlNotification({
                title: "Gmail",
                description: (fluid_unread || "") + " unread item(s)",
                priority: 3,
                sticky: false
            });
        }
    }
    setInterval(function(){updateDockBadge();}, 3000);
})();