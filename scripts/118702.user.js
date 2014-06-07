// ==UserScript==
// @name            gmailNotifSound
// @namespace       gm_t
// 
// @version         2.0
// @date            2013-07-26
// 
// @description     Plays sound whenever new mail appears in open gmail tab, and reminds after 2 minutes
// 
// @include         https://mail.google.com/mail/u/0/
//  
// @creator         TheTomCZ <thetom@char-t.com>
// @homepage        https://userscripts.org/users/417245
// 
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==

var GmailNotifier = {
    notifPlayer: undefined,
    notifSound: "http://notifsound.char-t.com/gmail.ogg",
    started: false,
    
    notifCount : 0,
    cycle : 0,
    foundCycle : -1000,
    
    checkInterval: undefined,
    
    notify : function(num){
        console.log("notyfiing");
        GmailNotifier.notifPlayer.play();
    },
    
    check : function(){
        var title = document.title;
        var open = title.indexOf("(")+1;
        var close = title.indexOf(")");
        var currentNotifCount = title.substr(open,close-open);
        if(currentNotifCount!=GmailNotifier.notifCount){
            if(currentNotifCount){
                GmailNotifier.foundCycle = GmailNotifier.cycle;
                GmailNotifier.notify(currentNotifCount);
            } else {
                GmailNotifier.foundCycle = -1000;
            }
            GmailNotifier.notifCount = currentNotifCount;
        } else {
            if(GmailNotifier.cycle==GmailNotifier.foundCycle+120){
                GmailNotifier.notify(function(){GmailNotifier.notifCount()});
            }
        }
        GmailNotifier.cycle++;
    },
    
    start : function(){
        if(GmailNotifier.started){
            return;
        } 
        GmailNotifier.started = true;
        if(!$("#gmNotifPlayer").size()){
            $("body").append("<audio id='gmNotifPlayer' style='display:none' src='"+GmailNotifier.notifSound+"' preload='auto'></audio>");
            GmailNotifier.notifPlayer = document.getElementById("gmNotifPlayer");
        }
        GmailNotifier.notifPlayer.play();
        GmailNotifier.checkInterval = setInterval( function(){GmailNotifier.check()},2000);
    }
}

$(document).ready(function(){
    GmailNotifier.start();
});

