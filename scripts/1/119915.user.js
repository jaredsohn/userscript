// ==UserScript==
// @name           Fake Notifications
// @namespace      TheNamelessAccount
// @description    Creates fake notifications to make you feel special!
// @include        http*://*.facebook.*/*
// ==/UserScript==


// hasClass, addClass, and removeClass by PaulPRO on stackoverflow (thx!) 
// 

function hasClass(el,c){
    var elc = ' '+el.className+' ';
    if(elc.indexOf(' '+c+' ') < 0)
        return false;
    return true;    
}

function addClass(els, c){
    if(typeof els.length === 'number' && typeof els[els.length-1] !== 'undefined')
        for(var i = els.length; i--;)
            _addClass(els[i], c);
    else
        _addClass(els, c);

    function _addClass(el, c){
        if(c.indexOf(' ') >= 0)
            return false;
        if(hasClass(el, c))
            return true;
        el.className += ' '+c;
        return true;
    }
}

function removeClass(els, c){
    if(typeof els.length === 'number' && typeof els[els.length-1] !== 'undefined')
        for(var i = els.length; i--;)
            _removeClass(els[i], c);
    else
        _removeClass(els, c);

    function _removeClass(el, c){
        if(c.indexOf(' ') > -1)
            return false;
        if(!hasClass(el, c))
            return true;
        var elc = (' '+el.className).replace(' '+c, '');
        if(elc.indexOf(' ') == 0)
            elc = elc.substring(1);
        el.className = elc;
        return true;
    }
}

function randomFromTo(from, to) {
       return Math.floor(Math.random() * (to - from + 1) + from);
}

var msgCount = document.getElementById("messagesCountValue").innerHTML;
var reqCount = document.getElementById("requestsCountValue").innerHTML;
var notCount = document.getElementById("notificationsCountValue").innerHTML;

var msgPick = randomFromTo(3,12);
var reqPick = randomFromTo(3,30);
var notPick = randomFromTo(3,36);

var msgClick = false;
var reqClick = false;
var notClick = false;

function fixEveryEightMinutes() {

    //unsafeWindow.console.log("doing the 8 minute check...");

    for (var i = 1; i < 3000; i += 5 ) {
        setTimeout(function(val) {
            return(function() { redoNotifications(val); } );
        } (i), i);
    }
}

function redoNotifications(delaytime) {

    // this is the function that rechecks notificationsCountValue and sets it again 
    // after FB resets it
    
    var notCount = document.getElementById("notificationsCountValue").innerHTML;

    if(notCount == '0' && !notClick) {
        document.getElementById("notificationsCountValue").innerHTML = notPick.toString();
        x = document.getElementById("fbNotificationsJewel");
        addClass(x, "hasNew");
        addClass(x, "jewelUnread");

        //unsafeWindow.console.log("delay time was " + delaytime);
        //unsafeWindow.console.log("will check again in 8 minutes.");

        // 480000 = 8 minutes
        // call fix() every 8 minutes, that starts up a series of calls every 5ms 
        // for 3 seconds that keeps looking to see if value changed, and updates it 
        // if it does, then sets up another check in 8 minutes
        
        i = 480000;

        setTimeout(function(val) {
            return(function() { fixEveryEightMinutes(val); } );
        } (i), i);


    }
}

function uptickNotifications() {

    //unsafeWindow.console.log("in uptick, checking...");
    // over time, increase the notification numbers, bit by bit

    if(randomFromTo(0,2) > 0) {

        which = randomFromTo(0,2);

        if(which == 0) {
            if(msgCount != '0' && !msgClick && randomFromTo(0,2) > 0) {
                msgPick += 1;
                document.getElementById("messagesCountValue").innerHTML = msgPick.toString();
            }

        } else if(which == 1) {
            if(reqCount != '0' && !reqClick && randomFromTo(0,2) > 0) {
                reqPick += 1;
                document.getElementById("requestsCountValue").innerHTML = reqPick.toString();
            }

        } else {
            if(notCount != '0' && !notClick && randomFromTo(0,2) > 0) {
                notPick += 1;
                document.getElementById("notificationsCountValue").innerHTML = notPick.toString();
            }
        }

    }

    if(!msgClick && !reqClick && !notClick) {
        i = 5000 + randomFromTo(5000,50000);
        //unsafeWindow.console.log("will check again in "+i+" seconds.");
        setTimeout(function(val) { return (function() { uptickNotifications(val); } ); } (i), i);
    }
    
}


function changeNotifications() {

    //unsafeWindow.console.log("changeNotifications()");

    // check each of the 3 notification values (messages, friend requests, and 
    // general notifications) 
    // if any of them are 0, update to them to a new false value
    
    if(msgCount == '0') {
        document.getElementById("messagesCountValue").innerHTML = msgPick.toString();
        msgCount = msgPick;
        //unsafeWindow.console.log("in changeNotifications, msgCount = "+msgCount);
    }

    if(reqCount == '0') {
        document.getElementById("requestsCountValue").innerHTML = reqPick.toString();
        reqCount = reqPick;
    }

    if(notCount == '0') {
        document.getElementById("notificationsCountValue").innerHTML = notPick.toString();
        notCount = notPick;
    }

    // now that the count values are modified, it's time to update the class list 
    // for the graphic elements so they 'accurately' show the new values.  adding 
    // 'hasNew' and 'jewelUnread' does the trick 

    x = document.getElementsByClassName("fbJewel");
    addClass(x, "hasNew");
    addClass(x, "jewelUnread");

    // FB rechecks the value for notificationsCountValue sometime within first 2 seconds, 
    // and resets it to the real value.  This for() loop sets up a series of checks that 
    // waits for them to reset it so I can set it back to the false value.
     
    //unsafeWindow.console.log("middle of changeNotifications()");

    for (var i = 1; i < 2000; i += 5 ) {
        setTimeout(function(val) {
            return(function() { redoNotifications(val); } );
        } (i), i);
    }
}

function msgHandler() { msgClick = true; }
function notHandler() { notClick = true; }
function reqHandler() { reqClick = true; }


function setupClickWatchers() {

    document.getElementById("fbNotificationsJewel").addEventListener("click", notHandler, false);
    document.getElementById("fbMessagesJewel").addEventListener("click", msgHandler, false);
    document.getElementById("fbRequestsJewel").addEventListener("click", reqHandler, false);

}


// main
//

//unsafeWindow.console.log("starting Reload The Love!");
setupClickWatchers();
changeNotifications();
setTimeout(uptickNotifications(), 25000);