// ==UserScript==
// @name           Facebook - Notification Noise
// @namespace      Facebook - Notification Noise
// @include        http://www.facebook.com/*
// ==/UserScript==

//Config
var remindMe = true;  //whether or not to continue beeping until the notification has been read
var remindTime = 20;  //time to remind (in seconds)
var checkTime = 1;    //time to check (in seconds)
var notifSound = "http://www.ctv.es/RECURSOS/SONIDOS/wav/boing.wav"; //link to notification sound 
var remindSound = "http://www.ctv.es/RECURSOS/SONIDOS/wav/boing.wav"; //link to reminder sound
//Config




//Leave these be.
addDummy();                        //add the dummy div
setTimeout(checkNew, 200);         //start checking 20ms after the page loads
var oldArray = new Array(0, 0, 0); //an array to contain the previous notificiation counts
var isFirst = true;
var reminder = false;
var remindTimeout;
//Leave these be.

function addDummy() {
//A dummy div to hold the sound player
    var body = document.getElementsByTagName("body")[0];
    var dummyPlayer = document.createElement("div");
    dummyPlayer.id = "dummyPlayer";
    //create the div
    /*
    var soundPlayer = document.createElement("embed");
    soundPlayer.src = notifSound;
    soundPlayer.width = 0;
    soundPlayer.height = 0;
    soundPlayer.setAttribute("autostart", "false");
    soundPlayer.setAttribute("enablejavascript", "true");
    dummyPlayer.appendChild(soundPlayer);
    var soundPlayer = document.createElement("embed");
    soundPlayer.src = remindSound;
    soundPlayer.width = 0;
    soundPlayer.height = 0;
    soundPlayer.setAttribute("autostart", "false");
    soundPlayer.setAttribute("enablejavascript", "true");
    dummyPlayer.appendChild(soundPlayer);
    //preload sounds, ready for play
    */
    body.appendChild(dummyPlayer);
    //load the sounds into the dummy div
}




function checkNew() {
    var jewelCount = getElementsByClassName("jewelCount");
    //the friend,message, and notification counters
    var friendCount = jewelCount[0].getElementsByTagName("span")[0].innerHTML;
    //the # of friend requests
    var messageCount = jewelCount[1].getElementsByTagName("span")[0].innerHTML;
    //the # of messages
    var notificationCount = jewelCount[2].getElementsByTagName("span")[0].innerHTML;
    //the # of notifications
    var jewelTotal = friendCount + messageCount + notificationCount;
    //count up the total number of friend requests, messages, etc

    var jewelArray = new Array(friendCount, messageCount, notificationCount);
    //put the notifications into an array

    if (joinArray(oldArray) != joinArray(jewelArray) && jewelTotal != 0 && isFirst == true) {
    //if the notifications have changed, and the total is not 0, and this is the first time
        newNotifications();
        //launch new notifications
        if(remindMe == true){
        //if you have chosen to play a persistant beep until the notifications have been read
          clearTimeout(remindTimeout);
          //stop the reminder
          isFirst = false;
          //it's no longer the first time
        }
    } else if (joinArray(oldArray) == joinArray(jewelArray) && jewelTotal != 0 && isFirst == false && reminder == false && remindMe == true) {
    //if the notifications have not changed, and we have already been notified once, and if we choose to play a persistant sound
        remindNotifications();
        //launch remind notifications
    } else if (joinArray(oldArray) != joinArray(jewelArray) && jewelTotal != 0) {
    //if the notifications have changed and the total isnt 0
        newNotifications();
        //launch new notifications
        if(remindMe == true){
        //if you have chosen to play a persistant beep until the notifications have been read
          remindNotifications();
          //launch remind notifications
          clearTimeout(remindTimeout);
          //stop the reminder
          isFirst = false;
          //it's no longer the first time
        }
    }
    
    if (jewelTotal == 0) {
        if(remindMe == true){
        //if you have chosen to play a persistant beep until the notifications have been read
          reminder = false;
          //we are no longer being reminded
          clearTimeout(remindTimeout);
          //stop the reminder
          isFirst = true;
          //it's now the first time
            //clearDummy();
          //clear the dummy (we might as well)
        }
    }

    oldArray = jewelArray;
    //save the new array into an old array, for comparing

    setTimeout(checkNew, checkTime * 1000);
    //launch this function again in x seconds
}

function newNotifications() {
    playSound();
    //play the notification sound
}

function remindNotifications() {
    remindTimeout = setTimeout(playRemindSound, (remindTime * 1000) - (checkTime * 1000));
    //play the reminder noise in x seconds
    reminder = true;
    //a reminder is in progress
}

function clearDummy() {
    var dummyPlayer = document.getElementById("dummyPlayer");
    dummyPlayer.innerHTML = "";
    //clear the dummy
}

function playRemindSound() {
    var dummyPlayer = document.getElementById("dummyPlayer");
    dummyPlayer.innerHTML = "<embed hidden=\"true\" autoplay=\"true\" enablejavascript=\"true\" loop=\"false\" autostart=\"true\" src=\"" + remindSound + "\" height=\"0\" width=\"0\">";
    reminder = false;
    //play the reminder sound
}

function playSound() {
    var dummyPlayer = document.getElementById("dummyPlayer");
    dummyPlayer.innerHTML = "<embed hidden=\"true\" autoplay=\"true\" enablejavascript=\"true\" loop=\"false\" autostart=\"true\" src=\"" + notifSound + "\" height=\"0\" width=\"0\">";
    //play the notification sound
}



function joinArray(array) {
//turn an array into a string (for comparison)
    var a, b;
    a = array;
    b = a.join("");
    return (b);
}

/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/
function getElementsByClassName(className, tag, elm) {
    if (document.getElementsByClassName) {
        getElementsByClassName = function (className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
                nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
                returnElements = [],
                current;
            for (var i = 0, il = elements.length; i < il; i += 1) {
                current = elements[i];
                if (!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    } else if (document.evaluate) {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = "",
                xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
                returnElements = [],
                elements, node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch (e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    } else {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = [],
                elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
                current, returnElements = [],
                match;
            for (var k = 0, kl = classes.length; k < kl; k += 1) {
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for (var l = 0, ll = elements.length; l < ll; l += 1) {
                current = elements[l];
                match = false;
                for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
}