// ==UserScript==
// @name           Facebook - Online/Offline notifications
// @namespace      Facebook - Online/Offline notifications
// @description    Shows notifications when friends go online and offline
// @include        http://www.facebook.com/*
// ==/UserScript==



window.addEventListener("load", function(e) {
 //after the page has finished loading...
 setTimeout(autoStart,500);
 //Start the script after half a second (added the half a second cause sometimes listening for a page loading is not accurate)
 setInterval(renewContacts, 60000);
 //every so & so seconds, reload the chat friends through a clever javascript hack ;)
 //be VERY careful when editing this value too low., FB might not look too kindly on this being changed
 //without this piece of code, the contact list only updates every 3 minutes, which isn't really good enough
}, false); 

var oneTimerDone = false;
function autoStart(){
 if(unsafeWindow.buddyList.buddyListOpen == true){
 //if the buddy list is already loaded
  begin();
  //lets begin, shall we?
 }else{
 //if the buddy list isnt loaded
  getElementsByClassName("presence_menu_opts")[0].style.display = "none";
  //hide the buddy list (so we don't see it pop up)
  unsafeWindow.buddyList.openTab();
  //Open the chat window, which loads the contacts into memory for the first time, this only needs to be done once
  closeWindowHandler();
  setTimeout(checkTimeout,10000); 
 }
}

function checkTimeout(){
   if(oneTimerDone == false){
     //if things dont do what they are told within 10 seconds..
      // try again, cause it's probably just facebook being a mong.
        unsafeWindow.buddyList.closeTab();
        //close the tab first :$
        setTimeout(autoStart,100);
        //start again.
   }
}


function closeWindowHandler(){

  clearfix = getElementsByClassName("clearfix friend");
  //load the friends into memory
  if(clearfix.length > 0){
  //if the friends list has finished loading
    oneTimerDone = true;
    closeWindow();
    //close the window
  }else{
  //if the friends haven't loaded yet
    setTimeout(closeWindowHandler,100);
    //check again, until they are.
  }

}

function closeWindow(){
  getElementsByClassName("presence_menu_opts")[0].style.display = "block";
  //make the buddy list visible again
  unsafeWindow.buddyList.closeTab();
  //Close the buddy list
  begin();
  //Begin the main Script :-)
}



function renewContacts(){
unsafeWindow.ChatBuddyList.prototype._forceUpdate(false);
//forces the chat window to update itself, function found by me and it took me litterally hours to find, so please give me credit if you use it and didn't know about it!
setTimeout(begin, 4000);
}





createDivs();

function createDivs(){
onlineDiv = document.createElement("div");
onlineDiv.id = "onlineDiv";
onlineDiv.innerHTML = "<table><tr><td style='padding:5px;'><a id='onlineLink' href='#'><img border='none' id=\"onlineImg\" src=\"\"></a></td><td><span style='padding-right: 5px;' id=\"onlineText\"></span></td></tr></table>";
onlineDiv.style.position = "fixed";
onlineDiv.style.top = "55px";
onlineDiv.style.left = "0px";
onlineDiv.style.zIndex = 100;
onlineDiv.style.height = "70px";
onlineDiv.style.width = "246px";
onlineDiv.style.padding = "0px";
onlineDiv.style.display = "none";
onlineDiv.style.opacity = "0";
onlineDiv.style.left = "15px";
//onlineDiv.style.backgroundImage = "url('http://i49.tinypic.com/veqer7.png')";
onlineDiv.style.backgroundImage = "url('http://i49.tinypic.com/veqer7.png')";
onlineDiv.style.backgroundRepeat = "no-repeat";
my_div = document.getElementById("body");
document.body.insertBefore(onlineDiv, my_div);
//Create the online div

offlineDiv = document.createElement("div");
offlineDiv.id = "offlineDiv";
offlineDiv.innerHTML = "<table><tr><td style='padding:5px;'><a id='offlineLink' href='#'><img border='none' id=\"offlineImg\" src=\"\"></a></td><td><span style='padding-right: 5px;' id=\"offlineText\"></span></td></tr></table>";
offlineDiv.style.position = "fixed";
offlineDiv.style.top = "130px";
offlineDiv.style.left = "0px";
offlineDiv.style.zIndex = 100;
offlineDiv.style.height = "70px";
offlineDiv.style.width = "246px";
offlineDiv.style.padding = "0px";
offlineDiv.style.display = "none";
offlineDiv.style.left = "15px";
//offlineDiv.style.backgroundImage = "url('http://i50.tinypic.com/2z7q5vm.png')";
offlineDiv.style.backgroundImage = "url('http://i50.tinypic.com/2z7q5vm.png')";
offlineDiv.style.backgroundRepeat = "no-repeat";
my_div = document.getElementById("body");
document.body.insertBefore(offlineDiv, my_div);
//Create the offline div
}

var oldOnlineFriendsImages = new Array();
var oldOnlineFriendsNames = new Array();
var oldOnlineFriendsIDs = new Array();
//Create the old arrays    
           

var skipFirst = 0;

function begin() {

    var onlineFriendsIDs = new Array();
    var onlineFriendsImages = new Array();
    var onlineFriendsNames = new Array();
    //Create the current arrays
    onlineFriends = getElementsByClassName("clearfix friend ");
    //This collects each of the chat buddys
    if (onlineFriends) {
        //if we've got the right thing
        for (var i = 0; i < onlineFriends.length; i++) {
        //for every friend
            if (onlineFriends[i].getElementsByTagName("img")[0]) {
            //if the friend has an image (in other words, if you havent disabled them in options)
                friendImg = onlineFriends[i].getElementsByTagName("img")[0].src;
                //log this image
            } else {
            //else
                friendImg = "http://i47.tinypic.com/2h85l74.png";
                //we use the "no image" icon
            }
            friendName = onlineFriends[i].getElementsByTagName("span")[0].innerHTML;
            //collects the friend's name
            friendIDsections = onlineFriends[i].getElementsByTagName("span")[0].id.split("_");
            friendID = friendIDsections[friendIDsections.length -1];
            //collects the friend's ID
            onlineFriendsImages.push(friendImg);
            onlineFriendsNames.push(friendName);
            onlineFriendsIDs.push(friendID);
            //adds the online friend to the current list
        }

        ////check for online buddys start
        arrayDiffNames = onlineFriendsNames.filter(function (x) {
            return oldOnlineFriendsNames.indexOf(x) < 0
        });
        arrayDiffImages = onlineFriendsImages.filter(function (x) {
            return oldOnlineFriendsImages.indexOf(x) < 0
        });
        arrayDiffIDs = onlineFriendsIDs.filter(function (x) {
            return oldOnlineFriendsIDs.indexOf(x) < 0
        });
        //locates the buddys which have changed their status from offline to online by comparing the current array with the previous
    if(skipFirst == 1){
    //we want to hide the first results, because we haven't anything to compare them to yet, to do this, we're just going to set a value to 0, check if it's 1, and then set it as 1 after the loop
        if (arrayDiffNames.length > 0) {
        //if some users have come online since the last check
            if (arrayDiffNames.length == 1) {
            //and if there is only one new online friend
                showOnlineNotelet();
                //show the online notification
                document.getElementById("onlineText").innerHTML = "<b><a href='http://www.facebook.com/profile.php?id=" + arrayDiffIDs[0] + "'>" + arrayDiffNames[0] + "</a></b> is online.";
                document.getElementById("onlineImg").src = arrayDiffImages[0];
                document.getElementById("onlineLink").href = "http://www.facebook.com/profile.php?id=" + arrayDiffIDs[0];
                //update the notification info
            } else if (arrayDiffNames.length == 2) {
            //if there are two new online friends
                showOnlineNotelet();
                //show the online notification
                document.getElementById("onlineText").innerHTML = "<b><a href='http://www.facebook.com/profile.php?id=" + arrayDiffIDs[0] + "'>" + arrayDiffNames[0] + "</a></b> and <b><a href='http://www.facebook.com/profile.php?id=" + arrayDiffIDs[1] + "'>" + arrayDiffNames[1] + "</a</b> are online.";
                randomE = Math.floor(Math.random() * arrayDiffNames.length);
                document.getElementById("onlineImg").src = arrayDiffImages[randomE];
                document.getElementById("onlineLink").href = "http://www.facebook.com/profile.php?id=" + arrayDiffIDs[randomE];
                //update the notification info, pick a random image from the two friends
            } else if (arrayDiffNames.length > 2 && arrayDiffNames.length < 5) {
            //if there are 3 or 4 new online friends
                showOnlineNotelet();
                //show the online notification
                for (var e = 0; e < arrayDiffNames.length - 1; e++) {
                    document.getElementById("onlineText").innerHTML = document.getElementById("onlineText").innerHTML + "<b><a href='http://www.facebook.com/profile.php?id=" + arrayDiffIDs[e] + "'>" + arrayDiffNames[e] + "</a></b>, ";
                }
                document.getElementById("onlineText").innerHTML = document.getElementById("onlineText").innerHTML + "and <b><a href='http://www.facebook.com/profile.php?id=" + arrayDiffIDs[e] + "'>" + arrayDiffNames[e] + "</a></b> are online.";
                randomE = Math.floor(Math.random() * arrayDiffNames.length);
                document.getElementById("onlineImg").src = arrayDiffImages[randomE];
                document.getElementById("onlineLink").href = "http://www.facebook.com/profile.php?id=" + arrayDiffIDs[randomE];
                //update the notification info, pick a random image from the friends
            } else if (arrayDiffNames.length > 4) {
            //if there is more than 4 new online friends
                showOnlineNotelet();
                //show the online notification
                for (var e = 0; e < 4; e++) {
                    document.getElementById("onlineText").innerHTML = document.getElementById("onlineText").innerHTML + "<b><a href='http://www.facebook.com/profile.php?id=" + arrayDiffIDs[e] + "'>" + arrayDiffNames[e] + "</a></b>,";
                }
                document.getElementById("onlineText").innerHTML = document.getElementById("onlineText").innerHTML + " and <b>" + (arrayDiffNames.length - 4) + "</b> other friends are online.";
                document.getElementById("onlineImg").src = arrayDiffImages[Math.floor(Math.random() * arrayDiffNames.length)];
                randomE = Math.floor(Math.random() * arrayDiffNames.length);
                document.getElementById("onlineImg").src = arrayDiffImages[randomE];
                document.getElementById("onlineLink").href = "http://www.facebook.com/profile.php?id=" + arrayDiffIDs[randomE];
                //update the notification info, pick a random image from the friends
            }


        }
    }
        ////check for online buddys end  
        
        ////check for offline buddys start
        //This is pretty much the same as the online buddys so i wont comment it.
        arrayDiffNamesOffline = oldOnlineFriendsNames.filter(function (x) {
            return onlineFriendsNames.indexOf(x) < 0
        });
        arrayDiffImagesOffline = oldOnlineFriendsImages.filter(function (x) {
            return onlineFriendsImages.indexOf(x) < 0
        });
        arrayDiffIDsOffline = oldOnlineFriendsIDs.filter(function (x) {
            return onlineFriendsIDs.indexOf(x) < 0
        });

        if (arrayDiffNamesOffline.length > 0) {
            if (arrayDiffNamesOffline.length == 1) {
                showOfflineNotelet();
                document.getElementById("offlineText").innerHTML = "<b><a href='http://www.facebook.com/profile.php?id=" + arrayDiffIDsOffline[0] + "'>" + arrayDiffNamesOffline[0] + "</a></b> is offline.";
                document.getElementById("offlineImg").src = arrayDiffImagesOffline[0];
                document.getElementById("offlineLink").href = "http://www.facebook.com/profile.php?id=" + arrayDiffIDsOffline[0];
            } else if (arrayDiffNamesOffline.length == 2) {
                showOfflineNotelet();
                document.getElementById("offlineText").innerHTML = "<b><a href='http://www.facebook.com/profile.php?id=" + arrayDiffIDsOffline[0] + "'>" + arrayDiffNamesOffline[0] + "</a></b> and <b><a href='http://www.facebook.com/profile.php?id=" + arrayDiffIDsOffline[1] + "'>" + arrayDiffNamesOffline[1] + "</a</b> are offline.";
                randomE = Math.floor(Math.random() * arrayDiffNamesOffline.length);
                document.getElementById("offlineImg").src = arrayDiffImagesOffline[randomE];
                document.getElementById("offlineLink").href = "http://www.facebook.com/profile.php?id=" + arrayDiffIDsOffline[randomE];
            } else if (arrayDiffNamesOffline.length > 2 && arrayDiffNamesOffline.length < 5) {
                showOfflineNotelet();
                for (var e = 0; e < arrayDiffNamesOffline.length - 1; e++) {
                    document.getElementById("offlineText").innerHTML = document.getElementById("offlineText").innerHTML + "<b><a href='http://www.facebook.com/profile.php?id=" + arrayDiffIDsOffline[e] + "'>" + arrayDiffNamesOffline[e] + "</a></b>, ";
                }
                document.getElementById("offlineText").innerHTML = document.getElementById("offlineText").innerHTML + "and <b><a href='http://www.facebook.com/profile.php?id=" + arrayDiffIDsOffline[e] + "'>" + arrayDiffNamesOffline[e] + "</a></b> are offline.";
                document.getElementById("offlineImg").src = arrayDiffImagesOffline[Math.floor(Math.random() * arrayDiffNamesOffline.length)];
            } else if (arrayDiffNamesOffline.length > 4) {
                showOfflineNotelet();
                for (var e = 0; e < 4; e++) {
                    document.getElementById("offlineText").innerHTML = document.getElementById("offlineText").innerHTML + "<b><a href='http://www.facebook.com/profile.php?id=" + arrayDiffIDsOffline[e] + "'>" + arrayDiffNamesOffline[e] + "</a></b>,";
                }
                document.getElementById("offlineText").innerHTML = document.getElementById("offlineText").innerHTML + " and <b>" + (arrayDiffNamesOffline.length - 4) + "</b> other friends are offline.";
                randomE = Math.floor(Math.random() * arrayDiffNamesOffline.length);
                document.getElementById("offlineImg").src = arrayDiffImagesOffline[randomE];
                document.getElementById("offlineLink").href = "http://www.facebook.com/profile.php?id=" + arrayDiffIDsOffline[randomE];
            }


        }
        ////check for offline buddys end
        oldOnlineFriendsImages = onlineFriendsImages;
        oldOnlineFriendsNames = onlineFriendsNames;
        oldOnlineFriendsIDs = onlineFriendsIDs;
        //log the info so that it can be checked next time
    }
skipFirst = 1;
}





function showOnlineNotelet() {
    document.getElementById("onlineText").innerHTML = "";
    document.getElementById("onlineDiv").style.top = findSlot() + "px";
    document.getElementById("onlineDiv").style.display = "block";
    //position the online notification in the correct position and reset its values
    setTimeout(hideOnlineNotelet, 10000);
    //after 10 seconds, let's hide this notification
    document.getElementById("onlineDiv").style.opacity = 0.1;
    fadeDivIn("onlineDiv");
    //fade the notification in
}

function hideOnlineNotelet() {
    document.getElementById("onlineDiv").style.opacity = 1;
    fadeDivOut("onlineDiv");
    //fade the notification out
}

function showOfflineNotelet() {
    document.getElementById("offlineText").innerHTML = "";
    document.getElementById("offlineDiv").style.top = findSlot() + "px";
    document.getElementById("offlineDiv").style.display = "block";
    //position the offline notification in the correct position and reset its values
    setTimeout(hideOfflineNotelet, 10000);
    //after 10 seconds, let's hide this notification
    document.getElementById("offlineDiv").style.opacity = 0.1;
    fadeDivIn("offlineDiv");
    //fade the notification in
}

function hideOfflineNotelet() {
    document.getElementById("offlineDiv").style.opacity = 1;
    fadeDivOut("offlineDiv");
    //fade the notification out
}


function findSlot() {
    if (document.getElementById("onlineDiv").style.top == "55px" && document.getElementById("onlineDiv").style.display == "block") {
        return "130";
    } else if (document.getElementById("offlineDiv").style.top == "55px" && document.getElementById("offlineDiv").style.display == "block") {
        return "130";
    } else {
        return "55";
    }
    //finds an appropriate place to place the notification
}



function fadeDivOut(divID){
opacity = document.getElementById(divID).style.opacity;
document.getElementById(divID).style.opacity = parseFloat(opacity) - 0.05;
var delay = function() { fadeDivOut(divID); };
 if(opacity > 0){
   setTimeout(delay,50);
 }else{
   document.getElementById(divID).style.display = "none";
 }
 //basically fades out a div from 100 opacity to 0. Only works on FF i think. Scripted by me.
}

function fadeDivIn(divID){
opacity = document.getElementById(divID).style.opacity;
document.getElementById(divID).style.opacity = parseFloat(opacity) + 0.05;
var delay2 = function() { fadeDivIn(divID); };
 if(opacity < 1){
   setTimeout(delay2,50);
 }
 //basically fades in a div from 0 opacity to 100. Only works on FF i think. Scripted by me.
}   




/*
	getElementsByClassName function Developed by Robert Nyman, http://www.robertnyman.com
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
            elements,
            node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch(e) {
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
            current,
            returnElements = [],
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