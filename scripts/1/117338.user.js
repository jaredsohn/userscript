// ==UserScript==
// @name            fbNotifSound
// @namespace       fb_t
// 
// @version         2.1
// @date            2013-08-28
// 
// @description     Plays sound whenever facebook notification appears in open facebook tab, and reminds after 2 minutes
// 
// @include         http://www.facebook.com/
// @include         https://www.facebook.com/
// 
// @creator         TheTomCZ <thetom@char-t.com>
// @homepage        https://userscripts.org/users/417245
// 
// @require http://codeorigin.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

var FbNotifSound = {
    player: undefined,
    sound: "http://notifsound.char-t.com/facebook.ogg",
    cycle: 0,
    ringCycle: -3000,
    
    start: function(){
       
        if(!$("#fbNotifPlayer").size()){
            $("body").append("<audio id='fbNotifPlayer' style='display:none' src='"+FbNotifSound.sound+"' preload='auto'></audio>");
            FbNotifSound.player = document.getElementById("fbNotifPlayer");
    		var checkInterval = setInterval(function(){FbNotifSound.check()},2000);
        }		
    },
    
    notify: function(num){
		FbNotifSound.player.play();
	},
    
    check: function(){
		var title = document.title;
		var open = title.indexOf("(")+1;
		var close = title.indexOf(")");
		var currentNotifCount = title.substr(open,close-open);
        
		if(currentNotifCount>0 && FbNotifSound.cycle > FbNotifSound.ringCycle+30){
		    FbNotifSound.notify(currentNotifCount);
		    FbNotifSound.ringCycle = FbNotifSound.cycle;
		}
		FbNotifSound.cycle++;
	}
};

$(document).ready(function(){
	FbNotifSound.start();
});


