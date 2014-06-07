// ==UserScript==
// @name        twimbow notifications
// @namespace   http://twimbow.com
// @description Displays abdge and growl notifications for Twimbow
// @include     *
// @author      Geoff Gauchet
// ==/UserScript==

(function () {
    if (window.fluid) {
        var lastTweetCount=-1;
        var lastMentionCount=-1;
        
        function bringToFront() {
            window.fluid.unhide();
            window.fluid.activate();
        }
    	
        function check() {
            var newcount=parseInt(document.getElementById("newcount").innerHTML);
            var mentions=document.getElementById("fmentions");
            var newmentions=parseInt(mentions.querySelector(".noticebar").innerHTML);
            
            if(newmentions>0 && newmentions!=lastMentionCount){
                lastMentionCount=newmentions;
                var s=(newmentions>1)? s="s": s="";
                window.fluid.showGrowlNotification({
                    title: "twimbow",
                    description: newcount + " new mention"+s,
                    priority: 1,
                    sticky: false,
                    onclick: bringToFront
                });            
            }
            
            console.log("count="+newcount);
            if(newcount>0 && newcount!=lastTweetCount){
            
                lastTweetCount=newcount;
                
                var s=(newcount>1)? s="s": s="";
                window.fluid.showGrowlNotification({
                    title: "twimbow",
                    description: newcount + " new tweet"+s,
                    priority: 1,
                    sticky: false,
                    onclick: bringToFront
                });
            }else{
                if(newcount==0){
                    window.fluid.dockBadge="";
                    lastTweetCount=0;
                }
            }
            
            
            var badgecount=newmentions+newcount;
            if(badgecount>0){
                window.fluid.dockBadge=badgecount;
            }else{
                window.fluid.dockBadge="";
            }
        }
        console.log("in function");
        setInterval(function() { 
            check(); 
        }, 1000);
    }
})();